using Microsoft.EntityFrameworkCore;

namespace SyncBoard.Models;

public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options) { }

    public DbSet<Column> Columns => Set<Column>();
    public DbSet<Card> Cards => Set<Card>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Card>()
            .HasOne(c => c.Column)
            .WithMany(c => c.Cards)
            .HasForeignKey(fk => fk.ColumnId);

        modelBuilder.Entity<Column>()
            .HasData(
                new Column { Id = 1, Name = "To Do" },
                new Column { Id = 2, Name = "In Progress" },
                new Column { Id = 3, Name = "Done" }
            );

        modelBuilder.Entity<Card>()
            .HasData(
                new Card { Id = 1, Title = "First Card", Description = "This is the first card", ColumnId = 1 },
                new Card { Id = 2, Title = "Second Card", Description = "This is the second card", ColumnId = 1 },
                new Card { Id = 3, Title = "Third Card", Description = "This is the third card", ColumnId = 2 },
                new Card { Id = 4, Title = "Fourth Card", Description = "This is the fourth card", ColumnId = 3 }
            );
    }
}