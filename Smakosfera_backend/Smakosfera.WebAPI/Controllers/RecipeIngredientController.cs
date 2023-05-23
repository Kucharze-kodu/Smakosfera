using Microsoft.AspNetCore.Mvc;
using Smakosfera.DataAccess.Entities;
using Smakosfera.Services.Interfaces;

namespace Smakosfera.WebAPI.Controllers
{

    namespace Smakosfera.WebAPI.Controllers
    {

        [ApiController]
        [Route("api/RecipeIngredient")]
        public class RecipeIngredientController : ControllerBase
        {
            private readonly IRecipeIngredientService _recipeIngredientService;

            public RecipeIngredientController(IRecipeIngredientService service)
            {
                _recipeIngredientService = service;
            }
        }





    }
}
