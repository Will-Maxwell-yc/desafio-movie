using Microsoft.Extensions.Configuration;
using Movies.Application.Dtos;
using Movies.Application.Interfaces;
using Refit;

namespace Movies.Infrastructure.ExternalAPIs;

public class TmdbApiClientAdapter : ITmdbApiClient
{
    private readonly ITmdbApi _api;
    private readonly string _apiKey;

    public TmdbApiClientAdapter(IConfiguration configuration, HttpClient httpClient)
    {
        _apiKey = configuration["Tmdb:ApiKey"] ?? throw new InvalidOperationException("TMDB API Key não configurada");
        
        httpClient.BaseAddress = new Uri("https://api.themoviedb.org/3");
        
        var refitSettings = new RefitSettings
        {
            ContentSerializer = new SystemTextJsonContentSerializer(new System.Text.Json.JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            })
        };
        
        _api = RestService.For<ITmdbApi>(httpClient, refitSettings);
    }

    public async Task<MovieSearchResponseDto> GetPopularMoviesAsync(int page = 1)
    {
        try
        {
            var response = await _api.GetPopularMoviesAsync(_apiKey, page);
            return response;
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    public async Task<MovieSearchResponseDto> GetNowPlayingMoviesAsync(int page = 1)
    {
        try
        {
            var response = await _api.GetNowPlayingMoviesAsync(_apiKey, page);
            return response;
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    public async Task<MovieSearchResponseDto> SearchMoviesAsync(string query, int page = 1)
    {
        return await _api.SearchMoviesAsync(_apiKey, query, page);
    }

    public async Task<MovieDetailsDto> GetMovieDetailsAsync(int movieId)
    {
        return await _api.GetMovieDetailsAsync(movieId, _apiKey);
    }

    public async Task<CreditsDto> GetMovieCreditsAsync(int movieId)
    {
        return await _api.GetMovieCreditsAsync(movieId, _apiKey);
    }

    public async Task<VideoResponseDto> GetMovieVideosAsync(int movieId)
    {
        return await _api.GetMovieVideosAsync(movieId, _apiKey);
    }

    public async Task<MovieSearchResponseDto> DiscoverMoviesByGenreAsync(string genres, int page = 1)
    {
        try
        {
            var response = await _api.DiscoverMoviesAsync(_apiKey, genres, page);
            return response;
        }
        catch (Exception ex)
        {
            throw;
        }
    }
}
