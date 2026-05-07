using System.ComponentModel.DataAnnotations;

namespace Portfolio.Application.DTO.PersonalInfo
{
    public class PersonalInfoAddRequestDTO
    {
        [Required(ErrorMessage = "First name is required.")]
        [StringLength(50, ErrorMessage = "First name cannot exceed 50 characters.")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Last name is required.")]
        [StringLength(50, ErrorMessage = "Last name cannot exceed 50 characters.")]
        public string Surname { get; set; } = string.Empty;

        [Required(ErrorMessage = "Professional title is required.")]
        [StringLength(100, ErrorMessage = "Title cannot exceed 100 characters.")]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "The 'About Me' section is required.")]
        [MinLength(20, ErrorMessage = "About section should be at least 20 characters long.")]
        public string About { get; set; } = string.Empty;

        //[Url(ErrorMessage = "Invalid profile image URL format.")]
        public string? ProfileImageUrl { get; set; } = string.Empty;

        //[Url(ErrorMessage = "Invalid CV URL format.")]
        public string? CvUrl { get; set; } = string.Empty;
    }
}
