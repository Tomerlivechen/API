using FinalProject3.DTOs;
using FinalProject3.Models;
using Microsoft.AspNetCore.Identity;

namespace FinalProject3.Mapping
{
    public static class PostExtensionMethod 
    {
        public static PostDisplay ToDisplay (this Post post)
        {
            var setPost = new PostDisplay()
            {
                Id = post.Id,
                Title = post.Title,
                Text = post.Text,
                Category = post.Category,
                KeyWords = post.KeyWords,
                Link = post.Link,
                ImageURL = post.ImageURL,
                AuthorName = post.Author.UserName,
                AuthorId = post.Author.Id,
                UpVotes = post.UpVotes,
                DownVotes = post.DownVotes,
                TotalVotes = post.TotalVotes,

            };

            foreach (Comment com in post.Comments)
            {
                setPost.Comments.Add(com.ToDisplay());
            }
            return setPost;
        }

        public async static Task<Post> NewPostToPost(this PostNew Newpost, UserManager<User> userManager)
        {
            var setPost = new Post()
            {
                Id = Newpost.Id,
                Title = Newpost.Title,
                Text = Newpost.Text,
                Category = Newpost.Category,
                KeyWords = Newpost.KeyWords,
                Link = Newpost.Link,
                ImageURL = Newpost.ImageURL,
                Author = await userManager.FindByIdAsync(Newpost.AuthorId)
            };
            return setPost;
        }
    }
}
