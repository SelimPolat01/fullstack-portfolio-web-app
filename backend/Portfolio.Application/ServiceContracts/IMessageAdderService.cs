using Portfolio.Application.DTO;

namespace Portfolio.Core.ServiceContracts
{
    public interface IMessageAdderService
    {
        public Task<ServiceResult<MessageAddResponseDTO>> AddMessageAsync(MessageAddRequestDTO messageAddRequestDTO);
    }
}
