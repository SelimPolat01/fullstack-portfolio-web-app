using Portfolio.Application.DTO.Service;

namespace Portfolio.Application.ServiceContracts
{
    public interface IProjectDeleterService
    {
        public Task<ServiceResult<bool>> DeleteProjectAsync(Guid projectId);
    }
}
