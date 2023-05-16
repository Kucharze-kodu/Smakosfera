using Smakosfera.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.Services.Interfaces
{
    public interface IAccountService
    {
        string GenerateJWT(UserLoginDto dto);
        void RegisterUser(UserRegisterDto dto);
        void VerifyUser(string token);
        void ForgotPassword(UserForgotPasswordDto dto);
        void ResetPassword(string token, UserResetPasswordDto dto);
    }
}
