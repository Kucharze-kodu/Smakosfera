using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.Services.Models
{
    public class LikeDto
    {
        [Required]
        public int RecipeId { get; set; }
        [Required]
        public int UserId { get; set; }

    }

    public class OutputLikeDto
    {
        [Required]
        public int RecipeId { get; set; }
        [Required]
        public int LikeAmount { get; set; }

    }
}
