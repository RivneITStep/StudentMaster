using StudentMaster.BLL.DTO.dtoModels;
using StudentMaster.BLL.DTO.dtoResults;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StudentMaster.BLL.Interfaces
{
  public interface IHomeworkService
    {
        Task<string> addHomeworkAsync(string uid, AddHomeWorkViewModel model);
        Task<bool> doHomeworkAsync(string uid, doHomeWorkViewModel model);
        Task<bool> removeWork(string uid, int wid);
        Task<bool> reviewHomework(string uid, int wid, int mark);
        ICollection<ReturnHomeWorksViewModel> getMyHomeworks(string uid);
        ICollection<teacherHomeworkResult> getTeacherHomeworks(string uid);
    }
}
