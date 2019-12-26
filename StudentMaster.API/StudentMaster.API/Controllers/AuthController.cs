using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentMaster.BLL.DTO.dtoModels;
using StudentMaster.BLL.DTO.dtoResults;
using StudentMaster.BLL.Interfaces;

namespace StudentMaster.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            this._authService = authService;
        }
        [HttpPost]
        public async Task<IActionResult> Authorize(authViewModel model)
        {
            try
            {
                return Ok(await this._authService.AuthorizeAsync(model));
            } catch(Exception e)
            {
               
                return BadRequest(new errorResult()
                {
                    action = "",
                    message = e.Message,
                    status = 400,
                    tag = "Error"
                });
            }
        }
        [HttpPost]
        public async Task<IActionResult> Refresh(refreshViewModel model)
        {
            try
            {
                return Ok(await this._authService.Refresh(model));
            } catch(Exception e)
            {
                return BadRequest(new errorResult()
                {
                    action = "relogin",
                    message = e.Message,
                    status = 400,
                    tag = "Error"
                });
            }
        }

    }
}