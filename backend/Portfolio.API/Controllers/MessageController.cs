using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Application.DTO;
using Portfolio.Application.ServiceContracts;
using Portfolio.Core.ServiceContracts;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Portfolio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IMessageAdderService _contactAdderService;
        private readonly IMessageGetterService _messageGetterService;

        public MessageController(IMessageAdderService contactAdderService, IMessageGetterService messageGetterService)
        {
            _contactAdderService = contactAdderService;
            _messageGetterService = messageGetterService;
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult GetRun()
        {
            return Ok("API is running");
        }

        [HttpGet]
        [Route("all-messages")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> GetAllMessages()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier ?? JwtRegisteredClaimNames.Sub);
            if (userId == null) return Unauthorized();
            var result = await _messageGetterService.GetAllMessagesAsync();
            if (!result.Success) return BadRequest(result.Message);
            return Ok(result.Data);
        }

        [HttpGet]
        [Route("{messageId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> GetMessage(Guid messageId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier ?? JwtRegisteredClaimNames.Sub);
            if (userId == null) return Unauthorized();
            var result = await _messageGetterService.GetMessageAsync(messageId);
            if (!result.Success) return BadRequest(result.Message);
            return Ok(result.Data);
        }

        [HttpPost]
        [Authorize("NotAuthenticated")]
        public async Task<ActionResult<MessageAddResponseDTO>> PostMessage(MessageAddRequestDTO contact)
        {
            MessageAddResponseDTO result = await _contactAdderService.AddContactAsync(contact);
            return Ok(result);
        }
    }
}
