using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Application.DTO.Admin;
using Portfolio.Application.DTO.PersonalInfo;
using Portfolio.Application.DTO.Security;
using Portfolio.Application.ServiceContracts;
using Portfolio.Infrastructure.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Portfolio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IAuthService _authService;
        private readonly IEmailGetterService _emailGetterService;
        private readonly IPasswordPutterService _passwordPutterService;
        private readonly IEmailPutterService _emailPutterService;
        private readonly IAccountDeleterService _accountDeleterService;

        public AdminController(UserManager<ApplicationUser> userManager, IAuthService authService, IEmailGetterService emailGetterService, IEmailPutterService emailPutterService, IPasswordPutterService passwordPutterService, IAccountDeleterService accountDeleterService)
        {
            _userManager = userManager;
            _authService = authService;
            _emailGetterService = emailGetterService;
            _passwordPutterService = passwordPutterService;
            _emailPutterService = emailPutterService;
            _accountDeleterService = accountDeleterService;
        }

        [HttpPost]
        [Route("register")]
        [Authorize("NotAuthenticated")]

        public async Task<ActionResult> PostAdminRegister(AdminRegisterRequestDTO adminRegisterRequestDTO)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var result = await _authService.RegisterAdminAsync(adminRegisterRequestDTO);
            if (!result.Success) return BadRequest(new { message = result.Message });
            return Ok(result.Data);
        }

        [HttpPost]
        [Route("login")]
        [Authorize("NotAuthenticated")]
        public async Task<ActionResult> PostLogin(AdminLoginRequestDTO adminLoginRequestDTO)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var result = await _authService.LoginAdminAsync(adminLoginRequestDTO);
            if (!result.Success) return BadRequest(new { message = result.Message });
            return Ok(result.Data);
        }

        [HttpPost]
        [Route("logout")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> PostLogout()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue(JwtRegisteredClaimNames.Sub);
            if (userId == null) return Unauthorized();
            await _authService.LogoutAdminAsync(userId);
            return Ok(new { message = "Logged out successfully" });
        }

        [HttpGet]
        [Route("personal-info")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> GetPersonalInfo()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            if (email == null) return Unauthorized(new { message = "User not found." });
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return NotFound("User not found.");
            var personalInfoDto = new PersonalInfoGetResponseDTO()
            {
                Name = user.Name,
                Surname = user.Surname,
                Title = user.Title,
                About = user.About,
                ProfileImageUrl = user.ProfileImageUrl ?? string.Empty,
                CvUrl = user.CvUrl ?? string.Empty,
            };
            return Ok(personalInfoDto);
        }

        [HttpPut]
        [Route("personal-info")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> PutPersonalInfo(PersonalInfoAddRequestDTO personalInfoAddRequestDTO)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized(new { message = "User not found." });
            user.Name = personalInfoAddRequestDTO.Name;
            user.Surname = personalInfoAddRequestDTO.Surname;
            user.Title = personalInfoAddRequestDTO.Title;
            user.About = personalInfoAddRequestDTO.About;
            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded) return Ok(new { message = "Informations updated successfully." });
            return BadRequest(result.Errors);
        }

        [HttpPut]
        [Route("update-password")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> PutPassword(PasswordUpdateRequestDTO passwordUpdateRequestDTO)
        {
            var userId = User.FindFirstValue(JwtRegisteredClaimNames.Sub) ?? User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId)) return Unauthorized("User session not found.");
            var result = await _passwordPutterService.PutPasswordAsync(passwordUpdateRequestDTO, userId);
            if (!result.Success) return BadRequest(result);
            return Ok(result);
        }

        [HttpGet]
        [Route("get-email")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> GetEmailAsync()
        {
            var userId = User.FindFirstValue(JwtRegisteredClaimNames.Sub) ?? User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId)) return Unauthorized("User session not found.");
            var result = await _emailGetterService.GetEmailAsync(userId);
            if (!result.Success) return BadRequest(result);
            return Ok(result.Data);
        }

        [HttpPut]
        [Route("update-email")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> PutEmail(EmailUpdateRequestDTO emailUpdateRequestDTO)
        {
            var userId = User.FindFirstValue(JwtRegisteredClaimNames.Sub) ?? User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId)) return Unauthorized("User session not found.");
            var result = await _emailPutterService.PutEmailAsync(emailUpdateRequestDTO, userId);
            if (!result.Success) return BadRequest(result);
            return Ok(result.Data);
        }

        [HttpDelete]
        [Route("delete-account")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteAccount()
        {
            var userId = User.FindFirstValue(JwtRegisteredClaimNames.Sub) ?? User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized("User session not found.");
            var result = await _accountDeleterService.DeleteAccountAsync(userId);
            if (!result.Success) return BadRequest(result);
            return Ok(result);
        }

        [HttpGet]
        [Route("is-email-already-registered")]
        public async Task<ActionResult> IsEmailAlreadyRegistered([FromQuery] string email)
        {
            var isEmailTaken = await _authService.IsEmailAlreadyRegistered(email);
            return Ok(new { isAvailable = isEmailTaken.Success, message = isEmailTaken.Message });
        }
    }
}
