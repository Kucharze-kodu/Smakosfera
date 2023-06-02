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
        private readonly IUserContextService _userContextService;
        private readonly IIngredientService _ingredientService;

        public RecipeService(
            SmakosferaDbContext recipes, 
            IUserContextService userContextService,
            IIngredientService ingredientService)
        {
            _Recipes = recipes;
            _userContextService = userContextService;
            _ingredientService = ingredientService;
        }

        public RecipeResponseDto GetRecipe(int recipeId)
        {
            var recipe = _Recipes.Recipes.SingleOrDefault(c => c.Id == recipeId);

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
                CommunityRecipe = recipe.CommunityRecipe,
                ListIngredient = _recipeIngredientService.GetIngredient(recipeId)
            };

            return result;
        }


        public IEnumerable<RecipeResponseDto> Browse()
        {
            var date = _Recipes.Recipes.ToList();



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

        public void Add(RecipeDto dto)
        {
            var isExist = _Recipes.Recipes.Any(r => r.Name == dto.Name);

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


            _Recipes.Recipes.Add(recipe);
            _Recipes.SaveChanges();

            var recipeId = _Recipes.Recipes.FirstOrDefault(r => r.Name == dto.Name).Id;

            if(dto.Ingredients != null)
            {
                foreach (var ingredientDto in dto.Ingredients)
                {
                    var isIngredient = _Recipes.Ingredients.Any(r => r.Name == ingredientDto.Name);
                    if (!isIngredient)
                    {
                        _Recipes.Ingredients.Add(new Ingredient()
                        {
                            Name = ingredientDto.Name,
                            CreatedById = _userContextService.GetUserId
                        });
                        _Recipes.SaveChanges();
                    }                    
                    
                    var ingredientId = _Recipes.Ingredients.FirstOrDefault(r => r.Name == ingredientDto.Name).Id;
                    var isRecord = _Recipes.Recipes_Ingredients
                        .Any(r => r.IngredientId == ingredientId && r.RecipeId == recipeId);

                    if (!isRecord)
                    {
                        _Recipes.Recipes_Ingredients.Add(new RecipeIngredient()
                        {
                            IngredientId = ingredientId,
                            RecipeId = recipeId,
                            Amount = ingredientDto.Amount,
                            Unit = ingredientDto.Unit
                        });
                        _Recipes.SaveChanges();
                    }
                }
            }

            //try
            //{
            //    _Recipes.Recipes.Add(one);
            //    _Recipes.SaveChanges();
            //}
            //catch (DbUpdateException ex)
            //{
            //    if (ex.InnerException is PostgresException postgresException)
            //    {

            //        throw new NotFoundException("ta sama nazwa");
            //    }
            //    else
            //    {
            //        throw new NotFoundException("nie ma takiego levelu trudnosci");
            //    }
            //}
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
