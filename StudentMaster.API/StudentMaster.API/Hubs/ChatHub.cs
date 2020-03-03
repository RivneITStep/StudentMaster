using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentMaster.API.Hubs
{
    public class ChatHub: Hub
    {

        // Отправка сообщений
        public void Send(string name, string message)
        {
            //Clients.All.SendAsync();
        }


  
    }
}
