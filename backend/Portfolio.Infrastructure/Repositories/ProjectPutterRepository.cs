using Portfolio.Application.ServiceContracts;
using Portfolio.Core.Domain.Entities;
using Portfolio.Infrastructure.DbContext;

namespace Portfolio.Infrastructure.Repositories
{
    public class ProjectPutterRepository : IProjectPutterRepository
    {
        private readonly ApplicationDbContext _db;

        public ProjectPutterRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        public async Task<Project> PutProjectAsync(Guid projectId, Project project)
        {
            Project? existingProject = await _db.Projects.FindAsync(projectId);
            if (existingProject == null) return null;
            existingProject.Name = project.Name;
            existingProject.ShortDesc = project.ShortDesc;
            existingProject.LongDesc = project.LongDesc;
            existingProject.Techs = project.Techs;
            existingProject.Features = project.Features;
            existingProject.Creator = project.Creator;
            existingProject.GithubLink = project.GithubLink;
            existingProject.Category = project.Category;
            existingProject.Status = project.Status;
            if (!string.IsNullOrEmpty(project.ImageUrl))
            {
                existingProject.ImageUrl = project.ImageUrl;
            }
            existingProject.Date = project.Date;
            existingProject.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
            return existingProject;
        }
    }
}
