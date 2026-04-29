using Portfolio.Core.Domain.Entities;

namespace Portfolio.Core.Domain.RepositoryContracts
{
    public interface IMessagePatcherRepository
    {
        public Task<Message?> PatchMessageReadAsync(Guid messageId);
    }
}
