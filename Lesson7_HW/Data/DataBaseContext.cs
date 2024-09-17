using Lesson7_HW.Models;
using Microsoft.EntityFrameworkCore;

namespace Lesson7_HW.Data
{
    public class DataBaseContext(DbContextOptions<DataBaseContext> options) : DbContext(options)
    {
        public DbSet<Comment> comments { get; set; } = default!;
        public DbSet<Comment> Post { get; set; } = default!;
        public DbSet<Comment> Role { get; set; } = default!;
        public DbSet<Comment> User { get; set; } = default!;

        public DbSet<UserRoles> UserRoles { get; set; } = default!;
        
    }
}
