namespace StudentMaster.DAL.Entities
{
    public class UserClasses
    {
        public string UserId { get; set; }
        public User User { get; set; }

        public int ClassId { get; set; }
        public Class Class { get; set; }
    }
}
