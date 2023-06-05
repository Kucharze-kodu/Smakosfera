using Smakosfera.DataAccess.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Smakosfera.DataAccess.Repositories;
using Smakosfera.Services.Interfaces;
using Smakosfera.Services.Models;
using Microsoft.AspNetCore.Authorization;

namespace Smakosfera.WebAPI.Controllers
{
    [ApiController]
    [Route("api/newsletter")]
    [Authorize]
    public class NewsletterController : ControllerBase
    {
        private readonly INewsletterService _newsletterService;

        public NewsletterController(INewsletterService newsletterService)
        {
            _newsletterService = newsletterService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public ActionResult<IEnumerable<OutputNewsletterDto>> GetAll()
        {
            var subscribedUsers = _newsletterService.GetAllSubscribedUsers();

            return Ok(subscribedUsers);
        }

        [HttpPost]
        public ActionResult Toggle()
        {
            _newsletterService.Toggle();

            return Ok($"Toggled subscription status");
        }

        [HttpPost("sendEmails")]
        [Authorize(Roles = "Admin")]
        public ActionResult SendEmails()
        {
            _newsletterService.SendEmailsToSubscribed();

            return Ok("Emails successfully sent");
        }
    }
}
