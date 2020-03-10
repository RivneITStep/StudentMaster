﻿using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StudentMaster.BLL.DTO.dtoModels;
using StudentMaster.BLL.DTO.dtoResults;
using StudentMaster.BLL.Interfaces;
using StudentMaster.DAL.Entities;
using StudentMaster.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace StudentMaster.BLL.Services
{
    public class MarksService : IMarksService
    {
        private readonly IRepository<Class> _classRepos;
        private readonly IRepository<TeacherSubject> _tsubjectRepository;
        private readonly IRepository<ClassSubject> _csubjectRepository;
        private readonly IRepository<Mark> _markRepository;
        private readonly UserManager<User> _userManager;
        private readonly IRepository<UserClasses> _teacherClassRepository;
        public MarksService(IRepository<Class> classRepos,
                               IRepository<TeacherSubject> tsubjectRepository,
                               IRepository<ClassSubject> csubjectRepository,
                               IRepository<Mark> markRepository,
                               UserManager<User> userManager,
                               IRepository<UserClasses> teacherClassRepository)
        {
            _classRepos = classRepos;
            _tsubjectRepository = tsubjectRepository;
            _csubjectRepository = csubjectRepository;
            _markRepository = markRepository;
            _userManager = userManager;
            _teacherClassRepository = teacherClassRepository;
        }

        public async Task<marksForChartResult> getMarksForChartByUID(string uid)
        {
            var result = new marksForChartResult();
            foreach (var el in _markRepository.GetQueryable(x => x.Owner.Id == uid).Include(x => x.Subject).Include(x => x.Owner))
            {
                if (result.marks.FirstOrDefault(x => x.name == el.Subject.Name) == null)
                    result.marks.Add(new MarksForChart() { name = el.Subject.Name });
                if (!result.dates.Contains(el.Date.ToString("yyyy-MM-dd")))
                    result.dates.Add(el.Date.ToString("yyyy-MM-dd"));
                if (result.marks.FirstOrDefault(x => x.name == el.Subject.Name) != null)
                    result.marks.FirstOrDefault(x => x.name == el.Subject.Name).data.Add(el.Value);


            }
            return result;
        }

        public async Task<bool> addMarkForStudentAsync(addMarkForStudent model, string teacherID)
        {
            Thread.Sleep(1500);
            var student = await _userManager.FindByIdAsync(model.uid);
            if (student == null)
                throw Helpers.ErrorHelper.GetException("Student not found!", "404","",404);
            //var classId = student.myClass.Id;
            //if(classId == 0 && classId == null)
            //    return BadRequest(new ErrorViewModel() { Message = "Class not found!", Tag = "Not Found", Status = 404 });
            var subject = _tsubjectRepository.GetQueryable(x => x.SubjectId == model.subjectId).Include(x => x.Subject).Select(x => x.Subject).FirstOrDefault();
            if (subject == null)
                throw Helpers.ErrorHelper.GetException("Subject not found!", "404", "", 404);
            var mark = _markRepository.GetQueryable(x => x.Owner.Id == model.uid &&
                                                   x.Teacher.Id == teacherID &&
                                                   x.Subject.Id == subject.Id &&
                                                   x.Date.Year  == model.date.Year &&
                                                   x.Date.Month == model.date.Month &&
                                                   x.Date.Day == model.date.Year)
                                                        .Include(x => x.Teacher)
                                                        .Include(x => x.Subject)
                                                        .Include(x => x.Owner).Select(x => x).FirstOrDefault();
            if (model.mark < 1 && mark != null)
            {
                _markRepository.Delete(mark);
                return true;
            }


            if (model.mark < 1 && mark == null)
                throw Helpers.ErrorHelper.GetException("Mark must be > 0", "400", "", 400);
            if (mark != null)
            {
                mark.Value = model.mark;
                mark.Type = model.type;
                _markRepository.Edit(mark);
                return true;
            }
            var m = new Mark()
            {
                Value = model.mark,
                Date = model.date,
                Owner = student,
                Subject = subject,
                Teacher = await _userManager.FindByIdAsync(teacherID),
                Type = model.type
            };
            _markRepository.Add(m);
            return true;
        }

        public async Task<int> getStudentMarkBySubjectAndDate(getStudentMarkByDateAndSubjectViewModel model, string teacherID)
        {
            var mod = model;
            Thread.Sleep(1000);
            var mark = _markRepository.GetQueryable(x =>

                                                    x.Owner.Id == model.uid &&

                                                    x.Teacher.Id == teacherID &&

                                                    x.Subject.Id == Convert.ToInt32(model.subjectId) &&

                                                   x.Date.Year == model.date.Year &&
                                                   x.Date.Month == model.date.Month &&
                                                   x.Date.Day == model.date.Year)
                                                         .Include(x => x.Teacher)
                                                         .Include(x => x.Subject)
                                                         .Include(x => x.Owner).Select(x=>x.Value);
            return mark.FirstOrDefault();
        }
        public async Task<IEnumerable<marksubjectResult>> getMarksSubjects(string uid)
        {

            

            var result = new List<marksubjectResult>();
            var allMarks =  _markRepository.GetQueryable(x=>x.Owner.Id == uid).Include(x=>x.Owner).Include(x=>x.Subject);
            var subjectsId = new List<int>();
            foreach(var el in allMarks)
            {
                if (!subjectsId.Contains(el.Subject.Id))
                    subjectsId.Add(el.Subject.Id);
            }

            foreach (var el in subjectsId)
            {
                var mark = Math.Ceiling(await _markRepository.GetQueryable(x => x.Owner.Id == uid && x.Subject.Id == el).Include(x => x.Owner).Include(x => x.Subject).Select(x=>x.Value).AverageAsync());
                var sub_name = await _markRepository.GetQueryable(x => x.Owner.Id == uid && x.Subject.Id == el).Include(x => x.Owner).Include(x => x.Subject).Select(x => x.Subject.Name).FirstOrDefaultAsync();

                result.Add(new marksubjectResult()
                {
                    mark = mark,
                    subject = sub_name
                });
            }
            return result.ToArray();
        }

        public async Task<IEnumerable<markResult>> getMarksByDate(string uid, DateTime date)
        {
          var marks = _markRepository.GetQueryable(x => x.Owner.Id == uid && x.Date.Year == date.Year && x.Date.Month == date.Month && date.Day == x.Date.Day).Include(x => x.Owner).Include(x => x.Subject);

            var result = new List<markResult>();
            foreach (var el in marks)
                result.Add(new markResult() { name = el.Subject.Name, type = el.Type, value = el.Value });

            return result;
        }
    }
}
