import {GetMessagesRequest} from "../http/GetMessagesRequest";
import {Config} from "../system/config";
import {ReplyToMessageRequest} from "../http/ReplyToMessage";
import {ReplyToMessagePayload} from "../dto/ReplyToMessagePayload";
import {ConversationStorage} from "./ConversationStorage";
import {ConversationMessage} from "../dto/ConversationDto";
import {OpenAiRequest} from "../http/OpenAiRequest";

type PmApiMessageDetails = {
    id: string,
    useThisIdToReply: string,
    sender: string,
    recipient: string,
    subject: string,
    'body-html': string,
    'body-plain': string,
}

type PmApiMessage = {
    id : string,
    conversationId: string,
    read: boolean,
    message: PmApiMessageDetails
    proxyBindingId: string,
    proxyBindingBotId: string,
}

type ResponseJson = {
    messages: PmApiMessage[] | null,
    lastId: string
    proxyBindingBots: ProxyBindingBots[]
}

type ProxyBindingBots = {
    id: string,
    status: number,
    session_length: number,
    config: {
        "prompt": string
    } | object
}



const ProcessMessages = async (c:Config, store: ConversationStorage) => {
    try {
        const messages = await GetMessagesRequest(c)
        const json: ResponseJson = await messages.json()

        if (json.messages === null) {
            return ;
        }

        for (let i in json["messages"] as PmApiMessage[]) {
            let proxyBindingBotId: string = json["messages"][i].proxyBindingBotId
            let prompt: string = json["proxyBindingBots"][proxyBindingBotId]["config"]["prompt"]
            if (!prompt) {
                throw new Error('Prompt not found')
            }
            let conversationId: string = json["messages"][i].conversationId
            if (!store.hasConversation(conversationId)) {
                let conversationFirstMessage: ConversationMessage = new ConversationMessage(
                    "system",
                    prompt
                )

                store.push(conversationId, conversationFirstMessage)
            }

            let message: PmApiMessageDetails = json["messages"][i]["message"]
            let id = message.id
            let messagePlain = message["body-plain"]

            let conversationMessage: ConversationMessage = new ConversationMessage(
                "user",
                messagePlain
            )
            store.push(conversationId, conversationMessage)

            console.log(store)

            let responseGpt = await OpenAiRequest(
                c.getOpenAiToken(),
                store.getConversation(conversationId).getMessages()
            )

            store.push(conversationId, new ConversationMessage(
                "system",
                responseGpt
            ))

            responseGpt = responseGpt.replace(/\n/g, "<br/>")
            replyTo(id, c, responseGpt)
        }

    } catch (e) {
        console.log(e)
        return
    }
}

async function replyTo(id: string, c:Config, message:string) {
    const response = await ReplyToMessageRequest(
        new ReplyToMessagePayload(
            id,
            message,
        ),
        c
    )
    let replyJson = await response.json()

    console.log(replyJson)
}


export default ProcessMessages