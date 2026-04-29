using Portfolio.Core.Domain.Entities;
using Portfolio.Core.Domain.RepositoryContracts;
using Portfolio.Infrastructure.DbContext;

namespace Portfolio.Infrastructure.Repositories
{
    public class PostMessageRepository : IMessageAdderRepository
    {
        private readonly ApplicationDbContext _db;

        public PostMessageRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<Message> AddMessageAsync(Message message)
        {
            _db.Messages.Add(message);
            await _db.SaveChangesAsync();
            return message;
        }
    }
}
