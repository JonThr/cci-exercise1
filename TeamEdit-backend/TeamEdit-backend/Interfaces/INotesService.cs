using TeamEdit_backend.Models;

namespace TeamEdit_backend.Interfaces;

public interface INotesService
{
    Task<Note> AddNoteAsync(Note note, CancellationToken cancellationToken = default);
    Task<Note?> GetNoteByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<IEnumerable<Note>> GetAllNotesAsync(CancellationToken cancellationToken = default);
    Task<Note?> DeleteNoteAsync(Guid id, CancellationToken cancellationToken = default);
    Task<Note?> UpdateNoteAsync(Note note, CancellationToken cancellationToken = default);
}
