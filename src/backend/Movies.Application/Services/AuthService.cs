using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Movies.Application.Dtos;
using Movies.Application.Interfaces;
using Movies.Core.Interfaces;

namespace Movies.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IConfiguration _configuration;

    public AuthService(IUserRepository userRepository, IConfiguration configuration)
    {
        _userRepository = userRepository;
        _configuration = configuration;
    }

    public async Task<LoginResponseDto?> LoginAsync(LoginDto loginDto)
    {
        var user = await _userRepository.GetByNomeAsync(loginDto.Usuario);
        
        if (user == null || user.Senha != loginDto.Senha)
        {
            return null;
        }

        var token = GenerateJwtToken(user.Id, user.Nome, user.TipoUsuario);

        return new LoginResponseDto
        {
            Token = token,
            Id = user.Id,
            Nome = user.Nome,
            TipoUsuario = user.TipoUsuario
        };
    }

    public string GenerateJwtToken(int userId, string nome, string tipoUsuario)
    {
        var secretKey = _configuration["Jwt:SecretKey"] ?? "MinhaChaveSecretaSuperSeguraParaJWT2024!";
        var issuer = _configuration["Jwt:Issuer"] ?? "MoviesAPI";
        var audience = _configuration["Jwt:Audience"] ?? "MoviesAPI";
        var expirationMinutes = int.Parse(_configuration["Jwt:ExpirationMinutes"] ?? "60");

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
            new Claim(ClaimTypes.Name, nome),
            new Claim("TipoUsuario", tipoUsuario),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expirationMinutes),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

