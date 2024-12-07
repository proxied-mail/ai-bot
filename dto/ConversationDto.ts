import {Messages, Roles} from "../http/OpenAiRequest";

class ConversationDto {
    messages: ConversationMessage[]
    conversationId: string

    public constructor(conversationId: string) {
        this.messages = []
        this.conversationId = conversationId
    }

    public push(m: ConversationMessage) {
        this.messages.push(m)
        return this
    }

    public getMessages(): ConversationMessage[] {
        return this.messages
    }

    public getConversationId(): string {
        return this.conversationId
    }
}

class ConversationMessage implements Messages {
    public role: keyof Roles
    public content:string

    public constructor(role: keyof Roles, content: string) {
        this.role = role
        this.content = content
    }
}

export {ConversationDto, ConversationMessage}
