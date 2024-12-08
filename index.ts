import {Config, GetConfig} from "./system/config";
import ProcessMessages from "./services/MessageProcessorService";
import {ConversationStorage} from "./services/ConversationStorage";


/**
 * todo refactor to stat + move lastIteration to internal function
 */
let iterations: number = 0
let lastIteration:string = ""
const config:Config = GetConfig()

let store: ConversationStorage = new ConversationStorage()
const messaging = () => {
    iterations++
    if (iterations > 1000) {
        iterations = 1
    }

    lastIteration = new Date().toISOString()
    ProcessMessages(config, store)
};

setInterval(messaging, 1000)

//create server
const { createServer } = require('node:http');


const hostname = '127.0.0.1';
const port = 5222;

const server = createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    let responseJson : {
        iterations: number,
        lastIteration: string
    } = {
        iterations: iterations,
        lastIteration: lastIteration
    };

    res.end(JSON.stringify(responseJson));
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

