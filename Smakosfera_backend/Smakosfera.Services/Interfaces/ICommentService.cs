using Smakosfera.DataAccess.Entities;
using Smakosfera.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.Services.Interfaces
{
    public interface ICommentService
    {
        CommentDto GetComment(int CommentId);
        IEnumerable<OutputCommentDto> GetComments(int RecipeId);
        void Add(CommentDto comment);
        void Update(int CommentId, CommentDto comment);
        void Delete(int CommentId);
    }
}
