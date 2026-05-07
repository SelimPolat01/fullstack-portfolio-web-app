using System.ComponentModel.DataAnnotations;

namespace Portfolio.Application.DTO.Security
{
    public class EmailUpdateRequestDTO
    {
        [Required(ErrorMessage = "Email can't be blank")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string Email { get; set; } = string.Empty;
    }
}
