using HotChocolate.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using TeleBan.Data;
using TeleBan.Types;

namespace TeleBan.Queries.UserQueries
{
    [QueryType]
    [Authorize]
    public class UserQueries
    {
        public User? GetUser(ApplicationDbContext context, ClaimsPrincipal claims) {
            string userName = claims.FindFirstValue("preferred_username")!;
            Console.WriteLine(userName);
            return context.Users.FirstOrDefault(s => s.UserName ==userName);
        }
        public ICollection<Conversation> GetConversations(ApplicationDbContext context, ClaimsPrincipal claims)
        {
            string username = claims.FindFirstValue("preferred_username")!;
            return context.Users.Include(u=>u.Conversations)
                    .ThenInclude((c)=>c.Messages.Take(1))
                .FirstOrDefault(u=>u.UserName==username).Conversations;
        }
    }
}
