using Portfolio.Core.Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace Portfolio.Application.DTO
{
    public class MessageAddRequestDTO
    {
        [Required(ErrorMessage = "Name can't be blank.")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Surname can't be blank.")]
        public string Surname { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email can't be blank.")]
        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Phone number can't be blank.")]
        [RegularExpression(@"^\+90\d{10}$", ErrorMessage = "Invalid phone number format.")]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required(ErrorMessage = "Subject can't be blank.")]
        public string Subject { get; set; } = string.Empty;

        [Required(ErrorMessage = "Message can't be blank.")]
        [StringLength(100, MinimumLength = 10, ErrorMessage = "Message must be between {2} and {1} characters.")]
        public string Text { get; set; } = string.Empty;
    }

    public static class ToMessageConverter
    {
        public static Message ToMessage(this MessageAddRequestDTO messageAddRequestDTO)
        {
            return new Message()
            {
                Name = messageAddRequestDTO.Name,
                Surname = messageAddRequestDTO.Surname,
                Email = messageAddRequestDTO.Email,
                PhoneNumber = messageAddRequestDTO.PhoneNumber,
                Subject = messageAddRequestDTO.Subject,
                Text = messageAddRequestDTO.Text,
            };
        }
    }
}
