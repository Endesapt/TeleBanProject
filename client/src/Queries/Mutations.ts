import { gql } from '../__generated__';

export const USER_CREATE=gql(`
mutation AddUser {
    addUser {
        id
        userName
        name
    }
}
`);

export const ADD_MESSAGE=gql(`
mutation PostMessage($id:Int!,$message:String!) {
    postMessage(conversationId: $id, message: $message) {
        id
        senderId
        conversationId
        messageText
        createdAt
    }
}
`)

export const DELETE_MESSAGE=gql(`
mutation DeleteMessage($conversationId:Int!,$messageId:String!) {
    deleteMessage(conversationId: $conversationId, messageId: $messageId) {
        id
        conversationId
        messageText
        createdAt
    }
}
`);
export const CREATE_GROUP=gql(`
mutation CreateConversation($title:String!) {
    createConversation(title: $title) {
        id
        title
        creator {
            id
            userName
            name
        }
        conversationGuid
        creatorId
    }
}
`)
export const ENTER_GROUP=gql(`
    mutation EnterConversation($conversationGuid:UUID!) {
    enterConversation(id: $conversationGuid) {
        id
        title
        conversationGuid
    }
}
`)
export const DELETE_CONVERSATION=gql(`
mutation DeleteConversation($id:Int!) {
    deleteConversation(id: $id) {
        id
        title
    }
}`)