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
    [Route("api/rate")]
    [Authorize]
    public class RateController : ControllerBase
    {
        private readonly IRateService _rateService;

        public RateController(IRateService rateService)
        {
            _rateService = rateService;
        }

        [HttpGet()]
        public ActionResult<UserRateDto> Get()
        {
            var rating = _rateService.GetRating();

            return Ok(rating);
        }

        [HttpGet("average/{RecipeId}")]
        public ActionResult<RecipeRateDto> GetAverage([FromRoute] int RecipeId)
        {
            var averateRating = _rateService.GetAverage(RecipeId);

            return Ok(averateRating);
        }

        [HttpPost]
        public ActionResult SetRate([FromBody] RateDto rateDto)
        {
            _rateService.Set(rateDto);

            return Ok($"Updated selected rate");
        }

        [HttpDelete("{RecipeId}")]
        public ActionResult DeleteRate([FromRoute] int RecipeId)
        {
            _rateService.DeleteByRecipeId(RecipeId);

            return Ok($"Deleted selected rate");
        }

        [HttpDelete]
        [Authorize(Roles = "Admin")]
        public ActionResult DeleteRateById(int RateId)
        {
            _rateService.DeleteByRateId(RateId);

            return Ok($"Deleted selected rate");
        }
    }
}
