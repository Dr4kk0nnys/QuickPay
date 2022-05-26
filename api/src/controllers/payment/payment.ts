import { createPayment } from "services/payment.service";
import ProcessPayment from "types/interfaces/ProcessPayment";
import { logger } from "utils/log";

const processPayment = async ({ message, producer }: ProcessPayment) => {

    const body = JSON.parse(message.value);
    logger('Consumer#API Processing payment', 'INFO', body);

    const paymentDetails = await createPayment(body);

    if (paymentDetails) {
        logger('Consumer#API Successfully processed payment', 'INFO', paymentDetails);

        await producer.send({
            topic: 'payment-response',
            messages: [{ value: JSON.stringify(paymentDetails) }]
        });

        logger(`Producer#API sent the message`, 'INFO', paymentDetails);
    }
}

export { processPayment };