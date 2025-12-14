using Movies.Application.Dtos;

namespace Movies.Application.Interfaces;

public interface ITmdbApiClient
{
    Task<MovieSearchResponseDto> GetPopularMoviesAsync(int page = 1);
    Task<MovieSearchResponseDto> GetNowPlayingMoviesAsync(int page = 1);
    Task<MovieSearchResponseDto> SearchMoviesAsync(string query, int page = 1);
    Task<MovieDetailsDto> GetMovieDetailsAsync(int movieId);
    Task<CreditsDto> GetMovieCreditsAsync(int movieId);
    Task<VideoResponseDto> GetMovieVideosAsync(int movieId);
    Task<MovieSearchResponseDto> DiscoverMoviesByGenreAsync(string genres, int page = 1);
}
