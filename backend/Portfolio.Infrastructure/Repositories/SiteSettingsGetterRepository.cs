using Microsoft.EntityFrameworkCore;
using Portfolio.Core.Domain.Entities;
using Portfolio.Core.Domain.RepositoryContracts.ServiceContracts;
using Portfolio.Infrastructure.DbContext;

namespace Portfolio.Infrastructure.Repositories
{
    public class SiteSettingsGetterRepository : ISiteSettingsGetterRepository
    {
        private readonly ApplicationDbContext _db;

        public SiteSettingsGetterRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        public async Task<SiteSettings?> GetSiteSettingsAsync(Guid userId)
        {
            return await _db.SiteSettings.FirstOrDefaultAsync(setting => setting.UserId == userId);
        }
    }
}
