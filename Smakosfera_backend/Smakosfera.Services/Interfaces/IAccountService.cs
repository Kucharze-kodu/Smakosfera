﻿using Smakosfera.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.Services.Interfaces
{
    public interface IAccountService
    {
        void RegisterUser(UserRegisterDto dto);
    }
}
