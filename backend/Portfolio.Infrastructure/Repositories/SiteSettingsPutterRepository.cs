using Microsoft.EntityFrameworkCore;
using Portfolio.Core.Domain.Entities;
using Portfolio.Core.Domain.RepositoryContracts;
using Portfolio.Infrastructure.DbContext;

namespace Portfolio.Infrastructure.Repositories
{
    public class SiteSettingsPutterRepository : ISiteSettingsPutterRepository
    {
        private readonly ApplicationDbContext _db;

        public SiteSettingsPutterRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        public async Task<SiteSettings> PutSiteSettingsAsync(SiteSettings siteSettings)
        {
            var existing = await _db.SiteSettings.FirstOrDefaultAsync(setting => setting.UserId == siteSettings.UserId);
            if (existing == null) await _db.SiteSettings.AddAsync(siteSettings);
            else
            {
                existing.SiteTitle = siteSettings.SiteTitle;
                existing.SiteDescription = siteSettings.SiteDescription;
                existing.GitHubUrl = siteSettings.GitHubUrl;
                existing.LinkedInUrl = siteSettings.LinkedInUrl;
            }
            await _db.SaveChangesAsync();
            return existing ?? siteSettings;
        }
    }
}
