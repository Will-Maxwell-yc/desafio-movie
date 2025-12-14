using Microsoft.Extensions.Configuration;
using Movies.Application.Dtos;
using Refit;

namespace Movies.Infrastructure.ExternalAPIs;

public class TmdbApiClient : ITmdbApi
{
    private readonly ITmdbApi _api;
    private readonly string _apiKey;

    public TmdbApiClient(IConfiguration configuration, HttpClient httpClient)
    {
        _apiKey = configuration["Tmdb:ApiKey"] ?? throw new InvalidOperationException("TMDB API Key não configurada");
        
        httpClient.BaseAddress = new Uri("https://api.themoviedb.org/3");
        
        _api = RestService.For<ITmdbApi>(httpClient);
    }

    public async Task<MovieSearchResponseDto> GetPopularMoviesAsync(string apiKey, int page = 1)
    {
        return await _api.GetPopularMoviesAsync(_apiKey, page);
    }

    public async Task<MovieSearchResponseDto> GetNowPlayingMoviesAsync(string apiKey, int page = 1)
    {
        return await _api.GetNowPlayingMoviesAsync(_apiKey, page);
    }

    public async Task<MovieSearchResponseDto> SearchMoviesAsync(string apiKey, string query, int page = 1)
    {
        return await _api.SearchMoviesAsync(_apiKey, query, page);
    }

    public async Task<MovieDetailsDto> GetMovieDetailsAsync(int movieId, string apiKey)
    {
        return await _api.GetMovieDetailsAsync(movieId, _apiKey);
    }

    public async Task<CreditsDto> GetMovieCreditsAsync(int movieId, string apiKey)
    {
        return await _api.GetMovieCreditsAsync(movieId, _apiKey);
    }

    public async Task<VideoResponseDto> GetMovieVideosAsync(int movieId, string apiKey)
    {
        return await _api.GetMovieVideosAsync(movieId, _apiKey);
    }

    public async Task<MovieSearchResponseDto> DiscoverMoviesAsync(string apiKey, string genres, int page = 1)
    {
        return await _api.DiscoverMoviesAsync(_apiKey, genres, page);
    }
}
