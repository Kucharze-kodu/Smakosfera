using Microsoft.EntityFrameworkCore;
using Smakosfera.DataAccess.Entities;
using Smakosfera.DataAccess.Repositories;
using Smakosfera.Services.Exceptions;
using Smakosfera.Services.Interfaces;
using Smakosfera.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.Services.Services
{
    public class UserService : IUserService
    {
        private readonly SmakosferaDbContext _dbContext;

        public UserService(SmakosferaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Add()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<UserDto> GetAllUsers()
        {
            var users = _dbContext.Users
                .Include(r => r.Permission)
                .Select(r => new UserDto()
                {
                    Id = r.Id,
                    Email = r.Email,
                    Name = r.Name,
                    Surname = r.Surname,
                    Subscription = r.Subscription,
                    VerifiedAt = string.Format("{0:dd-MM-yyyy HH:mm}", r.VerifiedAt),
                    Permission = r.Permission.Name,
                    AvatarFileName = r.AvatarFileName
                })
                .ToList();
            return users;
        }

        public UserDto GetUserById(int userId)
        {
            var user = GetUser(userId);

            var userDto = new UserDto()
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                Surname = user.Surname,
                Subscription = user.Subscription,
                VerifiedAt = string.Format("{0:dd-MM-yyyy HH:mm}", user.VerifiedAt),
                Permission = user.Permission.Name,
                AvatarFileName = user.AvatarFileName
            };

            return userDto;
        }

        public void DeleteUser(int userId)
        {
            var user = GetUser(userId);

            _dbContext.Users.Remove(user);
            _dbContext.SaveChanges();
        }

        private User GetUser(int userId)
        {
            var user = _dbContext.Users
                .Include(r => r.Permission)
                .FirstOrDefault(r => r.Id == userId);

            if(user is null)
            {
                throw new NotFoundException("Użytkownik nie istnieje!");
            }

            return user;
        }
    }
}
