using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StudentMaster.BLL.DTO.dtoModels;
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
        private readonly DAL.Interfaces.IRepository<Subject> _subjectRepository;
        private readonly UserManager<User> _userManager;
        private readonly IFileService _imgageService;
        public HomeworkService(IRepository<HomeWork> homeworkRepos, IRepository<Subject> subjectRepos, IRepository<Class> classRepos, UserManager<User> userManager, IFileService imageService)
        {
            this._classRepository = classRepos;
            this._subjectRepository = subjectRepos;
            this._userManager = userManager;
            this._imgageService = imageService;
            this._homeworkRepository = homeworkRepos;
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

        public ICollection<ReturnHomeWorksViewModel> getMyHomeworks(string uid)
        {
            var result = new HashSet<ReturnHomeWorksViewModel>();
            var cl = _classRepository.GetQueryable(x => x.Students.FirstOrDefault(y => y.Id == uid) != null).Include(x => x.Students).FirstOrDefault();
            var homeworks = _homeworkRepository.GetQueryable().Include(x => x.Subject).Include(x => x.File).Where(x => x.Class == cl);
            if (homeworks == null)
                return null;
            foreach (var el in homeworks)
            {
                result.Add(new ReturnHomeWorksViewModel()
                {
                    Date = el.TimeOfIssue.ToShortDateString(),
                    Todate = el.ToTime.ToShortDateString(),
                    Theme = el.Theme,
                    Subject = el.Subject.Name,
                    Path = el.File.Path
                });

            }
            return result;
        }
    
}
}
