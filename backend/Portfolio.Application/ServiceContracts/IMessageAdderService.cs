using Portfolio.Application.DTO.Message;
using Portfolio.Application.DTO.Service;

namespace Portfolio.Core.ServiceContracts
{
    public interface IMessageAdderService
    {
        public Task<ServiceResult<MessageAddResponseDTO>> AddMessageAsync(MessageAddRequestDTO messageAddRequestDTO);
    }
}
