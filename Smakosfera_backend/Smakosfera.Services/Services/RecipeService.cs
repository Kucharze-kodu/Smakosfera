using Microsoft.EntityFrameworkCore;
using Npgsql;
using Smakosfera.DataAccess.Entities;
using Smakosfera.DataAccess.Repositories;
using Smakosfera.Services.Exceptions;
using Smakosfera.Services.Interfaces;
using Smakosfera.Services.Models;


namespace Smakosfera.Services.Services
{
    public class RecipeService : IRecipesService
    {
        private readonly SmakosferaDbContext _Recipes;
        private readonly IRecipeIngredientService _recipeIngredientService;

        public RecipeService(SmakosferaDbContext recipes, IRecipeIngredientService recipeIngredientService)
        {
            _Recipes = recipes;
            _recipeIngredientService = recipeIngredientService;
        }

        public RecipeDto GetRecipe(int recipeId)
        {
            var recipe = _Recipes.Recipes.SingleOrDefault(c => c.Id == recipeId);

            if (recipe is null)

            {
                throw new NotFoundException("Przepis nie istnieje");
            }

            var result = new RecipeDto
            {
                Name = recipe.Name,
                Description = recipe.Description,
                DifficultyLevelId = recipe.DifficultyLevelId,
                PreparationTime = recipe.PreparationTime,
                CommunityRecipe = recipe.CommunityRecipe,
                ListIngredient = _recipeIngredientService.GetIngredient(recipeId)
            };

            return result;

        }

        public IEnumerable<Recipe> Browse()
        {
            var date = _Recipes.Recipes.ToList();


            var result = date.FindAll(r => r.IsConfirmed == true);

            if (result.Any() == false)
            {
                throw new BadRequestException("Przepisy są nie potwierdzone");
            }

            return result;
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

            try
            {
                if (dto.ListIngredient != null)
                {
                    _Recipes.Recipes.Add(one);
                    _Recipes.SaveChanges();
                    var result = _Recipes.Recipes.SingleOrDefault(c => c.Name == dto.Name).Id;

                    if(result != null)
                    {
                        List<RecipeIngredientDto> lista = dto.ListIngredient.ToList();
                        foreach (var ing in lista)
                        {
                             _recipeIngredientService.AddRecipeIngredient(result, ing);
                        }
                    }

                }


                
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException is PostgresException postgresException)
                {

                    throw new NotFoundException("ta sama nazwa");
                }
                else
                {
                    throw new NotFoundException("nie ma takiego levelu trudnosci");
                }
            }
        }

        public void Update(int recipeId, RecipeDto dto)
        {
            var result = _Recipes.Recipes.FirstOrDefault(c => c.Id == recipeId);//SingleOrDefault(c => c.Id == recipeId);


            if (result is null)
            {
                throw new NotFoundException("Przepis nie istnieje");
            }

            result.Name = dto.Name;
            result.Description = dto.Description;
            result.DifficultyLevelId = dto.DifficultyLevelId;
            result.PreparationTime = dto.PreparationTime;

            _Recipes.SaveChanges();

        }
        public void Delete(int recipeId)
        {
            var result = _Recipes.Recipes.SingleOrDefault(c => c.Id == recipeId);

            if (result is null)
            {
                throw new NotFoundException("Przepis nie istnieje");
            }

            _Recipes.Recipes.Remove(result);
            _Recipes.SaveChanges();

        }
    }
}
