using MongoDB.Bson;
using MongoDB.Driver;
using System.Net;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Xml.Linq;

namespace MondoWPF
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public static string connectionString = "mongodb+srv://1tomerlivechen:vwZ4nMAMySAmNZu9@cluster10.kudnej3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster10";

        public static MongoClient client = new MongoClient(connectionString);

        public static IMongoDatabase database = client.GetDatabase("Tirgul");

        public static IMongoCollection<BsonDocument> collection = database.GetCollection<BsonDocument>("Customers");

        public List<TextBox> inputsNoID = new List<TextBox>();
        public MainWindow()
        {
            InitializeComponent();
            inputsNoID.Add(Input_Name);
            inputsNoID.Add(Input_Sirname);
            inputsNoID.Add(Input_Address);
        }


        private void AddUser_Click(object sender, RoutedEventArgs e)
        {
            if (FoolProofing.CheckCellsFilled(inputsNoID))
            {
                List<string> strings = FoolProofing.GetTextOfTextBoxes(inputsNoID);
                Customer customer = new Customer(strings[0], strings[1], strings[2]);
                collection.InsertOneAsync(MondoStatics.customerToBson(customer));
                FoolProofing.ClearTextBoxes(inputsNoID);
                MessageBox.Show("Customer Added");
            }
        }

        private void UpdateUser_Click(object sender, RoutedEventArgs e)
        {
            if (FoolProofing.CheckCellsFilled(inputsNoID))
            {
                List<string> strings = FoolProofing.GetTextOfTextBoxes(inputsNoID);
                FilterDefinition<BsonDocument> filter = MondoStatics.Mongofilter(strings[0]);
                UpdateDefinition<BsonDocument> sirname = MondoStatics.MongoupdateSirname(strings[1]);
                UpdateDefinition<BsonDocument> adress = MondoStatics.MongoupdateAddress(strings[2]);
                collection.UpdateOneAsync(filter, sirname);
                collection.UpdateOneAsync(filter, adress);
                FoolProofing.ClearTextBoxes(inputsNoID);
                MessageBox.Show("Customer updated");
            }

        }

        private void GetUser_Click(object sender, RoutedEventArgs e)
        {

        }

        private void DeleteUser_Click(object sender, RoutedEventArgs e)
        {
            if (FoolProofing.CheckCellFilled(Input_Name))
            {
                FilterDefinition<BsonDocument> filter = MondoStatics.Mongofilter(Input_Name.Text);
                var deleteResult = collection.DeleteOne(filter);
                MessageBox.Show("Customer deleted");
            }
        }

        private void GetUserByName_Click(object sender, RoutedEventArgs e)
        {
            if (FoolProofing.CheckCellFilled(Input_Name))
            {
                FilterDefinition<BsonDocument> filter = MondoStatics.Mongofilter(Input_Name.Text);
                List<Customer> customerlist = new List<Customer>();
                var people = collection.Find(filter).ToList();
                foreach (var person in people) {
                    Customer customer = new Customer(person[1].ToString(), person[2].ToString(), person[3].ToString());
                    customerlist.Add(customer);
                }
                Input_Sirname.Text = customerlist[0].sirname;
                Input_Address.Text = customerlist[0].address;
            }
        }

        private void Getallusers_Click(object sender, RoutedEventArgs e)
        {
            FilterDefinition<BsonDocument> filter = FilterDefinition<BsonDocument>.Empty;
            List<Customer> customerlist = new List<Customer>();

            var people = collection.Find(filter).ToList();
            foreach (var person in people)
            {
                Customer customer = new Customer(person[1].ToString(), person[2].ToString(), person[3].ToString(), person[0].ToString());
                customerlist.Add(customer);
            }
            myTable.ItemsSource = customerlist;
        }

    }
}