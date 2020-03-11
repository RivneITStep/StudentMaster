using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.SignalR;
using StudentMaster.API.Hubs.models;
using StudentMaster.BLL.Interfaces;
using StudentMaster.BLL.Services;
using StudentMaster.DAL.Entities;
using StudentMaster.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace StudentMaster.API.Hubs
{
    [EnableCors("signalr")]
    public class ConsoleHub: Hub
    {
        List<Command> commands;
        private readonly IClassService _classService;
        private readonly IAdminService _adminService;
        public ConsoleHub(IClassService classService, IAdminService adminService)
        {
            this.commands = new List<Command>();
            _classService = classService;
            _adminService = adminService;
            commands.Add(new Command() { command = "/help", description = "'see all commands | Список команд'" });
            commands.Add(new Command() { command = "/add-class class_name", description = "'create a new class | Створити новий клас'" });
            commands.Add(new Command() { command = "/remove-class class_name", description = "'remove a class | Видалити клас'" });
            commands.Add(new Command() { command = "/rollback-class class_name", description = "'rollback a class | Відновити клас'" });
            commands.Add(new Command() { command = "/change-class-name old_name new_name", description = "'edit class name | Змінити назву класу.'" });
            commands.Add(new Command() { command = "/add-subject subject_name", description = "'create a new subject | Додати предмет'" });
            commands.Add(new Command() { command = "/edit-subject subject_name new_subject_name", description = "'edit a subject | Змінити назву предмета'" });
            commands.Add(new Command() { command = "/rollback-subject subject_name", description = "'rollback a subject | Відновити предмет'" });
            commands.Add(new Command() { command = "/remove-subject subject_name", description = "'remove a subject | Видалити предмет'" });
        }

        [Authorize(Roles = "Admin")]
        public async Task Execute(string command)
        {
            var cmd = command.Split(' ');
            await sendMessageAsync($"The command [ {command} ] was received. | Команду [ {command} ] отримано. Опрацьовуємо... :)", "orange");

            Thread.Sleep(500);

            if (cmd[0].ToLower() == "/help")
            {
               
                foreach (var el in commands)
                {
                    var msg = el.command + " | " + el.description;
                    await sendMessageAsync(msg);
                }
              
            }
            else 
            if (cmd[0].ToLower() == "/add-class")
            {
                if (String.IsNullOrEmpty(cmd[1]))
                    await sendMessageAsync($"Class name can't be null", "red");
                try
                {
                    _classService.createClass(cmd[1]);
                    await sendMessageAsync("Class has been created!");
                } catch (Exception)
                {
                    await sendMessageAsync($"Class name [" + cmd[1] + "] is used", "red");
                }
            }
            else
            if (cmd[0].ToLower() == "/remove-class")
            {
                if (String.IsNullOrEmpty(cmd[1]))
                    await sendMessageAsync($"Class name can't be null", "red");
                try
                {
                    _classService.removeClass(cmd[1]);
                    await sendMessageAsync("Class has been removed!");
                }
                catch (Exception)
                {
                    await sendMessageAsync($"Class name [" + cmd[1] + "] not found", "red");
                }
            }
            else
            if (cmd[0].ToLower() == "/rollback-class")
            {
                if (String.IsNullOrEmpty(cmd[1]))
                    await sendMessageAsync($"Class name can't be null", "red");
                try
                {
                    _classService.rollbackClass(cmd[1]);
                    await sendMessageAsync("Class has been updated!");
                }
                catch (Exception)
                {
                    await sendMessageAsync($"Class name [" + cmd[1] + "] not found", "red");
                }
            }
            else
            if (cmd[0].ToLower() == "/change-class-name")
            {
                if (String.IsNullOrEmpty(cmd[1] + cmd[2]))
                    await sendMessageAsync($"Class name can't be null", "red");
                try
                {
                    _classService.changeNameClass(cmd[1], cmd[2]);
                    await sendMessageAsync("Class has been updated!");
                }
                catch (Exception)
                {
                    await sendMessageAsync($"Class name [" + cmd[1] + "] not found", "red");
                }
            }
            else
            if (cmd[0].ToLower() == "/add-subject")
            {
                if (String.IsNullOrEmpty(cmd[1]))
                    await sendMessageAsync($"Subject name can't be null", "red");
                try
                {
                    _adminService.createSubject(cmd[1]);
                    await sendMessageAsync("Subject has been created!");
                }
                catch (Exception)
                {
                    await sendMessageAsync($"Subject name [" + cmd[1] + "] is used", "red");
                }
            }
            else
            if (cmd[0].ToLower() == "/remove-subject")
            {
                if (String.IsNullOrEmpty(cmd[1]))
                    await sendMessageAsync($"Subject name can't be null", "red");
                try
                {
                    _adminService.createSubject(cmd[1]);
                    await sendMessageAsync("Subject has been removed!");
                }
                catch (Exception)
                {
                    await sendMessageAsync($"Subject name [" + cmd[1] + "] not found", "red");
                }
            }
            else
            if (cmd[0].ToLower() == "/rollback-subject")
            {
                if (String.IsNullOrEmpty(cmd[1]))
                    await sendMessageAsync($"Subject name can't be null", "red");
                try
                {
                    _adminService.rollbackSubject(cmd[1]);
                    await sendMessageAsync("Subject has been updated!");
                }
                catch (Exception)
                {
                    await sendMessageAsync($"Subject name [" + cmd[1] + "] not found", "red");
                }
            }
            else
            if (cmd[0].ToLower() == "/edit-subject")
            {
                if (String.IsNullOrEmpty(cmd[1] + cmd[2]))
                    await sendMessageAsync($"Subject name can't be null", "red");
                try
                {
                    _adminService.changeNameSubject(cmd[1], cmd[2]);
                    await sendMessageAsync("Subject has been updated!");
                }
                catch (Exception)
                {
                    await sendMessageAsync($"Subject name [" + cmd[1] + "] not found", "red");
                }
            }
            else
            if (cmd[0].ToLower() == "/ping")
            {
                await sendMessageAsync("Pong", "orange");
            }
            else
            {
                    await sendMessageAsync($"Command {cmd[0]} not found...", "red");
                    await sendMessageAsync($"Try to use '/help' for see all commands", "red");
            }
        }
        public async Task sendMessageAsync(string message, string color = "magenta") {

            var msg = new models.ChatMessage()
            {
                color = color,
                date = DateTime.Now.ToLongDateString(),
                message = message,
                senderPib = "@console"
            };
            await Clients.User(Context.User.Identity.Name).SendAsync("reciveCmd", msg);
        }
    }
}
