using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.DataAccess.Entities
{
    public class Recipetype
    {
        public int RecipeId { get; set; }
        public virtual Recipe Recipe { get; set; }
        public int TypeId { get; set; }
        public virtual Type Type { get; set; }
    }
}
