/*
Client code to handle server-sent events

let eventSource = new EventSource('http://localhost:3000/stream');
eventSource.onmessage = console.log;

*/

const app = require('express')();
const port = 3000;
const cors = require("cors");
app.use(cors());

app.get('/', (req, res) => {
    res.send('Server-Sent Events Example');
});

app.get('/stream', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    send(res);
});

let count = 0;

function send(res) {
    // Send data to the client without ending the response as we want to send stream of data
    // if you want to end the response, you can use res.end() after sending the last data
    res.write(`data: ${count}\n\n`);  
    count++;
    // if (count > 30) {
    //     res.end(); // End the stream after sending 30 messages
    //     return;
    // }
    setTimeout(() => send(res), 1000);
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

