import axios from "axios";

import CreatePayment from "types/interfaces/CreatePayment";

import { logger } from "utils/log";

const createPayment = async (paymentInfo: CreatePayment) => {
    try {
        const response = await axios({
            method: 'POST',
            url: 'https://connect.squareupsandbox.com/v2/payments',
            headers: {
                'Square-Version': '2022-05-12',
                'Authorization': `Bearer ${process.env.PAYMENT_API_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            data: paymentInfo
        });

        return response.data;
    } catch (e) {
        logger(e, 'ERROR');
    }
}

export { createPayment };