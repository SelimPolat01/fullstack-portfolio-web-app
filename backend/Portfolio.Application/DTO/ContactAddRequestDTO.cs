using Portfolio.Core.Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace Portfolio.Application.DTO
{
    public class ContactAddRequestDTO
    {
        [Required(ErrorMessage = "Name can't be blank.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Surname can't be blank.")]
        public string Surname { get; set; }

        [Required(ErrorMessage = "Email can't be blank.")]
        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Message can't be blank.")]
        [StringLength(100, MinimumLength = 10, ErrorMessage = "Message must be between {2} and {1} characters.")]
        public string Message { get; set; }
    }

    public static class ToContactConverter
    {
        public static Contact ToContact(this ContactAddRequestDTO contactRequestDTO)
        {
            return new Contact()
            {
                Name = contactRequestDTO.Name,
                Surname = contactRequestDTO.Surname,
                Email = contactRequestDTO.Email,
                Message = contactRequestDTO.Message,
            };
        }
    }
}
