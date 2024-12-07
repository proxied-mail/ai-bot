import {Config, GetConfig} from "./system/config";
import ProcessMessages from "./services/MessageProcessorService";
import {ConversationStorage} from "./services/ConversationStorage";



const config:Config = GetConfig()

let store: ConversationStorage = new ConversationStorage()
const messaging = () => {
    ProcessMessages(config, store)
};

setInterval(messaging, 1000)
