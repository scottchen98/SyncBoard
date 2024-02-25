namespace SyncBoard.Dtos;

public class ColumnDto
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public List<CardInfo> Cards { get; set; } = [];
    public class CardInfo
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
    }
}
