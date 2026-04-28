namespace Portfolio.Application.DTO
{
    public class MessageAddResponseDTO
    {
        public Guid Id { get; set; }
        public bool Success { get; set; }
        public string? Message { get; set; }
    }
}
