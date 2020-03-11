﻿using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StudentMaster.BLL.DTO.dtoModels;
using StudentMaster.BLL.DTO.dtoResults;
using StudentMaster.BLL.Helpers;
using StudentMaster.BLL.Interfaces;
using StudentMaster.DAL.Entities;
using StudentMaster.DAL.Interfaces;
using StudentMaster.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StudentMaster.BLL.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<User> _userManager;
        private readonly IEmailService _emailService;
        private readonly IRandomService _randromService;
        private readonly IRepository<ConfirmCode> _confirmCodeRepository;
        private readonly IRepository<UserClasses> _teacherClassesRepository;
        private readonly IRepository<User> _userRepository;

        public AccountService(UserManager<User> userManager, IEmailService emailService, IRandomService randromService, IRepository<ConfirmCode> confirmCodeRepository, IRepository<UserClasses> teacherClassesRepository, IRepository<User> userRepository)
        {
            _userManager = userManager;
            _emailService = emailService;
            _randromService = randromService;
            _confirmCodeRepository = confirmCodeRepository;
            _teacherClassesRepository = teacherClassesRepository;
            _userRepository = userRepository;
        }

        public async Task<bool> changePasswordWithoutOldPassword(string email, string password, int code)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                var old_code = await _confirmCodeRepository.GetQueryable(x => x.UserID == user.Id && x.IsUsed == false && x.Code == code && x.CreationTime.AddMinutes(15) >= DateTime.Now).FirstOrDefaultAsync();
                if(old_code == null)
                    throw ErrorHelper.GetException("Code isn't valid!", "400", "", 400);

                old_code.IsUsed = true;
                this._confirmCodeRepository.Edit(old_code);

                var token = await _userManager.GeneratePasswordResetTokenAsync(user);

                var result = await _userManager.ResetPasswordAsync(user, token, password);

                if (result.Succeeded)
                    return true;

                else
                    throw ErrorHelper.GetException("Password isn't valid!", "400", "", 400);
            }
            else
            {
                throw ErrorHelper.GetException("User not found", "404", "", 404);
            }
        }

        public async Task<bool> checkConfirmCodeWithEmail(string email, int code)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                var old_code = await _confirmCodeRepository.GetQueryable(x => x.UserID == user.Id && x.IsUsed == false && x.Code == code && x.CreationTime.AddMinutes(15) >= DateTime.Now).FirstOrDefaultAsync();
                if (old_code != null)
                {
                    return true;
                }
                  
                else
                    throw ErrorHelper.GetException("Code is wrong! Try again!", "400", "", 400);
            }
            else
            {
                throw ErrorHelper.GetException("User not found", "404", "", 404);
            }
        }

        public async Task<bool> createAccount(registerViewModel model)
        {
            var code = (await _confirmCodeRepository.GetQueryable(x => x.Code == model.code && x.IsUsed == false).Include(x => x.user).FirstOrDefaultAsync());
            
            if (code == null)
                throw ErrorHelper.GetException("Code is wrong! Try again!", "400", "", 400);
            var user = code.user;
            if (user == null)
                throw ErrorHelper.GetException("User not found", "404", "", 404);

            user.LastName = model.lastname;
            user.FirstName = model.firstName;
            user.Name = model.name;
            user.Login = model.username;
            user.EmailConfirmed = true;
            var result = await _userManager.AddPasswordAsync(user, model.password);
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "User");
                _userRepository.Edit(user);
                code.IsUsed = true;
                _confirmCodeRepository.Edit(code);
                return true;
            } else
                throw ErrorHelper.GetException("We couldn't save your account!", "400", "", 400);

        }

        public async Task<IEnumerable<myClassResult>> getMyClasses(string uid)
        {
            var result = new List<myClassResult>();
            foreach(var el in await _teacherClassesRepository.GetQueryable(x => x.UserId == uid && x.Class.isDeleted == false).Include(x => x.Class).Include(x => x.Class).ToListAsync())
            {
                result.Add(new myClassResult() { id = el.Class.Id, name = el.Class.Name });
            }

            return result;
        }

        public async Task<bool> sendConfirmCodeOnEmailAsync(string email)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(email);
                if (user != null)
                {
                    var code = _randromService.RandomNumber(100000, 999999);
                    var old_code = _confirmCodeRepository.GetQueryable(x => x.UserID == user.Id);
                    this._confirmCodeRepository.Add(new ConfirmCode()
                    {
                        Code = code,
                        CreationTime = DateTime.Now,
                        user = user,
                    });
                    await this._emailService.SendEmailAsync(email, "confirm code", "Your confirm code: ", user.Login, code.ToString());

                    return true;
                } else
                {
                    throw ErrorHelper.GetException("User not found", "404", "", 404);
                }
            } catch(Exception)
            {
                throw ErrorHelper.GetException("User not found", "404","",404);
            }
            
        }
    }
}
