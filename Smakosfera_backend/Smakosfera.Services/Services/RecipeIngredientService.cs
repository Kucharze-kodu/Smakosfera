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
        private readonly IIngredientService _IngredientService;

        public RecipeIngredientService(SmakosferaDbContext ingredient, IIngredientService ingredientService)
        {
            _Recipes_Ingredient = ingredient;
            _IngredientService = ingredientService;
        }

        public IEnumerable<RecipeIngredientDto> GetIngredient(int idRecipe)
        {
            var date = _Recipes_Ingredient.Recipes_Ingredients.ToList();


            var ingredients = date.FindAll(r => r.RecipeId == idRecipe)
                             .Select(r => new RecipeIngredientDto
                             {
                                 Name = _IngredientService.GetIngredient(r.IngredientId).Name,
                                Amount = r.Amount,
                                 Unit = r.Unit
                             }); ;

            return ingredients;
        }

        public void AddRecipeIngredient(int idRecipe, RecipeIngredientDto dto)
        {
            var date = _IngredientService.Browse();

            int? IdIngredient = date.FirstOrDefault(c => c.Name == dto.Name).Id;
            if (IdIngredient == 0 || IdIngredient == null) 
            {
                var newADD = new IngredientDto
                {
                    Name = dto.Name
                };
                _IngredientService.AddIngredient(newADD);
                IdIngredient = date.FirstOrDefault(c => c.Name == dto.Name).Id;
            }

            var newIngredient = new RecipeIngredient
            {
                Amount = dto.Amount,
                Unit = dto.Unit,
                IngredientId = (int)IdIngredient,
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
