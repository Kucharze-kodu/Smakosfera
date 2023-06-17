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
    [Route("api/like")]
    [Authorize]
    public class LikeController : ControllerBase
    {
        private readonly ILikeService _likeService;

        public LikeController(ILikeService likeService)
        {
            _likeService = likeService;
        }

        [HttpGet("{LikeId}")]
        public ActionResult<Like> Get([FromRoute] int LikeId)
        {
            Like like = _likeService.GetLike(LikeId);

            return Ok(like);
        }

        [HttpGet("recipes/{RecipeId}")]
        public ActionResult<IEnumerable<LikeDto>> GetAll([FromRoute] int RecipeId)
        {
            var likes = _likeService.GetAllLikes(RecipeId);

            return Ok(likes);
        }

        [HttpGet("counter/{RecipeId}")]
        public ActionResult<OutputLikeDto> GetAmount([FromRoute] int RecipeId)
        {
            var result = _likeService.GetLikesAmount(RecipeId);

            return Ok(result);
        }

        [HttpPut("{RecipeId}")]
        public ActionResult ToggleLike([FromRoute] int RecipeId)
        {
            _likeService.Toggle(RecipeId);

            return Ok();
        }
    }
}
