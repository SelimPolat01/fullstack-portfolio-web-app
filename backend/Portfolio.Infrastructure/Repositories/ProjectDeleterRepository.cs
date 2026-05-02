using Portfolio.Core.Domain.RepositoryContracts;
using Portfolio.Infrastructure.DbContext;

namespace Portfolio.Infrastructure.Repositories
{

    public class ProjectDeleterRepository : IProjectDeleterRepository
    {
        private readonly ApplicationDbContext _db;

        public ProjectDeleterRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<bool?> DeleteProjectAsync(Guid projectId)
        {
            var project = await _db.Projects.FindAsync(projectId);
            if (project == null) return null;
            if (!string.IsNullOrEmpty(project.ImageUrl))
            {
                string filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images", Path.GetFileName(project.ImageUrl));
                if (File.Exists(filePath))
                {
                    File.Delete(filePath);
                }
            }
            _db.Remove(project);
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
