﻿using System.ComponentModel.DataAnnotations;

namespace AutoGeneratedApi.Models
{
    public class Song
    {
        [Key] 
        public int Id { get; set; }

        [Required]

        public required string Name { get; set; }

        [Required]
        public required double Length { get; set; }
        public string? genre { get; set; }

        public int? AlbumId { get; set; }
        public Album? Album { get; set; }
    }
}
