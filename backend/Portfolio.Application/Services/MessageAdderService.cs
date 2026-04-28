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

        public async Task<MessageAddResponseDTO> AddContactAsync(MessageAddRequestDTO messageAddRequesDTO)
        {
            if (messageAddRequesDTO == null) throw new ArgumentNullException(nameof(messageAddRequesDTO));
            ValidationHelper.ModelValidation(messageAddRequesDTO);
            Message message = messageAddRequesDTO.ToMessage();
            Message savedMessage = await _messageAdderRepository.AddMessageAsync(message);
            return new MessageAddResponseDTO()
            {
                Id = savedMessage.Id,
                Success = true,
                Message = "Message saved successfully",
            };
        }
    }
}
