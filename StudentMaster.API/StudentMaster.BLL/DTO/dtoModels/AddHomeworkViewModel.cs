using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace StudentMaster.BLL.DTO.dtoModels
{
    public class AddHomeWorkViewModel
    {
        public int classId { get; set; }
        public string Theme { get; set; }
        public int subjectId { get; set; }
        public IFormFile file { get; set; }
        public DateTime toTime { get; set; }
    }
}
