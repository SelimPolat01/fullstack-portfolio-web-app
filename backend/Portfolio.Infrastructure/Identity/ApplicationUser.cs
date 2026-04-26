using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Portfolio.Infrastructure.Identity
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        [Required(ErrorMessage = "Name can't be blank")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Surname can't be blank")]
        public string Surname { get; set; } = string.Empty;


        public string? RefreshToken { get; set; } = string.Empty;
        public DateTime? RefreshTokenExpirationTime { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
