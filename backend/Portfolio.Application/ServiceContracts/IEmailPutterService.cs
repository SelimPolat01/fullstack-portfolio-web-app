using Portfolio.Application.DTO.Security;
using Portfolio.Application.DTO.Service;

namespace Portfolio.Application.ServiceContracts
{
    public interface IEmailPutterService
    {
        public Task<ServiceResult<EmailUpdateResponseDTO>> PutEmailAsync(EmailUpdateRequestDTO emailUpdateRequestDTO, string userId);
    }
}
