using Microsoft.EntityFrameworkCore;
using StudentMaster.BLL.DTO.dtoResults;
using StudentMaster.BLL.Helpers;
using StudentMaster.BLL.Interfaces;
using StudentMaster.DAL.Entities;
using StudentMaster.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StudentMaster.BLL.Services
{
    public class ClassService : IClassService
    {
        private readonly IRepository<Class> _classRepository;

        public ClassService(IRepository<Class> classRepository)
        {
            _classRepository = classRepository;
        }



        public async Task<IEnumerable<studentResult>> getStudentByClassId(int classId)
        {
            var students = new List<studentResult>();
            var pos = 1;
            var @class = (await _classRepository.GetQueryable(x => x.Id == classId).Include(x => x.Students).FirstOrDefaultAsync());

            if (@class == null)
                throw ErrorHelper.GetException("class not found...", "NotFound", "", 404);

            foreach (var el in @class.Students)
            {
                students.Add(new studentResult()
                {
                    id = el.Id,
                    position = pos,
                    pib = el.FirstName + ' ' + el.Name + ' ' + el.LastName
                });
                pos++;
            }
            return students;
        }
    }
}
