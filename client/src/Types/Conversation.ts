export type Conversation={
    id:string,
    title:string,
    messages:{
        messageText:string,
        senderName:string,
        senderId:string
    }[]
}