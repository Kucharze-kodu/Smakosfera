using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.DataAccess.Entities
{
    public class Ingredient
    {
        public int Id { get; set; } = 0;
        public string Name { get; set; }
        public int CreatedById { get; set; }
        public User CreatedBy { get; set; }
        public bool IsConfirmed { get; set; } = false;

        public virtual ICollection<RecipeIngredient> Recipes { get; set; }
    }
}
