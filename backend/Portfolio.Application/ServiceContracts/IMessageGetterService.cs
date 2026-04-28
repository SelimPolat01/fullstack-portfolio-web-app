using Portfolio.Application.DTO;

namespace Portfolio.Application.ServiceContracts
{
    public interface IMessageGetterService
    {
        public Task<ServiceResult<List<MessageGetResponseDTO>>> GetAllMessagesAsync();

        public Task<ServiceResult<MessageGetResponseDTO>> GetMessageAsync(Guid messageId);
    }
}
