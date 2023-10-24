using HotChocolate.Execution;
using HotChocolate.Subscriptions;
using TeleBan.Types;

namespace TeleBan.Queries.ConversationQueries
{
    [SubscriptionType]
    public class ConversationSubscriptions
    {
        [Subscribe(With = nameof(SubscribeToOnConversationNewMessage))]
        public Message OnConversationNewMessage(
           [ID] int conversationId,
           [EventMessage] Message message) =>message;

        public async ValueTask<ISourceStream<Message>> SubscribeToOnConversationNewMessage(
            int conversationId,
            [Service] ITopicEventReceiver eventReceiver,
            CancellationToken cancellationToken) =>
            await eventReceiver.SubscribeAsync<Message>(
                $"OnNewMessage_{conversationId}", cancellationToken);
    }
}
