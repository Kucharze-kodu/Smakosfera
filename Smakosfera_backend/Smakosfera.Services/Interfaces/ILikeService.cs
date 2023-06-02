using Smakosfera.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.Services.Interfaces
{
    public interface ILikeService
    {
        LikeDto GetLike(int LikeId);
        IEnumerable<LikeDto> GetAllLikes(int RecipeId);
        OutputLikeDto GetLikesAmount(int RecipeId);
        void Add(int RecipeId, int UserId);
        void Remove(int RecipeId, int UserId);
    }
}
