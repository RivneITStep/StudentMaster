using System;
using System.Collections.Generic;
using System.Text;

namespace StudentMaster.BLL.DTO.dtoResults
{
    public class errorResult
    {
        public int status { get; set; }
        public string message { get; set; }
        public string action { get; set; }
        public string tag { get; set; }
    }
}