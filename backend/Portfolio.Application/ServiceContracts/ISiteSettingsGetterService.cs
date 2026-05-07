using Portfolio.Application.DTO.Service;
using Portfolio.Application.DTO.SiteSettings;

namespace Portfolio.Application.ServiceContracts
{
    public interface ISiteSettingsGetterService
    {
        public Task<ServiceResult<SiteSettingsGetResponseDTO>> GetSiteSettingsAsync(Guid userId);
    }
}
