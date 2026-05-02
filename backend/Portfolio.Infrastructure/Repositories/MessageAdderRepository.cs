using Portfolio.Core.Domain.RepositoryContracts;
using Portfolio.Infrastructure.DbContext;

namespace Portfolio.Infrastructure.Repositories
{
    public class MessageAdderRepository : IMessageAdderRepository
    {
        private readonly ApplicationDbContext _db;

        public MessageAdderRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<Core.Domain.Entities.Message> AddMessageAsync(Core.Domain.Entities.Message message)
        {
            _db.Messages.Add(message);
            await _db.SaveChangesAsync();
            return message;
        }
    }
}
