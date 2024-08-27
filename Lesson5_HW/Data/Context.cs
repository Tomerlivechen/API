using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Lesson5_HW.Models;

namespace Lesson5_HW.Data
{
    public class Context(DbContextOptions<Context> options) : DbContext(options)
    {
        public DbSet<Actor> Actor { get; set; } = default!;
        public DbSet<Director> Director { get; set; } = default!;
        public DbSet<Lesson5_HW.Models.Movie> Movie { get; set; } = default!;
        public DbSet<Lesson5_HW.Models.OscarAward> OscarAward { get; set; } = default!;
    }
}
