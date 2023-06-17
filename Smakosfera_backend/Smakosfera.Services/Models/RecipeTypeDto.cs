﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.Services.Models
{
    public class RecipeTypeDto
    {
        public string Name { get; set; }
        [Required]
        public int TypeId { get; set; }
    }
}
