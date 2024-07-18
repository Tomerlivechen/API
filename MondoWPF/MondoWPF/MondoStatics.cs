using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MondoWPF
{
    public static class MondoStatics
    {

        public static BsonDocument customerToBson(Customer customer)
        {
            BsonDocument p2 = new BsonDocument
            {
                {"name",customer.name },
                {"sirname",customer.sirname },
                {"address",customer.address }
            };
            return p2;
        }

        public static BsonDocument person(string name, int age)
        {
            BsonDocument person = new BsonDocument
            {
                {"name","name" },
                {"age",age }
            };
            return person;
        }




        public static FilterDefinition<BsonDocument> Mongofilter(string name)
        {
            return Builders<BsonDocument>.Filter.Eq("name", name);
        }

        public static UpdateDefinition<BsonDocument> MongoupdateSirname(string sirname)
        {
            return Builders<BsonDocument>.Update.Set("sirname", sirname);
        }

        public static UpdateDefinition<BsonDocument> MongoupdateAddress(string Address)
        {
            return Builders<BsonDocument>.Update.Set("address", Address);
        }

    }
}
