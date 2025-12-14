using System.Text.Json.Serialization;

namespace Movies.Application.Dtos;

public class CreditsDto
{
    [JsonPropertyName("cast")]
    public List<CastDto> Cast { get; set; } = new();
    
    [JsonPropertyName("crew")]
    public List<CrewDto> Crew { get; set; } = new();
}

public class CastDto
{
    [JsonPropertyName("id")]
    public int Id { get; set; }
    
    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;
    
    [JsonPropertyName("character")]
    public string Character { get; set; } = string.Empty;
    
    [JsonPropertyName("profile_path")]
    public string? ProfilePath { get; set; }
    
    [JsonPropertyName("order")]
    public int Order { get; set; }
}

public class CrewDto
{
    [JsonPropertyName("id")]
    public int Id { get; set; }
    
    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;
    
    [JsonPropertyName("job")]
    public string Job { get; set; } = string.Empty;
    
    [JsonPropertyName("department")]
    public string Department { get; set; } = string.Empty;
    
    [JsonPropertyName("profile_path")]
    public string? ProfilePath { get; set; }
}
