using Smakosfera.DataAccess.Entities;
using Smakosfera.DataAccess.Repositories;
using Smakosfera.Services.Exceptions;
using Smakosfera.Services.Interfaces;
using Smakosfera.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.Services.Services
{
    public class AccountService : IAccountService
    {
        private readonly SmakosferaDbContext _dbContext;

        public AccountService(SmakosferaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void RegisterUser(UserRegisterDto dto)
        {
            var isExist = _dbContext.Users
                .Any(r => r.Email == dto.Email);

            if(isExist)
            {
                throw new BadRequestException("Email is taken");
            }

            var user = new User()
            {
                Name = dto.Name,
                Surname = dto.Surname,
                Email = dto.Email,
                PasswordHash = CreateHash(dto.Password),
                VerifacationToken = CreateRandomToken()
            };

            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();


        }

        private byte[] CreateHash(string password)
        {
            using(var md5 = MD5.Create())
            {
                var result = md5.ComputeHash(Encoding.ASCII.GetBytes(password));
                return result;
            }
        }

        private string CreateRandomToken()
        {
            return Convert.ToHexString(RandomNumberGenerator.GetBytes(64));
        }
    }
}
