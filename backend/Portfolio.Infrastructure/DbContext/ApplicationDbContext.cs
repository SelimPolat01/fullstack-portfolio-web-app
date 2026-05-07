using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Portfolio.Core.Domain.Entities;
using Portfolio.Infrastructure.Identity;

namespace Portfolio.Infrastructure.DbContext
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, Guid>
    {
        public virtual DbSet<Message> Messages { get; set; }
        public virtual DbSet<Project> Projects { get; set; }
        public virtual DbSet<SiteSettings> SiteSettings { get; set; }
        public virtual DbSet<NotificationSettings> NotificationSettings { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> dbContextOptionsBuilder) : base(dbContextOptionsBuilder)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Message>().ToTable("Messages");
            builder.Entity<Project>().ToTable("Projects");
            builder.Entity<SiteSettings>().ToTable("SiteSettings");
            builder.Entity<NotificationSettings>().ToTable("NotificationSettings");

            builder.Entity<ApplicationUser>()
                .HasOne(u => u.SiteSettings)
                .WithOne()
                .HasForeignKey<SiteSettings>(s => s.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<ApplicationUser>()
                .HasOne(u => u.NotificationSettings)
                .WithOne()
                .HasForeignKey<NotificationSettings>(n => n.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
