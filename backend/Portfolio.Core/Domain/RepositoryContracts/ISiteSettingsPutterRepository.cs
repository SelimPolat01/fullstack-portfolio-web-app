using Portfolio.Core.Domain.Entities;

namespace Portfolio.Core.Domain.RepositoryContracts
{
    public interface ISiteSettingsPutterRepository
    {
        public Task<SiteSettings> PutSiteSettingsAsync(SiteSettings siteSettings);
    }
}
