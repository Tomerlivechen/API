using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FinalProject1.Data;
using FinalProject1.Models;
using Microsoft.AspNetCore.Authorization;

namespace FinalProject1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PostController(FPContext context) : ControllerBase
    {
        private readonly FPContext _context = context;



        // GET: api/Post
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Post>>> GetPost()
        {
            return await _context.Post.Include(p => p.Author).Include(p => p.Comments).Include(p=> p.Category).ToListAsync();
        }

        // GET: api/Post/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> GetPost(string id)
        {
            var post = await _context.Post.Include(p => p.Author).Include(p => p.Comments).Include(p => p.Category).SingleOrDefaultAsync(p => p.Id == id);

            if (post == null)
            {
                return NotFound();
            }

            return post;
        }

        // GET: api/Post/5
        [HttpGet("User/{id}")]
        public async Task<ActionResult<List<Post>>> GetPostByUser(string id)
        {
            var post = await _context.Post.Include(p => p.Author).Include(p => p.Comments).Include(p => p.Category).Where(p =>  p.Author.Id == id).ToListAsync();

            if (post == null)
            {
                return NotFound();
            }

            return post;
        }

        // PUT: api/Post/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPost(string id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }

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

            return NoContent();
        }

        // POST: api/Post
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Post>> PostPost(Post post)
        {
            _context.Post.Add(post);
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

            return CreatedAtAction("GetPost", new { id = post.Id }, post);
        }

        // DELETE: api/Post/5
        [HttpDelete("{id}")]
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
