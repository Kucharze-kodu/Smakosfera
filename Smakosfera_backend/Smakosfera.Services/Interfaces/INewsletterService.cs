using Smakosfera.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.Services.Interfaces
{
    public interface INewsletterService
    {
        IEnumerable<OutputNewsletterDto> GetAllSubscribedUsers();

        OutputNewsletterDto GetUserInfo();
        void SendEmailsToSubscribed();
        void Toggle();
    }
}
