using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.Services.Models
{
    public class OutputNewsletterDto
    {
        [Required]
        public string Email { get; set; } = string.Empty;
        public bool IsSubscribed { get; set; }
    }
}
