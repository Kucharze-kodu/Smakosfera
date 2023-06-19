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

        [HttpPut]
        [Authorize]
        public ActionResult Update([FromBody] UserUpdateDto dto)
        {
            var result = _accountService.Update(dto);
            return Ok(result);
        }

        [HttpDelete]
        [Authorize]
        public ActionResult Delete()
        {
            _accountService.Delete();
            return Ok();
        }

        [HttpPost("login")]
        public ActionResult Login([FromBody] UserLoginDto dto)
        {
            var result = _accountService.Login(dto);
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
            var url = _accountService.VerifyUser(token);
            return Ok("Konto zostało aktywowane");
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

        [HttpPut("password")]
        public ActionResult ChangePassword([FromBody] PasswordDto dto)
        {
            var tokenDto = _accountService.ChangePassword(dto);
            return Ok(tokenDto);
        }
    }
}
