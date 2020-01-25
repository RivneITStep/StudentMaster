using System;
using System.Collections.Generic;
using System.Text;

namespace StudentMaster.BLL.DTO.dtoResults
{
    public class marksForChartResult
    {
        public marksForChartResult()
        {
            dates = new List<string>();
            marks = new List<MarksForChart>();
        }
        public List<string> dates { get; set; }
        public List<MarksForChart> marks { get; set; }
    }



    public class MarksForChart
    {
        public MarksForChart()
        {
            data = new List<int>();
        }
        public string name { get; set; }
        public List<Int32> data { get; set; }
    }
}
