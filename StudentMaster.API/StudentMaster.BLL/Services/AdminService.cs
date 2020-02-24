using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StudentMaster.BLL.DTO.dtoResults;
using StudentMaster.BLL.Helpers;
using StudentMaster.BLL.Interfaces;
using StudentMaster.DAL.Entities;
using StudentMaster.DAL.Interfaces;
using StudentMaster.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
namespace StudentMaster.BLL.Services
{
    public class AdminService : IAdminService
    {
        private IRepository<Class> _classRepository;

        public AdminService(IRepository<Class> classRepository)
        {
            _classRepository = classRepository;
        }

        public async Task<IEnumerable<myClassResult>> getAllClasses()
        {
            var result = new List<myClassResult>();

            foreach(var el in (await _classRepository.GetAsync()))
            {
                result.Add(new myClassResult() { id = el.Id, name = el.Name });
            }

            return result;
        }
    }
}
