import { Kafka } from "kafkajs";

const kafka = new Kafka({
    brokers: ['localhost:9092'],
    clientId: 'payment-api-client'
});

const topic = 'payment';
const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'payment-api-receiver' });

const run = async () => {
    await producer.connect();
    await consumer.connect();
    await consumer.subscribe({ topic });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const prefix = `${topic}[${partition}|${message.offset}] / ${message.timestamp}`;
            console.log(`- ${prefix} ${message.key}#${message.value}`);

            const payload = JSON.parse(message.value.toString());

            setTimeout(async () => {
                await producer.send({
                    topic: 'payment-response',
                    messages: [{ value: `Payment ${payload} received` }]
                });
            }, 3000);
        }
    });
}

try {
    run();
} catch (e) {
    console.error(e);
}