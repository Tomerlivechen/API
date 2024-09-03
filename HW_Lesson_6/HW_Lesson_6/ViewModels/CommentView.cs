using HW_Lesson_6.Models;
using System.ComponentModel.DataAnnotations;

namespace HW_Lesson_6.ViewModels
{
    public class CommentView()
    {

        public int Id { get; set; }

        public  string CommentText { get; set; }

        public  int PostId { get; set; }
        public  string? UserId { get; set; }

        public CommentView(Comment comment) : this()
        {
            ArgumentNullException.ThrowIfNull(comment);
            this.CommentText = comment.CommentText;
            this.Id = comment.Id;
            this.PostId = comment.Post.Id;
            this.UserId = comment.User.Id; 
        }
    }

    
}
