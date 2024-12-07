class ReplyToMessagePayload
{
    public receivedEmailId: string
    public messageHtml: string
    public bearerToken: string

    public constructor(
        receivedEmailId: string,
        messageHtml: string
    ) {
        this.receivedEmailId = receivedEmailId
        this.messageHtml = messageHtml
    }

    public getReceivedEmailId(): string {
        return this.receivedEmailId
    }
    public getMessageHtml(): string {
        return this.messageHtml
    }
}

export {ReplyToMessagePayload}