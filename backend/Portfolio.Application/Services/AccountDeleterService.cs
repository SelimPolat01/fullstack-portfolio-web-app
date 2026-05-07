using Microsoft.AspNetCore.Identity;
using Portfolio.Application.DTO.Security;
using Portfolio.Application.DTO.Service;
using Portfolio.Application.ServiceContracts;
using Portfolio.Infrastructure.Identity;

namespace Portfolio.Application.Services
{
    public class AccountDeleterService : IAccountDeleterService
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public AccountDeleterService(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }
        public async Task<ServiceResult<AccountDeleteResponseDTO>> DeleteAccountAsync(string userId)
        {
            var existingUser = await _userManager.FindByIdAsync(userId);
            if (existingUser == null) return ServiceResult<AccountDeleteResponseDTO>.Fail("User not found.");
            IdentityResult result = await _userManager.DeleteAsync(existingUser);
            if (!result.Succeeded)
            {
                string errorMessage = string.Join("\n", result.Errors.Select(x => x.Description));
                return ServiceResult<AccountDeleteResponseDTO>.Fail(errorMessage);
            }
            return ServiceResult<AccountDeleteResponseDTO>.Ok(new AccountDeleteResponseDTO()
            {
                Message = "Account deleted successfully."
            });
        }
    }
}
