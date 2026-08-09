import { PaymentMethod } from 'generated/prisma/client';
export declare class CreateWithdrawalDto {
    amount: number;
    paymentMethod: PaymentMethod;
    accountName: string;
    accountNumber: string;
    bankName?: string;
}
