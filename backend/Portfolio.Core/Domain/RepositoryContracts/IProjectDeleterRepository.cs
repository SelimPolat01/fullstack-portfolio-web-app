namespace Portfolio.Core.Domain.RepositoryContracts
{
    public interface IProjectDeleterRepository
    {
        public Task<bool?> DeleteProjectAsync(Guid projectId);
    }
}
