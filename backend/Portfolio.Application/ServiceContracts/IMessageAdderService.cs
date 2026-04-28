using Portfolio.Application.DTO;

namespace Portfolio.Core.ServiceContracts
{
    public interface IMessageAdderService
    {
        public Task<MessageAddResponseDTO> AddContactAsync(MessageAddRequestDTO messageAddRequestDTO);
    }
}
