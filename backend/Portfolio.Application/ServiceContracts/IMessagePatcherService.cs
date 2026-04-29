using Portfolio.Application.DTO;

namespace Portfolio.Application.ServiceContracts
{
    public interface IMessagePatcherService
    {
        public Task<ServiceResult<string>> PatchMessageAsync(Guid messageId);
    }
}
