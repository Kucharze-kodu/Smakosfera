using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.Services.Models
{
    public class IngredientDto
    {
        [Required]
        public int Amount { get; set; }
        [Required]
        public string Unit { get; set; }
    }
}
