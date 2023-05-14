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
        public void AddIngredient(IngredientDto dto);
        public void EditIngredient(int id, IngredientDto dto);
        public void DeleteIngredient(int id);
    }
}
