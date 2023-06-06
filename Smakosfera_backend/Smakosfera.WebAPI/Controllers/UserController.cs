using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Smakosfera.Services.Interfaces;
using Smakosfera.Services.Models;

namespace Smakosfera.WebAPI.Controllers
{
    [Route("api/user")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<UserDto>> GetAll()
        {
            var users = _userService.GetAllUsers();
            return Ok(users);
        }

        [HttpGet("{userId}")]
        public ActionResult<UserDto> GetById([FromRoute] int userId)
        {
            var user = _userService.GetUserById(userId);
            return Ok(user);
        }

        [HttpPut("{userId}")]
        public ActionResult Ban([FromRoute] int userId, [FromBody] int days)
        {
            _userService.BanUser(userId, days);
            return Ok($"Użytkownik o id {userId} został zbanowany na {days} dni");
        }

        [HttpPut("{userId}/permission")]
        public ActionResult ChangePermission([FromRoute] int userId, [FromBody] string newPermission)
        {
            _userService.ChangePermission(userId, newPermission);
            return Ok("Zmieniono uprawnienia");
        }

        [HttpDelete("{userId}")]
        public ActionResult Delete([FromRoute] int userId)
        {
            _userService.DeleteUser(userId);
            return Ok("Użytkownik usunięty");
        }
    }
}
