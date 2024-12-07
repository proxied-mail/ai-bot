import GetMessages from "./services/MessageGetterService";
import {Config, GetConfig} from "./system/config";
import {ReplyToMessageRequest} from "./http/ReplyToMessage";
import {ReplyToMessagePayload} from "./dto/ReplyToMessagePayload";


const config:Config = GetConfig()
const messaging = () => {
    GetMessages(config).then(async (r) => {
        try {
            const json = await r.json()


            if (json.messages === null) {
                return ;
            }

            for (let i in json["messages"]) {
                let message = json["messages"][i]["message"]
                let id = message["id"]
                console.log(message["body-plain"])


                const response = await ReplyToMessageRequest(
                    new ReplyToMessagePayload(
                        id,
                        "<p>Thanks for your message</p>",
                    ),
                    config
                )
                let replyJson = await response.json()

                console.log(replyJson)

            }

        } catch (e) {
            console.log(e)
            return
        }
    })
}

setInterval(messaging, 1000)
