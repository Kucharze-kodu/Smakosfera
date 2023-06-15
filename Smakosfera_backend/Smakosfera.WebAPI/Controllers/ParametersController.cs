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

        [HttpGet("url")]
        public ActionResult GetUrl()
        {
            var url = _configuration.GetSection("URLFrontend");
            return Ok(url);
        }

        [HttpGet("email")]
        public ActionResult GetEmail()
        {
            var email = _configuration.GetSection("Email").GetSection("Password");
            return Ok(email);
        }
    }
}
