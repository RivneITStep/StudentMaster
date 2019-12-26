using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using StudentMaster.BLL.Interfaces;
using StudentMaster.BLL.Services;
using StudentMaster.DAL;
using StudentMaster.DAL.Entities;
using StudentMaster.DAL.Interfaces;
using StudentMaster.DAL.Repository;
using System.IO;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Http;

namespace StudentMaster.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public static bool CustomLifetimeValidator(DateTime? notBefore, DateTime? expires, SecurityToken securityToken, TokenValidationParameters validationParameters)
        {
            if (expires != null)
            {
                return DateTime.UtcNow < expires;
            }
            return false;
        }
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();

            services.AddDbContext<DBContext>(options =>
               options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"), b => b.MigrationsAssembly("StudentMaster.API")));
            services.AddDefaultIdentity<User>()
                   .AddRoles<IdentityRole>()
                   .AddEntityFrameworkStores<DBContext>();
        
          
           

            var builder = services.AddIdentityCore<User>(o =>
            {
                // configure identity options
                o.Password.RequireDigit = false;
                o.Password.RequireLowercase = false;
                o.Password.RequireUppercase = false;
                o.Password.RequireNonAlphanumeric = false;
                o.Password.RequiredLength = 6;
            });
            builder = new IdentityBuilder(builder.UserType, typeof(IdentityRole), builder.Services);
            builder.AddEntityFrameworkStores<DBContext>().AddDefaultTokenProviders();
            var KEY = Configuration.GetSection("JWT").GetValue<string>("KEY");
            // Debug.WriteLine(KEY);
            var SSK = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                   .AddJwtBearer(options =>
                   {
                       options.RequireHttpsMetadata = false;
                       options.TokenValidationParameters = new TokenValidationParameters
                       {
                           ValidateIssuer = true,
                           ValidIssuer = Configuration.GetSection("JWT").GetValue<string>("ISSUER"), // AuthOptions.ISSUER,
                           ValidateAudience = true,
                           ValidAudience = Configuration.GetSection("JWT").GetValue<string>("AUDIENCE"), // AuthOptions.AUDIENCE,
                           ValidateLifetime = true,
                           LifetimeValidator = CustomLifetimeValidator,
                           IssuerSigningKey = SSK,
                           ValidateIssuerSigningKey = true,
                       };
                   });
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "StudentMaster's API", Version = "0.0.1 BETA" });
            });

            services.AddCors();

            services.AddSingleton<IConfiguration>(Configuration);
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IJWTService, JWTService>();
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped<IClassService, ClassService>();
            services.AddScoped<IFileService, FileService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }


            app.UseStaticFiles();

            string path = Path.Combine(env.ContentRootPath, "Uploads");
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);
            FileExtensionContentTypeProvider provider = new FileExtensionContentTypeProvider();
            provider.Mappings[".json"] = "application/json";
            provider.Mappings[".webmanifest"] = "application/manifest+json";
            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(path),
                RequestPath = new PathString("/Images"),
                ContentTypeProvider = provider

            });
            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Open API");
            });
            app.UseHttpsRedirection();

            app.UseRouting();
           

            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
