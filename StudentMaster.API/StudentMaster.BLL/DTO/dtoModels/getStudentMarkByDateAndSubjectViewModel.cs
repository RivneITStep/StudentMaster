using System;


namespace StudentMaster.BLL.DTO.dtoModels
{
    public class getStudentMarkByDateAndSubjectViewModel
    {
        public int subjectId { get; set; }
        public DateTime date { get; set; }
        public string uid { get; set; }
    }
}
