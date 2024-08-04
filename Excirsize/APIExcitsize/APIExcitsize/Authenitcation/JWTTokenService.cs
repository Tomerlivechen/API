
using APIExcitsize.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace APIExcitsize.Authenitcation
{
    public class JWTTokenService : IJWTTokenService 
    {
        private readonly JWTSettings _jwtSettings; 
        public JWTTokenService(IOptions<JWTSettings> options) 
        {
            _jwtSettings = options.Value; 
        }

        public async Task<string> CreateToken(AppUser user)
        {
            if (user == null || user.UserName == null) 
            {
                throw new ArgumentNullException(nameof(user)); 
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName) 
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey)); 
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                notBefore: DateTime.Now,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}