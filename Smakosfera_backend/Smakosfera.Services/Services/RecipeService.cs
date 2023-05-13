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

        RecipeDto IRecipesService.Get(int recipeId)
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

            var recipe = new RecipeDto
            {
                Name = dto.Name,
                Description = dto.Description,
                DifficultyLevelId = dto.DifficultyLevelId,
                PreparationTime = dto.PreparationTime,
                UserId = 5


/*        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public level DifficultyLevel { get; set; }
        public TimeOnly Preparation_time { get; set; }
        public bool Community_recipe { get; set; } = true;
        public bool Is_confirmed { get; set; } = false;
        public int UserId { get; set; }*/

    };
            var one = new Recipe
            {
                Name = recipe.Name,
                Description = recipe.Description,
                DifficultyLevelId = recipe.DifficultyLevelId,
                PreparationTime = recipe.PreparationTime,
                UserId = recipe.UserId
            };


            _Recipes.Recipes.Add(one);
            _Recipes.SaveChanges();

        }

        void IRecipesService.Update(int recipeId, RecipeDto dto)
        {

        }
        void IRecipesService.Delete(int recipeId)
        {

        }


    }
}
