using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.DataAccess.Entities
{
    public class Recipe
    {


        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }


        public int PreparationTime { get; set; }
        public bool CommunityRecipe { get; set; } = true;
        public bool IsConfirmed { get; set; } = false;

        public int DifficultyLevelId { get; set; }
        public virtual DifficultyLevel DifficultyLevel { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }


        public virtual ICollection<RecipeIngredient> Ingredients { get; set; }
        public virtual ICollection<RecipeType> Types { get; set; }
    }
}
