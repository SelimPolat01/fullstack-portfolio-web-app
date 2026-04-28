using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Portfolio.Application.DTO;
using Portfolio.Application.ServiceContracts;
using Portfolio.Infrastructure.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Portfolio.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AuthService(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
        }
        public AuthenticationResponseDTO CreateJwtToken(ApplicationUser user, IEnumerable<string> roles)
        {
            DateTime expiration = DateTime.UtcNow.AddDays(1.0);
            List<Claim> claims = new()
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email ?? string.Empty),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64),
                new Claim(ClaimTypes.Name, user.Name),
            };
            foreach (string role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            ;
            SymmetricSecurityKey securityKey = new(Encoding.UTF8.GetBytes("benim_cok_gizli_super_guvenli_anahtarim_123456789"));
            SigningCredentials signingCredentials = new(securityKey, SecurityAlgorithms.HmacSha256);
            JwtSecurityToken tokenGenerator = new(issuer: "https://localhost:7178", audience: "http://localhost:3000", claims, expires: expiration, signingCredentials: signingCredentials);
            JwtSecurityTokenHandler jwtSecurityTokenHandler = new();
            string token = jwtSecurityTokenHandler.WriteToken(tokenGenerator);
            return new AuthenticationResponseDTO()
            {
                Token = token,
                RefreshToken = GenerateRefreshToken(),
                TokenExpirationDateTime = expiration,
                RefreshTokenExpirationDateTime = DateTime.UtcNow.AddDays(7.0)
            };
        }

        public string GenerateRefreshToken()
        {
            Byte[] bytes = new byte[64];
            var randomNumberGenerator = RandomNumberGenerator.Create();
            randomNumberGenerator.GetBytes(bytes);
            return Convert.ToBase64String(bytes);
        }

        public async Task<ServiceResult<AdminRegisterResponseDTO>> RegisterAdminAsync(AdminRegisterRequestDTO adminRegisterRequestDTO)
        {
            ApplicationUser user = new()
            {
                UserName = adminRegisterRequestDTO.Email,
                Name = adminRegisterRequestDTO.Name,
                Surname = adminRegisterRequestDTO.Surname,
                Email = adminRegisterRequestDTO.Email,
                PhoneNumber = adminRegisterRequestDTO.PhoneNumber,
            };
            IdentityResult result = await _userManager.CreateAsync(user, adminRegisterRequestDTO.Password);
            if (!result.Succeeded)
            {
                var errors = string.Join("\n", result.Errors.Select(x => x.Description));
                return ServiceResult<AdminRegisterResponseDTO>.Fail(errors);
            }
            //await _signInManager.SignInAsync(user, isPersistent: false);
            ApplicationRole? existingRole = await _roleManager.FindByNameAsync("Admin");
            if (existingRole == null)
            {
                ApplicationRole role = new()
                {
                    Name = "Admin"
                };
                await _roleManager.CreateAsync(role);
            }
            await _userManager.AddToRoleAsync(user, "Admin");
            var roles = await _userManager.GetRolesAsync(user);
            AuthenticationResponseDTO authenticationResponse = CreateJwtToken(user, roles);
            user.RefreshToken = authenticationResponse.RefreshToken;
            user.RefreshTokenExpirationTime = authenticationResponse.RefreshTokenExpirationDateTime;
            user.CreatedAt = DateTime.UtcNow;
            await _userManager.UpdateAsync(user);
            return ServiceResult<AdminRegisterResponseDTO>.Ok(new AdminRegisterResponseDTO
            {
                Message = "Admin created successfully",
                Token = authenticationResponse.Token,
                RefreshToken = authenticationResponse.RefreshToken,
                TokenExpirationDateTime = Convert.ToDateTime(authenticationResponse.TokenExpirationDateTime),
                RefreshTokenExpirationDateTime = authenticationResponse.RefreshTokenExpirationDateTime,
            });
        }

        public async Task<ServiceResult<AdminLoginResponseDTO>> LoginAdminAsync(AdminLoginRequestDTO adminLoginRequestDTO)
        {
            ApplicationUser? existingUser = await _userManager.FindByEmailAsync(adminLoginRequestDTO.Email);
            if (existingUser == null) return ServiceResult<AdminLoginResponseDTO>.Fail("Invalid email or password");
            SignInResult result = await _signInManager.CheckPasswordSignInAsync(existingUser, adminLoginRequestDTO.Password, lockoutOnFailure: true);
            //SignInResult result = await _signInManager.PasswordSignInAsync(existingUser, adminLoginRequestDTO.Password, isPersistent: false, lockoutOnFailure: true);
            if (!result.Succeeded) return ServiceResult<AdminLoginResponseDTO>.Fail("Invalid email or password");
            var roles = await _userManager.GetRolesAsync(existingUser);
            AuthenticationResponseDTO authenticationResponse = CreateJwtToken(existingUser, roles);
            existingUser.RefreshToken = authenticationResponse.RefreshToken;
            existingUser.RefreshTokenExpirationTime = authenticationResponse.RefreshTokenExpirationDateTime;
            await _userManager.UpdateAsync(existingUser);
            return ServiceResult<AdminLoginResponseDTO>.Ok(new AdminLoginResponseDTO()
            {
                Token = authenticationResponse.Token ?? string.Empty,
                TokenExpirationDateTime = Convert.ToDateTime(authenticationResponse.TokenExpirationDateTime),
                RefreshToken = authenticationResponse.RefreshToken,
                RefreshTokenExpirationDateTime = authenticationResponse.RefreshTokenExpirationDateTime
            });
        }

        public async Task LogoutAdminAsync(string? userId)
        {
            if (userId == null) throw new ArgumentNullException(nameof(userId));
            ApplicationUser? existingUser = await _userManager.FindByIdAsync(userId);
            if (existingUser == null) throw new Exception("User not found");
            existingUser.RefreshToken = null;
            existingUser.RefreshTokenExpirationTime = null;
            await _userManager.UpdateAsync(existingUser);
        }
    }
}
