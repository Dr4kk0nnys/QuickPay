import { Kafka } from "kafkajs";

const kafka = new Kafka({
    brokers: ['localhost:9092'],
    clientId: 'client'
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'payment-api' });

import { logger } from "utils/log";

(async () => {
    await producer.connect();
    await consumer.connect();
    await consumer.subscribe({ topic: 'payment' });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            logger(`Consumer#Api received a new message: ${message.value}`);


            /* TODO: Do the payment logic */
            /* TODO: Return the response with the payment details */


            // setTimeout(async () => {
            //     await producer.send({
            //         topic: 'payment-response',
            //         messages: [{ value: `Payment received` }]
            //     });
            // }, 3000);
        }
    });
})();