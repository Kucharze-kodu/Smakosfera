using Smakosfera.DataAccess.Entities;
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
        Like GetLike(int LikeId);
        IEnumerable<LikeDto> GetAllLikes(int RecipeId);
        OutputLikeDto GetLikesAmount(int RecipeId);
        void Toggle(int RecipeId);
    }
}
