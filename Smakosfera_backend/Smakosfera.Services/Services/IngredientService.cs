using Smakosfera.DataAccess.Entities;
using Smakosfera.DataAccess.Repositories;
using Smakosfera.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.Services.Services
{
    public class IngredientService
    {
        private readonly SmakosferaDbContext _Ingredient;

        public IngredientService(SmakosferaDbContext recipes)
        {
            _Ingredient = recipes;
        }

        public void AddIngredient(IngredientDto dto)
        {

            var resultDto = new IngredientDto
            {
                 Amount = dto.Amount,
                 Unit = dto.Unit
            };

            var result = new RecipeIngredient
            {
                Amount = resultDto.Amount,
                Unit = resultDto.Unit

            };

            _Ingredient.Recipes_Ingredients.Add(result);
            _Ingredient.SaveChanges();

        }

/*        public void EditIngredient(int id, IngredientDto dto);
        {
               


        }


        public void DeleteIngredient(int id)
        {

        }*/
    }
}
