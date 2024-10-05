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
    public class CommentsController(FP3Context context, UserManager<AppUser> userManager) : ControllerBase
    {


        private readonly FP3Context _context = context;
        [HttpGet("ByPPostId/{PostID}")]
        [Authorize]
        public async Task<ActionResult<List<CommentDisplay>>> GetCommentByPPostID(string PostID)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var comments = await _context.Comment.Where(c => c.ParentPost.Id== PostID).Select(c => c.ToDisplay(userId)).ToListAsync();

            if (comments == null)
            {
                return NotFound();
            }

            return Ok(comments);
        }

        [HttpGet("ByPCommentId/{CommentID}")]
        [Authorize]
        public async Task<ActionResult<List<CommentDisplay>>> GetCommentByPCommentID(string CommentID)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var comments = await _context.Comment.Where(c => c.ParentComment.Id == CommentID).Select(c => c.ToDisplay(userId)).ToListAsync();

            if (comments == null)
            {
                return NotFound();
            }

            return comments;
        }

        [HttpGet("ByCommentId/{CommentID}")]
        [Authorize]
        public async Task<ActionResult<CommentDisplay>> GetCommentByCommentID(string CommentID)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var comment = await _context.Comment.FindAsync(CommentID);

            if (comment == null)
            {
                return NotFound();
            }

            return comment.ToDisplay(userId);
        }

        [HttpGet("ById/{CommentID}")]
        public async Task<ActionResult<Comment>> GetFullCommentByCommentID(string CommentID)
        {
            var comment = await _context.Comment.FindAsync(CommentID);

            if (comment == null)
            {
                return NotFound();
            }

            return comment;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<CommentDisplay>> PostComment([FromBody] CommentNew comment)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
                var newComment = await comment.NewCommentToComment(userManager);
                _context.Comment.Add(newComment);
            Interaction? parent;
            if (!string.IsNullOrEmpty(comment.ParentPostId))
            {
                parent = await _context.Post.FindAsync(comment.ParentPostId);
            }
            else
            {
                parent = await _context.Comment.FindAsync(comment.ParentCommentId);
            }
            if (parent is null)
            {
                return BadRequest(!string.IsNullOrEmpty(comment.ParentPostId) ? "Post not found" : "Comment not found");
            }
            parent.Comments.Add(newComment);
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateException ex)
                {
                    return  Problem(ex.Message);
                }
            

            return Created("Success",newComment.ToDisplay(userId));
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutComment(string id, [FromBody] Comment comment)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id != comment.Id)
            {
                return BadRequest("Comment ID mismatch.");
            }

            _context.Entry(comment).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CommentExists(comment.Id))
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

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteComment(string id)
        {
            var comment = await _context.Comment.FindAsync(id);
            if (comment is null)
            {
                return NotFound();
            }

            _context.Comment.Remove(comment);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return Problem(ex.Message);
            }



            return NoContent();
        }

        [HttpPut("VoteById/{commentId}")]
        [Authorize]
        public async Task<IActionResult> VoteOnComment(string commentId,[FromBody]  int Vote )
        {

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var fullComment = (await GetFullCommentByCommentID(commentId)).Value;
            if (fullComment is null)
            {
                return NotFound();
            }
            var user =await userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return BadRequest("User Not Found");
            }
            Votes addedVote = new Votes();
            addedVote.CreatVote(user, Vote);
            fullComment.Votes.Add(addedVote);
            fullComment.calcVotes();
            _context.Update(fullComment);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentExists(fullComment.Id))
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

        private bool CommentExists(string id)
        {
            return _context.Comment.Any(e => e.Id == id);
        }
    }
}
