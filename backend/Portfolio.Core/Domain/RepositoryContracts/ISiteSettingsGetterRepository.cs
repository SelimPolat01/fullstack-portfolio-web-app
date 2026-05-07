using Portfolio.Core.Domain.Entities;

namespace Portfolio.Core.Domain.RepositoryContracts.ServiceContracts
{
    public interface ISiteSettingsGetterRepository
    {
        public Task<SiteSettings?> GetSiteSettingsAsync(Guid userId);
    }
}
