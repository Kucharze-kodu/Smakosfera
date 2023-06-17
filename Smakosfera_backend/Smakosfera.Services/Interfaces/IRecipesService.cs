using Smakosfera.DataAccess.Entities;
using Smakosfera.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.Services.Interfaces
{
    public interface IRecipesService    
    {   
        RecipeResponseDto GetRecipe(int recipeId);
        RecipeResponseDto GetRecipeToConfirmed(int recipeId);
        IEnumerable<RecipeResponseDto> Browse();
        RecipeResponseDto GetRandomRecipe();
        IEnumerable<RecipeResponseDto> BrowseRecipeLike();
        IEnumerable<RecipeResponseDto> BrowseToConfirmed();
        void Add(RecipeDto dto);
        void Update(int recipeId, RecipeDto dto);
        void Delete(int recipeId);

        void ApplyRecipe(int recipeId);

    }
}
