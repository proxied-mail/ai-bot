import {Config} from "../system/config";
import {ReplyToMessagePayload} from "../dto/ReplyToMessagePayload";

const  ReplyToMessageRequest = async (p: ReplyToMessagePayload, config: Config) => {
    return await fetch(
        config.getApiUrl() + "/api/v1/received-emails/reply/"+ p.receivedEmailId,
        {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + config.getBearerToken(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "replyHtml": p.messageHtml
            })
        }
    )
}

export {ReplyToMessageRequest}