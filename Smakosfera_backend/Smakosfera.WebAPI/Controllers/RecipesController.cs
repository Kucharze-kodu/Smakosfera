using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Smakosfera.DataAccess.Entities;
using Smakosfera.DataAccess.Repositories;
using Smakosfera.Services.Interfaces;
using Smakosfera.Services.Models;

namespace Smakosfera.WebAPI.Controllers
{

    [ApiController]
    [Route("api/recipe")]
    [Authorize]
    public class RecipesController : ControllerBase
    {
        private readonly IRecipesService _recipesService;

        public RecipesController(IRecipesService recipesService)
        {
            _recipesService = recipesService;
        }


        [HttpGet("{id}")]
        public ActionResult<RecipeResponseDto> Get(int id)
        {
            var result = _recipesService.GetRecipe(id);

            return Ok(result);
        }

        [HttpGet("to-confirmed-detail/{id}")]
        [Authorize(Roles = "Admin,Moderator")]
        public ActionResult<RecipeResponseDto> GetToConfirmed(int id)
        {
            var result = _recipesService.GetRecipeToConfirmed(id);

            return Ok(result);
        }

        [HttpGet]
        public ActionResult<IEnumerable<RecipeResponseDto>> GetAll()
        {
            var result = _recipesService.Browse();
            return Ok(result);
        }

        [HttpGet("to-confirmed-all")]
        [Authorize(Roles = "Admin,Moderator")]
        public ActionResult<IEnumerable<RecipeResponseDto>> GetAllToConfirmed()
        {
            var result = _recipesService.BrowseToConfirmed();
            return Ok(result);
        }

        [HttpGet("random")]
        public ActionResult<RecipeResponseDto> GetRandom()
        {
            var result = _recipesService.GetRandomRecipe();
            return Ok(result);
        }

        [HttpGet("recipe-like")]
        public ActionResult<RecipeResponseDto> GetRecipeLike()
        {
            var result = _recipesService.BrowseRecipeLike();
            return Ok(result);
        }


        [HttpPost]
        [Authorize(Roles = "User,Admin,Moderator")]
        public ActionResult PostRecipes([FromBody] RecipeDto dto)
        {
            _recipesService.Add(dto);
            return Created($"ADD Recipe", null);
        }

        [HttpPut("{idRecipe}")]
        [Authorize(Roles = "Admin,Moderator")]
        public ActionResult Update([FromRoute] int idRecipe, [FromBody] RecipeDto dto)
        {
            _recipesService.Update(idRecipe, dto);


            return Created($"Update Recipe" , null);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Moderator")]
        public ActionResult Delete([FromRoute] int id)
        {
            _recipesService.Delete(id);

            return Created($"Update Recipe", null);
        }

        [HttpPut("verification/{id}")]
        [Authorize(Roles = "Admin,Moderator")]
        public ActionResult ApplyRecipe([FromRoute] int id)
        {
            _recipesService.ApplyRecipe(id);


            return Created($"Apply Recipe", null);
        }

    }
}
