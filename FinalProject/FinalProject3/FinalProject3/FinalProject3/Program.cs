
using FinalProject2.Auth;
using FinalProject3.Auth;
using FinalProject3.Data;
using FinalProject3.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace FinalProject3
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddDbContext<FP3Context>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("FP2Context") ?? throw new InvalidOperationException("Connection string 'FP2Context' not found.")));
            Utils.setupIdentity(builder);
            Utils.setupJwt(builder);


        //    builder.Services.Configure<JWTSettings>(builder.Configuration.GetSection("JwtSettings"));
            builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();
            //jwt setup
        //    var jwtsettings = builder.Configuration.GetSection("JwtSettings");
            // auth setup
        //    builder.Services.AddAuthentication(options =>
        //    {
        //        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        //        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        //    }).AddJwtBearer(options =>
        //    {
        //        options.TokenValidationParameters = new TokenValidationParameters
        //        {
        //            ValidateIssuer = true,
        //            ValidateAudience = true,
         //           ValidIssuer = jwtsettings["Issuer"],
        //            ValidAudience = jwtsettings["Audience"],
       //             IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtsettings["SecretKey"]))
        //        };
       //     }
       //      );
            // Add services to the container.


            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            var corsPolicy = "CorsPolicy";
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: corsPolicy, policy =>
                {
                    policy.WithOrigins([
                        "http://localhost:3000",
                        "http://localhost:5173",
                        "http://localhost:5174",
                        //host
                        ]).AllowAnyHeader().AllowAnyMethod().AllowCredentials();

                });
            });
            var app = builder.Build();
            app.UseCors(corsPolicy);

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
