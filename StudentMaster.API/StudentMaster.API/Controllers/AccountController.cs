using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentMaster.BLL.DTO;
using StudentMaster.BLL.DTO.dtoModels;
using StudentMaster.BLL.Helpers;
using StudentMaster.BLL.Interfaces;

namespace StudentMaster.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IFileService _fileService;
        private readonly IEmailService _emailService;
        private readonly IAccountService _accountService;

        public AccountController(IFileService fileService, IEmailService emailService, IAccountService accountService)
        {
            _fileService = fileService;
            _emailService = emailService;
            _accountService = accountService;
        }

        [HttpPost("change-avatar-image")]
        [Authorize]
        public async Task<IActionResult> changeAvatarAsync([FromBody]base64ViewModel model)
        {
            try
            {
                await this._fileService.saveProfileImage(User.Identity.Name, model.base64);
                return Ok();
            } catch (Exception e)
            {
                return BadRequest(e.Data["ERROR"]);
            }
            
           
        }
        [HttpGet("send-test-message-on-email/{email}")]
        public async Task<IActionResult> sendTestMessageOnEmailAsync(string email)
        {
            try
            {
                await this._emailService.SendEmailAsync(email, "Hello " + email, "Something went wrong:(", "Bot is online", "");
                return Ok(new { msg = "ok" });
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("reset-password-request/{data}")]
        public async Task<IActionResult> resetPasswordRequest(string data)
        {
            try
            {
                if (await this._accountService.sendConfirmCodeOnEmailAsync(data))
                    return Ok(new { msg = "OK" });
                else 
                    return BadRequest();
            } catch(Exception e)
            {
                return BadRequest(e.Data["ERROR"]);
            }
        }


        [HttpGet("check-confirm-code/{data}/{code}")]
        public async Task<IActionResult> checkConfirmCodWithEmail(string data, int code)
        {
            try
            {
                if (await this._accountService.checkConfirmCodeWithEmail(data, code))
                    return Ok(new { msg = "OK" });
                else
                    return BadRequest();
            }
            catch (Exception e)
            {
                return BadRequest(e.Data["ERROR"]);
            }
        }

        [HttpGet("change-password-without-password/{data}/{code}/{password}")]
        public async Task<IActionResult> checkConfirmCodWithEmail(string data, int code, string password)
        {
            try
            {
                if (await this._accountService.changePasswordWithoutOldPassword(data, password, code))
                    return Ok(new { msg = "Password has been changed" });
                else
                    return BadRequest();
            }
            catch (Exception e)
            {
                return BadRequest(e.Data["ERROR"]);
            }
        }
        [HttpGet("get-my-classes")]
        [Authorize]
        public async Task<IActionResult> getMyClasses()
        {
            return Ok(await _accountService.getMyClasses(User.Identity.Name));
        }
    }
}