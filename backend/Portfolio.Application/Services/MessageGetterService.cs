using Portfolio.Application.DTO.Message;
using Portfolio.Application.DTO.Service;
using Portfolio.Application.ServiceContracts;
using Portfolio.Core.Domain.RepositoryContracts;

namespace Portfolio.Application.Services
{
    public class MessageGetterService : IMessageGetterService
    {
        private readonly IMessageGetterRepository _messageGetterRepository;

        public MessageGetterService(IMessageGetterRepository messageFetcherRepository)
        {
            _messageGetterRepository = messageFetcherRepository;
        }
        public async Task<ServiceResult<List<MessageGetResponseDTO>>> GetAllMessagesAsync()
        {
            var messages = await _messageGetterRepository.GetAllMessagesAsync();
            if (messages == null || !messages.Any()) return ServiceResult<List<MessageGetResponseDTO>>.Ok(new List<MessageGetResponseDTO>());
            var result = messages.Select(message => new MessageGetResponseDTO
            {
                Id = message.Id,
                Text = message.Text,
                Email = message.Email,
                PhoneNumber = message.PhoneNumber,
                Subject = message.Subject,
                Sender = message.Name + " " + message.Surname,
                IsRead = message.IsRead,
                CreatedAt = message.CreatedAt
            }).ToList();
            return ServiceResult<List<MessageGetResponseDTO>>.Ok(result);
        }

        public async Task<ServiceResult<MessageGetResponseDTO>> GetMessageAsync(Guid messageId)
        {
            var message = await _messageGetterRepository.GetMessageAsync(messageId);
            if (message == null) return ServiceResult<MessageGetResponseDTO>.Fail("Message not found");
            var result = new MessageGetResponseDTO()
            {
                Id = message.Id,
                Text = message.Text,
                Email = message.Email,
                PhoneNumber = message.PhoneNumber,
                Subject = message.Subject,
                Sender = message.Name + " " + message.Surname,
                IsRead = message.IsRead,
                CreatedAt = message.CreatedAt
            };
            return ServiceResult<MessageGetResponseDTO>.Ok(result);
        }
    }
}
