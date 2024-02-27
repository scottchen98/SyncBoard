namespace SyncBoard.Models
{
    public class Card
    {
        public int Id { get; set; }
        public string Content { get; set; } = "";
        public int Position { get; set; }
        public int ColumnId { get; set; }
        public Column Column { get; set; } = null!;
    }
}
