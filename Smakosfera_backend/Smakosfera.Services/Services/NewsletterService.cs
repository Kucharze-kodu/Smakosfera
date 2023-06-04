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
    public class NewsletterService: INewsletterService
    {
        private readonly SmakosferaDbContext _dbContext;
        private readonly IUserContextService _userContextService;
        private readonly IEmailService _emailService;

        public NewsletterService(
            SmakosferaDbContext dbContext,
            IUserContextService userContextService,
            IEmailService emailService)
        {
            _dbContext = dbContext;
            _userContextService = userContextService;
            _emailService = emailService;
        }

        public void Toggle()
        {
            int userId = _userContextService.GetUserId;

            var userInfo = _dbContext.Users.SingleOrDefault(u => u.Id == userId)
                ?? throw new BadRequestException("Uzytkownik nie istnieje");

            userInfo.Subscription = !userInfo.Subscription;
            _dbContext.SaveChanges();
           
        }

        public IEnumerable<OutputNewsletterDto> GetAllSubscribedUsers()
        {
            var subscribedUsersDto = _dbContext.Users.ToList()
                .FindAll(u => u.Subscription == true)
                .Select(user => new OutputNewsletterDto()
                {
                    Email = user.Email,
                    IsSubscribed = user.Subscription
                });

            return subscribedUsersDto;
            
        }

        public void SendEmailsToSubscribed()
        {
            var subscribedUsers = GetAllSubscribedUsers();

            foreach (var newsletterDto in subscribedUsers)
            {
                var emailDto = new EmailDto();
                emailDto.To = newsletterDto.Email;
                emailDto.Subject = $"Wiadomość newslettera serwisu Smakosfera";
                emailDto.Body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non aliquam nulla. Sed rutrum purus quam, vitae pulvinar ante euismod non. Donec congue placerat dapibus. Etiam facilisis nunc ut imperdiet tristique. Aliquam fringilla commodo nulla, in auctor orci dictum at. Donec molestie nibh ut justo viverra volutpat. Etiam ut lectus feugiat dolor hendrerit auctor eget vulputate velit. Nulla facilisi. Nullam at felis sapien. Donec molestie mattis lectus, id volutpat elit faucibus ut. Nam sed tincidunt nisl. Fusce porta egestas sollicitudin. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec laoreet at ligula in ornare. Aenean ut.";

                _emailService.SendEmail(emailDto);
            }
        }
    }
}
