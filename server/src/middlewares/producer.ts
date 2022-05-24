import { Express } from 'express'
import { Producer } from 'kafkajs';

const useProducer = (producer: Producer, app: Express) => {

    /* Note: Middleware of producer to all routes */
    app.use((req, _, next) => {
        req['producer'] = producer;

        return next();
    });
}

export { useProducer };