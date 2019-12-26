using StudentMaster.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace StudentMaster.BLL.Interfaces
{
    public interface IJWTService
    {
        string CreateToken(User user);
        string CreateRefreshToken(User user);

        ClaimsIdentity GetIdentity(User user);
    }
}
