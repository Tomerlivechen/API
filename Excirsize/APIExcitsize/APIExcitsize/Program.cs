
using APIExcitsize.Authenitcation;
using APIExcitsize.Models;
using APIExcitsize.Repositories;
using APIExcitsize.Services;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using System.Security.Cryptography.Xml;

namespace APIExcitsize
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.Configure<JWTSettings>(builder.Configuration.GetSection("JWTSettings"));
            builder.Services.AddScoped<IJWTTokenService, JWTTokenService>();
            Utilities.setupIdentity(builder);
            Utilities.setupJWT(builder);

            // Add services to the container.
            builder.Services.AddSingleton<IMongoService, MongoService>();
            builder.Services.AddSingleton<IRepository<Product>, ProductRepository>();
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please enter JWT with Bearer into field",
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

        //    app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
