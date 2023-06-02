using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.Services.Models
{
    public class RecipeResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int DifficultyLevelId { get; set; }
        public int PreparationTime { get; set; }
        public bool CommunityRecipe { get; set; }
    }
}
