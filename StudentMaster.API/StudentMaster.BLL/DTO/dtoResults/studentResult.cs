﻿using System;
using System.Collections.Generic;
using System.Text;

namespace StudentMaster.BLL.DTO.dtoResults
{
    public class studentResult
    {
        public int position { get; set; }
        public string id { get; set; }
        public string pib { get; set; }

        public bool isTeacher { get; set; }
        public bool isStudent { get; set; }
    }
}
