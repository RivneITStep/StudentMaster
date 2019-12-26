using System.Collections.Generic;

namespace StudentMaster.DAL.Entities
{
    public class Class
    {
        public Class()
        {
            this.UserClasses = new HashSet<UserClasses>();
            this.ClassSubjects = new HashSet<ClassSubject>();
            this.Students = new HashSet<User>();
            this.Schedule = new HashSet<Schedule>();
            this.HomeWorks = new HashSet<HomeWork>();
        }
        // public int @class { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<UserClasses> UserClasses { get; set; }
        public virtual ICollection<ClassSubject> ClassSubjects { get; set; }
        public virtual ICollection<User> Students { get; set; }
        public virtual ICollection<Schedule> Schedule { get; set; }
        public virtual ICollection<HomeWork> HomeWorks { get; set; }
    }
}
