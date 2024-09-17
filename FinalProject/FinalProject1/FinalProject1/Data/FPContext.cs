using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using FinalProject1.Models;

namespace FinalProject1.Data
{
    public class FPContext(DbContextOptions<FPContext> options) : DbContext(options)
    {
        public DbSet<Post> Post { get; set; } = default!;
        public DbSet<Comment> PComment { get; set; } = default!;
    }
}
