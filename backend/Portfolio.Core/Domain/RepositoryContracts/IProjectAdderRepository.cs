using Portfolio.Core.Domain.Entities;

namespace Portfolio.Core.Domain.RepositoryContracts
{
    public interface IProjectAdderRepository
    {
        public Task<Project> AddProjectAsync(Project project);
    }
}
