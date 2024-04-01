const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromise = require('fs').promises;

const logEvents = require('./logEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter {};

const myEmitter = new Emitter();


const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    
});

server.listen(PORT, () => console.log(`Server running in port ${PORT}`));


// myEmitter.on('log', (msg) => logEvents(msg));


//     myEmitter.emit('log', 'Log event emitted!');
