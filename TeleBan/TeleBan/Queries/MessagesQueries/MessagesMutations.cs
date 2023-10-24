using HotChocolate.Resolvers;
using HotChocolate.Subscriptions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TeleBan.Data;
using TeleBan.Types;

namespace TeleBan.Queries.MessagesQueries
{
    [MutationType]
    public class MessagesMutations
    {
        public async Task<Message> PostMessage(int ConversationId, string Message,
            ApplicationDbContext context, ClaimsPrincipal claims,
            IResolverContext res,
            [Service] ITopicEventSender eventSender,CancellationToken cancellationToken) {
            string username = claims.FindFirstValue("preferred_username");
            var user = context.Users.Include(u => u.Conversations).FirstOrDefault(u => u.UserName == username);
            var conversation = user.Conversations?.FirstOrDefault(u => u.Id == ConversationId);
            if (conversation == null)
            {
                res.ReportError(ErrorBuilder.New()
                .SetMessage("You are not in this conversation!!!")
                .Build());
                return null;
            }
            var message = new Message()
            {
                ConversationId = ConversationId,
                MessageText = Message,
                SenderId = user.Id,
                CreatedAt = DateTime.UtcNow,
            };
            context.Messages.Add(message);
            await context.SaveChangesAsync();
            await eventSender.SendAsync($"OnNewMessage_{conversation.Id}", message,cancellationToken);
            return message;
        }
    }
}
