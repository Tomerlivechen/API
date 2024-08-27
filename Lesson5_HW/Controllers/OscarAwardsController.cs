using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Lesson5_HW.Data;
using Lesson5_HW.Models;

namespace Lesson5_HW.Controllers
{
    public class OscarAwardsController : Controller
    {
        private readonly Context _context;

        public OscarAwardsController(Context context)
        {
            _context = context;
        }

        // GET: OscarAwards
        public async Task<IActionResult> Index()
        {
            var context = _context.OscarAward.Include(o => o.Movie);
            return View(await context.ToListAsync());
        }

        // GET: OscarAwards/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var oscarAward = await _context.OscarAward
                .Include(o => o.Movie)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (oscarAward == null)
            {
                return NotFound();
            }

            return View(oscarAward);
        }

        // GET: OscarAwards/Create
        public IActionResult Create()
        {
            ViewData["MovieId"] = new SelectList(_context.Movie, "Id", "Title");
            return View();
        }

        // POST: OscarAwards/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Type,year,MovieId")] OscarAward oscarAward)
        {
            if (ModelState.IsValid)
            {
                _context.Add(oscarAward);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["MovieId"] = new SelectList(_context.Movie, "Id", "Title", oscarAward.MovieId);
            return View(oscarAward);
        }

        // GET: OscarAwards/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var oscarAward = await _context.OscarAward.FindAsync(id);
            if (oscarAward == null)
            {
                return NotFound();
            }
            ViewData["MovieId"] = new SelectList(_context.Movie, "Id", "Title", oscarAward.MovieId);
            return View(oscarAward);
        }

        // POST: OscarAwards/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Type,year,MovieId")] OscarAward oscarAward)
        {
            if (id != oscarAward.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(oscarAward);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!OscarAwardExists(oscarAward.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["MovieId"] = new SelectList(_context.Movie, "Id", "Title", oscarAward.MovieId);
            return View(oscarAward);
        }

        // GET: OscarAwards/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var oscarAward = await _context.OscarAward
                .Include(o => o.Movie)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (oscarAward == null)
            {
                return NotFound();
            }

            return View(oscarAward);
        }

        // POST: OscarAwards/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var oscarAward = await _context.OscarAward.FindAsync(id);
            if (oscarAward != null)
            {
                _context.OscarAward.Remove(oscarAward);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool OscarAwardExists(int id)
        {
            return _context.OscarAward.Any(e => e.Id == id);
        }
    }
}
