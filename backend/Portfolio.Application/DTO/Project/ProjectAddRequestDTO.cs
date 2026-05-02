using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace Portfolio.Application.DTO.Project
{
    public class ProjectAddRequestDTO
    {
        [Required(ErrorMessage = "Project name is required.")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Project name must be between 3 and 100 characters.")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Short description is required.")]
        [StringLength(300, MinimumLength = 5, ErrorMessage = "Short description must be between 5 and 300 characters.")]
        public string ShortDesc { get; set; } = string.Empty;

        [Required(ErrorMessage = "Long description is required.")]
        [MinLength(10, ErrorMessage = "Long description is too short.")]
        public string LongDesc { get; set; } = string.Empty;

        [Required(ErrorMessage = "Creater is required.")]
        public string Creator { get; set; } = string.Empty;

        [Required(ErrorMessage = "GitHub link is required.")]
        [Url(ErrorMessage = "Please enter a valid URL format.")]
        public string GithubLink { get; set; } = string.Empty;

        [Required(ErrorMessage = "Category is required.")]
        public string Category { get; set; } = string.Empty;

        [Required(ErrorMessage = "Status is required.")]
        public string Status { get; set; } = string.Empty;

        [Required(ErrorMessage = "Date is required.")]
        public DateTime Date { get; set; }

        public IFormFile? Image { get; set; }

        public List<string>? Techs { get; set; }
        public List<string>? Features { get; set; }
    }

    public static class ToProjectConverter
    {
        public static Core.Domain.Entities.Project ToProject(this ProjectAddRequestDTO projectAddRequestDTO, string imageUrl)
        {
            return new Core.Domain.Entities.Project()
            {
                Name = projectAddRequestDTO.Name,
                ShortDesc = projectAddRequestDTO.ShortDesc,
                LongDesc = projectAddRequestDTO.LongDesc,
                Creator = projectAddRequestDTO.Creator,
                GithubLink = projectAddRequestDTO.GithubLink,
                Category = projectAddRequestDTO.Category,
                Status = projectAddRequestDTO.Status,
                ImageUrl = imageUrl,
                Date = projectAddRequestDTO.Date,
                Techs = projectAddRequestDTO.Techs ?? new List<string>(),
                Features = projectAddRequestDTO.Features ?? new List<string>(),
            };
        }
    }

}
