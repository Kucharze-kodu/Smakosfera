using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Smakosfera.DataAccess.Repositories;
using Smakosfera.Services.Interfaces;
using Smakosfera.Services.Models;

namespace Smakosfera.WebAPI.Controllers
{

    [ApiController]
    [Route("api/recipe")]
    public class RecipesController : ControllerBase
    {
        private readonly IRecipesService _recipesService;

        public RecipesController(IRecipesService recipesService)
        {
            _recipesService = recipesService;
        }


        [HttpGet("{id}")]
        public ActionResult<RecipeDto> Get(int id)
        {
            var result = _recipesService.GetRecipe(id);

            return Ok(result);
        }

        [HttpGet]
        public ActionResult<IEnumerable<RecipeIDDto>> GetAll()
        {
            var result = _recipesService.Browse();
            return Ok(result);
        }


        [HttpPost]
        [Authorize]
        public ActionResult PostRecipes([FromBody] RecipeDto dto)
        {
            _recipesService.Add(dto);
            return Created($"ADD Recipe", null);
        }

        [HttpPut("{idRecipe}")]
        public ActionResult Update([FromRoute] int idRecipe, [FromBody] RecipeDto dto)
        {
            _recipesService.Update(idRecipe, dto);


            return Created($"Update Recipe" , null);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete([FromRoute] int id)
        {
            _recipesService.Delete(id);

            return Created($"Update Recipe", null);
        }
    }
}
