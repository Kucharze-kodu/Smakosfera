using Smakosfera.DataAccess.Entities;
using Smakosfera.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.Services.Interfaces
{
    public interface IRateService
    {
        UserRateDto GetRating(int RecipeId);

        RecipeRateDto GetAverage(int RecipeId);

        void Set(RateDto rateDto);

        void DeleteByRecipeId(int RecipeId);

        void DeleteByRateId(int RateId);
    }
}
