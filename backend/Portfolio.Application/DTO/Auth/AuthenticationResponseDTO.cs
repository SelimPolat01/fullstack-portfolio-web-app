namespace Portfolio.Application.DTO.Auth
{
    public class AuthenticationResponseDTO
    {
        public string? Token { get; set; } = string.Empty;
        public string? RefreshToken { get; set; } = string.Empty;
        public DateTime? TokenExpirationDateTime { get; set; }
        public DateTime RefreshTokenExpirationDateTime { get; set; }
    }
}
