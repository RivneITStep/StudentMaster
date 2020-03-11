using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StudentMaster.BLL.DTO.dtoResults;
using StudentMaster.BLL.Helpers;
using StudentMaster.BLL.Interfaces;
using StudentMaster.DAL;
using StudentMaster.DAL.Entities;
using StudentMaster.DAL.Interfaces;
using StudentMaster.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace StudentMaster.BLL.Services
{
    public class AdminService : IAdminService
    {
        private readonly IRepository<Class> _classRepository;
        private readonly UserManager<User> _userManager;
        private readonly IEmailService _emailService;
        private readonly IRandomService _randomService;
        private readonly IRepository<ConfirmCode> _confirmCodeRepository;
        private readonly IRepository<User> _userRepository;
        private readonly IRepository<ClassSubject> _classSubjectRepository;
        private readonly IRepository<Subject> _subjectRepository;
        private readonly IRepository<UserClasses> _teachersClassRepository;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IRepository<TeacherSubject> _teacherSubjectRepository;

        public AdminService(IRepository<Class> classRepository, UserManager<User> userManager, IEmailService emailService, IRandomService randomService, IRepository<ConfirmCode> confirmCodeRepository, IRepository<User> userRepository, IRepository<ClassSubject> classSubjectRepository, IRepository<Subject> subjectRepository, IRepository<UserClasses> teachersClassRepository, RoleManager<IdentityRole> roleManager, IRepository<TeacherSubject> teacherSubjectRepository)
        {
            _classRepository = classRepository;
            _userManager = userManager;
            _emailService = emailService;
            _randomService = randomService;
            _confirmCodeRepository = confirmCodeRepository;
            _userRepository = userRepository;
            _classSubjectRepository = classSubjectRepository;
            _subjectRepository = subjectRepository;
            _teachersClassRepository = teachersClassRepository;
            _roleManager = roleManager;
            _teacherSubjectRepository = teacherSubjectRepository;
        }

        public async Task<bool> inviteUser(string email)
        {
            var user = new User();
            user.Email = email;
            user.UserName = email;
            var result = await  _userManager.CreateAsync(user);

            if (result.Succeeded)
            {
                var code = _randomService.RandomNumber(111111, 999999);
                _confirmCodeRepository.Add(new ConfirmCode() { Code = code, CreationTime = DateTime.Now, UserID = (await _userManager.FindByEmailAsync(email)).Id });

                await _emailService.SendEmailAsync(email, "Please, create your account.", "An invitation code to create an account: ", email, code.ToString());

                return true;
            }
            
            else
                foreach (var el in result.Errors)
                    throw ErrorHelper.GetException(el.Description, el.Code, "", 400);
            return false;
        }

        public async Task<IEnumerable<myClassResult>> getAllClasses()
        {
            var result = new List<myClassResult>();

            foreach(var el in  _classRepository.GetQueryable(x=>x.isDeleted == false))
            {
                result.Add(new myClassResult() { id = el.Id, name = el.Name });
            }

            return result;
        }

        public async Task<bool> inviteUser(string email, int classId)
        {
            bool result = await inviteUser(email);

            if (result)
            {
                var user = await _userManager.FindByEmailAsync(email);
                user.myClass = await _classRepository.GetByIdAsync(classId);
                _userRepository.Edit(user);
                return true;
            }
            else
                return false;
           
                
        }

        public async Task<bool> removeStudentFromClass(string studentID)
        {

            var user = await _userRepository.GetQueryable(x=>x.Id == studentID).Include(x=>x.myClass).FirstOrDefaultAsync();

            if (user == null)
                throw ErrorHelper.GetException("User not found...", "404", "", 404);

            var cl = _classRepository.GetById(user.myClass.Id);
            cl.Students.Remove(user);
            _classRepository.Edit(cl);

            return true;
        }

        public async Task<bool> editSubjectsInClass(int classId, int subjectId)
        {
            var cl = await _classRepository.GetByIdAsync(classId);
            var sub = await _subjectRepository.GetByIdAsync(subjectId);

            if (cl == null)
                throw ErrorHelper.GetException("Class not found...", "404", "", 404);
            if (sub == null)
                throw ErrorHelper.GetException("Subject not found...", "404", "", 404);

            var cs = await _classSubjectRepository.GetQueryable(x => x.ClassId == classId && x.SubjectId == subjectId).FirstOrDefaultAsync();

            if (cs == null)
                _classSubjectRepository.Add(new ClassSubject { Class = cl, Subject = sub });
            else
                _classSubjectRepository.Delete(cs);
            return true;
        }

        public async Task<IEnumerable<subjectResult>> getAllSubjects()
        {
            var result = new List<subjectResult>();

            foreach (var el in await _subjectRepository.GetAsync())
                result.Add(new subjectResult() { id = el.Id, Name = el.Name });
            return result;
        }

        public async Task<IEnumerable<subjectResult>> getClassSubjects(int classId)
        {
            var result = new List<subjectResult>();

            foreach (var el in  _classSubjectRepository.GetQueryable(x=>x.ClassId == classId).Include(x=>x.Subject))
                result.Add(new subjectResult() { id = el.Subject.Id, Name = el.Subject.Name });
            return result;
        }

        public async Task<IEnumerable<teacherResult>> getAllTeachers()
        {
            var result = new List<teacherResult>();
            foreach (var el in await _userManager.GetUsersInRoleAsync("Teacher"))
                result.Add(new teacherResult() { id = el.Id, pib = el.FirstName + ' ' + el.Name + ' ' +  el.LastName });
            return result;
        }

        public async Task<IEnumerable<teacherResult>> getClassTeachers(int classId)
        {
            var result = new List<teacherResult>();

            foreach (var el in await _teachersClassRepository.GetQueryable(x => x.ClassId == classId).Include(x => x.User).ToArrayAsync())
                result.Add(new teacherResult() { id = el.User.Id, pib = el.User.FirstName + ' ' + el.User.Name + ' ' + el.User.LastName });
            return result;
        }

        public async Task<bool> editTeachersInClass(int classId, string teacherId)
        {
            var cl = await _classRepository.GetByIdAsync(classId);
            var th = await _userRepository.GetByIdAsync(teacherId);

            if (cl == null)
                throw ErrorHelper.GetException("Class not found...", "404", "", 404);
            if (th == null)
                throw ErrorHelper.GetException("Teacher not found...", "404", "", 404);

            var cs = await _teachersClassRepository.GetQueryable(x => x.ClassId == classId && x.UserId == teacherId).FirstOrDefaultAsync();

            if (cs == null)
                _teachersClassRepository.Add(new UserClasses { Class = cl, User = th });
            else
                _teachersClassRepository.Delete(cs);
            return true;
        }

        public async Task<PaginationResult<studentResult>> getUsers(int page, int count = 10)
        {
            var result = new PaginationResult<studentResult>();

            var listOfUsers = _userRepository.GetQueryable();

            int countOfItems = await listOfUsers.CountAsync();

            var users = listOfUsers.Skip((page - 1) * count).Take(count);

            foreach (var el in users)
                result.Data.Add(new studentResult()
                {
                    id = el.Id,
                    pib = $"{el.FirstName} {el.Name} {el.LastName}",
                    position = 0,
                    isTeacher = await _userManager.IsInRoleAsync(el, "Teacher")

                }); 
            result.CountOfPages = (int)Math.Ceiling((double)countOfItems / countOfItems);
            result.CurrentPage = page;
            return result;

        }

        public async Task<IEnumerable<string>> getAllRoles()
        {
            return _roleManager.Roles.Select(x => x.Name);
        }

        public async Task<IEnumerable<string>> getUserRoles(string uid)
        {
            var user =  await _userManager.FindByIdAsync(uid);
            if (user == null)
                throw ErrorHelper.GetException("User not found...", "404", "", 404);
            return await _userManager.GetRolesAsync(user);
        }

        public async Task<bool> editRoleOfUser(string uid, string role)
        {
            var user = await _userManager.FindByIdAsync(uid);
            if (user == null)
                throw ErrorHelper.GetException("User not found...", "404", "", 404);
            var r = await _roleManager.FindByNameAsync(role);
            if (r == null)
                throw ErrorHelper.GetException("Role not found...", "404", "", 404);

            if (await _userManager.IsInRoleAsync(user, r.Name))
            {
                await _userManager.RemoveFromRoleAsync(user, r.Name);
                return true;
            } else
            {
                await _userManager.AddToRoleAsync(user, r.Name);
                return true;
            }
             
           
        }

        public void createSubject(string subjectName)
        {
           var sub = _subjectRepository.GetQueryable(x => x.Name == subjectName).FirstOrDefault();
            if (sub != null)
                throw ErrorHelper.GetException("Subject name " + subjectName + " is used!");
            _subjectRepository.Add(new Subject()
            {
                Name = subjectName
            });
        }

        public void removeSubject(string subjectName)
        {
            var sub = _subjectRepository.GetQueryable(x => x.Name == subjectName).FirstOrDefault();
            if (sub == null)
                throw ErrorHelper.GetException("Subject " + subjectName + " not found!");
            sub.isDeleted = true;
            _subjectRepository.Edit(sub);
        }

        public void rollbackSubject(string subjectName)
        {
            var sub = _subjectRepository.GetQueryable(x => x.Name == subjectName).FirstOrDefault();
            if (sub == null)
                throw ErrorHelper.GetException("Subject " + subjectName + " not found!");
            sub.isDeleted = false;
            _subjectRepository.Edit(sub);
        }

        public void changeNameSubject(string oldName, string newName)
        {
            var sub = _subjectRepository.GetQueryable(x => x.Name == oldName).FirstOrDefault();
            if (sub == null)
                throw ErrorHelper.GetException("Subject " + oldName + " not found!");
            sub.Name = newName;
            _subjectRepository.Edit(sub);
        }

        public async Task<IEnumerable<subjectResult>> getTeacherSubjects(string uid)
        {
            var result = new List<subjectResult>();

            foreach (var el in await _teacherSubjectRepository.GetQueryable(x => x.UserId == uid).Include(x => x.User).Include(x=>x.Subject).ToArrayAsync())
                result.Add(new subjectResult() { id = el.Subject.Id, Name = el.Subject.Name });
            return result;
        }

        public async Task<bool> editSubjectsInTeacher(int subjectId, string teacherId)
        {
            var cl = await _subjectRepository.GetByIdAsync(subjectId);
            var th = await _userRepository.GetByIdAsync(teacherId);

            if (cl == null)
                throw ErrorHelper.GetException("Class not found...", "404", "", 404);
            if (th == null)
                throw ErrorHelper.GetException("Teacher not found...", "404", "", 404);

            var cs = await _teacherSubjectRepository.GetQueryable(x => x.SubjectId == subjectId && x.UserId == teacherId).FirstOrDefaultAsync();

            if (cs == null)
                _teacherSubjectRepository.Add(new TeacherSubject { Subject = cl, User = th });
            else
                _teacherSubjectRepository.Delete(cs);
            return true;
        }
    }
}
