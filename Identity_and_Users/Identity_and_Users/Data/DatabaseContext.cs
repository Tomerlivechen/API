using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Identity_and_Users.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Identity_and_Users.Data
{
    public class DatabaseContext(DbContextOptions<DatabaseContext> options) : IdentityDbContext<AppUser, IdentityRole, string>(options)
    {
        public DbSet<Identity_and_Users.Models.Product> Product { get; set; } = default!;


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            
            builder.Entity<IdentityRole>().HasData(
                new IdentityRole() { Id = "1", Name = "Admin" },
                new IdentityRole() { Id = "2", Name = "PowerUser" },
                new IdentityRole() { Id = "3", Name = "User" },
                new IdentityRole() { Id = "4", Name = "Guest" }
                );

            var hasher = new PasswordHasher<AppUser>();
            var user = new AppUser()
            {
                Id = Guid.NewGuid().ToString(),
                UserName = "eee@eee.eee",
                Email = "eee@eee.eee",
                Property = "this Property"
            };

            user.PasswordHash = hasher.HashPassword(user, "qwerty");
            builder.Entity<AppUser>().HasData(user);

            builder.Entity<IdentityUserRole<string>>().HasData( new IdentityUserRole<string> { RoleId = "1" , UserId = user.Id });
        }
    }
}
