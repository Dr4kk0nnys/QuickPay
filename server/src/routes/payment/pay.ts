import { Router } from "express";
const router = Router();

import { CompressionTypes } from "kafkajs";
import { logger } from "utils/log";

router.post('/', async (req, res) => {

    const body = req.body;

    logger(`Endpoint#Server received the body ${body}`);

    /* Note: Calling microservice */
    await req['producer'].send({
        topic: 'payment',
        compression: CompressionTypes.GZIP,
        messages: [{ value: JSON.stringify(body) }]
    });

    logger(`Endpoint#Server sent the message ${body}`);

    return res.status(200).send({ ok: true, status: 'pending' });
});

export { router as paymentRouter };