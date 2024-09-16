using FinalProject3.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;

namespace FinalProject3.Data
{
    public class FP3Context(DbContextOptions<FP3Context> options) : IdentityDbContext<IdentityUser>(options)
    {
        public DbSet<Post> Post { get; set; } = default!;

        public DbSet<Comment> Comment { get; set; } = default!;
        protected override void OnModelCreating(ModelBuilder builder)
        {

            base.OnModelCreating(builder);
            builder.Entity<IdentityUserRole<string>>()
             .HasOne<IdentityUser>()
              .WithMany()
             .HasForeignKey(ur => ur.UserId)
             .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<IdentityUserRole<string>>()
                .HasOne<IdentityRole>()
                .WithMany()
                .HasForeignKey(ur => ur.RoleId)
                .OnDelete(DeleteBehavior.Restrict);


            builder.Entity<IdentityRole>().HasData(
    new IdentityRole() { Id = "1", Name = "Admin", NormalizedName = "ADMIN", ConcurrencyStamp = Guid.NewGuid().ToString() }
    );
            var hasher = new PasswordHasher<User>();
            var user = new User()
            {
                Id = Guid.NewGuid().ToString(),
                Email = "TomerLiveChen@gmail.com",
                NormalizedEmail = "TOMERLIVECHEN@GMAIL.COM",
                UserName = "SysAdmin",
                NormalizedUserName = "SYSADMIN",
                Prefix = "Dr",
                First_Name = "Tomer",
                Last_Name = "Chen",
                Pronouns = "They",
                ImageURL = "https://i.imgur.com/1nKIWjB.gif",
                PremissionLevel = "Admin",
                ConcurrencyStamp = Guid.NewGuid().ToString(),
                SecurityStamp = Guid.NewGuid().ToString(),

            };
            user.PasswordHash = hasher.HashPassword(user, "qwerty");
            builder.Entity<User>().HasData(user);

            builder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string> { RoleId = "1", UserId = user.Id });

        }


    }
}
