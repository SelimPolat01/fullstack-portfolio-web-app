using Portfolio.Application.DTO.Security;
using Portfolio.Application.DTO.Service;

namespace Portfolio.Application.ServiceContracts
{
    public interface IPasswordPutterService
    {
        public Task<ServiceResult<PasswordUpdateResponseDTO>> PutPasswordAsync(PasswordUpdateRequestDTO passwordUpdateRequestDTO, string userId);
    }
}
