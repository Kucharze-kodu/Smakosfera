using Microsoft.AspNetCore.Mvc;
using Smakosfera.Services.Interfaces;
using Smakosfera.Services.Models;

namespace Smakosfera.WebAPI.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("register")]
        public ActionResult Register([FromBody] UserRegisterDto dto)
        {
            _accountService.RegisterUser(dto);
            return Ok();
        }

    }
}
