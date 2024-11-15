using Microsoft.EntityFrameworkCore;
using TeamEdit_backend.Models;

namespace TeamEdit_backend.Data;

public class NotesContext : DbContext
{
    public DbSet<Note> Notes { get; set; }

    public NotesContext(DbContextOptions<NotesContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Note>().Property(b => b.Title).HasMaxLength(20);
    }
}
