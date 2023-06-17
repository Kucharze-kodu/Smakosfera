using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Smakosfera.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class ParametersController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public ParametersController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public ActionResult GetInfo()
        {
            var connectionString = _configuration.GetConnectionString("DbConnection");
            return Ok(connectionString);
        }

        [HttpGet("{param}")]
        public ActionResult GetOneParam([FromRoute] string param)
        {
            var result = _configuration.GetSection(param);
            return Ok(result);
        }

        [HttpGet("{param1}/{param2}")]
        public ActionResult GetTwoParams([FromRoute] string param1, [FromRoute] string param2)
        {
            var result = _configuration.GetSection(param1).GetSection(param2);
            return Ok(result);
        }
    }
}
