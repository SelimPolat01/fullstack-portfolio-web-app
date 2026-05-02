using Portfolio.Core.Domain.Entities;
using Portfolio.Core.Domain.RepositoryContracts;
using Portfolio.Infrastructure.DbContext;

namespace Portfolio.Infrastructure.Repositories
{
    public class MessagePatcherRepository : IMessagePatcherRepository
    {
        private readonly ApplicationDbContext _db;
        public MessagePatcherRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        public async Task<Message?> PatchMessageReadAsync(Guid messageId)
        {
            Message? message = await _db.Messages.FindAsync(messageId);
            if (message == null) return null;
            message.IsRead = true;
            await _db.SaveChangesAsync();
            return message;
        }
    }
}
