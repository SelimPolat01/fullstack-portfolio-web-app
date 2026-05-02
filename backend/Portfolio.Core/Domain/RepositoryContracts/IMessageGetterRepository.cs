using Portfolio.Core.Domain.Entities;

namespace Portfolio.Core.Domain.RepositoryContracts
{
    public interface IMessageGetterRepository
    {
        public Task<List<Message>> GetAllMessagesAsync();

        public Task<Message?> GetMessageAsync(Guid messageId);
    }
}
