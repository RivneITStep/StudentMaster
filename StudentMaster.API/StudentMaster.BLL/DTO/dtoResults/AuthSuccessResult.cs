using System;
using System.Collections.Generic;
using System.Text;

namespace StudentMaster.BLL.DTO.dtoResults
{
    public class AuthSuccessResult
    {
        public string refresh_token { get; set; }
        public string access_token { get; set; }
        public string ava { get; set; }
    }
}
