using Portfolio.Application.DTO.Security;
using Portfolio.Application.DTO.Service;

namespace Portfolio.Application.ServiceContracts
{
    public interface IAccountDeleterService
    {
        public Task<ServiceResult<AccountDeleteResponseDTO>> DeleteAccountAsync(string userId);
    }
}
