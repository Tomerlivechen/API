
using AspMVC_L1_HW.Models;
using Microsoft.EntityFrameworkCore;
namespace AspMVC_L1_HW.Data



{
    public class Lect2DBContext(DbContextOptions<Lect2DBContext> options) : DbContext(options)
    {
        public DbSet<Person> People { get; set; }

        public DbSet<Dog> Dogs { get; set; }
    }
}
