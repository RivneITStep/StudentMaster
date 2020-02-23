using StudentMaster.BLL.DTO.dtoResults;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StudentMaster.BLL.Interfaces
{
    public interface IAccountService
    {
        Task<bool> sendConfirmCodeOnEmailAsync(string email);
        Task<bool> checkConfirmCodeWithEmail(string email, int code);
        Task<bool> changePasswordWithoutOldPassword(string email, string password, int code);
        Task<IEnumerable<myClassResult>> getMyClasses(string uid);
    }
}
