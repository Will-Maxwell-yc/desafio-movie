using Microsoft.EntityFrameworkCore;
using Movies.Core.Entities;
using Movies.Core.Interfaces;
using Movies.Infrastructure.Data;

namespace Movies.Infrastructure.Repositories;

public class LogRepository : ILogRepository
{
    private readonly MoviesDbContext _context;

    public LogRepository(MoviesDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Log log)
    {
        await _context.Logs.AddAsync(log);
        await _context.SaveChangesAsync();
    }

    public async Task<(IEnumerable<Log> logs, int totalCount)> GetPagedAsync(int page, int pageSize)
    {
        var totalCount = await _context.Logs.CountAsync();
        
        var logs = await _context.Logs
            .OrderByDescending(l => l.DataHoraRequisicao)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (logs, totalCount);
    }
}

