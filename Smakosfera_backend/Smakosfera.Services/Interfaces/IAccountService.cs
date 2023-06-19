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
        UserInfoDto GetUserInfo();
        string Update(UserUpdateDto dto);
        void Delete();
        UserLoginResponseDto Login(UserLoginDto dto);
        void RegisterUser(UserRegisterDto dto);
        string VerifyUser(string token);
        void ForgotPassword(UserForgotPasswordDto dto);
        void ResetPassword(string token, UserResetPasswordDto dto);
        string ChangePassword(PasswordDto dto);
    }
}
