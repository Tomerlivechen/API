using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using FinalProject1.Data;
using Microsoft.AspNetCore.Identity;
using FinalProject1.Models;

namespace FinalProject1
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var lockoutOptions = new LockoutOptions()
            {
                AllowedForNewUsers = false,
                DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5),
                MaxFailedAccessAttempts = 5
            };

            var builder = WebApplication.CreateBuilder(args);

            // Configure DbContext with SQL Server
            builder.Services.AddDbContext<FPContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("FPContext")
                    ?? throw new InvalidOperationException("Connection string 'FPContext' not found.")));

            // Configure Identity services
            builder.Services.AddIdentity<User, Role>(options =>
            {
                options.User.RequireUniqueEmail = true;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 6;
                options.Lockout = lockoutOptions;
            })
            .AddEntityFrameworkStores<FPContext>()  
            .AddDefaultTokenProviders();


            builder.Services.ConfigureApplicationCookie(options =>
            {
                options.LoginPath = "/Auth/Login";
            });




            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseAuthorization();
            app.UseAuthentication();

            app.MapControllers();

            app.Run();
        }
    }
}
