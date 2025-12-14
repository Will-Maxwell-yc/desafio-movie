using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Movies.Application.Dtos;
using Movies.Core.Interfaces;
using System.Security.Claims;

namespace Movies.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AdminController : ControllerBase
{
    private readonly ILogRepository _logRepository;

    public AdminController(ILogRepository logRepository)
    {
        _logRepository = logRepository;
    }

    [HttpGet("logs")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<ActionResult<PagedLogResponseDto>> GetLogs([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        if (page < 1) page = 1;
        if (pageSize < 1 || pageSize > 100) pageSize = 10;

        try
        {
            var (logs, totalCount) = await _logRepository.GetPagedAsync(page, pageSize);
            
            var logDtos = logs.Select(l => new LogResponseDto
            {
                Id = l.Id,
                IdUsuario = l.IdUsuario,
                EndpointRequisicao = l.EndpointRequisicao,
                DataHoraRequisicao = l.DataHoraRequisicao,
                ObteveSucesso = l.ObteveSucesso
            }).ToList();

            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            var response = new PagedLogResponseDto
            {
                Logs = logDtos,
                TotalCount = totalCount,
                Page = page,
                PageSize = pageSize,
                TotalPages = totalPages
            };

            return Ok(response);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Erro ao buscar logs", error = ex.Message });
        }
    }
}
