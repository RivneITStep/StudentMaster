using System;
using System.Collections.Generic;
using System.Text;

namespace StudentMaster.BLL.DTO.dtoModels
{
    public class addMarkForStudent
    {
        public string uid { get; set; }
        public string type { get; set; }
        public int subjectId { get; set; }
        public int mark { get; set; }
        public DateTime date { get; set; }
    }
}
