using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SyncBoard.Models;
using SyncBoard.Dtos;

namespace SyncBoard.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CardsController(DatabaseContext context) : ControllerBase
{
    private readonly DatabaseContext _context = context;

    // GET: api/Cards
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CardDto>>> GetCards()
    {
        return await _context.Cards
           .Include(c => c.Column)
           .Select(c => new CardDto
           {
               Id = c.Id,
               Content = c.Content,
               Position = c.Position,
               Column = new CardDto.ColumnInfo
               {
                   Id = c.Column.Id,
                   Name = c.Column.Name
               }
           }).ToListAsync();
    }

    // GET: api/Cards/5
    [HttpGet("{id}")]
    public async Task<ActionResult<CardDto>> GetCard(int id)
    {
        var card = await _context.Cards
            .Include(c => c.Column)
            .Where(c => c.Id == id)
            .Select(c => new CardDto
            {
                Id = c.Id,
                Content = c.Content,
                Position = c.Position,
                Column = new CardDto.ColumnInfo
                {
                    Id = c.Column.Id,
                    Name = c.Column.Name
                }
            }).FirstOrDefaultAsync();

        if (card == null)
        {
            return NotFound();
        }

        return card;
    }

    // PUT: api/Cards
    [HttpPut]
    public async Task<IActionResult> PutCard(List<UpdateCardDto> cards)
    {

        try
        {
            foreach (var card in cards)
            {
                var cardToUpdate = await _context.Cards.FindAsync(card.Id);
                if (cardToUpdate == null)
                {
                    return NotFound();
                }

                // Update the position and column id of the card to match the new order and column
                cardToUpdate.Position = card.Position;
                cardToUpdate.ColumnId = card.ColumnId;
            }
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error: {ex.Message}");
        }
    }

    // POST: api/Cards
    [HttpPost]
    public async Task<ActionResult<Card>> PostCard(CreateCardDto card)
    {
        var newCard = new Card
        {
            Content = card.Content,
            Position = card.Position,
            ColumnId = card.ColumnId
        };
        _context.Cards.Add(newCard);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetCard", new { id = newCard.Id }, newCard);
    }

    // DELETE: api/Cards/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCard(int id)
    {
        var card = await _context.Cards.FindAsync(id);
        if (card == null)
        {
            return NotFound();
        }

        _context.Cards.Remove(card);
        await _context.SaveChangesAsync();

        // Update the position of the remaining cards from the same column
        var column = await _context.Columns.Include(c => c.Cards).FirstOrDefaultAsync(c => c.Id == card.ColumnId);
        if (column == null)
        {
            return NotFound();
        }

        var cards = column.Cards.ToList();
        for (int i = 0; i < cards.Count; i++)
        {
            var cardToUpdate = await _context.Cards.FindAsync(cards[i].Id);
            if (cardToUpdate == null)
            {
                return NotFound();
            }

            cardToUpdate.Position = i;
        }
        await _context.SaveChangesAsync();
        return NoContent();
    }

    private bool CardExists(int id)
    {
        return _context.Cards.Any(e => e.Id == id);
    }
}

