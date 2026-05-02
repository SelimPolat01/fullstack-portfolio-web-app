using Microsoft.EntityFrameworkCore;
using Portfolio.Core.Domain.Entities;
using Portfolio.Core.Domain.RepositoryContracts;
using Portfolio.Core.Enums;
using Portfolio.Infrastructure.DbContext;

namespace Portfolio.Infrastructure.Repositories
{
    public class ProjectGetterRepository : IProjectGetterRepository
    {
        private readonly ApplicationDbContext _db;

        public ProjectGetterRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        public async Task<List<Project>> GetAllProjectsAsync()
        {
            return await _db.Projects.ToListAsync();
        }

        public async Task<Project?> GetProjectAsync(Guid projectId)
        {
            var existResult = await _db.Projects.FindAsync(projectId);
            if (existResult == null) return null;
            return existResult;
        }

        public async Task<List<Project>> GetProjectsOrderedAsync(ProjectOrderBy orderBy, bool descending)
        {
            IQueryable<Project> query = _db.Projects;
            query = orderBy switch
            {
                ProjectOrderBy.Date => descending ? query.OrderByDescending(project => project.Date) : query.OrderBy(project => project.Date),
                ProjectOrderBy.Name => descending ? query.OrderByDescending(project => project.Name) : query.OrderBy(project => project.Name),
                ProjectOrderBy.Creator => descending ? query.OrderByDescending(project => project.Creator) : query.OrderBy(project => project.Creator),
                ProjectOrderBy.Category => descending ? query.OrderByDescending(project => project.Category) : query.OrderBy(project => project.Category),
                _ => query.OrderByDescending(project => project.Date)
            };
            return await query.ToListAsync();
        }

        public async Task<List<Project>> GetProjectsOrderedAsync(ProjectOrderBy orderBy, bool descending, string? category, string? status)
        {
            IQueryable<Project> query = _db.Projects.AsNoTracking();
            if (!string.IsNullOrEmpty(category))
            {
                query = query.Where(project => project.Category == category);
            }
            if (!string.IsNullOrEmpty(status))
            {
                query = query.Where(project => project.Status == status);
            }
            query = orderBy switch
            {
                ProjectOrderBy.Creator => descending ? query.OrderByDescending(project => project.Creator) : query.OrderBy(project => project.Creator),
                ProjectOrderBy.Name => descending ? query.OrderByDescending(project => project.Name) : query.OrderBy(project => project.Name),
                ProjectOrderBy.Date => descending ? query.OrderByDescending(project => project.Date) : query.OrderBy(project => project.Date),
                ProjectOrderBy.Category => descending ? query.OrderByDescending(project => project.Category) : query.OrderBy(project => project.Category),
                _ => query.OrderByDescending(project => project.Date)
            };
            return await query.ToListAsync();
        }
    }
}
