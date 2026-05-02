using Portfolio.Application.DTO.Service;

namespace Portfolio.Application.ServiceContracts
{
    public interface IMessagePatcherService
    {
        public Task<ServiceResult<string>> PatchMessageAsync(Guid messageId);
    }
}
