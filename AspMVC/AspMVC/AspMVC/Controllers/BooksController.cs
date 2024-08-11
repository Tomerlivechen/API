using AspMVC.Models;
using Microsoft.AspNetCore.Mvc;

namespace AspMVC.Controllers
{
    public class BooksController : Controller
    {
        private static List<BookViewItem> BookList = [
    new BookViewItem() {
        id = 1,
        Title = "C# Programming Basics",
        Description = "An introductory guide to C# programming.",
        Author = "John Doe",
        Published = new DateTime(2020, 5, 1)
    },
    new BookViewItem(){
        id = 2,
        Title = "Advanced Algorithms",
        Description = "A deep dive into complex algorithms and data structures.",
        Author = "Jane Smith",
        Published = new DateTime(2021, 10, 15)
    },
    new BookViewItem(){
        id = 3,
        Title = "Machine Learning with Python",
        Description = "A practical guide to implementing machine learning algorithms using Python.",
        Author = "Alice Johnson",
        Published = new DateTime(2019, 3, 22)
    },
    new BookViewItem(){
        id = 4,
        Title = "Modern Web Development",
        Description = "Exploring the latest trends and technologies in web development.",
        Author = "Bob Brown",
        Published = new DateTime(2022, 7, 30)
    },
    new BookViewItem(){
        id = 5,
        Title = "Data Science Fundamentals",
        Description = "Understanding the core concepts of data science.",
        Author = "Emma White",
        Published = new DateTime(2018, 11, 10)

}];
        public IActionResult Index()
        {
            return View(BookList);
        }

        public IActionResult Details(int id)
        {
            return View(BookList.FirstOrDefault(b=>b.id == id));
        }

    }
}
