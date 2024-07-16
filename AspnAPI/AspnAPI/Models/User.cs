using AspnAPI.Models.DTO;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using MongoDB.Libmongocrypt;
using System.Text.Json.Serialization;
using System.Security.Cryptography;

namespace AspnAPI.Models
{
    public class User()
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        
        public int Age { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        [BsonConstructor]
        public User(string id, string firstName, string lastName, int age, string email, string password):this()
        {
            Id =id;
            FirstName = firstName;
            LastName = lastName;
            Age = age;
            Email = email;
            Password = password;
        }


        public User(BsonDocument bson) : this()
        {
            _ = int.TryParse(bson[3].ToString(), out int age);

            Id = bson[0].ToString();
            FirstName = bson[1].ToString();
            LastName = bson[2].ToString();
            Age = age;
            Email = bson[4].ToString();
            Password = bson[5].ToString();
        }

        public User(dUser duser) : this()
        {
            Id = Guid.NewGuid().ToString();
            FirstName = duser.FirstName;
            LastName = duser.LastName;
            Age = duser.Age;
            Email = duser.Email;
            Password = duser.Password;
        }

        public static User replceUser(User user, dUser duser)
        {
            User newUser = new User();
            newUser.Id = user.Id;
            newUser.FirstName = duser.FirstName;
            newUser.LastName = duser.LastName;
            newUser.Age = duser.Age;
            newUser.Email = duser.Email;
            newUser.Password = duser.Password;

            return user;
        }
    }
}
