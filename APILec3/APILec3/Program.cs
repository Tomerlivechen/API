
using APILec3.Models;
using APILec3.Repository;
using APILec3.Sevices;

namespace APILec3
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddSingleton<IMongoService, MongoService>();
            builder.Services.AddSingleton<IMovieRepository, MovieRepository>();
            builder.Services.AddSingleton<IMongoService, ToDoService>();
            builder.Services.AddSingleton<IRepository<T>, ToDoRepository<To_Do>>();
            builder.Services.AddSingleton < IRepository<T>, GeneralRepository<T>();

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
