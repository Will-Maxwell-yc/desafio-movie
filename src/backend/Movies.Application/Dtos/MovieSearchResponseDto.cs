using System.Text.Json.Serialization;

namespace Movies.Application.Dtos;

public class MovieSearchResponseDto
{
    [JsonPropertyName("page")]
    public int Page { get; set; }
    
    [JsonPropertyName("results")]
    public List<MovieDto> Results { get; set; } = new();
    
    [JsonPropertyName("total_pages")]
    public int TotalPages { get; set; }
    
    [JsonPropertyName("total_results")]
    public int TotalResults { get; set; }
}
