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
                .ToList();

            var usersDto = new List<UserDto>();

            foreach(var user in users)
            {
                var userDto = new UserDto()
                {
                    Id = user.Id,
                    Email = user.Email,
                    Name = user.Name,
                    Surname = user.Surname,
                    Subscription = user.Subscription,
                    Permission = user.Permission.Name,
                    AvatarFileName = user.AvatarFileName
                };

                if (user.VerifiedAt is not null)
                {
                    userDto.VerifiedAt = string.Format("{0:dd-MM-yyyy HH:mm}", user.VerifiedAt);
                }

                if (user.BanTime is not null)
                {
                    userDto.BanTime = string.Format("{0:dd-MM-yyyy HH:mm}", user.BanTime);
                }

                usersDto.Add(userDto);
            }
            return usersDto;
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
                Permission = user.Permission.Name,
                AvatarFileName = user.AvatarFileName
            };

            if(user.VerifiedAt is not null)
            {
                userDto.VerifiedAt = string.Format("{0:dd-MM-yyyy HH:mm}", user.VerifiedAt);
            }

            if(user.BanTime is not null)
            {
                userDto.BanTime = string.Format("{0:dd-MM-yyyy HH:mm}", user.BanTime);
            }

            return userDto;
        }

        public void BanUser(int userId, int days)
        {
            var user = GetUser(userId);

            user.BanTime = DateTime.UtcNow.AddDays(days);
            _dbContext.SaveChanges();
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
