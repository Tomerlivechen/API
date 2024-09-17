using FinalProject3.DTOs;
using FinalProject3.Models;
using Microsoft.AspNetCore.Identity;
using System.Xml.Linq;

namespace FinalProject3.Mapping
{
    public static class ComentExtensionMethod
    {
        public static CommentDisplay ToDisplay(this Comment comment)
        {
            CommentDisplay setcomment =  new CommentDisplay()
            {

                Id = comment.Id,
                Text = comment.Text,
                Link = comment.Link,
                ImageURL = comment.ImageURL,
                AuthorName = comment.Author.UserName,
                AuthorId = comment.Author.Id,
                UpVotes = comment.UpVotes,
                DownVotes = comment.DownVotes,
                TotalVotes = comment.TotalVotes,
                ParentCommentId = comment.ParentComment?.Id,
                ParentPostId = comment.ParentPost?.Id,
                Datetime = comment.Datetime,
            };

            foreach (Comment com in comment.Comments)
            {
                setcomment.Comments.Add(com.ToDisplay());
            }
            return setcomment;
        }
        public async static Task<Comment> NewCommentToComment(this CommentNew NewComment, UserManager<User> userManager)
        {
            Comment comment = new Comment()
            {
                Id = NewComment.Id,
                Text = NewComment.Text,
                Link = NewComment.Link,
                ImageURL = NewComment.ImageURL,
                Author = await userManager.FindByIdAsync(NewComment.AuthorId)
                Datetime = NewComment.Datetime,

            };
            return comment;
        }

    }
}
