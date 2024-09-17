using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassLibraryForProject.Models
{
    internal class Interaction
    {

        [Key]
        public string Id { get; set; }

        public required string Text { get; set; }

        public string UserId { get; set; } = string.Empty;

        public string[] Comments { get; set; } = [];

        public int UpVotes { get; set; }

        public int DownVotes { get; set; }

        public int TotalVotes { get; set; }
    }
}
