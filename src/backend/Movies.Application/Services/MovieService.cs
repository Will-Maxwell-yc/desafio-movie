using Movies.Application.Dtos;
using Movies.Application.Interfaces;

namespace Movies.Application.Services;

public class MovieService : IMovieService
{
    private readonly ITmdbApiClient _tmdbApiClient;

    public MovieService(ITmdbApiClient tmdbApiClient)
    {
        _tmdbApiClient = tmdbApiClient;
    }

    public async Task<MovieSearchResponseDto> GetPopularMoviesAsync(int page = 1)
    {
        try
        {
            var response = await _tmdbApiClient.GetPopularMoviesAsync(page);
            return response;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<MovieSearchResponseDto> GetNowPlayingMoviesAsync(int page = 1)
    {
        try
        {
            var response = await _tmdbApiClient.GetNowPlayingMoviesAsync(page);
            return response ?? throw new InvalidOperationException("Response from API was null");
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    public async Task<MovieSearchResponseDto> SearchMoviesAsync(string query, int page = 1)
    {
        var response = await _tmdbApiClient.SearchMoviesAsync(query, page);
        return response;
    }

    public async Task<MovieSearchResponseDto> GetMoviesByGenreAsync(string genres, int page = 1)
    {
        if (string.IsNullOrWhiteSpace(genres))
        {
            throw new ArgumentException("Genres parameter cannot be null or empty", nameof(genres));
        }

        try
        {
            var response = await _tmdbApiClient.DiscoverMoviesByGenreAsync(genres, page);
            return response ?? throw new InvalidOperationException("Response from API was null");
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    public async Task<MovieDetailsDto?> GetMovieDetailsAsync(int movieId)
    {
        var response = await _tmdbApiClient.GetMovieDetailsAsync(movieId);
        return response;
    }

    public async Task<CreditsDto?> GetMovieCreditsAsync(int movieId)
    {
        var response = await _tmdbApiClient.GetMovieCreditsAsync(movieId);
        return response;
    }

    public async Task<VideoResponseDto?> GetMovieVideosAsync(int movieId)
    {
        var response = await _tmdbApiClient.GetMovieVideosAsync(movieId);
        return response;
    }
}
