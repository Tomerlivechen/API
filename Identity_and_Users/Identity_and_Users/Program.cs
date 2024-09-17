using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Identity_and_Users.Data;
using Identity_and_Users.Models;
using Microsoft.AspNetCore.Identity;
namespace Identity_and_Users
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
            builder.Services.AddDbContext<DatabaseContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DatabaseContext") ?? throw new InvalidOperationException("Connection string 'DatabaseContext' not found.")));

            builder.Services.AddIdentity<AppUser, IdentityRole>(options => {

                options.User.RequireUniqueEmail = true;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 6;
                options.Lockout = lockoutOptions;
            })
      .AddEntityFrameworkStores<DatabaseContext>();

            builder.Services.ConfigureApplicationCookie(options =>
            {
                options.LoginPath = "/Auth/Login";
            });

            // Add services to the container.
            builder.Services.AddControllersWithViews();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            app.Run();
        }
    }
}
