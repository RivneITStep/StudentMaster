using System.Collections.Generic;

namespace StudentMaster.DAL.Entities
{
    public class Ticket
    {
        public Ticket()
        {
            this.Msgs = new HashSet<TicketMSG>();
        }
        public int Id { get; set; }
        public string Topic { get; set; }
        public User Owner { get; set; }
        public virtual ICollection<TicketMSG> Msgs { get; set; }
    }
}
