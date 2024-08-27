using Asp_Lect3_HW.Models;
using Microsoft.EntityFrameworkCore;
namespace Asp_Lect3_HW.Data
{
    public class TempDBContext(DbContextOptions<TempDBContext> options) : DbContext(options)
    {
        public DbSet<Product> Products { get; set; }
    }
}
