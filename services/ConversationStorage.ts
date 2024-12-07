import {ConversationDto, ConversationMessage} from "../dto/ConversationDto";

class ConversationStorage
{
    storage: Map<string, ConversationMessage[]> = new Map<string, ConversationMessage[]>()

    constructor() {
    }

    hasConversation(conversationId: string): boolean {
        return typeof this.storage[conversationId] !== "undefined"
    }

    push(conversationId: string, message: ConversationMessage) {
        if (typeof this.storage[conversationId] === "undefined") {
            this.storage[conversationId]  = new ConversationDto(conversationId)
        }

        const conversation: ConversationDto = this.storage[conversationId]
        this.storage[conversationId] = conversation.push(message)

        return this
    }

    getConversation(conversationId: string): ConversationDto {
        return this.storage[conversationId]
    }
}

export {ConversationStorage}