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

        [Required]
        public int? CommentBossId { get; set; } = null;

    }
}
