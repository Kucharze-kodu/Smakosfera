using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Smakosfera.Services.Interfaces;
using Smakosfera.Services.Models;
using System.Net.Http.Json;
using System.Text.Json.Serialization;

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

        [HttpGet]
        [Authorize]
        public ActionResult GetData()
        {
            var result = _accountService.GetUserInfo();
            return Ok(result);
        }

        [HttpPost]
        [Authorize]
        public ActionResult Update([FromBody] UserUpdateDto dto)
        {
            _accountService.Update(dto);
            return Ok();
        }

        [HttpPost("login")]
        public ActionResult Login([FromBody] UserLoginDto dto)
        {
            var result = _accountService.GenerateJWT(dto);
            return Ok(result);
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
