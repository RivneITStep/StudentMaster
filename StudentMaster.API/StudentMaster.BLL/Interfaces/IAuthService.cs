using StudentMaster.BLL.DTO.dtoModels;
using StudentMaster.BLL.DTO.dtoResults;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StudentMaster.BLL.Interfaces
{
    public interface IAuthService
    {
         Task<AuthSuccessResult> AuthorizeAsync(authViewModel model);

         Task<AuthSuccessResult> Refresh(refreshViewModel model);
    }
}
