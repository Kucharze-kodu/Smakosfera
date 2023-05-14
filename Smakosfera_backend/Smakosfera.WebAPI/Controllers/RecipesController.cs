using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Smakosfera.DataAccess.Repositories;
using Smakosfera.Services.Interfaces;
using Smakosfera.Services.Models;

namespace Smakosfera.WebAPI.Controllers
{

    [ApiController]
    [Route("[/controller/recipe]")]
    public class RecipesController : ControllerBase
    {
        private readonly IRecipesService _recipesService;

        public RecipesController(SmakosferaDbContext smakosfera, IRecipesService recipesService)
        {
            _recipesService = recipesService;
        }


        [HttpGet("/{id}")]
        public ActionResult<RecipeDto> Get(int id) 
        {
            RecipeDto result = _recipesService.GetRecipe(id);

            return Ok(result); 
        }

        [HttpGet("/all")]
        public ActionResult<IEnumerable<RecipeDto>> GetAll()
        {
            var result = _recipesService.Browse();
            return Ok(result);
        }


        [HttpPost("/add")]
        public ActionResult PostRecipes([FromBody] RecipeDto dto)
        {
            _recipesService.Add(dto);
            return Created($"controller/recipe/_ADD_Recipe", null);
        }

        [HttpPut("/set{idRecipe}")]
        public ActionResult Update([FromRoute] int idRecipe, [FromBody] RecipeDto dto)
        {
            var isUpdated = _recipesService.Update(idRecipe, dto);


            return Created($"controller/recipe/_Update_Recipe", isUpdated);
        }

        [HttpDelete("/{id}")]
        public ActionResult Delete([FromRoute] int id)
        {
            var isDeleted = _recipesService.Delete(id);

            /*            if (isDeleted) 
                        {
                               return NoContent();
                        }
                        return NotFound();*/
            return Created($"controller/recipe/_Update_Recipe", isDeleted);
        }
    }
}
