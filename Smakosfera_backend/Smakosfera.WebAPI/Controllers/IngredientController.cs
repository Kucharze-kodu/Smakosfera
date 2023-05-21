using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Smakosfera.DataAccess.Entities;
using Smakosfera.Services.Interfaces;
using Smakosfera.Services.Models;
using Smakosfera.Services.Services;

namespace Smakosfera.WebAPI.Controllers
{

    [Route("api/Ingredient")]
    [ApiController]
    public class IngredientController : ControllerBase
    {
        private readonly IIngredientService _ingredientService;


        public IngredientController(IngredientService Service)
        {
            _ingredientService = Service;
        }



        /*[HttpGet("{id}")]
        public ActionResult<IEnumerable<IngredientDto>> Get(int id)
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
        }*/
    }
}
