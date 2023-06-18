using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
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
    public class RateService : IRateService
    {
        private readonly SmakosferaDbContext _dbContext;
        private readonly IUserContextService _userContextService;

        public RateService(SmakosferaDbContext dbContext,
            IUserContextService userContextService)
        {
            _dbContext = dbContext;
            _userContextService = userContextService;
        }

        public UserRateDto GetRating(int RecipeId)
        {
            var userId = _userContextService.GetUserId;
            var rate = _dbContext.Rates.SingleOrDefault(r => r.UserId == userId && r.RecipeId == RecipeId);

            var rating = (rate is null) ? 0 : rate.Number;

            var result = new UserRateDto
            {
                UserId = userId,
                Rating = rating
            };

            return result;
        }

        public RecipeRateDto GetAverage(int RecipeId)
        {
            var ratesForRecipe = _dbContext.Rates
                .Where(r => r.RecipeId == RecipeId);

            _ = _dbContext.Recipes.ToList().FindAll(r => r.Id == RecipeId)
               ?? throw new BadRequestException("Podany przepis nie istnieje");

            var averageRating = (ratesForRecipe.Any() == false) ?
                0.0 :
                ratesForRecipe.Select(r => r.Number).Average();

           

            var result = new RecipeRateDto
            {
                RecipeId = RecipeId,
                AverageRating = averageRating.ToString("0.0")
            };

            return result;

        }

        public void Set(RateDto rateDto)
        {
            if (rateDto is null)
            {
                throw new BadRequestException("Brak danych wejsciowych");
            }
            else if (rateDto.Rating < 1 || rateDto.Rating > 5)
            {
                throw new BadRequestException("Wartosc oceny musi sie znajdowac w zakresie od 1 do 5");
            }

            _ = _dbContext.Recipes.ToList().FindAll(r => r.Id == rateDto.RecipeId)
                ?? throw new BadRequestException("Podany przepis nie istnieje");

            var userId = _userContextService.GetUserId;

            var oldRate = _dbContext.Rates.SingleOrDefault(r => (r.UserId == userId && r.RecipeId == rateDto.RecipeId));

            if (oldRate is null)
            {
                var newRate = new Rate
                {
                    Number = rateDto.Rating,
                    Description = null,
                    UserId = _userContextService.GetUserId,
                    RecipeId = rateDto.RecipeId
                };
                _dbContext.Rates.Add(newRate);
            }
            else
            {
                oldRate.Number = rateDto.Rating;
            }

            _dbContext.SaveChanges();
        }

        public void DeleteByRecipeId(int RecipeId)
        {
            var userId = _userContextService.GetUserId;

            _ = _dbContext.Recipes.ToList().FindAll(r => r.Id == RecipeId)
                    ?? throw new BadRequestException("Podany przepis nie istnieje");

            var rateToDelete = _dbContext.Rates.SingleOrDefault(r => (r.UserId == userId && r.RecipeId == RecipeId))
                ?? throw new BadRequestException("Uzytkownik nie ocenil tego przepisu");

            _dbContext.Rates.Remove(rateToDelete);
            _dbContext.SaveChanges();
        }

        public void DeleteByRateId(int RateId)
        {
            var rateToDelete = _dbContext.Rates.SingleOrDefault(r => r.Id == RateId)
                ?? throw new BadRequestException("Ocena nie istnieje");

            _dbContext.Rates.Remove(rateToDelete);
            _dbContext.SaveChanges();
        }
    }
}
