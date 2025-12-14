using Movies.Core.Entities;

namespace Movies.Core.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByNomeAsync(string nome);
    Task<User?> GetByIdAsync(int id);
}

