using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Lesson5_HW.Data;
using Lesson5_HW.Models;
using System.Numerics;

namespace Lesson5_HW.Controllers
{
    public class MoviesController : Controller
    {
        private readonly Context _context;

        public MoviesController(Context context)
        {
            _context = context;
        }

        // GET: Movies
        public async Task<IActionResult> Index()
        {
            return View(await _context.Movie.ToListAsync());
        }

        // GET: Movies/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            ViewBag.DirectorList = await _context.Director.ToListAsync();
            ViewBag.Actors = await _context.Actor.ToListAsync();
            ViewBag.Awards = await _context.OscarAward.ToListAsync();
            if (id == null)
            {
                return NotFound();
            }

            var movie = await _context.Movie
                .FirstOrDefaultAsync(m => m.Id == id);
            if (movie == null)
            {
                return NotFound();
            }

            return View(movie);
        }

        // GET: Movies/Create
        public async Task<IActionResult> Create()
        {
            ViewBag.DirectorList = await _context.Director.ToListAsync();
            ViewBag.Actors = await _context.Actor.ToListAsync();
            ViewBag.Awards = await _context.OscarAward.ToListAsync();
            return View();
        }

        // POST: Movies/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Title,DirectorId,ActorId,AwardId")] Movie movie)
        {
            

            if (ModelState.IsValid)
            {
                Director director = await _context.Director.FindAsync(movie.DirectorId);
                director?.Movies?.Add(movie);
                movie.Director = director;
                List<Actor> Actors = await _context.Actor.ToListAsync();
                List<OscarAward> Awards = await _context.OscarAward.ToListAsync();
                if (movie.ActorId is not null && Actors is not null)
                {
                    foreach (int actor in movie.ActorId)
                    {
                        Actor item = Actors.Find(a => a.Id == actor);
                        movie.Actors?.Add(item);
                        item?.Movies?.Add(movie);


                    }
                }
                if (movie.AwardId is not null && Awards is not null)
                {
                    foreach (int award in movie.AwardId)
                    {
                        OscarAward item = Awards.Find(a => a.Id == award);
                        movie.Awards?.Add(item);
                        item.Movie=movie;
                    }
                }
                _context.Add(movie);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewBag.DirectorList = await _context.Director.ToListAsync();
            ViewBag.Actors = await _context.Actor.ToListAsync();
            ViewBag.Awards = await _context.OscarAward.ToListAsync();
            return View(movie);
        }

        // GET: Movies/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            ViewBag.DirectorList = await _context.Director.ToListAsync();
            ViewBag.Actors = await _context.Actor.ToListAsync();
            ViewBag.Awards = await _context.OscarAward.ToListAsync();
            if (id == null)
            {
                return NotFound();
            }

            var movie = await _context.Movie.Include(m => m.Director)
        .Include(m => m.Actors)
        .Include(m => m.Awards)
        .FirstOrDefaultAsync(m => m.Id == id);
            if (movie == null)
            {
                return NotFound();
            }
            return View(movie);
        }

        // POST: Movies/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Title,DirectorId,ActorId,AwardId")] Movie movie)
        {

            if (id != movie.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                    try
                    {
                        var existingMovie = await _context.Movie
                            .Include(m => m.Director)
                            .Include(m => m.Actors)
                            .Include(m => m.Awards)
                            .FirstOrDefaultAsync(m => m.Id == id);

                        if (existingMovie == null)
                        {
                            return NotFound();
                        }

                        // Update properties
                        existingMovie.Title = movie.Title;
                        existingMovie.DirectorId = movie.DirectorId;

                    if (movie.DirectorId != existingMovie.DirectorId)
                    {
                        var newDirector = await _context.Director.FindAsync(movie.DirectorId);
                        if (newDirector != null)
                        {
                            existingMovie.Director = newDirector;
                            newDirector.Movies ??= new List<Movie>();
                            newDirector.Movies.Add(existingMovie);
                        }
                    }

                    existingMovie.ActorId ??= [];
                    movie.ActorId ??= [];
                    List<int> toAdd;
                    List<int> toRemove;
                    List<Actor> allActors = await _context.Actor.ToListAsync();
                        toAdd = movie.ActorId.Except(existingMovie.ActorId).ToList();
                        toRemove = existingMovie.ActorId.Except(movie.ActorId).ToList();
                    
                    movie.ActorId = toAdd;

                    foreach (int actorId in toRemove)
                    {
                        var actor = allActors.Find(a => a.Id == actorId);
                            actor.Movies?.Remove(existingMovie);
                            movie.Actors?.Remove(actor);
                    }
                    foreach (int actorId in toAdd)
                    {
                        var actor = allActors.Find(a => a.Id == actorId);
                        movie.Actors?.Add(actor);
                        actor?.Movies?.Add(movie);                  
                    }
                    existingMovie.AwardId ??= [];
                    movie.AwardId ??= [];
                    List<OscarAward> allAwards = await _context.OscarAward.ToListAsync();
                    List<int> toAddAward = movie.AwardId.Except(existingMovie.AwardId).ToList();
                    List<int> toRemoveAward = existingMovie.AwardId.Except(movie.AwardId).ToList();
                    movie.AwardId = toAddAward;
                    foreach (int awardId in toRemoveAward)
                    {
                        var award = allAwards.Find(a => a.Id == awardId);
                        award.Movie = null;
                        movie.Awards?.Remove(award);
                    }
                    foreach (int AwardId in toAddAward)
                    {
                        var award = allAwards.Find(a => a.Id == AwardId);
                        movie.Awards?.Add(award);
                        award.Movie = movie;
                    }

                     _context.Entry(existingMovie).State = EntityState.Detached;
                    // Save changes
                    _context.Update(movie);
                    await _context.SaveChangesAsync();

                    return RedirectToAction(nameof(Index));

                }
                    catch (DbUpdateConcurrencyException)
                    {
                        if (!MovieExists(movie.Id))
                        {
                            return NotFound();
                        }
                        else
                        {
                            throw;
                        }
                    }
                
            }

            ViewBag.DirectorList = await _context.Director.ToListAsync();
            ViewBag.Actors = await _context.Actor.ToListAsync();
            ViewBag.Awards = await _context.OscarAward.ToListAsync();
            return View(movie);
        }

        // GET: Movies/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var movie = await _context.Movie
                .FirstOrDefaultAsync(m => m.Id == id);
            if (movie == null)
            {
                return NotFound();
            }

            return View(movie);
        }

        // POST: Movies/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var movie = await _context.Movie.FindAsync(id);
            if (movie != null)
            {
                _context.Movie.Remove(movie);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool MovieExists(int id)
        {
            return _context.Movie.Any(e => e.Id == id);
        }
    }
}
