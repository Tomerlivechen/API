namespace AspnAPI.Models.DTO
{
    public class dUser()

    {

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public int Age { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public dUser(string firstName, string lastName, int age, string email, string password) : this()
        {

            FirstName = firstName;
            LastName = lastName;
            Age = age;
            Email = email;
            Password = password;
        }
    }
}
