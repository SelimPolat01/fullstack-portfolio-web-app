using System.ComponentModel.DataAnnotations;

namespace Portfolio.Application.DTO
{
    public class AdminLoginRequestDTO
    {

        [Required(ErrorMessage = "Email can't be blank.")]
        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password can't be blank.")]
        public string Password { get; set; } = string.Empty;
    }
}
