using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Smakosfera.DataAccess.Entities;
using Smakosfera.DataAccess.Repositories;
using Smakosfera.Services.Exceptions;
using Smakosfera.Services.Interfaces;
using Smakosfera.Services.Models;

namespace Smakosfera.Services.Services
{
    public class LikeService : ILikeService
    {
        private readonly SmakosferaDbContext _dbContext;
        private readonly IUserContextService _userContextService;
    
        public LikeService(SmakosferaDbContext dbContext, IUserContextService userContextService)
        {
            _dbContext = dbContext;
            _userContextService = userContextService;
        }

        public Like GetLike(int LikeId)
        {
            var like = _dbContext.Likes.SingleOrDefault(l => l.Id == LikeId)
                ?? throw new NotFoundException("Nie istnieje polubienie o podanym id");

            var result = new Like
            {
                RecipeId = like.RecipeId,
                UserId = like.UserId
            };

            return result;
        }

        public IEnumerable<LikeDto> GetAllLikes(int RecipeId)
        {
            var likes = _dbContext.Likes.ToList()
                .FindAll(l => l.RecipeId == RecipeId)
                .Select(l => new LikeDto
                { 
                    RecipeId = l.RecipeId, 
                    UserId = l.UserId 
                });

            return likes;
        }

        public OutputLikeDto GetLikesAmount(int RecipeId)
        {
            var likesAmount = _dbContext.Likes.ToList()
                .FindAll(l => l.RecipeId == RecipeId)
                .Count();

            var result = new OutputLikeDto
            {
                RecipeId = RecipeId,
                LikeAmount = likesAmount
            };

            return result;
        }
        
        public void Toggle(int RecipeId)
        {
            var recipeExists = _dbContext.Recipes.FirstOrDefault(r => r.Id == RecipeId)
                 ?? throw new BadRequestException("Przepis nie istnieje");

            var userId = _userContextService.GetUserId;
            var like = _dbContext.Likes.SingleOrDefault(l => l.RecipeId == RecipeId && l.UserId == userId);
            if (like is not null)
            {
                _dbContext.Likes.Remove(like);
            }
            else
            {
                var NewLike = new Like
                {
                    RecipeId = RecipeId,
                    UserId = userId
                };

                _dbContext.Likes.Add(NewLike);
                
            }
            _dbContext.SaveChanges();
        }
    }
}
