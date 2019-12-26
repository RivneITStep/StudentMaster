using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using StudentMaster.BLL.DTO.dtoModels;
using StudentMaster.BLL.DTO.dtoResults;
using StudentMaster.BLL.Interfaces;
using StudentMaster.DAL.Entities;
using StudentMaster.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace StudentMaster.BLL.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly IJWTService _jWTService;
        private readonly IRepository<RefreshToken> _refreshTokens;
        private readonly IConfiguration _configuration;
        public AuthService(UserManager<User> userManager, IJWTService jWTService, IRepository<RefreshToken> refreshTokens, IConfiguration configuration)
        {
            _userManager = userManager;
            _jWTService = jWTService;
            _refreshTokens = refreshTokens;
            _configuration = configuration;
        }
        public async Task<AuthSuccessResult> AuthorizeAsync(authViewModel model)
        {
            var user = await this._userManager.FindByEmailAsync(model.email);
            if (user == null)
                throw new Exception("User not found");

            var isLoggined = await this._userManager.CheckPasswordAsync(user, model.password);
            if (!isLoggined)
                throw new Exception("Password is wrong");

            var access_token = this._jWTService.CreateToken(user);
            var refresh_token = this._jWTService.CreateRefreshToken(user);
            var ava = user.img;

        
            return new AuthSuccessResult()
            {
                access_token = access_token,
                refresh_token = refresh_token,
                ava = ava
            };
            
        }

        public async Task<AuthSuccessResult> Refresh(refreshViewModel model)
        {
            var token = await _refreshTokens.GetQueryable(x => x.Token == model.refresh).Include(x=>x.User).FirstOrDefaultAsync();
            var refresh_time = _configuration.GetSection("JWT").GetValue<int>("REFRESH_LIFETIME");

            if (token == null)
                throw new Exception("We can't find your token...");

            if(token.ToLife.AddMinutes(refresh_time) <= DateTime.Now)
                throw new Exception("Refresh token is expired...");

            var handler = new JwtSecurityTokenHandler();
            var decrypt_token = handler.ReadJwtToken(model.token);
            
            if (decrypt_token.Claims.FirstOrDefault(x => x.Type == ClaimsIdentity.DefaultNameClaimType).Value != token.User.Id)
                throw new Exception("Unknown error...");

            return new AuthSuccessResult()
            {
                access_token = _jWTService.CreateToken(token.User),
                refresh_token = _jWTService.CreateRefreshToken(token.User),
                ava = token.User.img
            };


        }
    }
}
