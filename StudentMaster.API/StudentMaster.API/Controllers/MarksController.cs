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
    public class MarksController : ControllerBase
    {
        private readonly IMarksService _marksService;
        public MarksController(IMarksService marksService)
        {
            this._marksService = marksService;
        }


        [HttpGet("get-marks-for-chart")]
        [Authorize]
        public async Task<IActionResult> getMarksForChartAsync()
        {
            return Ok(await this._marksService.getMarksForChartByUID(User.Identity.Name));
        }
    }
}