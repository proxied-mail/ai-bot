import {Config} from "../system/config";

const GetEmailDetailsRequest = async (emailId: string, c: Config) => {
    return await fetch(
        `https://proxiedmail.com/api/v1/received-emails/${emailId}`,
        {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + c.getBearerToken(),
            }
        }
    )
}

export {GetEmailDetailsRequest}
