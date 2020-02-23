using StudentMaster.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace StudentMaster.BLL.DTO.dtoResults
{
    public class scheduleResult
    {
        public scheduleResult()
        {
            this.Items = new List<ScheduleItem>();
        }
        public int Id { get; set; }
        public string Day { get; set; }
        public virtual ICollection<ScheduleItem> Items { get; set; }
    }
}
