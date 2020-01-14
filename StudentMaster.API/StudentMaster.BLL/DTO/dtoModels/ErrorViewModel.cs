using System;
using System.Collections.Generic;
using System.Text;

namespace StudentMaster.BLL.DTO.dtoModels
{
   public class ErrorViewModel
    {
        public int Status { get; set; }
        public string Message { get; set; }
        public string AfterAction { get; set; }
        public string Tag { get; set; }
    }
}
