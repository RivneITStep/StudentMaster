using StudentMaster.BLL.DTO.dtoResults;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StudentMaster.BLL.Interfaces
{
    public interface IClassService
    {
        Task<IEnumerable<studentResult>> getStudentByClassId(int classId);

        Task<IEnumerable<studentResult>> getStudentsFromClassByStudentId(string userId);

        Task<IEnumerable<subjectResult>> getTeacherClassSubjcets(string teacherId, int classId);
        Task<IEnumerable<scheduleResult>> GetSchedule(string uid);
        void createClass(string className);
        void removeClass(string className);
        void rollbackClass(string className);
        void changeNameClass(string oldName, string newName);
    }

    

}
