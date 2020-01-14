using StudentMaster.BLL.DTO.dtoModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StudentMaster.BLL.Interfaces
{
  public interface IHomeworkService
    {
        Task<string> addHomeworkAsync(string uid, AddHomeWorkViewModel model);
        ICollection<ReturnHomeWorksViewModel> getMyHomeworks(string uid);
    }
}
