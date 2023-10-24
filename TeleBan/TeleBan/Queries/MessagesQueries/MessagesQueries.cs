using HotChocolate.Resolvers;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TeleBan.Data;
using TeleBan.Types;

namespace TeleBan.Queries.MessagesQueries
{
    [QueryType]
    public class MessagesQueries
    {
        public IQueryable<Message> GetMessages(int ConversationId, ApplicationDbContext context, ClaimsPrincipal claims, IResolverContext res)
        {
            string username = claims.FindFirstValue("preferred_username");
            var conversations = context.Users.Include(u => u.Conversations).FirstOrDefault(u => u.UserName == username).Conversations;
            var conversation = conversations?.FirstOrDefault(u => u.Id == ConversationId);
            if (conversation == null)
            {
                res.ReportError(ErrorBuilder.New()
                .SetMessage("You are not in this conversation or conversation does not exist!!!")
                .Build());
                return null;
            }
            return context.Messages.Where(m => m.ConversationId == ConversationId);
        }
        
    }
}
