using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentMaster.BLL.Interfaces;

namespace StudentMaster.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService  _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet("get-all-classes")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> getAllClasses()
        {
            Thread.Sleep(1000);
    
            return Ok(await _adminService.getAllClasses());
        }

        [HttpGet("invite-user/{email}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> inviteUser(string email)
        {
            Thread.Sleep(1000);
            try
            {
                if (await _adminService.inviteUser(email))
                    return Ok(new { msg = "Ok" });
                else
                    return BadRequest();
            }
            catch (Exception e)
            {

                return BadRequest(e.Data["ERROR"]);
            }
        }
        [HttpGet("invite-user/{email}/{classId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> inviteUser(string email, int classId)
        {
            Thread.Sleep(1000);
            try
            {
                if (await _adminService.inviteUser(email, classId))
                    return Ok(new { msg = "Ok" });
                else
                    return BadRequest();
            }
            catch (Exception e)
            {

                return BadRequest(e.Data["ERROR"]);
            }

        }

        [HttpGet("remove-student-from-class/{studentId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> removeStudentFromClass(string studentId)
        {
            Thread.Sleep(1000);
            try
            {
                if (await _adminService.removeStudentFromClass(studentId))
                    return Ok(new { msg = "Ok" });
                else
                    return BadRequest();
            }
            catch (Exception e)
            {

                return BadRequest(e.Data["ERROR"]);
            }

        }

        [HttpGet("edit-subjects-in-class/{classId}/{subjectId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> editSubjectsInClass(int classId, int subjectId)
        {
            try
            {
                if (await _adminService.editSubjectsInClass(classId, subjectId))
                    return Ok(new { msg = "Ok" });
                else
                    return BadRequest();
            }
            catch (Exception e)
            {

                return BadRequest(e.Data["ERROR"]);
            }

        }
        [HttpGet("get-all-subjects")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> getAllSubjects()
        {

            return Ok(await _adminService.getAllSubjects());
        }
        [HttpGet("get-class-subjects/{classId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> getClassSubjects(int classId)
        {

            return Ok(await _adminService.getClassSubjects(classId));
        }
    }
}