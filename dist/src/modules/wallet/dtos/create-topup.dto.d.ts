import { PaymentMethod } from 'generated/prisma/client';
export declare class CreateTopUpDto {
    amount: number;
    paymentMethod: PaymentMethod;
    transactionReference?: string;
    notes?: string;
}
