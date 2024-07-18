using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MondoWPF
{
    public class Customer
    {
        public string id { get; set; }
        public string name { get; set; }
        public string address { get; set; }
        public string sirname { get; set; }

        public Customer(string name, string sirname, string address, string? id =null)
        {
            this.name = name;
            this.address = address;
            this.sirname = sirname;
            this.id = id;
        }
    }
}
