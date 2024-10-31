const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, connection) => {
    if (err) {
        throw err;
    }
    connection.createChannel(async (err, channel) => {
        if (err) {
            throw err;
        }
        var queue = 'logs';

        channel.assertQueue(queue, {
            durable: false
        });

        logs = []
        console.log(`Waiting for messages in queue: ${queue}`);
        await channel.consume(queue, (msg) => {
            logs.push(msg.content)
        }, {
            noAck: true
        });
        
        setInterval(() => lambda(logs), 10000)
    })
});

function lambda(logs) {
    console.log('lambda');
    // Process logs and send to storage
    // In this case log to console
    if (logs.length) {
        let x
        while (x = logs.pop()) {
            const [tim, gat, req, hit] = x.toString().split(',')
            console.log(`Timestamp: ${tim} \tGateway Latency: ${gat}ms \tRequest Processing Latency: ${req}us \tCache Hit: ${Boolean(hit)}`)
        }
    }
}