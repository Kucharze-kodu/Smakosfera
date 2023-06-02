using Microsoft.EntityFrameworkCore;
using Npgsql;
using Smakosfera.DataAccess.Entities;
using Smakosfera.DataAccess.Repositories;
using Smakosfera.Services.Exceptions;
using Smakosfera.Services.Interfaces;
using Smakosfera.Services.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.Services.Services
{
    public class CommentService : ICommentService
    {
        private readonly SmakosferaDbContext database;
        private readonly IUserContextService _userContextService;

        public CommentService(SmakosferaDbContext comments,
            IUserContextService userContextService)
        {
            database = comments;
            _userContextService = userContextService;
        }

        public CommentDto GetComment(int CommentId)
        {
            var comment = database.Comments.SingleOrDefault(c => c.Id == CommentId);

            if (comment is null)
            {
                throw new NotFoundException("Komentarz nie istnieje");
            }

            var result = new CommentDto
            {
                Content = comment.Content,
                UserId = comment.UserId,
                RecipeId = comment.RecipeId,
                CommentBossId = comment.CommentBossId
            };

            return result;
        }

        public IEnumerable<OutputCommentDto> GetComments(int RecipeId)
        {
            var comments = database.Comments.ToList()
                .FindAll(c => c.RecipeId == RecipeId)
                ?? throw new NotFoundException("Brak komentarzy w przepisie");

            var output = new List<OutputCommentDto>();

            foreach (var c in comments)
            {
                var UserInfo = database.Users.SingleOrDefault(u => u.Id == c.UserId) 
                    ?? throw new NotFoundException("Brak uzytkownika o podanym id");

                var BossUserInfo = (c.CommentBoss is null) ? null : database.Users.SingleOrDefault(u => u.Id == c.CommentBoss.UserId);

                output.Add(new OutputCommentDto() {
                    Content = c.Content,
                    UserId = c.UserId,
                    UserName = UserInfo.Name + " " + UserInfo.Surname,
                    RecipeId = c.RecipeId,
                    CommentBossId = c.CommentBossId,
                    CommentBossName = BossUserInfo is null ? "" : BossUserInfo.Name + " " + BossUserInfo.Surname,
                    CreationDate = c.CreationDate.ToString("dd.MM.yyyy HH:mm")
                });
            }
            return output;
        }

        public void Add(CommentDto comment)
        {
            if (comment.Content is null)
            {
                throw new NotFoundException("Pusta zawartosc komentarza");
            }
            var NewComment = new Comment
            {
                Content = comment.Content,
                UserId = _userContextService.GetUserId,
   
                RecipeId = comment.RecipeId,
                CommentBossId = comment.CommentBossId,
            };

            database.Comments.Add(NewComment);
            database.SaveChanges();   
        }

        public void Update(int CommentId, CommentDto comment)
        {
            if (comment.Content is null)
            {
                throw new NotFoundException("Pusta zawartosc komentarza");
            }

            var old_comment = database.Comments.SingleOrDefault(c => c.Id == CommentId);
            if (old_comment is null)
            {
                throw new NotFoundException("Komentarz nie istnieje");
            }

            old_comment.Content = comment.Content;
            old_comment.UserId = _userContextService.GetUserId;
            old_comment.RecipeId = comment.RecipeId;
            old_comment.CommentBossId = comment.CommentBossId;

            database.SaveChanges();

        }

        public void Delete(int CommentId)
        {
            var comment_to_delete = database.Comments.SingleOrDefault(c => c.Id == CommentId);

            if (comment_to_delete is null)
            {
                throw new NotFoundException("Komentarz nie istnieje");
            }

            database.Comments.Remove(comment_to_delete);
            database.SaveChanges();
        }

    }
}
