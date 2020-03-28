using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace StudentMaster.DAL.Entities
{
    public class Ban
    {
        public int Id { get; set; }
        public string Reason { get; set; }
        public DateTime To { get; set; }
        public DateTime DateOfBan { get; set; }
        public string userId { get; set; }
        [ForeignKey("userId")]
        public User User { get; set; }

    }
}
