using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using TeamEdit_backend.Interfaces;
using TeamEdit_backend.Models;

namespace TeamEdit_backend.Endpoints;

public static class NotesEndpoint
{
    public static void MapNotes(this IEndpointRouteBuilder routeBuilder)
    {
        var group = routeBuilder.MapGroup("/notes")
            .WithTags("Notes");

        group.MapGet("/", async ([FromServices] INotesService notesService) =>
        {
            var notes = await notesService.GetAllNotesAsync();
            return TypedResults.Ok(notes);
        }).WithName("GetAllNotes")
        .WithOpenApi();

        group.MapGet("/{id:guid}", async Task<Results<Ok<Note>, NotFound>> (INotesService notesService, Guid id) =>
        {
            var note = await notesService.GetNoteByIdAsync(id);
            if (note == null)
                return TypedResults.NotFound();

            return TypedResults.Ok(note);
        }).WithName("GetNotesById")
        .WithOpenApi();

        group.MapPost("/", async Task<Results<Created<Note>, BadRequest>> (
            [FromServices] INotesService notesService, 
            [FromBody] Note note) =>
        {
            if (note == null)
            {
                return TypedResults.BadRequest();
            }

            note = await notesService.AddNoteAsync(note);
            return TypedResults.Created($"/notes/{note.Id}", note);

        }).WithName("AddNote")
        .WithOpenApi();

        group.MapPut("/{id:guid}", async Task<Results<BadRequest, Ok>> (Guid id, Note note, INotesService notesService) =>
        {
            if (note == null || id != note.Id)
            {
                return TypedResults.BadRequest();
            }

            var existingNote = await notesService.UpdateNoteAsync(note);
            return TypedResults.Ok();
        }).WithName("UpdateNote")
        .WithOpenApi();

        group.MapDelete("/{id:guid}", async Task<Results<Ok, NotFound>> (Guid id,INotesService notesService) =>
        {
            var note = await notesService.GetNoteByIdAsync(id);
            if(note == null)
                return TypedResults.NotFound();

            await notesService.DeleteNoteAsync(id);
            return TypedResults.Ok();
        }).WithName("DeleteNote")
        .WithOpenApi();
    }
}
