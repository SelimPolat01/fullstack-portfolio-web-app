namespace Portfolio.Application.DTO
{
    public class ContactAddResponseDTO
    {
        public Guid Id { get; set; }
        public bool Success { get; set; }
        public string? Message { get; set; }
    }
}
