using Portfolio.Application.DTO.Service;
using Portfolio.Application.DTO.SiteSettings;
using Portfolio.Application.ServiceContracts;
using Portfolio.Core.Domain.Entities;
using Portfolio.Core.Domain.RepositoryContracts;
using Portfolio.Core.Helpers;

namespace Portfolio.Application.Services
{
    public class SiteSettingsPutterService : ISiteSettingsPutterService
    {
        private readonly ISiteSettingsPutterRepository _siteSettingsPutterRepository;

        public SiteSettingsPutterService(ISiteSettingsPutterRepository siteSettingsPutterRepository)
        {
            _siteSettingsPutterRepository = siteSettingsPutterRepository;
        }
        public async Task<ServiceResult<SiteSettingsPutResponseDTO>> PutSiteSettingsAsync(SiteSettingsPutRequestDTO siteSettingsPutRequestDTO, Guid userId)
        {
            ValidationHelper.ModelValidation(siteSettingsPutRequestDTO);
            SiteSettings siteSettings = siteSettingsPutRequestDTO.ToSiteSettings(userId);
            SiteSettings savedSiteSettings = await _siteSettingsPutterRepository.PutSiteSettingsAsync(siteSettings);
            return ServiceResult<SiteSettingsPutResponseDTO>.Ok(new SiteSettingsPutResponseDTO()
            {
                Id = savedSiteSettings.Id,
                SiteTitle = savedSiteSettings.SiteTitle,
                SiteDescription = savedSiteSettings.SiteDescription,
                GitHubUrl = savedSiteSettings.GitHubUrl ?? string.Empty,
                LinkedInUrl = savedSiteSettings.LinkedInUrl ?? string.Empty,
                Message = "Site settings have been saved successfully."
            });
        }
    }
}
