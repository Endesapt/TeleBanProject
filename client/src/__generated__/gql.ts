/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\nmutation AddUser {\n    addUser {\n        id\n        userName\n        name\n    }\n}\n": types.AddUserDocument,
    "\nmutation PostMessage($id:Int!,$message:String!) {\n    postMessage(conversationId: $id, message: $message) {\n        id\n        senderId\n        conversationId\n        messageText\n        createdAt\n    }\n}\n": types.PostMessageDocument,
    "\nmutation DeleteMessage($conversationId:Int!,$messageId:String!) {\n    deleteMessage(conversationId: $conversationId, messageId: $messageId) {\n        id\n        conversationId\n        messageText\n        createdAt\n    }\n}\n": types.DeleteMessageDocument,
    "\nmutation CreateConversation($title:String!) {\n    createConversation(title: $title) {\n        id\n        title\n        creator {\n            id\n            userName\n            name\n        }\n        conversationGuid\n        creatorId\n    }\n}\n": types.CreateConversationDocument,
    "\n    mutation EnterConversation($conversationGuid:UUID!) {\n    enterConversation(id: $conversationGuid) {\n        id\n        title\n        conversationGuid\n    }\n}\n": types.EnterConversationDocument,
    "\nmutation DeleteConversation($id:Int!) {\n    deleteConversation(id: $id) {\n        id\n        title\n    }\n}": types.DeleteConversationDocument,
    "\nquery User {\n    user {\n        id\n        userName\n        name\n    }\n}\n": types.UserDocument,
    "\nquery Messages($id:Int!) {\n    messages(conversationId: $id) {\n        id\n        conversationId\n        messageText\n        createdAt\n        sender{\n            userName\n        }\n    }\n}\n": types.MessagesDocument,
    "\n    query Conversations{\n        conversations {\n            id\n            title\n            messages{\n                messageText\n                senderId\n            }\n            conversationGuid\n            creatorId\n        }    \n    }\n": types.ConversationsDocument,
    "\n    query ConversationInfo($conversationGuid:UUID!) {\n        conversationInfo(conversationGuid: $conversationGuid) {\n            id\n            title\n        }       \n    }\n": types.ConversationInfoDocument,
    "\nsubscription OnConversationNewMessage($conversationId:ID!) {\n    onConversationNewMessage(conversationId: $conversationId) {\n        id\n        conversationId\n        messageText\n        createdAt\n        sender{\n            userName\n        }\n    }\n}\n": types.OnConversationNewMessageDocument,
    "\nsubscription onDeleteMessage($conversationId:ID!){\n    onDeleteMessage(conversationId: $conversationId){\n        id\n    }\n}\n": types.OnDeleteMessageDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation AddUser {\n    addUser {\n        id\n        userName\n        name\n    }\n}\n"): (typeof documents)["\nmutation AddUser {\n    addUser {\n        id\n        userName\n        name\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation PostMessage($id:Int!,$message:String!) {\n    postMessage(conversationId: $id, message: $message) {\n        id\n        senderId\n        conversationId\n        messageText\n        createdAt\n    }\n}\n"): (typeof documents)["\nmutation PostMessage($id:Int!,$message:String!) {\n    postMessage(conversationId: $id, message: $message) {\n        id\n        senderId\n        conversationId\n        messageText\n        createdAt\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation DeleteMessage($conversationId:Int!,$messageId:String!) {\n    deleteMessage(conversationId: $conversationId, messageId: $messageId) {\n        id\n        conversationId\n        messageText\n        createdAt\n    }\n}\n"): (typeof documents)["\nmutation DeleteMessage($conversationId:Int!,$messageId:String!) {\n    deleteMessage(conversationId: $conversationId, messageId: $messageId) {\n        id\n        conversationId\n        messageText\n        createdAt\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateConversation($title:String!) {\n    createConversation(title: $title) {\n        id\n        title\n        creator {\n            id\n            userName\n            name\n        }\n        conversationGuid\n        creatorId\n    }\n}\n"): (typeof documents)["\nmutation CreateConversation($title:String!) {\n    createConversation(title: $title) {\n        id\n        title\n        creator {\n            id\n            userName\n            name\n        }\n        conversationGuid\n        creatorId\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation EnterConversation($conversationGuid:UUID!) {\n    enterConversation(id: $conversationGuid) {\n        id\n        title\n        conversationGuid\n    }\n}\n"): (typeof documents)["\n    mutation EnterConversation($conversationGuid:UUID!) {\n    enterConversation(id: $conversationGuid) {\n        id\n        title\n        conversationGuid\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation DeleteConversation($id:Int!) {\n    deleteConversation(id: $id) {\n        id\n        title\n    }\n}"): (typeof documents)["\nmutation DeleteConversation($id:Int!) {\n    deleteConversation(id: $id) {\n        id\n        title\n    }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery User {\n    user {\n        id\n        userName\n        name\n    }\n}\n"): (typeof documents)["\nquery User {\n    user {\n        id\n        userName\n        name\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Messages($id:Int!) {\n    messages(conversationId: $id) {\n        id\n        conversationId\n        messageText\n        createdAt\n        sender{\n            userName\n        }\n    }\n}\n"): (typeof documents)["\nquery Messages($id:Int!) {\n    messages(conversationId: $id) {\n        id\n        conversationId\n        messageText\n        createdAt\n        sender{\n            userName\n        }\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query Conversations{\n        conversations {\n            id\n            title\n            messages{\n                messageText\n                senderId\n            }\n            conversationGuid\n            creatorId\n        }    \n    }\n"): (typeof documents)["\n    query Conversations{\n        conversations {\n            id\n            title\n            messages{\n                messageText\n                senderId\n            }\n            conversationGuid\n            creatorId\n        }    \n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query ConversationInfo($conversationGuid:UUID!) {\n        conversationInfo(conversationGuid: $conversationGuid) {\n            id\n            title\n        }       \n    }\n"): (typeof documents)["\n    query ConversationInfo($conversationGuid:UUID!) {\n        conversationInfo(conversationGuid: $conversationGuid) {\n            id\n            title\n        }       \n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nsubscription OnConversationNewMessage($conversationId:ID!) {\n    onConversationNewMessage(conversationId: $conversationId) {\n        id\n        conversationId\n        messageText\n        createdAt\n        sender{\n            userName\n        }\n    }\n}\n"): (typeof documents)["\nsubscription OnConversationNewMessage($conversationId:ID!) {\n    onConversationNewMessage(conversationId: $conversationId) {\n        id\n        conversationId\n        messageText\n        createdAt\n        sender{\n            userName\n        }\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nsubscription onDeleteMessage($conversationId:ID!){\n    onDeleteMessage(conversationId: $conversationId){\n        id\n    }\n}\n"): (typeof documents)["\nsubscription onDeleteMessage($conversationId:ID!){\n    onDeleteMessage(conversationId: $conversationId){\n        id\n    }\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;