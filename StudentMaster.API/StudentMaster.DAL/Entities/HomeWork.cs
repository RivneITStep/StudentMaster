using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentMaster.DAL.Entities
{
    public class HomeWork
    {
        public HomeWork()
        {
            this.HomeworkItems = new HashSet<HomeworkItem>();
        }
        public int Id { get; set; }
        public string Theme { get; set; }
        public virtual Attachment File { get; set; }
        public virtual Class Class { get; set; }
        public virtual User Creator { get; set; }
        public virtual Subject Subject { get; set; }
        public virtual ICollection<HomeworkItem> HomeworkItems { get; set; }
        public DateTime TimeOfIssue { get; set; }
        public DateTime ToTime { get; set; }
    }
}
