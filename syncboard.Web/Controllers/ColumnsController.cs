using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SyncBoard.Models;
using SyncBoard.Dtos;

namespace SyncBoard.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ColumnsController(DatabaseContext context) : ControllerBase
{
    private readonly DatabaseContext _context = context;

    // GET: api/Columns
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ColumnDto>>> GetColumns()
    {
        return await _context.Columns
        .Include(c => c.Cards)
        .Select(c => new ColumnDto
        {
            Id = c.Id,
            Name = c.Name,
            Cards = c.Cards
                .Select(cd => new ColumnDto.CardInfo
                {
                    Id = cd.Id,
                    Content = cd.Content,
                    Position = cd.Position,
                    ColumnId = cd.ColumnId
                })
                .OrderBy(c => c.Position).ToList()
        }).ToListAsync();
    }

    // GET: api/Columns/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ColumnDto>> GetColumn(int id)
    {
        var column = await _context.Columns
            .Include(c => c.Cards)
            .Where(c => c.Id == id)
            .Select(c => new ColumnDto
            {
                Id = c.Id,
                Name = c.Name,
                Cards = c.Cards.Select(cd => new ColumnDto.CardInfo
                {
                    Id = cd.Id,
                    Content = cd.Content,
                    Position = cd.Position
                }).ToList()
            }).FirstOrDefaultAsync();

        if (column == null)
        {
            return NotFound();
        }

        return column;
    }

    // PUT: api/Columns/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutColumn(int id, UpdateColumnDto column)
    {
        var columnToUpdate = await _context.Columns.FindAsync(id);
        if (columnToUpdate == null)
        {
            return NotFound();
        }

        columnToUpdate.Name = column.Name;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException) when (!ColumnExists(id))
        {
            return NotFound();
        }

        return NoContent();
    }

    // POST: api/Columns
    [HttpPost]
    public async Task<ActionResult<Column>> PostColumn(CreateColumnDto column)
    {
        var newColumn = new Column
        {
            Name = column.Name
        };
        _context.Columns.Add(newColumn);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetColumn", new { id = newColumn.Id }, newColumn);
    }

    // DELETE: api/Columns/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteColumn(int id)
    {
        var column = await _context.Columns.FindAsync(id);
        if (column == null)
        {
            return NotFound();
        }

        _context.Columns.Remove(column);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ColumnExists(int id)
    {
        return _context.Columns.Any(e => e.Id == id);
    }
}

