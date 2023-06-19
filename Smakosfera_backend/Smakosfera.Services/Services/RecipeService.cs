using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
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

            var likes = _DbContext.Likes.ToList()
            .Select(l => new LikeDto
            {
                RecipeId = l.RecipeId,
                UserId = l.UserId
            });

            var result = new RecipeResponseDto
            {
                Id = recipeId,
                Name = recipe.Name,
                Description = recipe.Description,
                DifficultyLevelId = recipe.DifficultyLevelId,
                PreparationTime = recipe.PreparationTime,
                CommunityRecipe = recipe.CommunityRecipe,
                //ImageFileName = recipe.ImageFileName,
                Types = recipe.Types.Select(i => new RecipeTypeDto
                {
                    Name = i.Type.Name,
                    TypeId = i.TypeId
                }).ToList(),

                LikeNumber = likes.Count(l => l.RecipeId == recipe.Id),
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
            var date = _DbContext.Recipes.Include(c => c.Ingredients)
                             .ThenInclude(cc => cc.Ingredient)
                             .Include(t => t.Types)
                             .ThenInclude(tt => tt.Type)
                             .ToList();

            var likes = _DbContext.Likes.ToList()
            .Select(l => new LikeDto
            {
                RecipeId = l.RecipeId,
                UserId = l.UserId
            });


            var result = date.FindAll(r => r.IsConfirmed == true)
                             .Select(r => new RecipeResponseDto
                             {
                                 Id = r.Id,
                                 Name = r.Name,
                                 Description = r.Description,
                                 DifficultyLevelId = r.DifficultyLevelId,
                                 PreparationTime = r.PreparationTime,
                                 CommunityRecipe = r.CommunityRecipe,
                                 //ImageFileName = r.ImageFileName,
                                 Types = r.Types.Select(i => new RecipeTypeDto
                                 {
                                     Name = i.Type.Name,
                                     TypeId = i.TypeId
                                 }).ToList(),

                                 LikeNumber = likes.Count(l => l.RecipeId == r.Id),
                                 Ingredients = r.Ingredients.Select(i => new RecipeIngredientDto
                                 {
                                     Name = i.Ingredient.Name,
                                     IngredientId = i.IngredientId,
                                     Amount = i.Amount,
                                     Unit = i.Unit
                                 }).ToList()
                             }).ToList();

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

        public IEnumerable<RecipeResponseDto> BrowseRecipeLike()
        {
            var likes = _DbContext.Likes.ToList()
                        .FindAll(l => l.UserId == _userContextService.GetUserId)
                        .Select(l => new LikeDto
                        {
                            RecipeId = l.RecipeId,
                            UserId = l.UserId
                        });

            List<RecipeResponseDto> result = new List<RecipeResponseDto>();

            foreach (var like in likes)
            {
                var r = GetRecipe(like.RecipeId);
                result.Add(r);
            }

            return result;
        }

        public IEnumerable<RecipeResponseDto> BrowseToConfirmed()
        {
            var date = _DbContext.Recipes.Include(c => c.Ingredients)
                                         .ThenInclude(cc => cc.Ingredient)
                                         .Include(t => t.Types)
                                         .ThenInclude(tt => tt.Type)
                                         .ToList();



            var result = date.FindAll(r => r.IsConfirmed == false)
                             .Select(r => new RecipeResponseDto
                             {
                                 Id = r.Id,
                                 Name = r.Name,
                                 Description = r.Description,
                                 DifficultyLevelId = r.DifficultyLevelId,
                                 PreparationTime = r.PreparationTime,
                                 CommunityRecipe = r.CommunityRecipe,
                                 LikeNumber = 0,
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
                             }).ToList();

            if (result.Any() == false)
            {
                throw new BadRequestException("Przepisy są nie potwierdzone");
            }

            return result;
        }

        public RecipeResponseDto GetRecipeToConfirmed(int recipeId)
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

            var result = new RecipeResponseDto
            {
                Id = recipeId,
                Name = recipe.Name,
                Description = recipe.Description,
                DifficultyLevelId = recipe.DifficultyLevelId,
                PreparationTime = recipe.PreparationTime,
                CommunityRecipe = recipe.CommunityRecipe,
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

            if (dto.Types != null)
            {
               
                foreach (var typeOne in dto.Types) 
                {
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

            int NumberIngredient = 0;

            if (dto.Ingredients != null)
            {
                foreach (var ingredientDto in dto.Ingredients)
                {
                    NumberIngredient++;

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
                        .Any(r => r.IngredientId == ingredientId && r.RecipeId == recipeId && r.Amount == ingredientDto.Amount && r.Unit == ingredientDto.Unit);



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
                    else
                    {
                        var Record = _DbContext.Recipes_Ingredients.FirstOrDefault(r => r.IngredientId == ingredientId && r.RecipeId == recipeId);
                        Record.IngredientId = ingredientId;
                        Record.Amount = ingredientDto.Amount;
                        Record.Unit = ingredientDto.Unit;
                        _DbContext.SaveChanges();
                    }
                }

                var AllIngredient = _DbContext.Recipes_Ingredients.ToList().FindAll(r => r.RecipeId == recipeId);

                if (AllIngredient.Count() < NumberIngredient)
                {
                    return;
                }
                else
                {
                    foreach (var ing in AllIngredient)
                    {
                        bool isOK = false;
                        foreach (var ingDto in dto.Ingredients)
                        {
                            if (ing.IngredientId == ingDto.IngredientId)
                            {
                                isOK = true;
                                break;
                            }
                        }
                        if (!isOK)
                        {
                            _DbContext.Recipes_Ingredients.Remove(ing);
                            _DbContext.SaveChanges();
                        }
                    }
                }

            }

            
            if (dto.Types != null)
            {
                int NumberTypes = 0;
                foreach (var typeOne in dto.Types)
                {
                    NumberTypes++;
                    var isRecord = _DbContext.Recipes_Types
                                    .Any(r => r.TypeId == typeOne.TypeId && r.RecipeId == recipeId);

                    if (!isRecord)
                    {
                        _DbContext.Recipes_Types.Add(new RecipeType
                        {
                            RecipeId = recipeId,
                            TypeId = typeOne.TypeId
                        });
                    }
                    _DbContext.SaveChanges();
                }

                var AllTypes = _DbContext.Recipes_Types.ToList().FindAll(r => r.RecipeId == recipeId);

                if (AllTypes.Count() < NumberTypes)
                {
                    return;
                }
                else
                {
                    foreach (var ing in AllTypes)
                    {
                        bool isOK = false;
                        foreach (var ingDto in dto.Types)
                        {
                            if (ing.TypeId == ingDto.TypeId)
                            {
                                isOK = true;
                                break;
                            }
                        }
                        if (!isOK)
                        {
                            _DbContext.Recipes_Types.Remove(ing);
                            _DbContext.SaveChanges();
                        }
                    }
                }
            }
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
