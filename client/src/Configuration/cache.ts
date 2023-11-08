import { InMemoryCache, makeVar } from '@apollo/client';

export const notificationCount = makeVar([]);

export const cache = new InMemoryCache({
    typePolicies: {
      Conversation: {
        fields: { // Field policy map for the Product type
          notificationCount: { // Field policy for the isInCart field
            read(_, { readField }) { // The read function for the isInCart field
              const id:number=readField("id")!;
              return notificationCount().find(el=>el[0]==id);
            }
          }
      }
    }
  }
});