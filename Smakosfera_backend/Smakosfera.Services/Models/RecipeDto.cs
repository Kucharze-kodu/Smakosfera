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
        public IEnumerable<RecipeIngredientDto> Ingredients { get; set; }
    }

    public class RecipeIDDto
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int DifficultyLevelId { get; set; } = 1;
        public int PreparationTime { get; set; }

        public bool CommunityRecipe { get; set; } = true; // zmiany?
    }
}
