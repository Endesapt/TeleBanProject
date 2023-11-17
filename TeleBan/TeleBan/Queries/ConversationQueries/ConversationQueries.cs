using TeleBan.Data;
using TeleBan.Types;

namespace TeleBan.Queries.ConversationQueries
{
    [QueryType]
    public class ConversationQueries
    {
        public Conversation GetConversationInfo(Guid ConversationGuid,ApplicationDbContext context) {
            return context.Conversations.FirstOrDefault(c => c.ConversationGuid == ConversationGuid);
        }
    }
}
