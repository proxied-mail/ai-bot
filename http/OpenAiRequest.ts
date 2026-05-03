type Roles = {
    system: "system"
    user: "user"
}

type Messages = {
    role: keyof Roles, // system or user
    content: string
}

async function OpenAiRequest(token: string, messages: Messages[], gptModel: string): Promise<string> {


    const models = {
        'gpt-3.5-turbo': "gpt-4.1-mini",
        'gpt-4.0': 'gpt-4.1',
        'gpt-4.0-min': "gpt-4.1-mini",
    }
    gptModel = models[gptModel] ?? 'gpt-4.1-mini'

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: gptModel,
            messages: messages
        })
    });

    /**
     * Messages example:
     * [
     *    {role: "system", content: "You are a helpful assistant."},
     *    {role: "user", content: "hey how are you ?"}
     *  ]
     */

    const data = await response.json();
    const messageContent = data.choices[0].message.content;

    console.log(data.choices[0])

    return messageContent
}

export {OpenAiRequest, Messages, Roles}