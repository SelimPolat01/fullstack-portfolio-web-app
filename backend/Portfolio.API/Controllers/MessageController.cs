using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Application.DTO.Message;
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
        private readonly IMessageAdderService _messageAdderService;
        private readonly IMessageGetterService _messageGetterService;
        private readonly IMessagePatcherService _messagePatcherService;


        public MessageController(IMessageAdderService contactAdderService, IMessageGetterService messageGetterService, IMessagePatcherService messagePatcherService)
        {
            _messageAdderService = contactAdderService;
            _messageGetterService = messageGetterService;
            _messagePatcherService = messagePatcherService;
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
            var result = await _messageAdderService.AddMessageAsync(contact);
            return Ok(result);
        }

        [HttpPatch]
        [Route("{messageId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> PatchMessageRead(Guid messageId)
        {
            var result = await _messagePatcherService.PatchMessageAsync(messageId);
            if (!result.Success) return BadRequest(result.Message);
            return Ok(new { message = result.Message });
        }
    }
}
