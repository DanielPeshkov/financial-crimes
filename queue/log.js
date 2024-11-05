const { LambdaClient, InvokeCommand } = require('@aws-sdk/client-lambda');
const amqp = require('amqplib/callback_api');

amqp.connect("amqp://rabbit-service", (err, connection) => {
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
        
        setInterval(() => {
            if (logs.length) {
                let event = JSON.stringify({'logs':logs.map(log => log.toString())});
                lambda(event);
                logs = [];
            }
        }, 10000)
    })
});

async function lambda(payload) {
    const client = new LambdaClient({region: 'us-east-1'});
    const command = new InvokeCommand({
        FunctionName: 'legendary-logger',
        Payload: payload
    });
    let resp = await client.send(command).catch(err => console.log('Lambda error: ', err));
    console.log('Lambda sent');
}
