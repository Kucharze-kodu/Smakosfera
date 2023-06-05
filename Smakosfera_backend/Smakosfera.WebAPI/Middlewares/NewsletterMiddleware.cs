using Smakosfera.Services.Interfaces;
using System.Text;

namespace Smakosfera.WebAPI.Middlewares
{
    public class NewsletterMiddleware : IMiddleware
    {
        private readonly INewsletterService _newsletterService;
        public NewsletterMiddleware(INewsletterService newsletterService)
        {
            _newsletterService = newsletterService;
        }
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            await next.Invoke(context);
            var path = Directory.GetCurrentDirectory();
            path += $"\\NewsletterFiles\\lastSendingDate.txt";

            if(!System.IO.File.Exists(path))
            {
                var data = DateTime.Now.AddDays(-8).ToString();
                File.WriteAllText(path, data);
            }

            var fileContent = File.ReadAllText(path);
            var lastSent = DateTime.Parse(fileContent);
            if(lastSent < DateTime.Now.AddDays(-7))
            {
                _newsletterService.SendEmailsToSubscribed();
                File.WriteAllText(path, DateTime.Now.ToString());
            }

        }
    }
}
