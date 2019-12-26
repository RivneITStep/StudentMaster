using System.Collections.Generic;

namespace StudentMaster.DAL.Entities
{
    public class Schedule
    {
        public Schedule()
        {
            this.Items = new List<ScheduleItem>();
        }
        public int Id { get; set; }
        public string Day { get; set; }
        public virtual ICollection<ScheduleItem> Items { get; set; }
        public virtual Class Class { get; set; }
    }
}
