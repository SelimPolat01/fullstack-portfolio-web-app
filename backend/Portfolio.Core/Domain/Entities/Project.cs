namespace Portfolio.Core.Domain.Entities
{
    public class Project
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string ShortDesc { get; set; } = string.Empty;
        public string LongDesc { get; set; } = string.Empty;
        public string Creator { get; set; } = string.Empty;

        public string GithubLink { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public List<string> Techs { get; set; } = new List<string>();
        public List<string> Features { get; set; } = new List<string>(); public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        public Project()
        {
            Id = Guid.NewGuid();
            CreatedAt = DateTime.UtcNow;
        }
    }
}
