using System.ComponentModel.DataAnnotations;

namespace Portfolio.Application.DTO.SiteSettings
{
    public class SiteSettingsPutRequestDTO
    {
        [Required(ErrorMessage = "Site Title is required.")]
        [StringLength(70, ErrorMessage = "Site Title cannot exceed 70 characters.")]
        public string SiteTitle { get; set; } = string.Empty;

        [Required(ErrorMessage = "Site Description is required.")]
        [StringLength(160, ErrorMessage = "Site Description should be between 50 and 160 characters.")]
        public string SiteDescription { get; set; } = string.Empty;

        [Url(ErrorMessage = "Please enter a valid GitHub URL.")]
        public string GitHubUrl { get; set; } = string.Empty;

        [Url(ErrorMessage = "Please enter a valid LinkedIn URL.")]
        public string LinkedInUrl { get; set; } = string.Empty;
    }

    public static class ToSiteSettingsConverter
    {
        public static Portfolio.Core.Domain.Entities.SiteSettings ToSiteSettings(this SiteSettingsPutRequestDTO siteSettingsAddRequestDTO, Guid userId)
        {
            return new Portfolio.Core.Domain.Entities.SiteSettings()
            {
                UserId = userId,
                SiteTitle = siteSettingsAddRequestDTO.SiteTitle,
                SiteDescription = siteSettingsAddRequestDTO.SiteDescription,
                GitHubUrl = siteSettingsAddRequestDTO.GitHubUrl,
                LinkedInUrl = siteSettingsAddRequestDTO.LinkedInUrl
            };
        }
    }
}
