using Portfolio.Application.DTO.Service;
using Portfolio.Application.ServiceContracts;
using Portfolio.Core.Domain.RepositoryContracts;

namespace Portfolio.Application.Services
{
    public class ProjectDeleterService : IProjectDeleterService
    {
        private readonly IProjectDeleterRepository _projectDeleterRepository;

        public ProjectDeleterService(IProjectDeleterRepository projectDeleterRepository)
        {
            _projectDeleterRepository = projectDeleterRepository;
        }
        public async Task<ServiceResult<bool>> DeleteProjectAsync(Guid projectId)
        {
            var result = await _projectDeleterRepository.DeleteProjectAsync(projectId);
            if (result == null)
            {
                return ServiceResult<bool>.FailBool("Project not found.");
            }
            return ServiceResult<bool>.OkBool("Project deleted successfully");
        }
    }
}
