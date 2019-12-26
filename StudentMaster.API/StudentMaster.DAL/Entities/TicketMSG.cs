namespace StudentMaster.DAL.Entities
{
    public class TicketMSG
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public User sender { get; set; }
        public bool IsAnswer { get; set; }
    }
}
