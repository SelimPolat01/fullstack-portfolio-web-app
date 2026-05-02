using Portfolio.Application.DTO.Project;
using Portfolio.Application.DTO.Service;

namespace Portfolio.Application.ServiceContracts
{
    public interface IProjectPutterService
    {
        public Task<ServiceResult<ProjectAddResponseDTO>> PutProjectAsync(Guid projectID, ProjectAddRequestDTO projectAddRequestDTO);
    }
}
