using Microsoft.AspNetCore.Identity;
using Portfolio.Application.DTO.Security;
using Portfolio.Application.DTO.Service;
using Portfolio.Application.ServiceContracts;
using Portfolio.Core.Helpers;
using Portfolio.Infrastructure.Identity;

namespace Portfolio.Application.Services
{
    public class PasswordPutterService : IPasswordPutterService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        public PasswordPutterService(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }
        public async Task<ServiceResult<PasswordUpdateResponseDTO>> PutPasswordAsync(PasswordUpdateRequestDTO passwordUpdateRequestDTO, string userId)
        {
            ValidationHelper.ModelValidation(passwordUpdateRequestDTO);
            ApplicationUser? existingUser = await _userManager.FindByIdAsync(userId);
            if (existingUser == null) return ServiceResult<PasswordUpdateResponseDTO>.Fail("User not found.");
            IdentityResult identityResult = await _userManager.ChangePasswordAsync(existingUser, passwordUpdateRequestDTO.CurrentPassword, passwordUpdateRequestDTO.Password);
            if (!identityResult.Succeeded)
            {
                var firstError = identityResult.Errors.FirstOrDefault()?.Description ?? "Update failed.";
                return ServiceResult<PasswordUpdateResponseDTO>.Fail(firstError);
            }
            return ServiceResult<PasswordUpdateResponseDTO>.Ok(new PasswordUpdateResponseDTO()
            {
                Message = "Password updated successfully."
            });
        }
    }
}
