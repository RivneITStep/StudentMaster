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
        Task<string> saveProfileImage(string uid, string base64);
        Task<string> saveImage(string base64);
    }
}
