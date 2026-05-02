using Portfolio.Application.DTO.Admin;
using Portfolio.Application.DTO.Auth;
using Portfolio.Application.DTO.Service;
using Portfolio.Infrastructure.Identity;

namespace Portfolio.Application.ServiceContracts
{
    public interface IAuthService
    {
        public Task<ServiceResult<AdminRegisterResponseDTO>> RegisterAdminAsync(AdminRegisterRequestDTO adminRegisterRequestDTO);

        public Task<ServiceResult<AdminLoginResponseDTO>> LoginAdminAsync(AdminLoginRequestDTO adminLoginRequestDTO);

        public AuthenticationResponseDTO CreateJwtToken(ApplicationUser user, IEnumerable<string> roles);

        public string GenerateRefreshToken();

        public Task LogoutAdminAsync(string? userId);
    }
}
