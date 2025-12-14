using Microsoft.EntityFrameworkCore;
using Movies.Core.Entities;
using Movies.Core.Interfaces;
using Movies.Infrastructure.Data;

namespace Movies.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly MoviesDbContext _context;

    public UserRepository(MoviesDbContext context)
    {
        _context = context;
    }

    public async Task<User?> GetByNomeAsync(string nome)
    {
        return await _context.Usuarios
            .FirstOrDefaultAsync(u => u.Nome == nome);
    }

    public async Task<User?> GetByIdAsync(int id)
    {
        return await _context.Usuarios
            .FirstOrDefaultAsync(u => u.Id == id);
    }
}

