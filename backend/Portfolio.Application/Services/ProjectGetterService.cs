using Portfolio.Application.DTO.Project;
using Portfolio.Application.DTO.Service;
using Portfolio.Application.ServiceContracts;
using Portfolio.Core.Domain.Entities;
using Portfolio.Core.Domain.RepositoryContracts;
using Portfolio.Core.Enums;

namespace Portfolio.Application.Services
{
    public class ProjectGetterService : IProjectGetterService
    {
        private readonly IProjectGetterRepository _projectGetterRepository;

        public ProjectGetterService(IProjectGetterRepository projectGetterRepository)
        {
            _projectGetterRepository = projectGetterRepository;
        }
        public async Task<ServiceResult<List<ProjectGetResponseDTO>>> GetAllProjectsAsync()
        {
            var projects = await _projectGetterRepository.GetAllProjectsAsync();
            if (projects == null || !projects.Any()) return ServiceResult<List<ProjectGetResponseDTO>>.Ok(new List<ProjectGetResponseDTO>());
            var result = projects.Select(project => MapToDTO(project)).ToList();
            return ServiceResult<List<ProjectGetResponseDTO>>.Ok(result);
        }
        public async Task<ServiceResult<List<ProjectGetResponseDTO>>> GetProjectsOrderedAsync(ProjectOrderBy orderBy, bool descending, string? category, string? status)
        {
            var orderedProjects = await _projectGetterRepository.GetProjectsOrderedAsync(orderBy, descending, category, status);
            var result = orderedProjects.Select(project => MapToDTO(project)).ToList();
            return ServiceResult<List<ProjectGetResponseDTO>>.Ok(result);
        }

        public async Task<ServiceResult<ProjectGetResponseDTO>> GetProjectAsync(Guid projectId)
        {
            var project = await _projectGetterRepository.GetProjectAsync(projectId);
            if (project == null) return ServiceResult<ProjectGetResponseDTO>.Fail("project not found");
            var result = MapToDTO(project);
            return ServiceResult<ProjectGetResponseDTO>.Ok(result);
        }

        private ProjectGetResponseDTO MapToDTO(Project project)
        {
            return new ProjectGetResponseDTO()
            {
                Id = project.Id,
                Name = project.Name,
                Creator = project.Creator,
                ShortDesc = project.ShortDesc,
                LongDesc = project.LongDesc,
                GithubLink = project.GithubLink,
                Category = project.Category,
                Status = project.Status,
                ImageUrl = project.ImageUrl,
                Date = project.Date,
                Techs = project.Techs ?? new List<string>(),
                Features = project.Features ?? new List<string>(),
            };
        }
    }
}
