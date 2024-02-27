namespace SyncBoard.Dtos;

public class UpdateCardDto
{
    public string Content { get; set; } = "";
    public int Position { get; set; }
    public int ColumnId { get; set; }
}
