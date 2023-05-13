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
        RecipeDto Get(int recipeId);
        IEnumerable<Recipe> Browse();
        void Add(RecipeDto dto);
        void Update(int recipeId, RecipeDto dto);
        void Delete(int recipeId);
    }
}
