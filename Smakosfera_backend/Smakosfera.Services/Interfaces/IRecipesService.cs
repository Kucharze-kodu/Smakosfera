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
        RecipeDto GetRecipe(int recipeId);
        IEnumerable<Recipe> Browse();
        void Add(RecipeDto dto);
        bool Update(int recipeId, RecipeDto dto);
        bool Delete(int recipeId);
    }
}
