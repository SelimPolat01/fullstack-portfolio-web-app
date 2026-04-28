using System.ComponentModel.DataAnnotations;

namespace Portfolio.Application.DTO
{
    public class AdminRegisterRequestDTO
    {
        [Required(ErrorMessage = "Name can't be blank.")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Surname can't be blank.")]
        public string Surname { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email can't be blank.")]
        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Phone can't be blank.")]
        [RegularExpression(@"^\+90\d{10}$", ErrorMessage = "Invalid phone format.")]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password can't be blank.")]
        public string Password { get; set; } = string.Empty;

        [Required(ErrorMessage = "Confirm password can't be blank.")]
        [Compare("Password", ErrorMessage = "Passwords do not match.")]
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}
