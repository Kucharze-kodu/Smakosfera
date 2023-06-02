using Smakosfera.DataAccess.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Smakosfera.DataAccess.Repositories;
using Smakosfera.Services.Interfaces;
using Smakosfera.Services.Models;
using Microsoft.AspNetCore.Authorization;

namespace Smakosfera.WebAPI.Controllers
{
    [ApiController]
    [Route("api/comment")]
    [Authorize]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpGet("{CommentId}")]
        public ActionResult<CommentDto> Get([FromRoute] int CommentId)
        {
            CommentDto comment = _commentService.GetComment(CommentId);

            return Ok(comment);
        }

        [HttpGet("recipes/{RecipeId}")]
        public ActionResult<IEnumerable<Comment>> GetAll(int RecipeId)
        {
            var comments = _commentService.GetComments(RecipeId);
            return Ok(comments);
        }

        [HttpPost]
        public ActionResult PostComment([FromBody] CommentDto comment)
        {
            _commentService.Add(comment);
            return Created($"ADD Comment", null);
        }

        [HttpPut("{CommentId}")]
        public ActionResult Update([FromRoute] int CommentId, [FromBody] CommentDto comment)
        {
            _commentService.Update(CommentId, comment);
            return Created($"Updated the comment", null);
        }

        [HttpDelete("{CommentId}")]
        public ActionResult Delete(int CommentId)
        {
            _commentService.Delete(CommentId);
            return Created($"Deleted the comment", null);
        }
    }
}
