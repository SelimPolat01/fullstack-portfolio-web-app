using Portfolio.Core.Domain.Entities;
using Portfolio.Core.Enums;

namespace Portfolio.Core.Domain.RepositoryContracts
{
    public interface IProjectGetterRepository
    {
        public Task<List<Project>> GetAllProjectsAsync();

        public Task<Project?> GetProjectAsync(Guid projectId);

        public Task<List<Project>> GetProjectsOrderedAsync(ProjectOrderBy orderBy, bool descending, string? category, string? status);
    }
}
