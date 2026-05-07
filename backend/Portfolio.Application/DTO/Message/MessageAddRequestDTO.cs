using System.ComponentModel.DataAnnotations;

namespace Portfolio.Application.DTO.Message
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
        [MinLength(5, ErrorMessage = "The message must be at least 5 characters long.")]
        public string Text { get; set; } = string.Empty;
    }

    public static class ToMessageConverter
    {
        public static Core.Domain.Entities.Message ToMessage(this MessageAddRequestDTO messageAddRequestDTO)
        {
            return new Core.Domain.Entities.Message()
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
