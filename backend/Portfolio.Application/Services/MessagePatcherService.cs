using Portfolio.Application.DTO.Service;
using Portfolio.Application.ServiceContracts;
using Portfolio.Core.Domain.RepositoryContracts;


namespace Portfolio.Application.Services
{
    public class MessagePatcherService : IMessagePatcherService
    {
        private readonly IMessagePatcherRepository _messagePatcherRepository;

        public MessagePatcherService(IMessagePatcherRepository messagePatcherRepository)
        {
            _messagePatcherRepository = messagePatcherRepository;
        }
        public async Task<ServiceResult<string>> PatchMessageAsync(Guid messageId)
        {
            var patchedMessage = await _messagePatcherRepository.PatchMessageReadAsync(messageId);
            if (patchedMessage == null) return ServiceResult<string>.Fail("Message not found");
            return ServiceResult<string>.Ok("Message patched successfully");
        }
    }
}
