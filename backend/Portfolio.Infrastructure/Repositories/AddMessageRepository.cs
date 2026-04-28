using Portfolio.Core.Domain.Entities;
using Portfolio.Core.Domain.RepositoryContracts;
using Portfolio.Infrastructure.DbContext;

namespace Portfolio.Infrastructure.Repositories
{
    public class AddMessageRepository : IMessageAdderRepository
    {
        private readonly ApplicationDbContext _db;

        public AddMessageRepository(ApplicationDbContext db)
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
