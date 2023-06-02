using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.Services.Models
{
    public class CommentDto
    {
        [Required]
        [MinLength(1)]
        public string Content { get; set; } = string.Empty;

        [Required]
        public int UserId { get; set; }

        [Required]
        public int RecipeId { get; set; }

        public int? CommentBossId { get; set; } = null;

    }

    public class OutputCommentDto
    {
        [Required]
        [MinLength(1)]
        public string Content { get; set; } = string.Empty;

        [Required]
        public int UserId { get; set; }

        public string UserName { get; set; } = string.Empty;

        [Required]
        public int RecipeId { get; set; }

        public int? CommentBossId { get; set; } = null;

        public string CommentBossName { get; set; } = string.Empty;
        
        public string CreationDate { get; set; } = string.Empty;
    }
}
