namespace Movies.Application.Dtos;

// DTO para serialização na API (camelCase para o frontend)
public class MovieSearchResponseApiDto
{
    public int Page { get; set; }
    
    public List<MovieApiDto> Results { get; set; } = new();
    
    public int TotalPages { get; set; }
    
    public int TotalResults { get; set; }
    
    public static MovieSearchResponseApiDto FromDto(MovieSearchResponseDto dto)
    {
        return new MovieSearchResponseApiDto
        {
            Page = dto.Page,
            Results = dto.Results.Select(m => new MovieApiDto
            {
                Id = m.Id,
                Title = m.Title,
                Overview = m.Overview,
                ReleaseDate = m.ReleaseDate,
                VoteAverage = m.VoteAverage,
                PosterPath = m.PosterPath,
                BackdropPath = m.BackdropPath
            }).ToList(),
            TotalPages = dto.TotalPages,
            TotalResults = dto.TotalResults
        };
    }
}

public class MovieApiDto
{
    public int Id { get; set; }
    
    public string Title { get; set; } = string.Empty;
    
    public string Overview { get; set; } = string.Empty;
    
    public string ReleaseDate { get; set; } = string.Empty;
    
    public double VoteAverage { get; set; }
    
    public string? PosterPath { get; set; }
    
    public string? BackdropPath { get; set; }
}


