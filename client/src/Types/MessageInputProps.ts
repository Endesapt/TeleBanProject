export type MessageInputProps={
    setMessages:React.Dispatch<React.SetStateAction<{
        messageText: string;
        senderName: string;
    }[]>>,
    chatId:string,
    messages: {
        messageText: string;
        senderName: string;
    }[]
}