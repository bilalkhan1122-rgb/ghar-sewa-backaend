import { DisputeResolution } from 'generated/prisma/client';
export declare class ResolveDisputeDto {
    resolution: DisputeResolution;
    refundAmount?: number;
    note?: string;
}
