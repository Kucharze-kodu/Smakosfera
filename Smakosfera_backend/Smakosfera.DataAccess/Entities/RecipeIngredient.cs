using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.DataAccess.Entities
{
    public class RecipeIngredient
    {
        [Key]
        public int RecipeId { get; set; }
        public virtual Recipe Recipe { get; set; }

        public int IngredientId { get; set; }
        public virtual Ingredient Ingredient { get; set; }
        public int Amount { get; set; }
        public string Unit { get; set; } = string.Empty;
    }
}
