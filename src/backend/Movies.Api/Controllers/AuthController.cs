using Microsoft.AspNetCore.Mvc;
using Movies.Application.Dtos;
using Movies.Application.Interfaces;

namespace Movies.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoginResponseDto>> Login([FromBody] LoginDto loginDto)
    {
        if (string.IsNullOrWhiteSpace(loginDto.Usuario) || string.IsNullOrWhiteSpace(loginDto.Senha))
        {
            return BadRequest(new { message = "Usuário e senha são obrigatórios" });
        }

        var result = await _authService.LoginAsync(loginDto);

        if (result == null)
        {
            return Unauthorized(new { message = "Credenciais inválidas" });
        }

        return Ok(result);
    }
}

