using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StudentMaster.BLL.DTO.dtoModels;
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
    public class HomeworkService : IHomeworkService
    {
        private readonly DAL.Interfaces.IRepository<Class> _classRepository;
        private readonly DAL.Interfaces.IRepository<HomeWork> _homeworkRepository;
        private readonly DAL.Interfaces.IRepository<HomeworkItem> _homeworkItemRepository;
        private readonly DAL.Interfaces.IRepository<Subject> _subjectRepository;
        private readonly UserManager<User> _userManager;
        private readonly IFileService _imgageService;

        public HomeworkService(IRepository<Class> classRepository, IRepository<HomeWork> homeworkRepository, IRepository<HomeworkItem> homeworkItemRepository, IRepository<Subject> subjectRepository, UserManager<User> userManager, IFileService imgageService)
        {
            _classRepository = classRepository;
            _homeworkRepository = homeworkRepository;
            _homeworkItemRepository = homeworkItemRepository;
            _subjectRepository = subjectRepository;
            _userManager = userManager;
            _imgageService = imgageService;
        }

        public async Task<string> addHomeworkAsync(string uid, AddHomeWorkViewModel model)
        {
            try
            {

                var user = await _userManager.FindByIdAsync(uid);
                if (user == null)
                    return "userNotFound";
                var cl = _classRepository.GetById(model.classId);
                if (cl == null)
                    return "classNotFound";
                var path = _imgageService.saveFile(model.file).Result;
                if (string.IsNullOrEmpty(path))
                    return "errorSaveImg";
                var subj = _subjectRepository.GetById(model.subjectId);
                if (subj == null)
                    return "subjectNotFound";
                var homework = new HomeWork()
                {
                    Class = cl,
                    Creator = user,
                    File = new Attachment() { Path = path },
                    Theme = model.Theme,
                    TimeOfIssue = DateTime.Now,
                    ToTime = model.toTime,
                    Subject = subj
                };
                cl.HomeWorks.Add(homework);
                this._classRepository.Edit(cl);
                return "done";

            }
            catch (Exception)
            {
                return "Unknown error!";
            }
        }

        public async Task<bool> doHomeworkAsync(string uid, doHomeWorkViewModel model)
        {

           string file = await _imgageService.saveFile(model.file);
           var homework = _homeworkRepository.GetById(model.Id);
            
           if (homework == null)
                throw ErrorHelper.GetException("Homework not found...", "NotFound", "", 404);

            var result = new HomeworkItem()
            {
                File = new Attachment() { Path = file },
                Status = "REVIEW",
                ownerId = uid,
                Time = DateTime.Now,
               
            };
            homework.HomeworkItems.Add(result);
            _homeworkRepository.Edit(homework);
            return true;
        }

        public ICollection<ReturnHomeWorksViewModel> getMyHomeworks(string uid)
        {
            var result = new HashSet<ReturnHomeWorksViewModel>();
            var cl = _classRepository.GetQueryable(x => x.Students.FirstOrDefault(y => y.Id == uid) != null).Include(x => x.Students).FirstOrDefault();
            var homeworks = _homeworkRepository.GetQueryable().Include(x => x.Subject).Include(x => x.File).Include(x=>x.HomeworkItems).Where(x => x.Class == cl);
            if (homeworks == null)
                return null;
            foreach (var el in homeworks)
            {
                var d = el.HomeworkItems.Where(x => x.ownerId == uid).FirstOrDefault();
                var stat = "";
                int mark = 0;
                if (d == null)
                    stat = "OPEN";
                else
                {
                    stat = d.Status;
                    mark = d.Mark;
                }


                result.Add(new ReturnHomeWorksViewModel()
                {
                    Date = el.TimeOfIssue.ToShortDateString(),
                    Todate = el.ToTime.ToShortDateString(),
                    Theme = el.Theme,
                    Subject = el.Subject.Name,
                    Path = el.File.Path,
                    Status = stat,
                    Id = el.Id,
                    Mark = mark
                });

            }
            return result;
        }

        public ICollection<teacherHomeworkResult> getTeacherHomeworks(string uid)
        {
            var h = _homeworkItemRepository.GetQueryable(x => x.HomeWork.Creator.Id == uid).Include(x=>x.owner).Include(x => x.HomeWork).ThenInclude(x => x.Creator).Include(x=>x.HomeWork.Subject).Include(x=>x.HomeWork.File).Include(x=>x.File);
            var result = new List<teacherHomeworkResult>();
            foreach (var el in h)
            {
                result.Add(new teacherHomeworkResult()
                {
                    id = el.Id,
                    file = el.HomeWork.File.Path,
                    pib = $"{el.owner.FirstName} {el.owner.Name} {el.owner.LastName}",
                    student_file = el.File.Path,
                    subject = el.HomeWork.Subject.Name,
                    theme = el.HomeWork.Theme
                });
            }
            return result;
        }

        public async Task<bool> removeWork(string uid, int wid)
        {
            var work = _homeworkItemRepository.GetQueryable(x => x.HomeWork.Id == wid && x.ownerId == uid).Include(x=>x.HomeWork).FirstOrDefault();

            _homeworkItemRepository.Delete(work);

            return true;
        }

        public async Task<bool> reviewHomework(string uid, int wid, int mark)
        {
            var w = _homeworkItemRepository.GetById(wid);

            w.Status = "CLOSED";
            w.Mark = mark;
            _homeworkItemRepository.Edit(w);
            return true;
        }
    }
}
