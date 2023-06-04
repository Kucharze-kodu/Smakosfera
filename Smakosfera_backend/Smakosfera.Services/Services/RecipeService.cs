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
            SmakosferaDbContext recipes, 
            IUserContextService userContextService)
        {
            _DbContext = recipes;
            _userContextService = userContextService;

        }

        public RecipeResponseDto GetRecipe(int recipeId)
        {
            var recipe = _DbContext.Recipes.Include(c => c.Ingredients)
                                           .ThenInclude(cc => cc.Ingredient)
                                           .Include(t => t.Types)
                                           .ThenInclude(tt => tt.Type)
                                           .SingleOrDefault(cc => cc.Id == recipeId);



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
                ImageFileName = recipe.ImageFileName,
                Types = recipe.Types.Select(i => new RecipeTypeDto
                {
                    Name = i.Type.Name,
                    TypeId = i.TypeId
                }).ToList(),

                Ingredients = recipe.Ingredients.Select(i => new RecipeIngredientDto
                {
                    Name = i.Ingredient.Name,
                    IngredientId = i.IngredientId,
                    Amount = i.Amount,
                    Unit = i.Unit
                }).ToList()
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
                                 CommunityRecipe = r.CommunityRecipe,
                                 ImageFileName = r.ImageFileName,
                                 Types = r.Types.Select(i => new RecipeTypeDto
                                 {
                                     Name = i.Type.Name,
                                     TypeId = i.TypeId
                                 }).ToList(),

                                 Ingredients = r.Ingredients.Select(i => new RecipeIngredientDto
                                 {
                                     Name = i.Ingredient.Name,
                                     IngredientId = i.IngredientId,
                                     Amount = i.Amount,
                                     Unit = i.Unit
                                 }).ToList()
                             });

            if (result.Any() == false)
            {
                throw new BadRequestException("Przepisy są nie potwierdzone");
            }

            return result;
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
                UserId = _userContextService.GetUserId 
            };


            _DbContext.Recipes.Add(recipe);
            _DbContext.SaveChanges();

            var recipeId = _DbContext.Recipes.FirstOrDefault(r => r.Name == dto.Name).Id;

            if(dto.Ingredients != null)
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

            if (dto.Types != null)
            {
               
                foreach (var typeOne in dto.Types) 
                {
                    var isRecipeTypes = _DbContext.Types.SingleOrDefault(r => r.Name == typeOne.Name).Id;
                    var isRecord  = _DbContext.Recipes_Types
                                    .Any(r=> r.TypeId  == typeOne.TypeId && r.RecipeId == recipeId);

                    if(!isRecord)
                    {
                        _DbContext.Recipes_Types.Add(new RecipeType()
                        {
                            RecipeId = recipeId,
                            TypeId = typeOne.TypeId
                        });
                    }
                    _DbContext.SaveChanges();
                }
                
            }

            //try
            //{
            //    _DbContext.Recipes.Add(one);
            //    _DbContext.SaveChanges();
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
    }
}
