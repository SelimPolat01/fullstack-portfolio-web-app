using Microsoft.AspNetCore.Identity;
using Portfolio.Core.Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace Portfolio.Infrastructure.Identity
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        [Required(ErrorMessage = "Name can't be blank")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Surname can't be blank")]
        public string Surname { get; set; } = string.Empty;


        [Required(ErrorMessage = "Title can't be blank")]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "About can't be blank")]
        public string About { get; set; } = string.Empty;

        public string? ProfileImageUrl { get; set; }

        public string? CvUrl { get; set; }

        public string? RefreshToken { get; set; } = string.Empty;

        public DateTime? RefreshTokenExpirationTime { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public virtual SiteSettings? SiteSettings { get; set; }

        public virtual NotificationSettings? NotificationSettings { get; set; }


    }
}
