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
        private readonly IRepository<Ban> _banRepository;

        public ChatHub(IRepository<User> userRepository, IRepository<DAL.Entities.ChatMessage> chatRepository, UserManager<User> userManager, IRepository<Ban> banRepository)
        {
            _userRepository = userRepository;
            _chatRepository = chatRepository;
            _userManager = userManager;
            _banRepository = banRepository;
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
                date = DateTime.Now,
                message = msg.message,
                ownerId = msg.ownerId,
                senderId = msg.senderId,
            });
            await Clients.Caller.SendAsync("ReciveMessage", msg);
            await Clients.User(userId).SendAsync("ReciveMessage", msg);
            await getContacts(userId);
            await getContacts(Context.User.Identity.Name);
        }
        [Authorize]
        public async Task SwitchGroup(int category)
        {
            if (category < 1)
                category = _userRepository.GetQueryable(x => x.Id == Context.User.Identity.Name).Include(x => x.myClass).FirstOrDefault().myClass.Id;

            await this.Groups.AddToGroupAsync(Context.ConnectionId, category.ToString()) ;

        }

        [Authorize]
        public async Task BanUser(string uid, string minutes, string reason)
        {
            var role = await getRoleAsync(Context.User.Identity.Name);
            if (role == "User")
                await Clients.User(Context.User.Identity.Name).SendAsync("ReciveMessage", new models.ChatMessage()
                {
                    color = "red",
                    date = DateTime.Now.ToShortDateString(),
                    message = "You dont have permisions!",
                    senderPib = "StudentMasterBot",
                    senderId = "StudentMasterBot",
                });
            else
            {
                var ban = _banRepository.GetQueryable(x => x.userId == uid).FirstOrDefault();
                if (ban == null)
                {
                    this._banRepository.Add(new Ban()
                    {
                        userId = uid,
                        DateOfBan = DateTime.Now,
                        Reason = reason,
                        To = DateTime.Now.AddMinutes(Convert.ToInt32(minutes)),
                    });
                }
                else
                {
                    ban.DateOfBan = DateTime.Now;
                    ban.Reason = reason;
                    ban.To = DateTime.Now.AddMinutes(Convert.ToInt32(minutes));
                    _banRepository.Edit(ban);
                }
                await Clients.User(Context.User.Identity.Name).SendAsync("ReciveMessage", new models.ChatMessage()
                {
                    color = "red",
                    date = DateTime.Now.ToShortDateString(),
                    message = "User has been banned!",
                    senderPib = "StudentMasterBot",
                    senderId = "StudentMasterBot"
                });
                await Clients.User(uid).SendAsync("ReciveMessage", new models.ChatMessage()
                {
                    color = "red",
                    date = DateTime.Now.ToShortDateString(),
                    message = "You are banned for " + reason + " to " + DateTime.Now.AddMinutes(Convert.ToInt32(minutes)).ToLongTimeString(),
                    senderPib = "StudentMasterBot",
                    senderId = "StudentMasterBot"
                });
            }
        }



        [Authorize]
        public async Task sendMessage(string message, int category)
        {
            //var ban = _banRepository.GetQueryable(x => x.userId == Context.User.Identity.Name).FirstOrDefault();
            //if (ban != null && ban.To.mi)
            //{
            //    await Clients.User(Context.User.Identity.Name).SendAsync("ReciveMessage", new models.ChatMessage()
            //    {
            //        color = "red",
            //        date = DateTime.Now.ToShortDateString(),
            //        message = "You are banned for " + ban.Reason + " to " + ban.To.ToLongTimeString(),
            //        senderPib = "StudentMasterBot",
            //        senderId = "StudentMasterBot"
            //    });
            //}
            //else
            //{

                if (category < 1)
                    category = _userRepository.GetQueryable(x => x.Id == Context.User.Identity.Name).Include(x => x.myClass).FirstOrDefault().myClass.Id;

                var sender = await _userRepository.GetByIdAsync(Context.User.Identity.Name);
                var role = await getRoleAsync(Context.User.Identity.Name);
                var color = "black";
                if (role == "Admin")
                    color = "darkred";
                if (role == "Teacher")
                    color = "mediumvioletred";

                this._chatRepository.Add(new DAL.Entities.ChatMessage()
                {
                    color = color,
                    date = DateTime.Now,
                    message = message,
                    Sender = sender,
                    room = category.ToString(),
                });
                await Clients.Group(category.ToString()).SendAsync("ReciveMessageGroup", new models.ChatMessage()
                {
                    color = color,
                    date = DateTime.Now.ToShortDateString(),
                    message = message,
                    senderId = sender.Id,
                    senderPib = $"{sender.FirstName} {sender.Name} {sender.LastName}",
                    senderAvatar = sender.img
                });
            //}
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
                    date = el.date.ToShortDateString(),
                    message = el.message,
                    ownerId = el.ownerId,
                    senderAvatar = el.Sender.img,
                    senderId = el.senderId,
                    senderPib = $"{el.Sender.FirstName} {el.Sender.Name} {el.Sender.LastName}"
                });
            Clients.User(your_uid).SendAsync("ReciveMessages", result);
        }
        [Authorize]
        public async Task SendAllMessages(int category)
        {
            if (category < 1)
                category = _userRepository.GetQueryable(x => x.Id == Context.User.Identity.Name).Include(x => x.myClass).FirstOrDefault().myClass.Id;
      
            var msgs = _chatRepository.GetQueryable(x=>x.room == category.ToString()).Include(x => x.Sender);
            var result = new HashSet<models.ChatMessage>();
            foreach (var el in msgs)
            {
                result.Add(new models.ChatMessage()
                {
                    color = el.color,
                    date = el.date.ToShortDateString(),
                    message = el.message,
                    senderId = el.senderId,
                    senderPib = $"{el.Sender.FirstName} {el.Sender.Name} {el.Sender.LastName}",
                    senderAvatar = el.Sender.img
                });;
            }
            await this.Clients.Group(category.ToString()).SendAsync("reciveAllMessages", result);
            result.Clear();
        }
        [Authorize]
        public async Task getMyContactsAsync()
        {
            var uid = Context.User.Identity.Name;
            var result = new List<Contact>();

            var msgs = _chatRepository.GetQueryable(x => (x.senderId == Context.User.Identity.Name || x.ownerId == Context.User.Identity.Name) && (x.room == null || x.room == "")).Include(x=>x.Owner).Include(x=>x.Sender).ToList();
            
            msgs.OrderBy(x => x.date);

            var users = new List<User>();

            foreach (var el in msgs)
            {
                if (el.senderId == uid)
                    users.Add(el.Owner);
                else
                    users.Add(el.Sender);
            }

            users.Distinct();
            foreach (var el in users)
                result.Add(new Contact() { id = el.Id, pib = $"{el.FirstName} {el.Name} {el.LastName}", url = el.img });

            foreach (var el in await _userRepository.GetAsync())
            {
                if (result.FirstOrDefault(x=> x.id == el.Id) == null)
                     result.Add(new Contact() { id = el.Id, pib = $"{el.FirstName} {el.Name} {el.LastName}", url = el.img });
            }
               
            result.Distinct();

            await Clients.User(uid).SendAsync("reciveContacts", result);
        }
        public async Task getContacts(string uid)
        {
            var result = new List<Contact>();

            var msgs = _chatRepository.GetQueryable(x => x.senderId == uid || x.ownerId == uid).Include(x => x.Owner).Include(x => x.Sender).ToList();

            msgs.OrderBy(x => x.date);

            var users = new List<User>();

            foreach (var el in msgs)
            {
                if (el.senderId == uid)
                    users.Add(el.Owner);
                else
                    users.Add(el.Sender);
            }

            users.Distinct();
            foreach (var el in users)
                result.Add(new Contact() { id = el.Id, pib = $"{el.FirstName} {el.Name} {el.LastName}", url = el.img });

            foreach (var el in await _userRepository.GetAsync())
            {
                if (result.FirstOrDefault(x => x.id == el.Id) == null)
                    result.Add(new Contact() { id = el.Id, pib = $"{el.FirstName} {el.Name} {el.LastName}", url = el.img });
            }

            result.Distinct();

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
