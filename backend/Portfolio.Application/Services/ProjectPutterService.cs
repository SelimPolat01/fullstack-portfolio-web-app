using Portfolio.Application.DTO.Project;
using Portfolio.Application.DTO.Service;
using Portfolio.Application.ServiceContracts;
using Portfolio.Core.Domain.Entities;

namespace Portfolio.Application.Services
{
    public class ProjectPutterService : IProjectPutterService
    {
        private readonly IProjectPutterRepository _projectPutterRepository;

        public ProjectPutterService(IProjectPutterRepository projectPutterRepository)
        {
            _projectPutterRepository = projectPutterRepository;
        }

        public async Task<ServiceResult<ProjectAddResponseDTO>> PutProjectAsync(Guid projectID, ProjectAddRequestDTO projectAddRequestDTO)
        {
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
            Project project = projectAddRequestDTO.ToProject(generatedImageUrl);
            var puttedProject = await _projectPutterRepository.PutProjectAsync(projectID, project);
            if (puttedProject == null)
            {
                return ServiceResult<ProjectAddResponseDTO>.Fail("Project not found.");
            }
            return ServiceResult<ProjectAddResponseDTO>.Ok(new ProjectAddResponseDTO()
            {
                Id = projectID,
                Message = "Project put successfully"
            });
        }
    }
}
