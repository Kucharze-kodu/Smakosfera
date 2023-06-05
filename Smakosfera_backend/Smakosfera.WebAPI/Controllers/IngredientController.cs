using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Smakosfera.Services.Interfaces;
using Smakosfera.Services.Models;
using Smakosfera.Services.Services;

namespace Smakosfera.WebAPI.Controllers
{

    [ApiController]
    [Route("api/ingredient")]
    [Authorize]
    public class IngredientController : ControllerBase
    {
        private readonly IIngredientService _ingredientService;

        public IngredientController(IIngredientService ingredientService)
        {
            _ingredientService = ingredientService;
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

        [HttpPost]
        [Authorize]
        public ActionResult AddIngredient([FromBody] IngredientDto dto)
        {
            _ingredientService.AddIngredient(dto);
            return Ok();
        }

        [HttpPut("{IdIngredient}")]
        [Authorize(Roles = "Admin,Moderator")]
        public ActionResult PostRecipes([FromRoute]int IdIngredient, [FromBody] IngredientDto dto)
        {
            _ingredientService.EditIngredient(IdIngredient, dto);
            return Ok();
        }

        [HttpDelete("{IdIngredient}")]
        [Authorize(Roles = "Admin,Moderator")]
        public ActionResult Delete([FromRoute] int IdIngredient)
        {
            _ingredientService.DeleteIngredient(IdIngredient);

            return Ok();
        }
    }
}
