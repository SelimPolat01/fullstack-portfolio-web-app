using Portfolio.Core.Domain.Entities;

namespace Portfolio.Core.Domain.RepositoryContracts
{
    public interface IMessageGetherRepository
    {
        public Task<List<Message>> GetAllMessagesAsync();

        public Task<Message?> GetMessageAsync(Guid messageId);
    }
}
