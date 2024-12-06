import GetMessages from "./services/MessageGetterService";
import {Config, GetConfig} from "./system/config";


const config:Config = GetConfig()
const messaging = () => {
    GetMessages(config).then(async (r) => {
        const json = await r.json()
        console.log(json)
    })
}

setInterval(messaging, 1000)
