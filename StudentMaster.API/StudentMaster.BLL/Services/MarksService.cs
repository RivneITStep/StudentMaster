using Microsoft.EntityFrameworkCore;
using StudentMaster.BLL.DTO.dtoResults;
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
    public class MarksService : IMarksService
    {
        private readonly IRepository<Mark> _markRepository;

        public MarksService(IRepository<Mark> markRepository)
        {
            this._markRepository = markRepository;
        }

        public async Task<marksForChartResult> getMarksForChartByUID(string uid)
        {
            var result = new marksForChartResult();
            foreach (var el in _markRepository.GetQueryable(x => x.Owner.Id == uid).Include(x => x.Subject).Include(x => x.Owner))
            {
                if (result.marks.FirstOrDefault(x => x.name == el.Subject.Name) == null)
                    result.marks.Add(new MarksForChart() { name = el.Subject.Name });
                if (!result.dates.Contains(el.Date.ToString("yyyy-MM-dd")))
                    result.dates.Add(el.Date.ToString("yyyy-MM-dd"));
                if (result.marks.FirstOrDefault(x => x.name == el.Subject.Name) != null)
                    result.marks.FirstOrDefault(x => x.name == el.Subject.Name).data.Add(el.Value);


            }
            return result;
        }
    }
}
