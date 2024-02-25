namespace SyncBoard.Dtos;

public class UpdateCardDto
{
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public int ColumnId { get; set; }
}
