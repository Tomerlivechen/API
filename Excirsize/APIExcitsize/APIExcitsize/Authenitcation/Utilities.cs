using AspNetCore.Identity.Mongo;
using APIExcitsize.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson;
using System.Text;

namespace APIExcitsize.Authenitcation
{
    public static class Utilities
    {
        // Setup JWT Authentication
        public static void setupJWT(WebApplicationBuilder builder)
        {
            var jwtSettings = JWTSettings.NewInstance(); 
            builder.Configuration.GetSection("JWTSettings").Bind(jwtSettings); 

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.SecretKey)), 
                    ValidateIssuer = true,
                    ValidateLifetime = true,
                    ValidateAudience = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSettings.Issuer,
                    ValidAudience = jwtSettings.Audience
                };
            });
        }

        // Setup Identity with MongoDB
        public static void setupIdentity(WebApplicationBuilder builder)
        {
            var connectionString = builder.Configuration.GetConnectionString("MongoDBConnectionStrings"); 

            builder.Services.AddIdentityMongoDbProvider<AppUser, AppRole, ObjectId>(identityOptions =>
            {
                identityOptions.Password.RequireNonAlphanumeric = true;
                identityOptions.Password.RequireUppercase = true;
                identityOptions.Password.RequireLowercase = true;
                identityOptions.Password.RequireDigit = true;
                identityOptions.User.RequireUniqueEmail = true;
                identityOptions.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.,!@#$%^&*()+=";
            }, mongoOptions =>
            {
                mongoOptions.ConnectionString = connectionString; 
            });
        }
    }
}
