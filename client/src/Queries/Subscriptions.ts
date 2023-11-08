import { gql } from "../__generated__";

export const CHAT_SUBSCRIPTIONS=gql(`
subscription OnConversationNewMessage($conversationId:ID!) {
    onConversationNewMessage(conversationId: $conversationId) {
        id
        conversationId
        messageText
        createdAt
        sender{
            userName
        }
    }
}
`)

export const DELETE_MESSAGE_SUBSCRIPTION=gql(`
subscription onDeleteMessage($conversationId:ID!){
    onDeleteMessage(conversationId: $conversationId){
        id
    }
}
`)