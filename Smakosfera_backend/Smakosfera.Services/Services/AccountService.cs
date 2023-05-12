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
        private readonly IEmailService _emailService;

        public AccountService(SmakosferaDbContext dbContext, IEmailService emailService)
        {
            _dbContext = dbContext;
            _emailService = emailService;
        }

        public void RegisterUser(UserRegisterDto dto)
        {
            var isExist = _dbContext.Users
                .Any(r => r.Email == dto.Email);

            if(isExist)
            {
                throw new BadRequestException("Email jest zajety");
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

            SendVerifacation(user.Email, user.VerifacationToken);

        }

        public void VerifyUser(string token)
        {
            var user = _dbContext.Users
                .FirstOrDefault(r => r.VerifacationToken == token);

            if(user is null)
            {
                throw new BadRequestException("Nie mozna aktywowac konta");
            }

            user.VerifiedAt = DateTime.UtcNow;
            _dbContext.SaveChanges();
        }

        public void ForgotPassword(UserForgotPasswordDto dto)
        {
            var user = _dbContext.Users.FirstOrDefault(c => c.Email == dto.Email);

            if(user is null)
            {
                throw new NotFoundException("Nie znaleziono emaila");
            }

            user.PasswordResetToken = CreateRandomToken();
            user.ResetTokenExpires = DateTime.UtcNow.AddHours(1);
            _dbContext.SaveChanges();

            SendResetLink(user.Email, user.PasswordResetToken);
        }

        public void ResetPassword(string token, UserResetPasswordDto dto)
        {
            var user = _dbContext.Users.FirstOrDefault(c => c.PasswordResetToken == token);

            if(user is null)
            {
                throw new BadRequestException("Nie mozna zresetowac hasla");
            }

            if(user.ResetTokenExpires < DateTime.UtcNow)
            {
                throw new BadRequestException("Link wygasl");
            }

            user.PasswordHash = CreateHash(dto.NewPassword);
            user.PasswordResetToken = String.Empty;
            user.ResetTokenExpires = null;
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

        private void SendVerifacation(string email, string veryficationToken)
        {

            StringBuilder stringBuilder = new StringBuilder("");
            stringBuilder.Append("<h1>Witamy w Smakosferze!</h1><br>Dziękujemy za dołączenie. Kliknij poniższy link, aby aktywować swoje konto: <form action=\"https://localhost:7000/api/account/verify/");
            stringBuilder.Append(veryficationToken.ToString());
            stringBuilder.Append("\" method=\"POST\">\r\n    <button>Aktywacja</button>\r\n</form>");

            var message = new EmailDto()
            {
                To = email,
                Subject = "Aktywacja konta - Smakosfera",
                Body = stringBuilder.ToString()
            };

            _emailService.SendEmail(message);
        }

        private void SendResetLink(string email, string resetToken)
        {
            StringBuilder stringBuilder = new StringBuilder("");
            stringBuilder.Append("<h1>Witamy w Smakosferze!</h1><br>Poprosiłeś(aś) o zresetowanie hasła. Kliknij poniższy link, aby kontynuować: <form action=\"https://localhost:7000/api/account/reset-password/");
            stringBuilder.Append(resetToken.ToString());
            stringBuilder.Append("\" method=\"GET\">\r\n<button>Ustaw nowe hasło</button>\r\n</form>");

            var message = new EmailDto()
            {
                To = email,
                Subject = "Reset hasła - Smakosfera",
                Body = stringBuilder.ToString()
            };

            _emailService.SendEmail(message);
        }
    }
}
