using System;
using System.Collections.Generic;
using System.Text;

namespace StudentMaster.BLL.DTO.dtoResults
{
    public class teacherHomeworkResult
    {
        public int id { get; set; }
        public string pib { get; set; }
        public string file { get; set; }
        public string student_file { get; set; }
        public string theme { get; set; }
        public string subject { get; set; }
    }
}
