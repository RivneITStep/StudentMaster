using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentMaster.DAL.Entities
{
    public class HomeworkItem
    {
        public int Id { get; set; }
        public Attachment File { get; set; }
        public string Comment { get; set; }
        public HomeWork HomeWork { get; set; }
        public DateTime Time { get; set; }
    }
}
