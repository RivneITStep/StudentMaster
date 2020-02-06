using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentMaster.BLL.Interfaces;

namespace StudentMaster.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly INewsService _newsService;

        public NewsController(INewsService newsService)
        {
            _newsService = newsService;
        }

        [HttpGet("GET-NEWS")]
        [Authorize]
        public async Task<IActionResult> getNewsAsync()
        {
            return Ok(await _newsService.getNews());
        }

    }
}