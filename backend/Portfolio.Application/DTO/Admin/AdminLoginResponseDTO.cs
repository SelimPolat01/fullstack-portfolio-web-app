namespace Portfolio.Application.DTO.Admin
{
    public class AdminLoginResponseDTO
    {
        public string? Token { get; set; }
        public DateTime TokenExpirationDateTime { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpirationDateTime { get; set; }
    }
}
