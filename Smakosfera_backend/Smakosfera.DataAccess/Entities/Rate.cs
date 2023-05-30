using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.DataAccess.Entities
{
    public class Rate
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public string? Description { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
        public int RecipeId { get; set; }
        public virtual Recipe Recipe { get; set; }
    }
}
