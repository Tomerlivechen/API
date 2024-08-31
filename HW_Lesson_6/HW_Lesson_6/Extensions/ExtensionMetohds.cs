using HW_Lesson_6.Controllers;
using HW_Lesson_6.Data;
using HW_Lesson_6.Models;
using HW_Lesson_6.ViewModels;

namespace HW_Lesson_6.Extensions
{
    public static class ExtensionMetohds
    {
        public static Comment toComment(this CommentView commentView, DataBaseContext context)
        {
            
            Post? post = context.Post.FindAsync(keyValues: commentView.PostId).Result;
            User? user = context.User.FindAsync(keyValues: commentView.UserId).Result;
            Comment comment;
            if (post != null && user != null)
            {
                comment = new Comment() { CommentText = commentView.CommentText, Id = commentView.Id, Post = post, User = user };
                return comment;
            }
           comment = new Comment() { CommentText = commentView.CommentText, Id = commentView.Id, Post = default, User = default };
            return comment;

        }

        public static CommentView fromComment(this CommentView commentView, Comment comment)
        {


            commentView = new CommentView() { CommentText = comment.CommentText, Id = comment.Id, PostId = comment.Post.Id, UserId = comment.User.Id };
                return commentView;
            

        }


        public static Comment transferNavigation (this Comment comment, Comment Tranfer)
        {
            comment.User = Tranfer.User;
            comment.Post = Tranfer.Post;
            return comment;
        }

    }
}
