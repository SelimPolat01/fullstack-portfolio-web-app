using Portfolio.Application.DTO.Service;
using Portfolio.Application.DTO.SiteSettings;

namespace Portfolio.Application.ServiceContracts
{
    public interface ISiteSettingsPutterService
    {
        public Task<ServiceResult<SiteSettingsPutResponseDTO>> PutSiteSettingsAsync(SiteSettingsPutRequestDTO siteSettingsAddRequestDTO, Guid userId);
    }
}
