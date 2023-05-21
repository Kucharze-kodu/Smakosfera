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
        public void AddIngredient(IngredientDto dto);
        public void EditIngredient(int Id, IngredientDto dto);
        public void DeleteIngredient(int Id);
    }
}
