namespace Movies.Application.Dtos;

public class LogResponseDto
{
    public int Id { get; set; }
    public int? IdUsuario { get; set; }
    public string EndpointRequisicao { get; set; } = string.Empty;
    public DateTime DataHoraRequisicao { get; set; }
    public bool ObteveSucesso { get; set; }
}

public class PagedLogResponseDto
{
    public List<LogResponseDto> Logs { get; set; } = new();
    public int TotalCount { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalPages { get; set; }
}
