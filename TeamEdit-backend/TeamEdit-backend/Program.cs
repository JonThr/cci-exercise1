using Microsoft.EntityFrameworkCore;
using TeamEdit_backend.Data;
using TeamEdit_backend.Endpoints;
using TeamEdit_backend.Interfaces;
using TeamEdit_backend.Repositories;
using TeamEdit_backend.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<NotesContext>(options =>
{
    string connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Could not read connection string");
    options.UseSqlServer(connectionString);
});

builder.Services.AddScoped<INotesRepository, NotesRepository>();
builder.Services.AddTransient<INotesService, NotesService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AngularCorsPolicy",
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod()); 
});

var app = builder.Build();

app.UseSwagger();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AngularCorsPolicy");

//app.UseRouting();

using (var scope = app.Services.CreateScope())
{
    var notesContext = scope.ServiceProvider.GetRequiredService<NotesContext>();

    await notesContext.Database.EnsureCreatedAsync();
}

//app.UseHttpsRedirection();

app.MapNotes();

app.Run();
