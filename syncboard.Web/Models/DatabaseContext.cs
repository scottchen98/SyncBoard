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
                new Card { Id = 1, Content = "Card 1", Position = 0, ColumnId = 1 },
                new Card { Id = 2, Content = "Card 2", Position = 1, ColumnId = 1 },
                new Card { Id = 3, Content = "Card 3", Position = 2, ColumnId = 1 },
                new Card { Id = 5, Content = "Card 4", Position = 3, ColumnId = 1 },
                new Card { Id = 6, Content = "Card 5", Position = 0, ColumnId = 2 },
                new Card { Id = 4, Content = "Card 6", Position = 0, ColumnId = 3 }
            );
    }
}