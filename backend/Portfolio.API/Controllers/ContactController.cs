using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Application.DTO;
using Portfolio.Core.ServiceContracts;

namespace Portfolio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class ContactController : ControllerBase
    {
        private readonly IContactAdderService _contactAdderService;

        public ContactController(IContactAdderService contactAdderService)
        {
            _contactAdderService = contactAdderService;
        }

        [HttpGet]
        public ActionResult GetContact()
        {
            return Ok("API is running");
        }

        [HttpPost]
        public async Task<ActionResult<ContactAddResponseDTO>> PostContact(ContactAddRequestDTO contact)
        {
            ContactAddResponseDTO result = await _contactAdderService.AddContactAsync(contact);
            return Ok(result);
        }
    }
}
