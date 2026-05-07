namespace Portfolio.Core.Domain.Entities
{
    public class SiteSettings
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid UserId { get; set; }
        public string SiteTitle { get; set; } = string.Empty;
        public string SiteDescription { get; set; } = string.Empty;
        public string? GitHubUrl { get; set; }
        public string? LinkedInUrl { get; set; }
    }
}
