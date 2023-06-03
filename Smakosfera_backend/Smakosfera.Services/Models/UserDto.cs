using Smakosfera.DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.Services.Models
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public bool Subscription { get; set; }
        public string VerifiedAt { get; set; }
        public string Permission { get; set; }
        public string BanTime { get; set; }
        public string? AvatarFileName { get; set; }
    }
}
