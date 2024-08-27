using Asp_Lect3_HW.Data;
using Asp_Lect3_HW.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Asp_Lect3_HW.Controllers
{
    public class ProductsController(TempDBContext dBContext) : Controller
    {
        // GET: ProductController
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var products = await dBContext.Products.ToListAsync();
            return View(products);
        }

        // GET: ProductController/Details/5
        public async Task<IActionResult> Details(int id)
        {
            var item = await dBContext.Products.FirstOrDefaultAsync(b => b.Id == id);
                if (item is null)
            {
                return NotFound($"Page Not Found");
            }
            return View(item);

        }

        // GET: ProductController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: ProductController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Product product)
        {
            if (ModelState.IsValid)
            {
                try
                {

                    var result = await dBContext.Products.AddAsync(product);
                    await dBContext.SaveChangesAsync();
                    return RedirectToAction(nameof(Index));

                }
                catch
                {
                    return View();
                }
            }
            else
            {
                return RedirectToAction(nameof(Index));
            }
        }

        [HttpGet]
        // GET: ProductController/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id is null)
            {
                return NotFound($"Page Not Found");
            }
            var item = await dBContext.Products.FindAsync(id);
            if (item is null)
            {
                return NotFound($"Page Not Found");
            }
            return View(item);
        }

        // POST: ProductController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Product product)
        {
            if (!dBContext.Products.Any(o => o.Id == product.Id))
            {
                return NotFound($"page not found");
            }

            if (ModelState.IsValid)
            {
                var respons = dBContext.Products.Update(product);
                await dBContext.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            else
            {
                return View(product);
            }
        }
        [HttpGet]
        // GET: ProductController/Delete/5
        public async Task<ActionResult> Delete(int id)
        {
            var item = await dBContext.Products.FirstOrDefaultAsync(b => b.Id == id);
            if (item is null)
            {
                return NotFound($"Page Not Found");
            }
            return View(item);
        }

        // POST: ProductController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(int id,bool varification)
        {
            if (!dBContext.Products.Any(o => o.Id == id))
            {
                return NotFound($"item not found");
            }
            var item = await dBContext.Products.FindAsync(id);
            if (item is null)
            {
                return NotFound($"Page Not Found");
            }
            var respons = dBContext.Products.Remove(item);
            await dBContext.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
    }
}
