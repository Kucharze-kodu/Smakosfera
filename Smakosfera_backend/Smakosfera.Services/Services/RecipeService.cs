using Smakosfera.DataAccess.Entities;
using Smakosfera.DataAccess.Repositories;
using Smakosfera.Services.Interfaces;
using Smakosfera.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.Services.services
{
    public class RecipeService : IRecipesService
    {
        private readonly SmakosferaDbContext _Recipes;

        public RecipeService(SmakosferaDbContext recipes)
        {
            _Recipes = recipes;
        }

        public RecipeDto GetRecipe(int recipeId)
        {
            var recipe = _Recipes.Recipes.SingleOrDefault(c => c.Id == recipeId);

            var result = new RecipeDto
            {
                Name = recipe.Name,
                Description = recipe.Description,
                DifficultyLevelId = recipe.DifficultyLevelId,
                PreparationTime = recipe.PreparationTime,
            };

            return result;
        }

        public IEnumerable<Recipe> Browse()
        {
            var date = _Recipes.Recipes.ToList();

            return date;
        }

        public void Add(RecipeDto dto)
        {
            var one = new Recipe
            {
                Name = dto.Name,
                Description = dto.Description,
                DifficultyLevelId = dto.DifficultyLevelId,
                PreparationTime = dto.PreparationTime,
                UserId = 23 // zmiana
            };

            Console.WriteLine(one);
            _Recipes.Recipes.Add(one);
            _Recipes.SaveChanges();

        }

        public bool Update(int recipeId, RecipeDto dto)
        {
            var result = _Recipes.Recipes.SingleOrDefault(c => c.Id == recipeId);

            if (result == null) 
            {
                return false;
            }

            result.Name = dto.Name;
            result.Description = dto.Description;
            result.DifficultyLevel.Id = dto.DifficultyLevelId;
            result.PreparationTime = dto.PreparationTime;

            _Recipes.SaveChanges();

            return true;
        }
        public bool Delete(int recipeId)
        {
            var result = _Recipes.Recipes.SingleOrDefault(c => c.Id == recipeId);
            if( result != null)
            {
                _Recipes.Recipes.Remove(result);
                _Recipes.SaveChanges();
                return true;
            }
            return false;
        }


    }
}
