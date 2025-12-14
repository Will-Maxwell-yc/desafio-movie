namespace Movies.Application.Dtos;

public class LoginResponseDto
{
    public string Token { get; set; } = string.Empty;
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string TipoUsuario { get; set; } = string.Empty;
}
