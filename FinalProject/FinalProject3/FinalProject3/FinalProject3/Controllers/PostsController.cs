using FinalProject3.Data;
using FinalProject3.DTOs;
using FinalProject3.Mapping;
using FinalProject3.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace FinalProject3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController(FP3Context context, UserManager<AppUser> userManager) : ControllerBase
    {
        private readonly FP3Context _context = context;

        // GET: api/Posts
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<PostDisplay>>> GetPosts()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return await _context.Post.Include(p=> p.Comments).ThenInclude(c => c.Comments).ThenInclude(c => c.Comments).ThenInclude(c => c.Comments).ThenInclude(c => c.Comments).ThenInclude(c => c.Comments).Include(p => p.Votes).Include(p => p.Author).Include(p => p.Group).Include(p => p.Category).Select(p => p.ToDisplay(userId)).ToListAsync();
        }


        // GET: api/Posts/5
        [HttpGet("ById/{id}")]
        [Authorize]
        public async Task<ActionResult<PostDisplay>> GetPost(string id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var post = await _context.Post.FindAsync(id);

            if (post == null)
            {
                return NotFound();
            }

            return post.ToDisplay(userId);
        }



        // GET: api/Posts/5
        [HttpGet("ByKeyword/{KeyWord}")]
        [Authorize]
        public async Task<ActionResult<List<PostDisplay>>> GetPostByKeyWord(string KeyWord)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var posts = await _context.Post.Where(p => p.KeyWords.Contains(KeyWord)).Select(p => p.ToDisplay(userId)).ToListAsync();

            if (posts == null)
            {
                return NotFound();
            }

            return posts;
        }

        [HttpGet("ByGroup/{GroupId}")]
        public async Task<ActionResult<List<PostDisplay>>> GetPostByGroupd(string GroupId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var posts = await _context.Post.Where(p => p.Group.Id == GroupId).Select(p => p.ToDisplay(userId)).ToListAsync();

            if (posts == null)
            {
                return NotFound();
            }

            return posts;
        }

        [HttpGet("ByUpVote/{UserID}")]
        public async Task<ActionResult<List<PostDisplay>>> GetPostByUpVote(string UserID)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var posts = await _context.Post
            .Where(p => p.Votes.Any(v => v.Voter.Id == UserID && v.Voted > 0))
            .Select(p => p.ToDisplay(userId))
            .ToListAsync();

            if (posts == null)
            {
                return NotFound();
            }

            return posts;
        }

        [HttpGet("ByDownVote/{UserID}")]
        public async Task<ActionResult<List<PostDisplay>>> GetPostByDownVote(string UserID)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var posts = await _context.Post
            .Where(p => p.Votes.Any(v => v.Voter.Id == UserID && v.Voted < 0))
            .Select(p => p.ToDisplay(userId))
            .ToListAsync();

            if (posts == null)
            {
                return NotFound();
            }

            return posts;
        }

        [HttpGet("FullById/{PostID}")]
        [Authorize]
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
        public async Task<ActionResult<PostDisplay>> PutPost(string id, [FromBody] PostDisplay post)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id != post.Id)
            {
                return BadRequest();
            }

            var fullPost = await _context.Post.Include(p => p.Comments).Include(p => p.Votes).Include(p => p.Author).Include(p => p.Group).Include(p => p.Category).Where(p => p.Id == id).FirstOrDefaultAsync();

            if (fullPost is null)
            {
                return BadRequest();
            }

            if (post.ImageURL != fullPost.ImageURL)
            {
                fullPost.ImageURL = post.ImageURL;
            }
            if (post.Text != fullPost.Text)
            {
                fullPost.Text = post.Text;
            }
            if (post.Title != fullPost.Title)
            {
                fullPost.Title = post.Title;
            }
            if (post.Text != fullPost.Text)
            {
                fullPost.Text = post.Text;
            }
            if (post.KeyWords != fullPost.KeyWords)
            {
                fullPost.KeyWords = post.KeyWords;
            }
            if (post.Link != fullPost.Link)
            {
                fullPost.Link = post.Link;
            }

            _context.Entry(fullPost).State = EntityState.Modified;

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
            

            return Ok(fullPost.ToDisplay(userId));
        }

        // POST: api/Posts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<PostDisplay>> PostPost([FromBody] PostNew newPost)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!ModelState.IsValid || userId is null)
            {
                return BadRequest(ModelState);
            }
            newPost.AuthorId = userId;
            var post = await newPost.NewPostToPost(userManager , _context);
            _context.Post.Add(post);
            if (post.Group is not null)
            {
                var group = await _context.Group.FindAsync(post.Group.Id);
                group?.Posts.Add(post);

            }
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

            return Created("Success",post.ToDisplay(userId));
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

            return Ok();
        }
        [HttpPut("VoteById/{PostId}")]
        [Authorize]
        public async Task<IActionResult> VoteOnPost(string PostId, [FromBody] int vote)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var fullPost = (await GetFullPostByPostID(PostId))?.Value;
            if (fullPost is null)
            {
                return NotFound();
            }
            var user = await userManager.FindByIdAsync(userId);
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
