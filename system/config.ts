import * as dotenv from 'dotenv';
import * as process from "process";

class Config {
    private BearerToken: string = ""
    private ApiUrl: string = ""
    private BotUid: string = ""
    private OpenAiToken: string = ""

    constructor() {
        this.BearerToken = this.required(process.env["BEARER_TOKEN"], 'BEARER_TOKEN')
        this.ApiUrl = this.required(process.env["API_URL"], 'API_URL')
        this.BotUid = this.required(process.env["BOT_UID"], 'BOT_UID')
        this.OpenAiToken = this.required(process.env["OPENAI_TOKEN"], 'OPENAI_TOKEN')
    }

    required(v:any, name: string): any {
        if (typeof v === 'undefined') {
            throw new Error('Env value is not present in env: ' + name);
        }
        return v
    }

    getBearerToken(): string {
        return this.BearerToken
    }

    getApiUrl(): string {
        return this.ApiUrl
    }

    getBotUid(): string {
        return this.BotUid
    }

    getOpenAiToken(): string {
        return this.OpenAiToken
    }
}


const GetConfig = function (): Config {
    dotenv.config()

    return new Config
}

export {Config, GetConfig}