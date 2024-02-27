namespace SyncBoard.Dtos;

public class CardDto
{
    public int Id { get; set; }
    public string Content { get; set; } = "";
    public int Position { get; set; }
    public ColumnInfo Column { get; set; } = null!;
    public class ColumnInfo
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
    }
}
