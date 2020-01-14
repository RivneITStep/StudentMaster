using System;
using System.Collections.Generic;
using System.Text;

namespace StudentMaster.BLL.DTO.dtoModels
{
   public class ReturnHomeWorksViewModel
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public string Theme { get; set; }
        public string Path { get; set; }
        public string Date { get; set; }
        public string Todate { get; set; }
    }
}
