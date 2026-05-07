using Microsoft.AspNetCore.Identity;
using Portfolio.Application.DTO.Security;
using Portfolio.Application.DTO.Service;
using Portfolio.Application.ServiceContracts;
using Portfolio.Core.Helpers;
using Portfolio.Infrastructure.Identity;

namespace Portfolio.Application.Services
{
    public class EmailPutterService : IEmailPutterService
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public EmailPutterService(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<ServiceResult<EmailUpdateResponseDTO>> PutEmailAsync(EmailUpdateRequestDTO emailUpdateRequestDTO, string userId)
        {
            ValidationHelper.ModelValidation(emailUpdateRequestDTO);
            ApplicationUser? existingUser = await _userManager.FindByIdAsync(userId);
            if (existingUser == null) return ServiceResult<EmailUpdateResponseDTO>.Fail("User not found.");
            string token = await _userManager.GenerateChangeEmailTokenAsync(existingUser, emailUpdateRequestDTO.Email);
            IdentityResult result = await _userManager.ChangeEmailAsync(existingUser, emailUpdateRequestDTO.Email, token);
            if (!result.Succeeded)
            {
                string firstError = result.Errors.FirstOrDefault()?.Description ?? "Update failed.";
                return ServiceResult<EmailUpdateResponseDTO>.Fail(firstError);
            }
            await _userManager.SetUserNameAsync(existingUser, emailUpdateRequestDTO.Email);
            await _userManager.UpdateAsync(existingUser);
            return ServiceResult<EmailUpdateResponseDTO>.Ok(new EmailUpdateResponseDTO()
            {
                Email = emailUpdateRequestDTO.Email,
                Message = "Email updated successfully."
            });
        }
    }
}
