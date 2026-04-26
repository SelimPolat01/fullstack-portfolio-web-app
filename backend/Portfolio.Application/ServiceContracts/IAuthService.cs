using Portfolio.Application.DTO;
using Portfolio.Infrastructure.Identity;

namespace Portfolio.Application.ServiceContracts
{
    public interface IAuthService
    {
        public Task<ServiceResult<AdminRegisterResponseDTO>> RegisterAdminAsync(AdminRegisterRequestDTO request);

        public Task<ServiceResult<AdminLoginResponseDTO>> LoginAdminAsync(AdminLoginRequestDTO request);

        public AuthenticationResponseDTO CreateJwtToken(ApplicationUser user, IEnumerable<string> roles);

        public string GenerateRefreshToken();

        public Task LogoutAdminAsync(string? userId);
    }
}
