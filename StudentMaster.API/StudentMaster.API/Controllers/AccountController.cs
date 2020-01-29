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
        public AccountController(IFileService fileService)
        {
            this._fileService  = fileService ?? throw new ArgumentNullException(nameof(fileService));
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

        [HttpGet("reset-password-request/{data}")]
        public async Task<IActionResult> resetPasswordRequest(string data)
        {
            return BadRequest(ErrorHelper.GetException("Test", "error"));
        }
    }
}