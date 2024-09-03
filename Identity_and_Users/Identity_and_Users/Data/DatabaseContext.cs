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
    }
}
