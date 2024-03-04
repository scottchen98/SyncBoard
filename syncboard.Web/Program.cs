using Microsoft.EntityFrameworkCore;
using SyncBoard.Models;
using SyncBoard.Hubs;

var builder = WebApplication.CreateBuilder(args);

DotNetEnv.Env.Load();
var connectionString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING");
builder.Services.AddDbContext<DatabaseContext>(
    opt =>
    {
        opt.UseNpgsql(connectionString);
        if (builder.Environment.IsDevelopment())
        {
            opt
              .LogTo(Console.WriteLine, LogLevel.Information)
              .EnableSensitiveDataLogging()
              .EnableDetailedErrors();
        }
    }
);

builder.Services.AddControllers();
builder.Services.AddSignalR();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();
// prefix signalR rotuers with r
app.MapHub<KanbanHub>("/r/kanban");

app.MapGet("/", () => "Hello World!");

app.Run();
