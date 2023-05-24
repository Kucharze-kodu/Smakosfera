using Microsoft.AspNetCore.Mvc;
using Smakosfera.Services.Interfaces;
using Smakosfera.Services.Models;
using Smakosfera.Services.Services;

namespace Smakosfera.WebAPI.Controllers
{

    [ApiController]
    [Route("api/Ingredient")]
    public class IngredientController : ControllerBase
    {
        private readonly IIngredientService _ingredientService;

        public IngredientController(IIngredientService Service)
        {
            _ingredientService = Service;
        }


        [HttpGet("{id}")]
        public ActionResult<IngredientDto> Get(int id)
        {
            var result = _ingredientService.GetIngredient(id);
            return Ok(result);
        }

        [HttpGet]
        public ActionResult<IEnumerable<IngredientDto>> GetAll()
        {
            var result = _ingredientService.Browse();
            return Ok(result);
        }

        [HttpPost("Ingredient(skladnik)")]
        public ActionResult AddIngredient([FromBody] IngredientDto dto)
        {
            _ingredientService.AddIngredient(dto);
            return Ok();
        }

        [HttpPut("{IdIngredient}")]
        public ActionResult PostRecipes([FromRoute]int IdIngredient, [FromBody] IngredientDto dto)
        {
            _ingredientService.EditIngredient(IdIngredient, dto);
            return Created($"Update Ingredient ", null);
        }

        [HttpDelete("{IdIngredient}")]
        public ActionResult Delete([FromRoute] int IdIngredient)
        {
            _ingredientService.DeleteIngredient(IdIngredient);

            return Created($"Delete Ingredient", null);
        }
    }
}
