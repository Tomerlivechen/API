﻿using FinalProject3.DTOs;
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
                Datetime = comment.Datetime,
            };
            if (comment.ParentComment is not null)
            {
                setcomment.ParentCommentId = comment.ParentComment.Id;
            }
            if (comment.ParentPost is not null)
            {
                setcomment.ParentCommentId = comment.ParentPost.Id;
            }

            foreach (Comment com in comment.Comments)
            {
                setcomment.Comments.Add(com.ToDisplay());
            }
            return setcomment;
        }
        public async static Task<Comment> NewCommentToComment(this CommentNew NewComment, UserManager<AppUser> userManager)
        {
            Comment comment = new Comment()
            {
                Id = Guid.NewGuid().ToString(),
                Text = NewComment.Text,
                Link = NewComment.Link,
                ImageURL = NewComment.ImageURL,
                Author = await userManager.FindByIdAsync(NewComment.AuthorId),
                Datetime = NewComment.Datetime,

            };
            return comment;
        }

    }
}
