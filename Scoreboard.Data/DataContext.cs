namespace Scoreboard.Data;
using Microsoft.EntityFrameworkCore;

public class DataContext : DbContext
{
    public DbSet<PlayerModel> PlayerModels { get; set; }

    public DataContext()
    {
    }

    public DataContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        if (!options.IsConfigured)
        {
            options.UseNpgsql("Host=localhost;Port=5432;Database=Player;Username=artemhrasev;Password=''");
        }
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseSerialColumns();
    }
}