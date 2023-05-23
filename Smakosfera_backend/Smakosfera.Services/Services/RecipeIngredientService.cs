using Smakosfera.DataAccess.Entities;
using Smakosfera.DataAccess.Repositories;
using Smakosfera.Services.Exceptions;
using Smakosfera.Services.Interfaces;
using Smakosfera.Services.Models;

namespace Smakosfera.Services.Services
{
    public class RecipeIngredientService : IRecipeIngredientService
    {
        private readonly SmakosferaDbContext _Recipes_Ingredient;

        public RecipeIngredientService(SmakosferaDbContext ingredient)
        {
            _Recipes_Ingredient = ingredient;
        }

        public IEnumerable<RecipeIngredientDto> GetIngredient(int idRecipe)
        {
            var date = _Recipes_Ingredient.Recipes_Ingredients.ToList();


            var ingredients = date.FindAll(r => r.RecipeId == idRecipe)
                             .Select(r => new RecipeIngredientDto
                             {
                                Amount = r.Amount,
                                Unit = r.Unit
                             });

            return ingredients;
        }

        public void AddRecipeIngredient(int idRecipe,int IngredientId, RecipeIngredientDto dto)
        {
            var newIngredient = new RecipeIngredient
            {
                Amount = dto.Amount,
                Unit = dto.Unit,
                IngredientId = IngredientId,
                RecipeId = idRecipe
            };

            _Recipes_Ingredient.Recipes_Ingredients.Add(newIngredient);
            _Recipes_Ingredient.SaveChanges();

        }

        public void update(int idRecipe, int IngredientId, RecipeIngredientDto dto)
        {
            var result = _Recipes_Ingredient.Recipes_Ingredients.FirstOrDefault(c => c.RecipeId == idRecipe && c.IngredientId == IngredientId);


            if (result is null)
            {
                throw new NotFoundException("skladnika nie ma w przepisie ");
            }

            result.Amount = dto.Amount;
            result.Unit = dto.Unit;


            _Recipes_Ingredient.SaveChanges();
        }
        
        public void delete(int idRecipe, int IngredientId)
        {

            var result = _Recipes_Ingredient.Recipes_Ingredients.FirstOrDefault(c => c.RecipeId == idRecipe && c.IngredientId == IngredientId);

            if (result is null)
            {
                throw new NotFoundException("skladnika nie ma w przepisie ");
            }

            _Recipes_Ingredient.Recipes_Ingredients.Remove(result);
            _Recipes_Ingredient.SaveChanges();
        }


    }
}
