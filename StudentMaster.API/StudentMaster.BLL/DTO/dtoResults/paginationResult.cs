using System;
using System.Collections.Generic;
using System.Text;

namespace StudentMaster.BLL.DTO.dtoResults
{
    public class PaginationResult<T>
    {
        public PaginationResult()
        {
            Data = new List<T>();
        }
        public int CurrentPage { get; set; }
        public int CountOfPages { get; set; }
        public ICollection<T> Data { get; set; }
    }
}
