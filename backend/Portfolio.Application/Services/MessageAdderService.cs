using Portfolio.Application.DTO;
using Portfolio.Core.Domain.Entities;
using Portfolio.Core.Domain.RepositoryContracts;
using Portfolio.Core.Helpers;
using Portfolio.Core.ServiceContracts;

namespace Portfolio.Core.Services
{
    public class MessageAdderService : IMessageAdderService
    {
        private readonly IMessageAdderRepository _messageAdderRepository;

        public MessageAdderService(IMessageAdderRepository messageAdderRepository)
        {
            _messageAdderRepository = messageAdderRepository;
        }

        public async Task<ServiceResult<MessageAddResponseDTO>> AddMessageAsync(MessageAddRequestDTO messageAddRequesDTO)
        {
            ValidationHelper.ModelValidation(messageAddRequesDTO);
            Message message = messageAddRequesDTO.ToMessage();
            Message savedMessage = await _messageAdderRepository.AddMessageAsync(message);
            return ServiceResult<MessageAddResponseDTO>.Ok(new MessageAddResponseDTO()
            {
                Id = savedMessage.Id,
                Message = "Message saved successfully",
            });
        }
    }
}
