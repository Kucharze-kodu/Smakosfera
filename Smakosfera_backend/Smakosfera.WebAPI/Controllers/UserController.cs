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

        [HttpDelete("{userId}")]
        public ActionResult Delete([FromRoute] int userId)
        {
            _userService.DeleteUser(userId);
            return Ok("Użytkownik usunięty");
        }
    }
}
