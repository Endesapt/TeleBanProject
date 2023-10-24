using HotChocolate.Resolvers;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Security.Cryptography.Xml;
using TeleBan.Data;
using TeleBan.Types;

namespace TeleBan.Queries.ConversationQueries
{
    [MutationType]
    public class ConversationMutations
    {
        public async Task<Conversation> CreateConversation(string title,ApplicationDbContext context, ClaimsPrincipal claims, IResolverContext res)
        {
            string username=claims.FindFirstValue("preferred_username");
            var user=context.Users.FirstOrDefault(x => x.UserName == username);
            Conversation conversation = new()
            {
                Title = title,
                Creator = user,
                Participants = new List<User>()
            };
            await context.Conversations.AddAsync(conversation);
            conversation.Participants.Add(user);
            context.SaveChanges();
            return conversation;
        }
        public async Task<Conversation> DeleteConversation(int id,ApplicationDbContext context, ClaimsPrincipal claims, IResolverContext res)
        {
            string username = claims.FindFirstValue("preferred_username");
            var user = context.Users.FirstOrDefault(x => x.UserName == username);
            var conversation = context.Conversations.Include(c=>c.Creator).FirstOrDefault(c => c.Id == id);
            if (conversation == null)
            {
                res.ReportError(ErrorBuilder.New()
                .SetMessage("Conversation does not exist!!!")
                .Build());
                return null;
            }
            if (conversation.Creator.UserName != username)
            {
                res.ReportError(ErrorBuilder.New()
               .SetMessage("You cant delete group because you are not a creator!")
               .Build());
                return null;
            }
            context.Conversations.Remove(conversation);
            context.SaveChanges();
            return conversation;
        }

    }
}
