namespace APIExcitsize.Models
{
    public class JWTSettings
    {
        public required string SecretKey { get; set; }
        public required string Issuer { get; set; }
        public required string Audience { get; set; }

        //Factory method
        public static JWTSettings NewInstance() => new() { Audience = "", Issuer = "", SecretKey = "" };
    }
}
