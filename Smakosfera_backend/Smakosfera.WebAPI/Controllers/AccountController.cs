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

        [HttpPost("login")]
        public ActionResult Login([FromBody] UserLoginDto dto)
        {
            var token = _accountService.GenerateJWT(dto);
            return Ok(token);
        }

        [HttpPost("register")]
        public ActionResult Register([FromBody] UserRegisterDto dto)
        {
            _accountService.RegisterUser(dto);
            return Ok();
        }

        [HttpPost("verify/{token}")]
        public ActionResult VerifyAccount([FromRoute] string token)
        {
            _accountService.VerifyUser(token);
            return Ok("Konto aktywowane");
        }

        [HttpPost("forgot-password")]
        public ActionResult ForgotPassword([FromBody] UserForgotPasswordDto dto)
        {
            _accountService.ForgotPassword(dto);
            return Ok("Wysłano link do zresetowania hasła na maila");
        }

        [HttpPost("reset-password/{token}")]
        public ActionResult ResetPassword([FromRoute] string token,
            [FromBody] UserResetPasswordDto dto)
        {
            _accountService.ResetPassword(token, dto);
            return Ok("Pomyslnie zresetowano haslo");
        }
    }
}
