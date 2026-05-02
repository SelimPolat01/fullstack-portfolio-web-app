using Portfolio.Application.DTO.Project;
using Portfolio.Application.DTO.Service;
using Portfolio.Application.ServiceContracts;
using Portfolio.Core.Domain.Entities;
using Portfolio.Core.Domain.RepositoryContracts;
using Portfolio.Core.Helpers;

namespace Portfolio.Application.Services
{
    public class ProjectAdderService : IProjectAdderService
    {
        private readonly IProjectAdderRepository _projectAdderRepository;

        public ProjectAdderService(IProjectAdderRepository projectAdderRepository)
        {
            _projectAdderRepository = projectAdderRepository;
        }
        public async Task<ServiceResult<ProjectAddResponseDTO>> AddProjectAsync(ProjectAddRequestDTO projectAddRequestDTO)
        {
            ValidationHelper.ModelValidation(projectAddRequestDTO);
            string generatedImageUrl = string.Empty;
            if (projectAddRequestDTO.Image != null && projectAddRequestDTO.Image.Length > 0)
            {
                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(projectAddRequestDTO.Image.FileName);
                string filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images", fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await projectAddRequestDTO.Image.CopyToAsync(stream);
                }
                generatedImageUrl = $"/images/{fileName}";
            }
            Project project = projectAddRequestDTO.ToProject(imageUrl: generatedImageUrl);
            var savedProject = await _projectAdderRepository.AddProjectAsync(project);
            return ServiceResult<ProjectAddResponseDTO>.Ok(new ProjectAddResponseDTO()
            {
                Id = savedProject.Id,
                Message = "Project added successfully"
            });
        }
    }
}
