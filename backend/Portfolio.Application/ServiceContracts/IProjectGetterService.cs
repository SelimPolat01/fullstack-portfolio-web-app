using Portfolio.Application.DTO.Project;
using Portfolio.Application.DTO.Service;
using Portfolio.Core.Enums;

namespace Portfolio.Application.ServiceContracts
{
    public interface IProjectGetterService
    {
        public Task<ServiceResult<List<ProjectGetResponseDTO>>> GetAllProjectsAsync();

        public Task<ServiceResult<ProjectGetResponseDTO>> GetProjectAsync(Guid projectId);

        public Task<ServiceResult<List<ProjectGetResponseDTO>>> GetProjectsOrderedAsync(ProjectOrderBy orderBy, bool descending, string? category, string? status);
    }
}
