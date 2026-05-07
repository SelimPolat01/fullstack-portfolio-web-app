using Microsoft.AspNetCore.Identity;
using Portfolio.Application.DTO.Security;
using Portfolio.Application.DTO.Service;
using Portfolio.Application.ServiceContracts;
using Portfolio.Infrastructure.Identity;

namespace Portfolio.Application.Services
{
    public class EmailGetterService : IEmailGetterService
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public EmailGetterService(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }
        public async Task<ServiceResult<EmailUpdateResponseDTO>> GetEmailAsync(string userId)
        {
            ApplicationUser? existingUser = await _userManager.FindByIdAsync(userId);
            if (existingUser == null) return ServiceResult<EmailUpdateResponseDTO>.Fail("User not found.");
            string? result = await _userManager.GetEmailAsync(existingUser);
            return ServiceResult<EmailUpdateResponseDTO>.Ok(new EmailUpdateResponseDTO()
            {
                Email = result,
                Message = "Email received successfully "
            });
        }
    }
}
