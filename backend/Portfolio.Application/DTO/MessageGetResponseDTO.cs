namespace Portfolio.Application.DTO
{
    public class MessageGetResponseDTO
    {
        public Guid Id { get; set; }
        public string? Text { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }

        public string? Sender { get; set; }

        public bool IsRead { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}
