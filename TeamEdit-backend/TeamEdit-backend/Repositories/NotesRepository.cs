using Microsoft.EntityFrameworkCore;
using TeamEdit_backend.Data;
using TeamEdit_backend.Interfaces;
using TeamEdit_backend.Models;

namespace TeamEdit_backend.Repositories;

public class NotesRepository(NotesContext context, ILogger<NotesRepository> logger) : INotesRepository
{
    private readonly NotesContext _context = context;
    private readonly ILogger<NotesRepository> _logger = logger;

    public async Task<Note> AddNoteAsync(Note note, CancellationToken cancellationToken = default)
    {
        _context.Notes.Add(note);

        try
        {
            await _context.SaveChangesAsync(cancellationToken);
        }
        catch (DbUpdateException ex)
        {
            _logger.LogError(ex, "Storing a note failed.");
        }

        return note;
    }

    public async Task<Note?> DeleteNoteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var note = await _context.Notes.FindAsync(id);
        if (note == null)
            return null;

        _context.Notes.Remove(note);
        await _context.SaveChangesAsync();

        return note;
    }

    public async Task<IEnumerable<Note>> GetAllNotesAsync(CancellationToken cancellationToken = default)
    {
        var notes = await _context.Notes.ToListAsync(cancellationToken);
        return notes;
    }

    public async Task<Note?> GetNoteByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var note = await _context.Notes.FindAsync(id, cancellationToken);
        return note;
    }

    public async Task<Note?> UpdateNoteAsync(Note note, CancellationToken cancellationToken = default)
    {
        var existingNote = await GetNoteByIdAsync(note.Id);
        if (existingNote == null)
        {
            var newNote = await AddNoteAsync(note, cancellationToken);
            return newNote;
        }

        existingNote.Title = note.Title;
        existingNote.Content = note.Content;
        existingNote.LastModified = DateTime.Now;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            _logger.LogError(ex, "Storing a note failed.");
        }

        return note;

        //_context.Entry(note).State = EntityState.Modified;

        //try
        //{
        //    await _context.SaveChangesAsync();
        //}
        //catch(DbUpdateException ex)
        //{
        //    _logger.LogError(ex, "Updating a note failed.");
        //}
    }
}
