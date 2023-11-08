using HotChocolate.Resolvers;
using HotChocolate.Subscriptions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using System.Security.Claims;
using TeleBan.Data;
using TeleBan.Types;

namespace TeleBan.Queries.MessagesQueries
{
    [MutationType]
    public class MessagesMutations
    {
        public async Task<Message> PostMessage(int conversationId, string Message,
            ApplicationDbContext context, ClaimsPrincipal claims,
            IResolverContext res,
            [Service] ITopicEventSender eventSender,CancellationToken cancellationToken) {
            string username = claims.FindFirstValue("preferred_username");
            var user = context.Users.Include(u => u.Conversations).FirstOrDefault(u => u.UserName == username);
            var conversation = user.Conversations?.FirstOrDefault(u => u.Id == conversationId);
            if (conversation == null)
            {
                res.ReportError(ErrorBuilder.New()
                .SetMessage("You are not in this conversation!!!")
                .Build());
                return null;
            }
            var message = new Message()
            {
                ConversationId = conversationId,
                MessageText = Message,
                SenderId = user.Id,
                CreatedAt = DateTime.UtcNow,
            };
            context.Messages.Add(message);
            await context.SaveChangesAsync();
            await eventSender.SendAsync($"OnNewMessage_{conversation.Id}", message,cancellationToken);
            message.Sender = new() { UserName = user.UserName };
            return message;
        }
        public async Task<Message> DeleteMessage(int conversationId,string messageId,ApplicationDbContext context, ClaimsPrincipal claims,
            IResolverContext res,
            [Service] ITopicEventSender eventSender, CancellationToken cancellationToken)
        {
            string username = claims.FindFirstValue("preferred_username");
            var user = context.Users.Include(u => u.Conversations).FirstOrDefault(u => u.UserName == username);
            var conversation = user.Conversations?.FirstOrDefault(u => u.Id == conversationId);
            if (conversation == null)
            {
                res.ReportError(ErrorBuilder.New()
                .SetMessage("You are not in this conversation!!!")
                .Build());
                return null;
            }
            var message = context.Messages.Find(Guid.Parse(messageId));
            if (message == null || message.ConversationId!=conversation.Id)
            {
                res.ReportError(ErrorBuilder.New()
                .SetMessage("message does not exist")
                .Build());
                return null;
            }
            context.Messages.Remove(message);
            context.SaveChanges();
            await eventSender.SendAsync($"OnDeleteMessage_{conversation.Id}", message, cancellationToken);
            return message;
        }
    }
}
