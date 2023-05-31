using Smakosfera.DataAccess.Entities;
using Smakosfera.DataAccess.Repositories;
using Smakosfera.Services.Exceptions;
using Smakosfera.Services.Interfaces;
using Smakosfera.Services.Models;


namespace Smakosfera.Services.Services
{
    public class IngredientService : IIngredientService
    {
        private readonly SmakosferaDbContext _ingredient;
        private readonly IUserContextService _userContextService;

        public IngredientService(SmakosferaDbContext ingredient, IUserContextService userContextService)
        {
            _ingredient = ingredient;
            _userContextService = userContextService;
        }

        public void AddIngredient(IngredientDto dto)
        {
            var result = new Ingredient
            {
                Name = dto.Name,
                CreatedById = _userContextService.GetUserId,
            };

            _ingredient.Ingredients.Add(result);
            _ingredient.SaveChanges();
        }

        public IngredientDto GetIngredient(int ingredientId)
        {
            var ingredient = _ingredient.Ingredients.SingleOrDefault(c => c.Id == ingredientId);

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
            var date = _ingredient.Ingredients.ToList();


            var result = date.Select(r => new IngredientDto()
                             {
                                 Name = r.Name
                             });

            return result;
        }


        public void EditIngredient(int Id, IngredientDto dto)
        {
            var result = _ingredient.Ingredients.FirstOrDefault(c => c.Id == Id);

            if (result is null)
            {
                throw new NotFoundException("Nie ma składniku");
            }

            result.Name = dto.Name;

            _ingredient.SaveChanges();
        }


        public void DeleteIngredient(int Id)
        {
            var result = _ingredient.Ingredients.FirstOrDefault(c => c.Id == Id);

            if (result is null)
            {
                throw new NotFoundException("Nie ma składniku");
            }

            _ingredient.Ingredients.Remove(result);

            _ingredient.SaveChanges();
        }
    }
}
