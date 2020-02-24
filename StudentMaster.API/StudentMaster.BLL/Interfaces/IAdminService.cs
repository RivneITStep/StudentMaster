using StudentMaster.BLL.DTO.dtoResults;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StudentMaster.BLL.Interfaces
{
    public interface IAdminService
    {
        Task<IEnumerable<myClassResult>> getAllClasses();
        Task<bool> inviteUser(string email);
        Task<bool> inviteUser(string email, int classId);
    }
}
