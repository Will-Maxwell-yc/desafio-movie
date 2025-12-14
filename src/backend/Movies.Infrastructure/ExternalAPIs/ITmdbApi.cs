using Movies.Application.Dtos;
using Refit;

namespace Movies.Infrastructure.ExternalAPIs;

public interface ITmdbApi
{
    [Get("/movie/popular")]
    Task<MovieSearchResponseDto> GetPopularMoviesAsync(
        [AliasAs("api_key")] string apiKey,
        [AliasAs("page")] int page = 1);

    [Get("/movie/now_playing")]
    Task<MovieSearchResponseDto> GetNowPlayingMoviesAsync(
        [AliasAs("api_key")] string apiKey,
        [AliasAs("page")] int page = 1);

    [Get("/search/movie")]
    Task<MovieSearchResponseDto> SearchMoviesAsync(
        [AliasAs("api_key")] string apiKey,
        [AliasAs("query")] string query,
        [AliasAs("page")] int page = 1);

    [Get("/movie/{movieId}")]
    Task<MovieDetailsDto> GetMovieDetailsAsync(
        int movieId,
        [AliasAs("api_key")] string apiKey);

    [Get("/movie/{movieId}/credits")]
    Task<CreditsDto> GetMovieCreditsAsync(
        int movieId,
        [AliasAs("api_key")] string apiKey);

    [Get("/movie/{movieId}/videos")]
    Task<VideoResponseDto> GetMovieVideosAsync(
        int movieId,
        [AliasAs("api_key")] string apiKey);

    [Get("/discover/movie")]
    Task<MovieSearchResponseDto> DiscoverMoviesAsync(
        [AliasAs("api_key")] string apiKey,
        [AliasAs("with_genres")] string genres,
        [AliasAs("page")] int page = 1);
}
