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
    public class ClassController : ControllerBase
    {
        private readonly IClassService _classServie;

        public ClassController(IClassService classServie)
        {
            _classServie = classServie;
        }


        [HttpGet("get-students-by-class-id/{classId}")]
        [Authorize] //(Roles = "Teacher Admin")]
        public async Task<IActionResult> getStudentsByClassIdAsync(int classId)
        {
            try
            {
                return Ok(await _classServie.getStudentByClassId(classId));
            } catch(Exception e)
            {

                return BadRequest(e.Data["ERROR"]);
            }
        }
        
        [HttpGet("get-subject-for-teacher-by-class-id/{classId}")]
        [Authorize (Roles = "Teacher")]
        public async Task<IActionResult> getSubjectsForTeacherByClassId(int classId)
        {
        
                return Ok(await _classServie.getTeacherClassSubjcets(User.Identity.Name, classId));
           
            //catch (Exception e)
            //{
            //
            //    return BadRequest(e.Data["ERROR"]);
            //}
        }
        [HttpGet("get-classmates")]
        [Authorize]
        public async Task<IActionResult> getClassmatesAsync()
        {
            try
           {
                return Ok(await _classServie.getStudentsFromClassByStudentId(User.Identity.Name));
           } catch(Exception e)
            {
                return BadRequest(e.Data["ERROR"]);
            }
         
        }
        [HttpGet("get-schedule")]
        [Authorize]
        public async Task<IActionResult> getSchedule()
        {
            try
            {
                return Ok(await _classServie.GetSchedule(User.Identity.Name));
            }
            catch (Exception e)
            {
                return BadRequest(e.Data["ERROR"]);
            }
        }


    }
}