namespace Portfolio.Application.DTO.Message
{
    public class MessageAddResponseDTO
    {
        public Guid Id { get; set; }
        public bool Success { get; set; }
        public string? Message { get; set; }
    }
}
