using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using HW_Lesson_6.Data;
using HW_Lesson_6.Models;

namespace HW_Lesson_6.Controllers
{
    public class UserRolesController : Controller
    {
        private readonly DataBaseContext _context;

        public UserRolesController(DataBaseContext context)
        {
            _context = context;
        }

        // GET: UserRoles
        public async Task<IActionResult> Index()
        {
            return View(await _context.UserRoles.ToListAsync());
        }

        // GET: UserRoles/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var userRoles = await _context.UserRoles
                .FirstOrDefaultAsync(m => m.UserId == id);
            if (userRoles == null)
            {
                return NotFound();
            }

            return View(userRoles);
        }

        // GET: UserRoles/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: UserRoles/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("UserId,RoleId")] UserRoles userRoles)
        {
            if (ModelState.IsValid)
            {
                _context.Add(userRoles);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(userRoles);
        }

        // GET: UserRoles/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var userRoles = await _context.UserRoles.FindAsync(id);
            if (userRoles == null)
            {
                return NotFound();
            }
            return View(userRoles);
        }

        // POST: UserRoles/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("UserId,RoleId")] UserRoles userRoles)
        {
            if (id != userRoles.UserId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(userRoles);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!UserRolesExists(userRoles.UserId))
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
            return View(userRoles);
        }

        // GET: UserRoles/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var userRoles = await _context.UserRoles
                .FirstOrDefaultAsync(m => m.UserId == id);
            if (userRoles == null)
            {
                return NotFound();
            }

            return View(userRoles);
        }

        // POST: UserRoles/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var userRoles = await _context.UserRoles.FindAsync(id);
            if (userRoles != null)
            {
                _context.UserRoles.Remove(userRoles);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool UserRolesExists(int id)
        {
            return _context.UserRoles.Any(e => e.UserId == id);
        }
    }
}
