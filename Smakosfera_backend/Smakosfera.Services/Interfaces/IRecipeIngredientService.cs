using Smakosfera.DataAccess.Entities;
using Smakosfera.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.Services.Interfaces
{
    public interface IRecipeIngredientService
    {
        IEnumerable<RecipeIngredientDto> GetIngredient(int idRecipe);
        void AddRecipeIngredient(int idRecipe,int IngredientId, RecipeIngredientDto dto);
        void update(int idRecipe, int IngredientId, RecipeIngredientDto dto);
        void delete(int idRecipe, int IngredientId);

    }
}
