using Smakosfera.DataAccess.Entities;
using Smakosfera.DataAccess.Repositories;
using Smakosfera.Services.Exceptions;
using Smakosfera.Services.Interfaces;
using Smakosfera.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.Services.Services
{
    public class IngredientService : IIngredientService
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
                 Name = dto.Name
            };

            var result = new Ingredient
            {
                Name = resultDto.Name
            };

            _Ingredient.Ingredients.Add(result);
            _Ingredient.SaveChanges();

        }

        public IngredientDto GetIngredient(int ingredientId)
        {
            var ingredient = _Ingredient.Ingredients.SingleOrDefault(c => c.Id == ingredientId);

            if (ingredient is null)

            {
                throw new NotFoundException("Składnik nie istnieje");
            }

            var result = new IngredientDto
            {
                Name = ingredient.Name
            };

            return result;

        }


        public IEnumerable<IngredientDto> Browse()
        {
            var date = _Ingredient.Ingredients.ToList();


            var result = date.Select(r => new IngredientDto()
                             {
                                 Name = r.Name
                             });

            return result;
        }


        public void EditIngredient(int Id, IngredientDto dto)
        {
            var result = _Ingredient.Ingredients.FirstOrDefault(c => c.Id == Id);

            if (result is null)
            {
                throw new NotFoundException("Nie ma składniku");
            }

            result.Name = dto.Name;

            _Ingredient.SaveChanges();
        }


        public void DeleteIngredient(int Id)
        {
            var result = _Ingredient.Ingredients.FirstOrDefault(c => c.Id == Id);

            if (result is null)
            {
                throw new NotFoundException("Nie ma składniku");
            }

            _Ingredient.Ingredients.Remove(result);

            _Ingredient.SaveChanges();
        }
    }
}
