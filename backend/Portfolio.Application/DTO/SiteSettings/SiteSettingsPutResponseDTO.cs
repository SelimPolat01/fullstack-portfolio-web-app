namespace Portfolio.Application.DTO.SiteSettings
{
    public class SiteSettingsPutResponseDTO
    {
        public Guid Id { get; set; }
        public string SiteTitle { get; set; } = string.Empty;
        public string SiteDescription { get; set; } = string.Empty;
        public string GitHubUrl { get; set; } = string.Empty;
        public string LinkedInUrl { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }
}
