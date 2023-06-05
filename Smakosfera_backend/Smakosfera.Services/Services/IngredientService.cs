using Microsoft.EntityFrameworkCore;
using Smakosfera.DataAccess.Entities;
using Smakosfera.DataAccess.Repositories;
using Smakosfera.Services.Exceptions;
using Smakosfera.Services.Interfaces;
using Smakosfera.Services.Models;


namespace Smakosfera.Services.Services
{
    public class IngredientService : IIngredientService
    {
        private readonly SmakosferaDbContext _DbContext;
        private readonly IUserContextService _userContextService;

        public IngredientService(SmakosferaDbContext dbContext, IUserContextService userContextService)
        {
            _DbContext = dbContext;
            _userContextService = userContextService;
        }

        public void AddIngredient(IngredientDto dto)
        {
            var isExist = _DbContext.Ingredients.Any(r => r.Name == dto.Name);

            if (isExist)
            {
                throw new BadRequestException("Taki składnik już istnieje");
            }

            var result = new Ingredient
            {
                Name = dto.Name,
                CreatedById = _userContextService.GetUserId,
            };

            _DbContext.Ingredients.Add(result);
            _DbContext.SaveChanges();
        }

        public IngredientDto GetIngredient(int ingredientId)
        {
            var ingredient = _DbContext.Ingredients
                .SingleOrDefault(c => c.Id == ingredientId);

            if (ingredient is null)
            {
                throw new NotFoundException("Składnik nie istnieje");
            }

            if(ingredient.IsConfirmed == false)
            {
                throw new NotAcceptableException("Składnik nie zatwierdzony");
            }

            var result = new IngredientDto
            {
                Name = ingredient.Name
            };

            return result;
        }


        public IEnumerable<IngredientDto> Browse()
        {
            var date = _DbContext.Ingredients.ToList().FindAll(r => r.IsConfirmed == true);


            var result = date.Select(r => new IngredientDto()
                             {
                                 Name = r.Name
                             });

            return result;
        }


        public void EditIngredient(int Id, IngredientDto dto)
        {
            var result = _DbContext.Ingredients.FirstOrDefault(c => c.Id == Id);

            if (result is null)
            {
                throw new NotFoundException("Nie ma składniku");
            }

            result.Name = dto.Name;

            _DbContext.SaveChanges();
        }


        public void DeleteIngredient(int Id)
        {
            var result = _DbContext.Ingredients.FirstOrDefault(c => c.Id == Id);

            if (result is null)
            {
                throw new NotFoundException("Nie ma składniku");
            }

            _DbContext.Ingredients.Remove(result);

            _DbContext.SaveChanges();
        }
    }
}
