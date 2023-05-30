using Microsoft.EntityFrameworkCore;
using Npgsql;
using Smakosfera.DataAccess.Entities;
using Smakosfera.DataAccess.Repositories;
using Smakosfera.Services.Exceptions;
using Smakosfera.Services.Interfaces;
using Smakosfera.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.Services.Services
{
    public class CommentService : ICommentService
    {
        private readonly SmakosferaDbContext _Comments;

        public CommentService(SmakosferaDbContext comments)
        {
            _Comments = comments;
        }

        public CommentDto GetComment(int CommentId)
        {
            var comment = _Comments.Comments.SingleOrDefault(c => c.Id == CommentId);

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

        public IEnumerable<Comment> GetComments(int RecipeId)
        {
            return _Comments.Comments.ToList().FindAll(c => c.RecipeId == RecipeId);
        }

        public void Add(CommentDto comment)
        {
            if (comment.Content is null)
            {
                throw new NotFoundException("Pusta zawartosc komentarza");
            }

            var newComment = new Comment
            {
                Content = comment.Content,
                UserId = comment.UserId,
                RecipeId = comment.RecipeId,
                CommentBossId = comment.CommentBossId
            };
            _Comments.Comments.Add(newComment);
            _Comments.SaveChanges();
        }

        public void Update(int CommentId, CommentDto comment)
        {
            if (comment.Content is null)
            {
                throw new NotFoundException("Pusta zawartosc komentarza");
            }

            var old_comment = _Comments.Comments.SingleOrDefault(c => c.Id == CommentId);
            if (old_comment is null)
            {
                throw new NotFoundException("Komentarz nie istnieje");
            }

            old_comment.Content = comment.Content;
            old_comment.UserId = comment.UserId;
            old_comment.RecipeId = comment.RecipeId;
            old_comment.CommentBossId = comment.CommentBossId;

            _Comments.SaveChanges();

        }

        public void Delete(int CommentId)
        {
            var comment_to_delete = _Comments.Comments.SingleOrDefault(c => c.Id == CommentId);

            if (comment_to_delete is null)
            {
                throw new NotFoundException("Komentarz nie istnieje");
            }

            _Comments.Comments.Remove(comment_to_delete);
            _Comments.SaveChanges();
        }

    }
}
