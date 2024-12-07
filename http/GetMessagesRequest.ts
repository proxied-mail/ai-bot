import {Config} from "../system/config";

const  GetMessagesRequest = async (c: Config) => {
    return await fetch(
        c.getApiUrl() + "/gapi/bot/conversations?botUid=" + c.getBotUid() + "&onlyUnread=1",
        {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + c.getBearerToken(),
            }
        }
    )
}

export {GetMessagesRequest}