using Smakosfera.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.Services.Interfaces
{
    public interface IUserService
    {
        IEnumerable<UserDto> GetAllUsers();
        UserDto GetUserById(int userId);
        void DeleteUser(int userId);
        void Add();
    }
}
