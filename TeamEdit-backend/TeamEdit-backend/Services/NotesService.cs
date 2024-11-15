using Microsoft.EntityFrameworkCore;
using TeamEdit_backend.Interfaces;
using TeamEdit_backend.Models;

namespace TeamEdit_backend.Services;

public class NotesService(INotesRepository notesRepository, ILogger<NotesService> logger) : INotesService
{
    private readonly INotesRepository _notesRepository = notesRepository;
    private readonly ILogger _logger = logger;

    public async Task<Note> AddNoteAsync(Note note, CancellationToken cancellationToken = default)
    {
        try
        {
            _logger.LogInformation("AddNote {note}", note);
            note = await _notesRepository.AddNoteAsync(note, cancellationToken);
        }
        catch (Exception ex) when (ex is DbUpdateException)
        {
            _logger.LogError(ex, "Error updating the note");
            throw;
        }

        return note;
    }

    public async Task<Note?> DeleteNoteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var note = await _notesRepository.DeleteNoteAsync(id, cancellationToken);
        return note;
    }

    public async Task<IEnumerable<Note>> GetAllNotesAsync(CancellationToken cancellationToken = default)
    {
        IEnumerable<Note> notes;

        try
        {
            _logger.LogInformation("GetAllNotes");
            notes = await _notesRepository.GetAllNotesAsync(cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting the notes");
            throw;
        }

        return notes;
    }

    public async Task<Note?> GetNoteByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        try
        {
            _logger.LogInformation("GetNoteById {id}", id);
            Note? note = await _notesRepository.GetNoteByIdAsync(id, cancellationToken);
            return note;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting the note");
            throw;
        }
    }

    public async Task<Note?> UpdateNoteAsync(Note note, CancellationToken cancellationToken = default)
    {
        var existingNote = await _notesRepository.UpdateNoteAsync(note, cancellationToken);
        return existingNote;
    }
}
