// consumer.js
const amqp = require('amqplib');

async function consume() {
  const amqpServer = 'amqps://wjnbgxcj:rAbK8qQ8Ck5t2iol3qMs8Z2sTF0IWt7A@possum.lmq.cloudamqp.com/wjnbgxcj';  
  const queue = 'jobs';
  const connection = await amqp.connect(amqpServer); // connect to broker
  const channel = await connection.createChannel();  // create a channel

  // make sure the queue exists
  await channel.assertQueue(queue);

  console.log(`[*] Waiting for messages in ${queue}. To exit press CTRL+C`);

  // consume messages
  channel.consume(
    queue,
    (msg) => {
      if (msg !== null) {
        console.log("Received:", msg.content.toString());

        // To just read (peek) without removing permanently:
        // channel.nack(msg, false, true); // requeue the message

        // To acknowledge and remove from queue:
        channel.ack(msg);
      }
    },
    { noAck: false } // require explicit ack
  );
}

consume().catch(console.error);
