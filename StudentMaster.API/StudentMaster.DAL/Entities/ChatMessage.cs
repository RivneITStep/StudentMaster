using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StudentMaster.DAL.Entities
{
    public class ChatMessage
    {
        public int Id { get; set; }
        public string message { get; set; }
        public string ownerId { get; set; }
        [ForeignKey("ownerId")]
        public User Owner { get; set; }

        public string senderId { get; set; }
        [ForeignKey("senderId")]
        public User Sender { get; set; }
        public string color { get; set; }
        public string date { get; set; }
    }
}
