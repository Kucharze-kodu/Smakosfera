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
        private readonly SmakosferaDbContext _DbContext;
        private readonly IUserContextService _userContextService;

        public RecipeService(
            SmakosferaDbContext dbContext,
            IUserContextService userContextService)
        {
            _DbContext = dbContext;
            _userContextService = userContextService;
        }

        public RecipeResponseDto GetRecipe(int recipeId)
        {
            var recipe = _DbContext.Recipes.SingleOrDefault(c => c.Id == recipeId);

            if (recipe is null)
            {
                throw new NotFoundException("Przepis nie istnieje");
            }

            if (recipe.IsConfirmed == false)
            {
                throw new NotAcceptableException("Przepis nie zatwierdzony");
            }

            var result = new RecipeResponseDto
            {
                Id = recipeId,
                Name = recipe.Name,
                Description = recipe.Description,
                DifficultyLevelId = recipe.DifficultyLevelId,
                PreparationTime = recipe.PreparationTime,
                CommunityRecipe = recipe.CommunityRecipe
            };

            return result;
        }

        public IEnumerable<RecipeResponseDto> Browse()
        {
            var date = _DbContext.Recipes.ToList();


            var result = date.FindAll(r => r.IsConfirmed == true)
                             .Select(r => new RecipeResponseDto()
                             {
                                 Id = r.Id,
                                 Name = r.Name,
                                 Description = r.Description,
                                 DifficultyLevelId = r.DifficultyLevelId,
                                 PreparationTime = r.PreparationTime,
                                 CommunityRecipe = r.CommunityRecipe
                             });

            if (result.Any() == false)
            {
                throw new BadRequestException("Przepisy są nie potwierdzone");
            }

            return result;
        }

        public RecipeResponseDto GetRandomRecipe()
        {
            var recipes = _DbContext.Recipes.ToList();

            var random = new Random();
            int number = random.Next(recipes.Count);
            var recipe = recipes[number];
            var recipeDto = new RecipeResponseDto()
            {
                Id = recipe.Id,
                Name = recipe.Name,
                Description = recipe.Description,
                DifficultyLevelId = recipe.DifficultyLevelId,
                PreparationTime = recipe.PreparationTime,
                CommunityRecipe = recipe.CommunityRecipe
            };

            return recipeDto;
        }

        public void Add(RecipeDto dto)
        {
            var isExist = _DbContext.Recipes.Any(r => r.Name == dto.Name);

            if (isExist)
            {
                throw new BadRequestException("Przepis już istnieje");
            }

            var recipe = new Recipe
            {
                Name = dto.Name,
                Description = dto.Description,
                DifficultyLevelId = dto.DifficultyLevelId,
                PreparationTime = dto.PreparationTime,
                UserId = _userContextService.GetUserId // zmiana
            };

            _DbContext.Recipes.Add(recipe);
            _DbContext.SaveChanges();

            var recipeId = _DbContext.Recipes.FirstOrDefault(r => r.Name == dto.Name).Id;

            if (dto.Ingredients != null)
            {
                foreach (var ingredientDto in dto.Ingredients)
                {
                    var isIngredient = _DbContext.Ingredients.Any(r => r.Name == ingredientDto.Name);
                    if (!isIngredient)
                    {
                        _DbContext.Ingredients.Add(new Ingredient()
                        {
                            Name = ingredientDto.Name,
                            CreatedById = _userContextService.GetUserId
                        });
                        _DbContext.SaveChanges();
                    }

                    var ingredientId = _DbContext.Ingredients.FirstOrDefault(r => r.Name == ingredientDto.Name).Id;
                    var isRecord = _DbContext.Recipes_Ingredients
                        .Any(r => r.IngredientId == ingredientId && r.RecipeId == recipeId);

                    if (!isRecord)
                    {
                        _DbContext.Recipes_Ingredients.Add(new RecipeIngredient()
                        {
                            IngredientId = ingredientId,
                            RecipeId = recipeId,
                            Amount = ingredientDto.Amount,
                            Unit = ingredientDto.Unit
                        });
                        _DbContext.SaveChanges();
                    }
                }
            }

        }

        public void Update(int recipeId, RecipeDto dto)
        {
            var result = _DbContext.Recipes.FirstOrDefault(c => c.Id == recipeId);//SingleOrDefault(c => c.Id == recipeId);


            if (result is null)
            {
                throw new NotFoundException("Przepis nie istnieje");
            }

            result.Name = dto.Name;
            result.Description = dto.Description;
            result.DifficultyLevelId = dto.DifficultyLevelId;
            result.PreparationTime = dto.PreparationTime;

            _DbContext.SaveChanges();

        }
        public void Delete(int recipeId)
        {
            var result = _DbContext.Recipes.SingleOrDefault(c => c.Id == recipeId);

            if (result is null)
            {
                throw new NotFoundException("Przepis nie istnieje");
            }

            _DbContext.Recipes.Remove(result);
            _DbContext.SaveChanges();

        }

        public void ApplyRecipe(int recipeId)
        {
            var isresult = _DbContext.Recipes.Any(r => r.Id == recipeId);

            if (!isresult)
            {
                throw new NotFoundException("Przepis nie istnieje");
            }

            var ishere = _DbContext.Recipes_Ingredients.Include(tt => tt.Ingredient)
                                            .Where(a => a.Ingredient.IsConfirmed == false && a.RecipeId == recipeId)
                                            .Select(r => r.Ingredient)
                                            .ToList();

            foreach (var one in ishere)
            {
                one.IsConfirmed = true;
                _DbContext.SaveChanges();
            }



            var result = _DbContext.Recipes.SingleOrDefault(c => c.Id == recipeId);

            result.IsConfirmed = true;

            _DbContext.SaveChanges();
        }
    }
}
