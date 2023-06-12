using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.Services.Models
{
    public class RecipeIngredientDto
    {
        [Required]
        public string Name { get; set; }
        public int IngredientId { get; set; }
        [Required]
        public int Amount { get; set; }
        [Required]
        public string Unit { get; set; }
    }
}
