﻿using Org.BouncyCastle.Bcpg;
using Smakosfera.DataAccess.Entities;
using Smakosfera.DataAccess.Repositories;
using Smakosfera.Services.Exceptions;
using Smakosfera.Services.Interfaces;
using Smakosfera.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
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
                CommunityRecipe = recipe.CommunityRecipe
            };

            return result;

        }

        public IEnumerable<RecipeDto> Browse()
        {
            var date = _Recipes.Recipes.ToList();


            var result = date.FindAll(r => r.IsConfirmed == true)
                             .Select(r => new RecipeDto()
                {
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
            var one = new Recipe
            {
                Name = dto.Name,
                Description = dto.Description,
                DifficultyLevelId = dto.DifficultyLevelId,
                PreparationTime = dto.PreparationTime,
                UserId = 23 // zmiana
            };

            _Recipes.Recipes.Add(one);
            _Recipes.SaveChanges();

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
