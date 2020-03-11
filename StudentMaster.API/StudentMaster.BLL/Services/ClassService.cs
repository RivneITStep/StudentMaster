﻿using Microsoft.EntityFrameworkCore;
using StudentMaster.BLL.DTO.dtoResults;
using StudentMaster.BLL.Helpers;
using StudentMaster.BLL.Interfaces;
using StudentMaster.DAL.Entities;
using StudentMaster.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentMaster.BLL.Services
{
    public class ClassService : IClassService
    {
        private readonly IRepository<Class> _classRepository;
        private readonly IRepository<TeacherSubject> _tsRepository;
        private readonly IRepository<ClassSubject> _csRepository;
        private readonly IRepository<User> _userRepository;
        private readonly IRepository<Schedule> _scheduleRepository;

        public ClassService(IRepository<Class> classRepository, IRepository<TeacherSubject> tsRepository, IRepository<ClassSubject> csRepository, IRepository<User> userRepository, IRepository<Schedule> scheduleRepository)
        {
            _classRepository = classRepository;
            _tsRepository = tsRepository;
            _csRepository = csRepository;
            _userRepository = userRepository;
            _scheduleRepository = scheduleRepository;
        }

        public void createClass(string className)
        {
            var cl = _classRepository.GetQueryable(x => x.Name.ToLower() == className.ToLower()).FirstOrDefault();
            if (cl != null)
                throw ErrorHelper.GetException("Class name [" + className + "] is used", "400");

            _classRepository.Add(new Class()
            {
                Name = className
            });
        }
        public void removeClass(string className)
        {
            var cl = _classRepository.GetQueryable(x => x.Name.ToLower() == className.ToLower() && x.isDeleted == false).FirstOrDefault();
            if (cl == null)
                throw ErrorHelper.GetException("Class name [" + className + "] not found", "404");
            cl.isDeleted = true;
            _classRepository.Edit(cl);

        }
        public void rollbackClass(string className)
        {
            var cl = _classRepository.GetQueryable(x => x.Name.ToLower() == className.ToLower() && x.isDeleted == true).FirstOrDefault();
            if (cl == null)
                throw ErrorHelper.GetException("Class name [" + className + "] not found", "404");
            cl.isDeleted = false;
            _classRepository.Edit(cl);

        }
        public async Task<IEnumerable<scheduleResult>> GetSchedule(string uid)
        {
            var cl = _classRepository.GetSingle(x => x.Students.FirstOrDefault(y => y.Id == uid) != null);
            if (cl != null)
            {
                var result = new List<scheduleResult>();
                foreach (var el in await _scheduleRepository.GetQueryable(x=>x.Class == cl).Include(x=>x.Items).ToListAsync())
                    result.Add(new scheduleResult()
                    {
                        Day = el.Day,
                        Id = el.Id,
                        Items = el.Items
                    });
                return result;
            }
            throw ErrorHelper.GetException("Class not found", "404", "", 404);
        }
    

        public async Task<IEnumerable<studentResult>> getStudentByClassId(int classId)
        {
            var students = new List<studentResult>();
            var pos = 1;
            var @class = (await _classRepository.GetQueryable(x => x.Id == classId).Include(x => x.Students).FirstOrDefaultAsync());

            if (@class == null)
                throw ErrorHelper.GetException("class not found...", "NotFound", "", 404);

            foreach (var el in @class.Students)
            {
                students.Add(new studentResult()
                {
                    id = el.Id,
                    position = pos,
                    pib = el.FirstName + ' ' + el.Name + ' ' + el.LastName
                });
                pos++;
            }
            return students;
        }

        public async Task<IEnumerable<studentResult>> getStudentsFromClassByStudentId(string userId)
        {

            var user = await this._userRepository.GetQueryable(x => x.Id == userId).Include(x=>x.myClass).FirstOrDefaultAsync();
            if (user == null)
                throw ErrorHelper.GetException("User not found", "404", "", 404);

            var userClass = await _classRepository.GetQueryable(x => x.Id == user.myClass.Id).Include(x=>x.Students).FirstOrDefaultAsync();
            if (userClass == null)
                throw ErrorHelper.GetException("Class not found", "404", "", 404);

            var students = new List<studentResult>();
            var pos = 0;

            foreach (var el in userClass.Students)
                students.Add(new studentResult()
                {
                    id = el.Id,
                    position = pos++,
                    pib = el.FirstName + ' ' + el.Name + ' ' + el.LastName
                });

            return students;
        }

        public async Task<IEnumerable<subjectResult>> getTeacherClassSubjcets(string teacherId, int classId)
        {

            var teacherSubjects =  _tsRepository.GetQueryable(x => x.UserId == teacherId).Include(x => x.Subject).Select(x => x.Subject);
            var classSubjects =  _csRepository.GetQueryable(x => x.ClassId == classId).Include(x => x.Subject).Select(x => x.Subject);

            var result = new List<subjectResult>();
            foreach (var el in teacherSubjects)
            {
                if (classSubjects.FirstOrDefault(x => x.Id == el.Id) != null)
                    result.Add(new subjectResult { id = el.Id, Name = el.Name });
            
            }
            return result.ToArray();
        }

        public void changeNameClass(string oldName, string newName)
        {
            var cl = _classRepository.GetQueryable(x => x.Name.ToLower() == oldName.ToLower()).FirstOrDefault();
            if (cl == null)
                throw ErrorHelper.GetException("Class not found", "404", "", 404);

            cl.Name = newName;
            _classRepository.Edit(cl);
        }
    }
}
