using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.Services.Models
{
    public class RateDto
    {
        [Required]
        public int RecipeId { get; set; }

        [Required]
        public int Rating { get; set; }

    }

    public class RecipeRateDto
    {
        public int RecipeId { get; set; }

        public string AverageRating { get; set; } = string.Empty;
    }

    public class UserRateDto
    {
        public int UserId { get; set; }
        public int Rating { get; set; }
    }
}
