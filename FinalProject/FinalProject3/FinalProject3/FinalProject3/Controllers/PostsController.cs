using FinalProject3.Data;
using FinalProject3.DTOs;
using FinalProject3.Mapping;
using FinalProject3.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinalProject3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController(FP3Context context, UserManager<User> userManager) : ControllerBase
    {
        private readonly FP3Context _context = context;

        // GET: api/Posts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostDisplay>>> GetPosts()
        {
            return await _context.Post.Select(p => p.ToDisplay()).ToListAsync();
        }


        // GET: api/Posts/5
        [HttpGet("ById/{id}")]
        public async Task<ActionResult<PostDisplay>> GetPost(string id)
        {
            var post = await _context.Post.FindAsync(id);

            if (post == null)
            {
                return NotFound();
            }

            return post.ToDisplay();
        }

        // GET: api/Posts/5
        [HttpGet("ByKeyword/{KeyWord}")]
        public async Task<ActionResult<List<PostDisplay>>> GetPostByKeyWord(string KeyWord)
        {
            var posts = await _context.Post.Where(p => p.KeyWords.Contains(KeyWord)).Select(p => p.ToDisplay()).ToListAsync();

            if (posts == null)
            {
                return NotFound();
            }

            return posts;
        }

        [HttpGet("FullById/{PostID}")]
        public async Task<ActionResult<Post>> GetFullPostByPostID(string PostId)
        {
            var post = await _context.Post.FindAsync(PostId);

            if (post == null)
            {
                return NotFound();
            }

            return post;
        }

        // PUT: api/Posts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutPost(string id, Post post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
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

        // POST: api/Posts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Post>> PostPost(PostNew post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
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
        [HttpPut("VoteById/{PostId}")]
        public async Task<IActionResult> VoteOnComment([FromQuery] string UserId, [FromRoute] string PostId, [FromQuery] int vote)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var fullPost = (await GetFullPostByPostID(PostId))?.Value;
            if (fullPost is null)
            {
                return NotFound();
            }
            var user = await userManager.FindByIdAsync(UserId);
            if (user == null)
            {
                return BadRequest("User Not Found");
            }
            Votes addedVote = new Votes();
            addedVote.CreatVote(user, vote);
            fullPost.Votes.Add(addedVote);
            fullPost.calcVotes();
            _context.Update(fullPost);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostExists(fullPost.Id))
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
        private bool PostExists(string id)
        {
            return _context.Post.Any(e => e.Id == id);
        }
    }
}
