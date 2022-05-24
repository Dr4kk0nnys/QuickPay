/* Note: Express dependencies */
import express from 'express';
import cors from 'cors';
import { config } from 'dotenv'
import { rateLimit } from 'express-rate-limit'

/* Configurations */
config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(
    rateLimit({
        windowMs: 12 * 60 * 60 * 1000, // 12 hour duration in milliseconds
        max: 100,
        message: 'You exceeded 100 requests in a 12 hour limit!',
        headers: true
    })
);
(async () => {
    try {
        // await database.connect();
    } catch (e) { }
})();

/* Note: Kafka dependencies */
import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    clientId: 'server',
    brokers: ['localhost:9092'],
    retry: {
        initialRetryTime: 300,
        retries: 10
    }
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'payment-api' });

/* Note: Middleware */
import { useProducer } from 'middlewares/producer';
useProducer(producer, app);

/* Note: Using routes */
import { routes } from 'routes/routes';
app.use(routes);

import { logger } from 'utils/log';

(async () => {

    await producer.connect();
    await consumer.connect();
    await consumer.subscribe({ topic: 'payment-response' });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            logger(`Consumer#Server received a new message: ${message.value}`);
        }
    });

    app.listen(3000, () => console.log('Running on port 3000'));

})();