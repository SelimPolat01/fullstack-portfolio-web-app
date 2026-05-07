using Portfolio.Application.DTO.Security;
using Portfolio.Application.DTO.Service;

namespace Portfolio.Application.ServiceContracts
{
    public interface IEmailGetterService
    {
        public Task<ServiceResult<EmailUpdateResponseDTO>> GetEmailAsync(string userId);
    }
}
