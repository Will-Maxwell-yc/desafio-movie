using Movies.Core.Entities;
using Movies.Core.Interfaces;
using System.Security.Claims;

namespace Movies.Api.Middleware;

public class LoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<LoggingMiddleware> _logger;

    public LoggingMiddleware(RequestDelegate next, ILogger<LoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context, ILogRepository logRepository)
    {
        var startTime = DateTime.UtcNow;
        var endpoint = context.Request.Path + context.Request.QueryString;
        var method = context.Request.Method;
        var fullEndpoint = $"{method} {endpoint}";

        int? userId = null;
        if (context.User?.Identity?.IsAuthenticated == true)
        {
            var userIdClaim = context.User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim != null && int.TryParse(userIdClaim.Value, out var id))
            {
                userId = id;
            }
        }

        bool obteveSucesso = false;

        try
        {
            await _next(context);
            
            obteveSucesso = context.Response.StatusCode >= 200 && context.Response.StatusCode < 300;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao processar requisição: {Endpoint}", fullEndpoint);
            obteveSucesso = false;
            throw;
        }
        finally
        {
            try
            {
                var log = new Log
                {
                    IdUsuario = userId,
                    EndpointRequisicao = fullEndpoint,
                    DataHoraRequisicao = startTime,
                    ObteveSucesso = obteveSucesso
                };

                await logRepository.AddAsync(log);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao salvar log no banco de dados");
            }
        }
    }
}

