using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using HW_Lesson_6.Models;
using HW_Lesson_6.ViewModels;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace HW_Lesson_6.Data
{
    public class DataBaseContext(DbContextOptions<DataBaseContext> options) : IdentityDbContext<User, IdentityRole, string>(options)
    {
        public DbSet<HW_Lesson_6.Models.Comment> Comment { get; set; } = default!;
        public DbSet<HW_Lesson_6.Models.Post> Post { get; set; } = default!;
        public DbSet<HW_Lesson_6.Models.Role> Role { get; set; } = default!;
        public DbSet<HW_Lesson_6.Models.User> User { get; set; } = default!;
        public DbSet<HW_Lesson_6.Models.UserRoles> UserRoles { get; set; } = default!;
        public DbSet<HW_Lesson_6.ViewModels.CommentView> CommentView { get; set; } = default!;
    }


}
