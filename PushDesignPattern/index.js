const http = require('http');
const webSocketServer = require('websocket').server;
let connections = [];


// Create an HTTP server
const server = http.createServer();

// pass the server to the WebSocket server
const wsServer = new webSocketServer({
    httpServer: server
});

// listen on the TCP socket
server.listen(8080, () => {
    console.log('Server is listening on port 8080');
});

// when a legit webSocket request comes listen for it and add it to the connections array
wsServer.on('request', (request) => {

    console.log(`Received a request from ${request.origin}`);
    const connection = request.accept(null, request.origin);

    connection.on('message', (message) => {
        console.log(`Received message: ${message.utf8Data} from ${connection.socket.remotePort}`);
        // someone sent a message, broadcast it to all connections
        connections.forEach((conn) => {
            conn.send(`User ${connection.socket.remotePort} says: ${message.utf8Data}`);
        })
    });

    connections.push(connection);
    console.log(connections);

    console.log(`New connection established. Total connections: ${connections.length}`);

    // someone just connected, tell everyone
    connections.forEach((conn) => {
        console.log(`Sending welcome message to ${conn.socket.remotePort}`);
        conn.send(`User ${connection.socket.remotePort} has joined the chat.`);
    });

});