namespace Movies.Core.Entities;

public class Log
{
    public int Id { get; set; }
    public int? IdUsuario { get; set; }
    public string EndpointRequisicao { get; set; } = string.Empty;
    public DateTime DataHoraRequisicao { get; set; }
    public bool ObteveSucesso { get; set; }
}
