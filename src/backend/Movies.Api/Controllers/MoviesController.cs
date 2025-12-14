using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Movies.Application.Dtos;
using Movies.Application.Interfaces;

namespace Movies.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class MoviesController : ControllerBase
{
    private readonly IMovieService _movieService;

    public MoviesController(IMovieService movieService)
    {
        _movieService = movieService;
    }

    [HttpGet("populares")]
    public async Task<ActionResult<MovieSearchResponseApiDto>> GetPopularMovies([FromQuery] int page = 1)
    {
        try
        {
            var result = await _movieService.GetPopularMoviesAsync(page);
            var apiDto = MovieSearchResponseApiDto.FromDto(result);
            return Ok(apiDto);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Erro ao buscar filmes populares", error = ex.Message });
        }
    }

    [HttpGet("em-cartaz")]
    public async Task<ActionResult<MovieSearchResponseApiDto>> GetNowPlayingMovies([FromQuery] int page = 1)
    {
        try
        {
            var result = await _movieService.GetNowPlayingMoviesAsync(page);
            var apiDto = MovieSearchResponseApiDto.FromDto(result);
            return Ok(apiDto);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Erro ao buscar filmes em cartaz", error = ex.Message });
        }
    }

    [HttpGet("buscar")]
    public async Task<ActionResult<MovieSearchResponseApiDto>> SearchMovies([FromQuery] string query, [FromQuery] int page = 1)
    {
        if (string.IsNullOrWhiteSpace(query))
        {
            return BadRequest(new { message = "O parâmetro 'query' é obrigatório" });
        }

        try
        {
            var result = await _movieService.SearchMoviesAsync(query, page);
            var apiDto = MovieSearchResponseApiDto.FromDto(result);
            return Ok(apiDto);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Erro ao buscar filmes", error = ex.Message });
        }
    }

    [HttpGet("genero")]
    public async Task<ActionResult<MovieSearchResponseApiDto>> GetMoviesByGenre([FromQuery] string genres, [FromQuery] int page = 1)
    {
        if (string.IsNullOrWhiteSpace(genres))
        {
            return BadRequest(new { message = "O parâmetro 'genres' é obrigatório" });
        }

        try
        {
            var result = await _movieService.GetMoviesByGenreAsync(genres, page);
            var apiDto = MovieSearchResponseApiDto.FromDto(result);
            return Ok(apiDto);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Erro ao buscar filmes por gênero", error = ex.Message });
        }
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<MovieDetailsDto>> GetMovieDetails(int id)
    {
        try
        {
            var result = await _movieService.GetMovieDetailsAsync(id);
            
            if (result == null)
            {
                return NotFound(new { message = "Filme não encontrado" });
            }

            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Erro ao buscar detalhes do filme", error = ex.Message });
        }
    }

    [HttpGet("{id:int}/creditos")]
    public async Task<ActionResult<CreditsDto>> GetMovieCredits(int id)
    {
        try
        {
            var result = await _movieService.GetMovieCreditsAsync(id);
            
            if (result == null)
            {
                return NotFound(new { message = "Créditos não encontrados" });
            }

            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Erro ao buscar créditos do filme", error = ex.Message });
        }
    }

    [HttpGet("{id:int}/videos")]
    public async Task<ActionResult<VideoResponseDto>> GetMovieVideos(int id)
    {
        try
        {
            var result = await _movieService.GetMovieVideosAsync(id);
            
            if (result == null)
            {
                return NotFound(new { message = "Vídeos não encontrados" });
            }

            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Erro ao buscar vídeos do filme", error = ex.Message });
        }
    }
}
