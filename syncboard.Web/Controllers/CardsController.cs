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
               Title = c.Title,
               Description = c.Description,
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
                Title = c.Title,
                Description = c.Description,
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

    // PUT: api/Cards/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutCard(int id, UpdateCardDto card)
    {
        var cardToUpdate = await _context.Cards.FindAsync(id);
        if (cardToUpdate == null)
        {
            return NotFound();
        }

        cardToUpdate.Title = card.Title;
        cardToUpdate.Description = card.Description;
        cardToUpdate.ColumnId = card.ColumnId;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException) when (!CardExists(id))
        {
            return NotFound();
        }

        return NoContent();
    }

    // POST: api/Cards
    [HttpPost]
    public async Task<ActionResult<Card>> PostCard(CreateCardDto card)
    {
        var newCard = new Card
        {
            Title = card.Title,
            Description = card.Description,
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

        return NoContent();
    }

    private bool CardExists(int id)
    {
        return _context.Cards.Any(e => e.Id == id);
    }
}

