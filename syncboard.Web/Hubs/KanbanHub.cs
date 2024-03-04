using Microsoft.AspNetCore.SignalR;
namespace SyncBoard.Hubs;

public class KanbanHub : Hub
{
    public async Task SendCard()
    {
        await Clients.All.SendAsync("InvalidateColumns");
    }

    public override Task OnConnectedAsync()
    {
        Console.WriteLine("A Client Connected: " + Context.ConnectionId);
        return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        Console.WriteLine("A client disconnected: " + Context.ConnectionId);
        return base.OnDisconnectedAsync(exception);
    }
}