using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FinalProject2.Data;
using FinalProject2.Models;
using FinalProject2.Mapping;
using FinalProject2.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace FinalProject2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController(FP2Context context, UserManager<User> userManager) : ControllerBase
    {
        private readonly FP2Context _context = context;

        // GET: api/Posts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostDisplay>>> GetPost()
        {
            return await _context.Post.Select(p => p.ToDisplay()).ToListAsync();
        }

        // GET: api/Posts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PostDisplay>> GetPost(string id)
        {
            var post = await _context.Post.FindAsync(id);

            if (post == null)
            {
                return NotFound();
            }

            return post.ToDisplay();
        }

        // PUT: api/Posts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutPost(string id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }
            if (ModelState.IsValid)
            {
                _context.Entry(post).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PostExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }

            return NoContent();
        }

        // POST: api/Posts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Post>> PostPost(PostNew post)
        {
            if (ModelState.IsValid)
            {
                _context.Post.Add(await post.NewPostToPost(userManager));
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateException)
                {
                    if (PostExists(post.Id))
                    {
                        return Conflict();
                    }
                    else
                    {
                        throw;
                    }
                }
            }

            return CreatedAtAction("GetPost", new { id = post.Id }, post);
        }

        // DELETE: api/Posts/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeletePost(string id)
        {
            var post = await _context.Post.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            _context.Post.Remove(post);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PostExists(string id)
        {
            return _context.Post.Any(e => e.Id == id);
        }
    }
}
