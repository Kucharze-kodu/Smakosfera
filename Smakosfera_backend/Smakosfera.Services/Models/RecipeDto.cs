using Smakosfera.DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.Services.Models
{
    public class RecipeDto
    {
        [Required]
        [MinLength(3)]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public int DifficultyLevelId { get; set; } = 1;
        [Required]
        public int PreparationTime { get; set; }

        public string? ImageFileName { get; set; }
        [Required]
        public IEnumerable<RecipeTypeDto> Types { get; set; }

        public bool CommunityRecipe { get; set; } = true; 
        [Required]
        public IEnumerable<RecipeIngredientDto> Ingredients { get; set; }
    }
}


