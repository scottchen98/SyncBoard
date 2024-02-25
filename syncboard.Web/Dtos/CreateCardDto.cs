namespace SyncBoard.Dtos;

public class CreateCardDto
{
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public int ColumnId { get; set; }
}
