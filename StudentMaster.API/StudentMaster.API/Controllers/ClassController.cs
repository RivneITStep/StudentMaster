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
    }
}