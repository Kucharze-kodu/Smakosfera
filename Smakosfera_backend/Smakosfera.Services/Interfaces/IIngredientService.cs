using Smakosfera.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.Services.Interfaces
{
    public interface IIngredientService
    {
        IngredientDto GetIngredient(int ingredientId);
        IEnumerable<IngredientDto> Browse();
        void AddIngredient(IngredientDto dto);
        void EditIngredient(int Id, IngredientDto dto);
        void DeleteIngredient(int Id);

    }
}
