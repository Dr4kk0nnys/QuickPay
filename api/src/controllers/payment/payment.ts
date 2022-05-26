import { createPayment } from "services/payment.service";
import ProcessPayment from "types/interfaces/ProcessPayment";
import { logger } from "utils/log";

const processPayment = async ({ message, producer }: ProcessPayment) => {
    logger(`Consumer#Api received a new message: ${message.value}`);

    const { amount, currency, idempotency_key, source_id } = message;

    const paymentDetails = await createPayment({
        amount,
        currency,
        idempotency_key,
        source_id
    });

    logger(paymentDetails, 'RESPONSE')

    await producer.send({
        topic: 'payment-response',
        messages: [{ value: paymentDetails }]
    });
}

export { processPayment };