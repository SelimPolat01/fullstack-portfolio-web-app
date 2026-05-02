using Portfolio.Core.Domain.Entities;

namespace Portfolio.Application.ServiceContracts
{
    public interface IProjectPutterRepository
    {
        public Task<Project> PutProjectAsync(Guid projectId, Project project);
    }
}
