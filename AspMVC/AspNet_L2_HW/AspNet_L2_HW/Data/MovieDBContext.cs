using AspNet_L2_HW.Models;
using Microsoft.EntityFrameworkCore;

namespace AspNet_L2_HW.Data
{
    public class MovieDBContext(DbContextOptions<MovieDBContext> options):DbContext(options)
    {
        public DbSet<Movie> Movies {  get; set; }
    }
}
