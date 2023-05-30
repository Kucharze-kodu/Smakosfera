using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.DataAccess.Entities
{
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime CreationDate { get; set; } = DateTime.UtcNow;
        public int UserId { get; set; }
        public virtual User User { get; set; }
        public int RecipeId { get; set; }
        public virtual Recipe Recipe { get; set; }
        public int? CommentBossId { get; set; }
        public virtual Comment? CommentBoss { get; set; }
    }
}
