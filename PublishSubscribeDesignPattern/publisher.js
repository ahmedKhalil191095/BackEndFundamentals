// Pub/Sub Design Pattern Implementation
// One Publish, Many Reads



const amqp = require('amqplib');
const msg = {number: process.argv[2]};   // message to be sent passed as command line argument 
// const arg0 = process.argv[0];  path to node executable
// const arg1 = process.argv[1];  path to this script
// console.log(`Running ${arg0} ${arg1} with message:`, msg);
connect();

async function connect() {
    try {
        // RabbitMQ server URL
        // Note: Replace with your actual RabbitMQ server URL
        const amqpServer = 'amqps://wjnbgxcj:rAbK8qQ8Ck5t2iol3qMs8Z2sTF0IWt7A@possum.lmq.cloudamqp.com/wjnbgxcj';
        // connect to RabbitMQ broker
        const connection = await amqp.connect(amqpServer);
        // create a channel
        const channel = await connection.createChannel();
        // make sure the queue exists
        await channel.assertQueue('jobs');
        // send the message to the queue
        await channel.sendToQueue('jobs', Buffer.from(JSON.stringify(msg)));
        console.log(`Job sent successfully ${msg.number}`);
        // close the channel and connection
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
    }
}