using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.SignalR;
using StudentMaster.DAL.Entities;
using StudentMaster.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StudentMaster.API.Hubs.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace StudentMaster.API.Hubs
{
    [EnableCors("signalr")]
    public class ChatHub: Hub
    {
        private readonly IRepository<User> _userRepository;
        private readonly IRepository<StudentMaster.DAL.Entities.ChatMessage> _chatRepository;
        private readonly UserManager<User> _userManager;

        public ChatHub(IRepository<User> userRepository, IRepository<DAL.Entities.ChatMessage> chatRepository, UserManager<User> userManager)
        {
            _userRepository = userRepository;
            _chatRepository = chatRepository;
            _userManager = userManager;
        }

        [Authorize]
        public async Task SendToAsync(string message, string userId)
        {
            var user = await _userRepository.GetByIdAsync(Context.User.Identity.Name);
            var role = await getRoleAsync(user.Id);
            var color = "black";
            if (role == "Admin")
                color = "darkred";
            if (role == "Teacher")
                color = "mediumvioletred";

            var msg = new models.ChatMessage()
            {
                message = message,
                date = DateTime.Now.ToShortDateString(),
                ownerId = userId,
                senderAvatar = user.img,
                senderId = user.Id,
                senderPib = $"{user.FirstName} {user.Name} {user.LastName}",
                color = color,
            };
            _chatRepository.Add(new DAL.Entities.ChatMessage()
            {
                color = msg.color,
                date = msg.date,
                message = msg.message,
                ownerId = msg.ownerId,
                senderId = msg.senderId,
            });
            await Clients.Caller.SendAsync("ReciveMessage", msg);
            await Clients.User(userId).SendAsync("ReciveMessage", msg);
        }

        [Authorize]
        public void getAllMessageWithUser(string uid)
        {
            var your_uid = Context.User.Identity.Name;
            var result = new List<models.ChatMessage>();

            foreach (var el in _chatRepository.GetQueryable(x => x.senderId == your_uid && x.ownerId == uid || x.ownerId == your_uid && x.senderId == uid).Include(x=>x.Sender))
                result.Add(new models.ChatMessage()
                {
                    color = el.color,
                    date = el.date,
                    message = el.message,
                    ownerId = el.ownerId,
                    senderAvatar = el.Sender.img,
                    senderId = el.senderId,
                    senderPib = $"{el.Sender.FirstName} {el.Sender.Name} {el.Sender.LastName}"
                });
            Clients.User(your_uid).SendAsync("ReciveMessages", result);
        }

        [Authorize]
        public async Task getMyContactsAsync()
        {
            var uid = Context.User.Identity.Name;
            var result = new List<Contact>();

            foreach (var el in await _userRepository.GetAsync())
                result.Add(new Contact() { id = el.Id,  pib = $"{el.FirstName} {el.Name} {el.LastName}", url = el.img});
            await Clients.User(uid).SendAsync("reciveContacts", result);
        }

        private async Task<string> getRoleAsync(string uid)
        {
          var roles = await _userManager.GetRolesAsync(await _userManager.FindByIdAsync(uid));
            if (roles.Contains("Admin"))
                return "Admin";
            if (roles.Contains("Teacher"))
                return "Teacher";
            return "User";
        }

    }
}
