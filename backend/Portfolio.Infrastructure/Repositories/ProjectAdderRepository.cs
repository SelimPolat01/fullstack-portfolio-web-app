using Portfolio.Core.Domain.Entities;
using Portfolio.Core.Domain.RepositoryContracts;
using Portfolio.Infrastructure.DbContext;

namespace Portfolio.Infrastructure.Repositories
{
    public class ProjectAdderRepository : IProjectAdderRepository
    {
        private readonly ApplicationDbContext _db;

        public ProjectAdderRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        public async Task<Project> AddProjectAsync(Project project)
        {
            _db.Projects.Add(project);
            await _db.SaveChangesAsync();
            return project;
        }
    }
}
