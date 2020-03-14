using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace StudentMaster.BLL.DTO.dtoModels
{
    public class doHomeWorkViewModel
    {
        public int Id { get; set; }
        public IFormFile file { get; set; }

    }
}
