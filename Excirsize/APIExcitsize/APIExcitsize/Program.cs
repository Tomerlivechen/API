
using APIExcitsize.Authenitcation;
using APIExcitsize.Extensions;
using APIExcitsize.Models;
using APIExcitsize.Repositories;
using APIExcitsize.Services;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using System.Security.Cryptography.Xml;
using System.Text;

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
            var allowdOrogins = "allowdOrogins";
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: allowdOrogins, policy => {
                    policy.WithOrigins("http://localhost:5173", "http://localhost:3000");
                    policy.AllowAnyMethod();
                    policy.AllowAnyHeader();
                    policy.AllowCredentials();
                });
            });
            var app = builder.Build();

            app.UseCors(allowdOrogins);
            app.UseStaticFiles();
            //middlewere loggers
            //app.Use( (context, Next) => { 
            //    var logger = context.RequestServices.GetService<ILogger<Program>>();
            //    logger?.LogInformation("Logged the request");
            //    logger?.LogInformation($"{context.Request.Path}");
            //    logger?.LogInformation($"{context.Request.Method}");


            //    return Next(context); });


            //app.Use(async(context, Next) =>
            //{
            //    StringBuilder sBuilder = new StringBuilder();
            //    sBuilder.Append(context.Request.Method).Append("&").Append(context.Request.Path);
            //    await Next();
            //    sBuilder.Append(';').Append(context.Response.StatusCode);
            //    Console.WriteLine((sBuilder.ToString()).BGMagenta().Cyan());
            //} );


            //app.Use(async (context, next) =>
            //{
            //    context.Response.Headers.AccessControlAllowOrigin = "http://localhost:5173";
            //    await next(context);
            //});

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
