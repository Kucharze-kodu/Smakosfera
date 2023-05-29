using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Utilities;
using Smakosfera.DataAccess.Entities;
using Smakosfera.DataAccess.Repositories;
using Smakosfera.Services.Exceptions;
using Smakosfera.Services.Interfaces;
using Smakosfera.Services.Models;
using Smakosfera.Services.Settings;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.Services.Services
{
    public class AccountService : IAccountService
    {
        private readonly SmakosferaDbContext _dbContext;
        private readonly IEmailService _emailService;
        private readonly AuthenticationSettings _authenticationSettings;
        private readonly HostSettings _host;

        public AccountService(
            SmakosferaDbContext dbContext,
            IEmailService emailService,
            AuthenticationSettings authenticationSettings,
            HostSettings host)
        {
            _dbContext = dbContext;
            _emailService = emailService;
            _authenticationSettings = authenticationSettings;
            _host = host;
        }

        public UserLoginResponseDto GenerateJWT(UserLoginDto dto)
        {
            var user = _dbContext.Users
                .Include(r => r.Permission)
                .FirstOrDefault(c => c.Email == dto.Email);

            var hashedPassword = CreateHash(dto.Password);

            if(user is null || user.PasswordHash != hashedPassword)
            {
                throw new BadRequestException("Nieprawidlowy email lub haslo");
            }

            if(user.VerifiedAt is null) 
            {
                throw new BadRequestException("Konto nie zostalo aktywowane");
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, dto.Email),
                new Claim(ClaimTypes.Name, $"{user.Name} {user.Surname}"),
                new Claim(ClaimTypes.Role, user.Permission.Name),
                new Claim("Subscription", user.Subscription.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authenticationSettings.JwtKey));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(_authenticationSettings.JwtExpireDays);

            var token = new JwtSecurityToken(
                _authenticationSettings.JwtIssuer,
                _authenticationSettings.JwtIssuer,
                claims,
                expires: expires,
                signingCredentials: cred);

            var tokenHandler = new JwtSecurityTokenHandler();
            var userDto = new UserLoginResponseDto()
            {
                Name = user.Name,
                Surname = user.Surname,
                PermissionName = user.Permission.Name,
                Token = tokenHandler.WriteToken(token)
            };
            
            return userDto;
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
            user.VerifacationToken = null;
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
            user.PasswordResetToken = null;
            user.ResetTokenExpires = null;
            _dbContext.SaveChanges();
        }

        private string CreateHash(string password)
        {
            using (var md5 = MD5.Create())
            {
                return string.Join("", md5.ComputeHash(Encoding.ASCII.GetBytes(password))
                    .Select(x => x.ToString("X2")));
            }
            //using (var md5 = MD5.Create())
            //{
            //    var result = md5.ComputeHash(Encoding.ASCII.GetBytes(password));
            //    return Encoding.ASCII.GetString(result);
            //}
        }

        private string CreateRandomToken()
        {
            return Convert.ToHexString(RandomNumberGenerator.GetBytes(64));
        }

        private void SendVerifacation(string email, string veryficationToken)
        {

            StringBuilder stringBuilder = new StringBuilder("");
            stringBuilder.Append("<h1>Witamy w Smakosferze!</h1><br>Dziękujemy za dołączenie. Kliknij poniższy link, aby aktywować swoje konto: <form action=\"");
            stringBuilder.Append(_host.Url.ToString());
            stringBuilder.Append("api/account/verify/");
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
            stringBuilder.Append("<h1>Witamy w Smakosferze!</h1><br>Poprosiłeś(aś) o zresetowanie hasła. Kliknij poniższy link, aby kontynuować: <form action=\"");
            stringBuilder.Append(_host.Url.ToString());
            stringBuilder.Append("api/account/reset-password/");
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
