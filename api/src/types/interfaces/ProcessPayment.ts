import { Consumer, Producer } from "kafkajs";

export default interface ProcessPayment {
    message: Record<string, any>;
    producer: Producer;
    consumer: Consumer;
}