import { Kafka } from "kafkajs";

const kafka = new Kafka({
    brokers: ['localhost:9092'],
    clientId: 'client'
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'api-payment-api' });

import { processPayment } from "controllers/payment/payment";

import { config } from 'dotenv'
config();

(async () => {
    await producer.connect();
    await consumer.connect();
    await consumer.subscribe({ topic: 'payment' });
    // await consumer.subscribe({ topic: 'payment', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ message }) => processPayment({ message, producer, consumer })
    });
})();