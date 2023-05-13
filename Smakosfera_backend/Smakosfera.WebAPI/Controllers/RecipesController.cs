using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata;
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
            RecipeDto result = _recipesService.Get(id);

            return Ok(result); 
        }

        [HttpGet("/all")]
        public ActionResult<IEnumerable<RecipeDto>> GetAll()
        {
            var result = _recipesService.Browse();
            return Ok(result);
        }


        [HttpPost("/add")]
        public ActionResult Post([FromBody] RecipeDto dto)
        {
            _recipesService.Add(dto);
            return Created($"controller/recipe/_ADD_Recipe", null);
        }


    }
}
