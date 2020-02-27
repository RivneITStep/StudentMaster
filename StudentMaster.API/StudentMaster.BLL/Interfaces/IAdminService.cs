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


        Task<bool> removeStudentFromClass(string studentID);


        Task<bool> editSubjectsInClass(int classId, int subjectId);

        Task<IEnumerable<subjectResult>> getAllSubjects();
        Task<IEnumerable<subjectResult>> getClassSubjects(int classId);
    }
}
