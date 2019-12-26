using System;

namespace StudentMaster.DAL.Entities
{
    public class Mark
    {
        public int Id { get; set; }
        public int Value { get; set; }
        public string Comment { get; set; }
        public User Owner { get; set; }
        public User Teacher { get; set; }
        public Subject Subject { get; set; }
        public string Type { get; set; }
        public DateTime Date { get; set; }
    }
}
