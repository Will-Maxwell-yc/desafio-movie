using Movies.Application.Dtos;

namespace Movies.Application.Interfaces;

public interface IAuthService
{
    Task<LoginResponseDto?> LoginAsync(LoginDto loginDto);
    string GenerateJwtToken(int userId, string nome, string tipoUsuario);
}
