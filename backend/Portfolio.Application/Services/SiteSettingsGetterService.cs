using Portfolio.Application.DTO.Service;
using Portfolio.Application.DTO.SiteSettings;
using Portfolio.Application.ServiceContracts;
using Portfolio.Core.Domain.RepositoryContracts.ServiceContracts;

namespace Portfolio.Application.Services
{
    public class SiteSettingsGetterService : ISiteSettingsGetterService
    {
        private readonly ISiteSettingsGetterRepository _siteSettingsGetterRepository;

        public SiteSettingsGetterService(ISiteSettingsGetterRepository siteSettingsGetterRepository)
        {
            _siteSettingsGetterRepository = siteSettingsGetterRepository;
        }
        public async Task<ServiceResult<SiteSettingsGetResponseDTO>> GetSiteSettingsAsync(Guid userId)
        {
            var existing = await _siteSettingsGetterRepository.GetSiteSettingsAsync(userId);
            if (existing == null) return ServiceResult<SiteSettingsGetResponseDTO>.Fail("User settings not found.");
            var response = new SiteSettingsGetResponseDTO()
            {
                Id = existing.Id,
                SiteTitle = existing.SiteTitle,
                SiteDescription = existing.SiteDescription,
                GitHubUrl = existing.GitHubUrl,
                LinkedInUrl = existing.LinkedInUrl
            };
            return ServiceResult<SiteSettingsGetResponseDTO>.Ok(response);
        }
    }
}
