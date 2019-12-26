using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentMaster.BLL.DTO;
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
            _fileService = fileService;
        }

        [HttpPost("change-avatar-image")]
        [Authorize]
        public async Task<IActionResult> changeAvatarAsync([FromForm]fileViewModel model)
        {
            try
            {
                return Ok(await this._fileService.saveProfileImage(User.Identity.Name, model.file));
            } catch (Exception e)
            {
                return BadRequest(e.Data["ERROR"]);
            }
            
           
        }
    }
}