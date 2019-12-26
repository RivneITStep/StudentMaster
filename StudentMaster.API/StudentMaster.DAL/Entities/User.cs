using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace StudentMaster.DAL.Entities
{
    public class User : IdentityUser
    {
        public User()
        {
            this.UserClasses = new HashSet<UserClasses>();
            this.teacherSubjects = new HashSet<TeacherSubject>();
        }
        public string Login { get; set; }
        // public string Role { get; set; }
        public string FirstName { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public virtual Class myClass { get; set; }
        public string img { get; set; }
        //Teach classes!
        public virtual ICollection<UserClasses> UserClasses { get; set; }
        public virtual ICollection<TeacherSubject> teacherSubjects { get; set; }
    }
}
