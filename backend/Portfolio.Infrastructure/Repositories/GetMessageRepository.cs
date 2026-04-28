using Microsoft.EntityFrameworkCore;
using Portfolio.Core.Domain.Entities;
using Portfolio.Core.Domain.RepositoryContracts;
using Portfolio.Infrastructure.DbContext;

namespace Portfolio.Infrastructure.Repositories
{
    public class GetMessageRepository : IMessageGetherRepository
    {
        private readonly ApplicationDbContext _db;

        public GetMessageRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        public async Task<List<Message>> GetAllMessagesAsync()
        {
            return await _db.Messages.ToListAsync();
        }

        public async Task<Message?> GetMessageAsync(Guid messageId)
        {
            return await _db.Messages.FindAsync(messageId);
        }
    }
}
