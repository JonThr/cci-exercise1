namespace TeamEdit_backend.Models;

public class Note(Guid id, string title, string content, DateTime lastModified)
{
    public Note() : this(Guid.NewGuid(), string.Empty, string.Empty, DateTime.Now)
    {
    }

    public Guid Id { get; set; } = id;
    public string Title { get; set; } = title;
    public string Content { get; set; } = content;
    public DateTime LastModified { get; set; } = lastModified;
}