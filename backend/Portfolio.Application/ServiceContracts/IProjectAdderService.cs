using Portfolio.Application.DTO.Project;
using Portfolio.Application.DTO.Service;

namespace Portfolio.Application.ServiceContracts
{
    public interface IProjectAdderService
    {
        public Task<ServiceResult<ProjectAddResponseDTO>> AddProjectAsync(ProjectAddRequestDTO projectAddRequestDTO);
    }
}
