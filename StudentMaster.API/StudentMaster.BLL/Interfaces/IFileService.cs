using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StudentMaster.BLL.Interfaces
{
    public interface IFileService
    {
        Task<string> saveFile(IFormFile file);
        Task<string> saveProfileImage(string uid, IFormFile file);
        Task<string> saveImage(string base64);
    }
}
