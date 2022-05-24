import { Router } from "express";
const router = Router();

import { CompressionTypes } from "kafkajs";
import { logger } from "utils/log";

router.post('/', async (req, res) => {

    const { message } = req.body;

    logger(`Endpoint#Server received the message ${message}`);

    /* Note: Calling microservice */
    await req['producer'].send({
        topic: 'payment',
        compression: CompressionTypes.GZIP,
        messages: [{ value: JSON.stringify(message) }]
    });

    logger(`Endpoint#Server sent the message ${message}`);

    return res.status(200).send({ ok: true });
});

export { router as paymentRouter };