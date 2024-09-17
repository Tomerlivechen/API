using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using FinalProject2.Data;
using Microsoft.AspNetCore.Identity;
using FinalProject2.Models;
using FinalProject2.Auth;

namespace FinalProject2
{
    public class Program
    {
        public static void Main(string[] args)
        {

            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddDbContext<FP2Context>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("FP2Context") ?? throw new InvalidOperationException("Connection string 'FP2Context' not found.")));
            Utils.setupIdentity(builder);
            Utils.setupJwt(builder);


            builder.Services.Configure<JWTSettings>(builder.Configuration.GetSection("JwtSettings"));
            builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();

            // Add services to the container.

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
            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
