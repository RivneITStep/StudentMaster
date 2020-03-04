using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentMaster.API.Hubs.models
{
    public class ChatMessage
    {
        public string message { get; set; }
        public string senderId { get; set; }
        public string ownerId { get; set; }
        public string senderAvatar { get; set; }
        public string date { get; set; }
        public string senderPib { get; set; }
        public string color { get; set; }
    }
}
