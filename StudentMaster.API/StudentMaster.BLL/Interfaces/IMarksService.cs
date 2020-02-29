using StudentMaster.BLL.DTO.dtoModels;
using StudentMaster.BLL.DTO.dtoResults;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StudentMaster.BLL.Interfaces
{
    public interface IMarksService
    {
        Task<marksForChartResult> getMarksForChartByUID(string uid);
        Task<int> getStudentMarkBySubjectAndDate(getStudentMarkByDateAndSubjectViewModel model, string teacherID);
        Task<bool> addMarkForStudentAsync(addMarkForStudent model, string teacherID);
        
        Task<IEnumerable<marksubjectResult>> getMarksSubjects(string uid);
    }
}
