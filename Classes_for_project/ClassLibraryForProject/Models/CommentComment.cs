using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassLibraryForProject.Models
{
    internal class CommentComment
    {
        [Key]
        public string Id { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;

        public string PostId { get; set; } = string.Empty;

        public string Text { get; set; } = string.Empty;

        public string Link { get; set; } = string.Empty;

        public string ImageURL { get; set; } = string.Empty;

        public string[] Comments { get; set; } = [];

        public int UpVotes { get; set; }

        public int DownVotes { get; set; }

        public int TotalVotes { get; set; }
    }
}
