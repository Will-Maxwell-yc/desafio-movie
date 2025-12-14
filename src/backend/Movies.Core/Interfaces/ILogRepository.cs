using Movies.Core.Entities;

namespace Movies.Core.Interfaces;

public interface ILogRepository
{
    Task AddAsync(Log log);
    Task<(IEnumerable<Log> logs, int totalCount)> GetPagedAsync(int page, int pageSize);
}

