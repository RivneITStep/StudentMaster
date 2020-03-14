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
    public class HomeWorkController : ControllerBase
    {
        private readonly IHomeworkService _homeworkService;
        public HomeWorkController(IHomeworkService homeworkService)
        {
            this._homeworkService = homeworkService;
        }

        [HttpPost("add-homework")]
        [Authorize(Roles = "Teacher")]
        public async Task<IActionResult> AddHomeWorkAsync([FromForm]AddHomeWorkViewModel model)
        {
            Thread.Sleep(2000);
            var result = await this._homeworkService.addHomeworkAsync(User.Identity.Name, model);
            if (result == "done")
                return Ok(new { msg = "added" });
            if (result == "userNotFound")
                  return BadRequest(new ErrorViewModel()
                {
                    Tag = result,
                    Message = "You not found:(",
                    Status = 404
                });
            if (result == "classNotFound")
                return BadRequest(new ErrorViewModel()
                {
                    Tag = result,
                    Message = "Class not found:(",
                    Status = 404
                });
            if (result == "errorSaveImg")
                return BadRequest(new ErrorViewModel()
                {
                    Tag = result,
                    Message = "Server can't save file:(",
                    Status = 404
                });
            if (result == "subjectNotFound")
                return BadRequest(new ErrorViewModel()
                {
                    Tag = result,
                    Message = "Subject not found:(",
                    Status = 404
                });
            return BadRequest(new ErrorViewModel()
            {
                Tag = "internalServerError",
                Message = "Internal server error! :(",
                Status = 500
            });
        


    }
        [HttpGet("get-my-homeworks")]
        [Authorize]
        public IActionResult getMyHomeworks()
        {
            var result = this._homeworkService.getMyHomeworks(User.Identity.Name);
            return Ok(result);
        }



        [HttpGet("remove-my-homework/{wid}")]
        [Authorize]
        public IActionResult removeMyWork(int wid)
        {
            this._homeworkService.removeWork(User.Identity.Name, wid);
            return Ok(new { msg = "Done"});
        }

        [HttpGet("get-teacher-homeworks")]
        [Authorize]
        public IActionResult getTeacherHomeworks()
        {
            var result = this._homeworkService.getTeacherHomeworks(User.Identity.Name);
            return Ok(result);
        }
        [HttpGet("review-homework/{wid}/{mark}")]
        [Authorize]
        public IActionResult getTeacherHomeworks(int wid, int mark)
        {
            this._homeworkService.reviewHomework(User.Identity.Name,wid,mark);
            return Ok(new { msg = "Done" });
        }

        [HttpPost("do-homework")]
        [Authorize(Roles = "Teacher")]
        public async Task<IActionResult> doHomeWorkAsync([FromForm]doHomeWorkViewModel model)
        {
            try
            {
               await _homeworkService.doHomeworkAsync(User.Identity.Name, model);
                return Ok();
            } catch (Exception e)
            {
                return BadRequest(e.Data["ERROR"]);
            }
        }


    }
}