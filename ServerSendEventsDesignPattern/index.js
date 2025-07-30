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
    res.write(`data: ${count}\n\n`);
    count++;
    setTimeout(() => send(res), 1000);
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

