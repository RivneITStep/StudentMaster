using System.Collections.Generic;

namespace StudentMaster.DAL.Entities
{
    public class Subject
    {
        public Subject()
        {
            this.teacherSubjects = new HashSet<TeacherSubject>();
            this.ClassSubjects = new HashSet<ClassSubject>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public bool isDeleted { get; set; }
        public virtual ICollection<TeacherSubject> teacherSubjects { get; set; }
        public virtual ICollection<ClassSubject> ClassSubjects { get; set; }
    }
}
