export default interface CreatePayment {
    amount: number;
    currency: string;

    idempotency_key: string;
    source_id: string;
}