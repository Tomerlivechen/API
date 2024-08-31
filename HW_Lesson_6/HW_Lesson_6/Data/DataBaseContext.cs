using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using HW_Lesson_6.Models;
using HW_Lesson_6.ViewModels;

namespace HW_Lesson_6.Data
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext (DbContextOptions<DataBaseContext> options)
            : base(options)
        {
        }

        public DbSet<HW_Lesson_6.Models.Comment> Comment { get; set; } = default!;
        public DbSet<HW_Lesson_6.Models.Post> Post { get; set; } = default!;
        public DbSet<HW_Lesson_6.Models.Role> Role { get; set; } = default!;
        public DbSet<HW_Lesson_6.Models.User> User { get; set; } = default!;
        public DbSet<HW_Lesson_6.Models.UserRoles> UserRoles { get; set; } = default!;
        public DbSet<HW_Lesson_6.ViewModels.CommentView> CommentView { get; set; } = default!;
    }
}
