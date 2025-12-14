using Microsoft.EntityFrameworkCore;
using Movies.Core.Entities;

namespace Movies.Infrastructure.Data;

public class MoviesDbContext : DbContext
{
    public MoviesDbContext(DbContextOptions<MoviesDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Usuarios { get; set; }
    public DbSet<Log> Logs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasData(
            new User { Id = 1, Nome = "GI", Senha = "nuCl3o", TipoUsuario = "Normal" },
            new User { Id = 2, Nome = "ADMIN", Senha = "l#gUin", TipoUsuario = "Administrador" }
        );
    }
}
