using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentMaster.BLL.DTO.dtoModels;
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

        [HttpGet("get-avarage-marks")]
        [Authorize]
        public async Task<IActionResult> getAverageMarks()
        {
            return Ok(await this._marksService.getMarksSubjects(User.Identity.Name));
        }

        [HttpGet("get-my-marks-by-date/{date}")]
        [Authorize]
        public async Task<IActionResult> getMyMarksByDate(DateTime date)
        {

            return Ok(await _marksService.getMarksByDate(User.Identity.Name, date));
        }
        [HttpPost("get-student-mark-by-subject-and-date")]
        [Authorize(Roles = "Teacher")]
        public async Task<IActionResult> getStudentMarkBySubjectAndDate([FromBody]getStudentMarkByDateAndSubjectViewModel model)
        {
            var mod = model;
  
            return Ok(await this._marksService.getStudentMarkBySubjectAndDate(model, User.Identity.Name));
        }

        [HttpPost("add-mark-for-student")]
        [Authorize(Roles = "Teacher")]
        public async Task<IActionResult> addMarkForStudent([FromBody]addMarkForStudent model)
        {
           try
            {
                if (await _marksService.addMarkForStudentAsync(model, User.Identity.Name))
                    return Ok(new { msg = "Added" });
                else
                    return BadRequest(new { msg = "Err"});
            }
            catch(Exception e)
            {
                return BadRequest(e.Data["ERROR"]);
            }
        }
    }
}