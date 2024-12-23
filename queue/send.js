const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', (err, connection) => {
    if (err) {
        throw err;
    }
    connection.createChannel((err, channel) => {
        if (err) {
            throw err;
        }
        var queue = 'logs';
        var msg = process.argv.slice(2).join(' ') || 'Hello World';

        channel.assertQueue(queue, {
            durable: false
        });

        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(`sent message: ${msg}`);
    });

    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500);
});
