using Microsoft.AspNetCore.SignalR;
using StudentMaster.DAL.Entities;

public class CustomUserIdProvider : IUserIdProvider
{
    public string GetUserId(HubConnectionContext connection)
    {
        return connection.User?.Identity.Name;
    }
}
