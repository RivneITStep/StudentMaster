using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StudentMaster.BLL.DTO.dtoResults;
using StudentMaster.BLL.Helpers;
using StudentMaster.BLL.Interfaces;
using StudentMaster.DAL.Entities;
using StudentMaster.DAL.Interfaces;
using StudentMaster.DAL.Repository;
using System;
using System.Collections.Generic;
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

        public AdminService(IRepository<Class> classRepository, UserManager<User> userManager, IEmailService emailService, IRandomService randomService, IRepository<ConfirmCode> confirmCodeRepository, IRepository<User> userRepository)
        {
            _classRepository = classRepository;
            _userManager = userManager;
            _emailService = emailService;
            _randomService = randomService;
            _confirmCodeRepository = confirmCodeRepository;
            _userRepository = userRepository;
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

            foreach(var el in (await _classRepository.GetAsync()))
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
    }
}
