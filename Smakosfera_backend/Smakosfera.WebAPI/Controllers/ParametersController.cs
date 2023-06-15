using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Smakosfera.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
    }
}
