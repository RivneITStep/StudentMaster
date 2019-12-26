using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using StudentMaster.BLL.Helpers;
using StudentMaster.BLL.Interfaces;
using StudentMaster.DAL.Entities;
using StudentMaster.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentMaster.BLL.Services
{
    public class FileService: IFileService
    {
        private readonly IConfiguration _configuration;
        private readonly IHostingEnvironment _env;
        private readonly IRepository<User> _userRepository;
        public FileService(IHostingEnvironment env,
            IConfiguration configuration,
            IRepository<User> userRepository)
        {
            _configuration = configuration;
            _env = env;
            _userRepository = userRepository;
        }

        public async Task<string> saveFile(IFormFile file)
        {
            try
            {
                string fileName = Guid.NewGuid().ToString() + '.' + file.FileName.Split('.').Last();
                string fileDestDir = _env.ContentRootPath;
                fileDestDir = Path.Combine(fileDestDir, _configuration.GetValue<string>("Uploads"));

                string fileSave = Path.Combine(fileDestDir, fileName);

                using (var fileStream = new FileStream(fileSave, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }

                return fileName;

            }
            catch (Exception)
            {
                throw ErrorHelper.GetException("Server couldn't save your image...", "ERROR", "", 500);
            }
        }

        public async Task<string> saveImage(string base64)
        {
            try
            {
                string imageName = Guid.NewGuid().ToString() + ".jpg";
                if (base64.Contains(","))
                {
                    base64 = base64.Split(',')[1];
                }
                var bmp = base64.FromBase64StringToImage();
                string fileDestDir = _env.ContentRootPath;
                fileDestDir = Path.Combine(fileDestDir, _configuration.GetValue<string>("Uploads"));

                string fileSave = Path.Combine(fileDestDir, imageName);
                if (bmp != null)
                {
                    int size = 1200;
                    var image = ImageHelper.CompressImage(bmp, size, size);
                    image.Save(fileSave, ImageFormat.Jpeg);
                }
                return imageName;
            }
            catch (Exception)
            {
                return null;
            }

        }

        public async Task<string> saveProfileImage(string uid, IFormFile file)
        {
            try
            {
                var imgName = await saveFile(file);
                if (string.IsNullOrEmpty(imgName))
                    throw ErrorHelper.GetException("Server couldn't save your image...", "ERROR", "", 500);
                var user = _userRepository.GetById(uid);
                user.img = imgName;
                this._userRepository.Edit(user);
                return "Saved";

            }
            catch (Exception)
            {
                throw ErrorHelper.GetException("Unknown error...", "ERROR", "", 500);
            }
        }


    }
}
