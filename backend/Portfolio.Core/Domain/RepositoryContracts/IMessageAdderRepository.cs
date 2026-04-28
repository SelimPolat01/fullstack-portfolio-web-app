using Portfolio.Core.Domain.Entities;

namespace Portfolio.Core.Domain.RepositoryContracts
{
    public interface IMessageAdderRepository
    {
        public Task<Message> AddMessageAsync(Message message);
    }
}
