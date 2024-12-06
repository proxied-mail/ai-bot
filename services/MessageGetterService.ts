import {GetMessagesRequest} from "../http/GetMessagesRequest";
import {Config} from "../system/config";

const GetMessages = async (c:Config) => {
    const messages = await GetMessagesRequest(c)
    return messages
}

export default GetMessages