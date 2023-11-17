using HotChocolate.Authorization;
using HotChocolate.Resolvers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System.Security.Claims;
using TeleBan.Data;
using TeleBan.Types;

namespace TeleBan.Queries.UserQueries
{
    [MutationType]
    [Authorize]
    public class UserMutations
    {
        public async  Task<User?> AddUser(ApplicationDbContext context,ClaimsPrincipal claims, IResolverContext res)
        {
            var user = context.Users.FirstOrDefault(s => s.UserName == claims.FindFirstValue("preferred_username"));
            if (user!=null)
            {
                res.ReportError(ErrorBuilder.New()
                .SetMessage("User is already created")
                .Build());
                return user;
            }
            user = new User()
            {
                UserName= claims.FindFirstValue("preferred_username"),

            };
            await context.Users.AddAsync(user);
            context.SaveChanges();
            return user;
        }
        public Conversation? EnterConversation(Guid id,ApplicationDbContext context, ClaimsPrincipal claims, IResolverContext res)
        {
            string username = claims.FindFirstValue("preferred_username");
            var conversation = context.Conversations.FirstOrDefault(c=>c.ConversationGuid==id);
            if (conversation == null)
            {
                res.ReportError(ErrorBuilder.New()
                .SetMessage("Conversation does not exist!!!")
                .Build());
                return null;
            }
            var user = context.Users.Include(u=>u.Conversations).FirstOrDefault(s=>s.UserName==username);
            if (user.Conversations.FirstOrDefault(u => u.ConversationGuid == id) != null) {
                res.ReportError(ErrorBuilder.New()
                .SetMessage("You are already in this conversation!!")
                .Build()) ;
                return conversation;
            }
            user.Conversations.Add(conversation);
            context.SaveChanges();
            return conversation;
        }
    }
}
