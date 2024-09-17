using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassLibraryForProject.Models
{
    internal class Post
    {
        [Key]
        public string Id { get; set; }

        [Required]
        public required string Title { get; set; }
        [Required]
        public required string Text { get; set; }

        public string Link { get; set; } = string.Empty;
        public string ImageURL { get; set; } = string.Empty ;

        public string CatigoryId { get; set; } = string.Empty;

        public string CatigoryName { get; set; } = string.Empty;

        public string[] KeyWords { get; set; } = [];

        public string UserId { get; set; } = string.Empty;

        public string[] Comments { get; set; } = [];

        public int UpVotes { get; set; } 

        public int DownVotes { get; set; }

        public int TotalVotes { get; set; }


    }
}
