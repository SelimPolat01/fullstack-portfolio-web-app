namespace Portfolio.Application.DTO
{
    public class AdminLoginResponseDTO
    {
        public string? Token { get; set; }
        public DateTime TokenExpirationDateTime { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpirationDateTime { get; set; }
    }
}
