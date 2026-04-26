using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Application.DTO;
using Portfolio.Application.ServiceContracts;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Portfolio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AdminController(IAuthService authService)
        {
            _authService = authService;
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
            var userId = User.FindFirstValue(JwtRegisteredClaimNames.Sub);
            if (userId == null) return Unauthorized();
            await _authService.LogoutAdminAsync(userId);
            return Ok(new { Message = "Logged out successfully" });
        }
    }
}
