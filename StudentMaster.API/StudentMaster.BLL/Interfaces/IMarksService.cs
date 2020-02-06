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
    }
}
