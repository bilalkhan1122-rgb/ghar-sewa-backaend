export declare const UserRole: {
    readonly CUSTOMER: "CUSTOMER";
    readonly PROVIDER: "PROVIDER";
    readonly ADMIN: "ADMIN";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const UserStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly SUSPENDED: "SUSPENDED";
    readonly BANNED: "BANNED";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const VerificationStatus: {
    readonly INCOMPLETE: "INCOMPLETE";
    readonly PENDING: "PENDING";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
    readonly BANNED: "BANNED";
};
export type VerificationStatus = (typeof VerificationStatus)[keyof typeof VerificationStatus];
export declare const BidStatus: {
    readonly PENDING: "PENDING";
    readonly ACCEPTED: "ACCEPTED";
    readonly REJECTED: "REJECTED";
    readonly WITHDRAWN: "WITHDRAWN";
    readonly EXPIRED: "EXPIRED";
};
export type BidStatus = (typeof BidStatus)[keyof typeof BidStatus];
export declare const BookingType: {
    readonly DIRECT: "DIRECT";
    readonly BID: "BID";
};
export type BookingType = (typeof BookingType)[keyof typeof BookingType];
export declare const BookingStatus: {
    readonly ACCEPTED: "ACCEPTED";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
    readonly DISPUTED: "DISPUTED";
};
export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];
export declare const JobStatus: {
    readonly PENDING: "PENDING";
    readonly ACCEPTED: "ACCEPTED";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
    readonly EXPIRED: "EXPIRED";
    readonly DISPUTED: "DISPUTED";
};
export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus];
export declare const ReviewStatus: {
    readonly PENDING: "PENDING";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
};
export type ReviewStatus = (typeof ReviewStatus)[keyof typeof ReviewStatus];
export declare const RatingFlagStatus: {
    readonly OPEN: "OPEN";
    readonly REVIEWED: "REVIEWED";
    readonly RESOLVED: "RESOLVED";
};
export type RatingFlagStatus = (typeof RatingFlagStatus)[keyof typeof RatingFlagStatus];
export declare const MessageType: {
    readonly TEXT: "TEXT";
    readonly IMAGE: "IMAGE";
    readonly LOCATION: "LOCATION";
};
export type MessageType = (typeof MessageType)[keyof typeof MessageType];
export declare const NotificationType: {
    readonly WELCOME: "WELCOME";
    readonly NEW_JOB: "NEW_JOB";
    readonly JOB_ACCEPTED: "JOB_ACCEPTED";
    readonly NEW_BID: "NEW_BID";
    readonly BID_ACCEPTED: "BID_ACCEPTED";
    readonly BID_REJECTED: "BID_REJECTED";
    readonly BOOKING_CONFIRMED: "BOOKING_CONFIRMED";
    readonly JOB_STARTED: "JOB_STARTED";
    readonly JOB_COMPLETED: "JOB_COMPLETED";
    readonly COMPLETION_CONFIRMED: "COMPLETION_CONFIRMED";
    readonly JOB_CANCELLED: "JOB_CANCELLED";
    readonly JOB_EXPIRED: "JOB_EXPIRED";
    readonly REVIEW_RECEIVED: "REVIEW_RECEIVED";
    readonly VERIFICATION_SUBMITTED: "VERIFICATION_SUBMITTED";
    readonly VERIFICATION_RESUBMITTED: "VERIFICATION_RESUBMITTED";
    readonly VERIFICATION_APPROVED: "VERIFICATION_APPROVED";
    readonly VERIFICATION_REJECTED: "VERIFICATION_REJECTED";
    readonly VERIFICATION_BANNED: "VERIFICATION_BANNED";
    readonly VERIFICATION_UNBANNED: "VERIFICATION_UNBANNED";
    readonly WALLET_UPDATED: "WALLET_UPDATED";
    readonly WITHDRAWAL_PROCESSED: "WITHDRAWAL_PROCESSED";
    readonly DISPUTE_RAISED: "DISPUTE_RAISED";
    readonly DISPUTE_RESPONSE_RECEIVED: "DISPUTE_RESPONSE_RECEIVED";
    readonly DISPUTE_STATUS_UPDATED: "DISPUTE_STATUS_UPDATED";
    readonly DISPUTE_RESOLVED: "DISPUTE_RESOLVED";
    readonly DISPUTE_REJECTED: "DISPUTE_REJECTED";
    readonly PENALTY_WARNING: "PENALTY_WARNING";
    readonly PENALTY_SUSPENSION_STARTED: "PENALTY_SUSPENSION_STARTED";
    readonly PENALTY_SUSPENSION_ENDED: "PENALTY_SUSPENSION_ENDED";
    readonly PENALTY_PERMANENT_BAN: "PENALTY_PERMANENT_BAN";
    readonly APPEAL_APPROVED: "APPEAL_APPROVED";
    readonly APPEAL_REJECTED: "APPEAL_REJECTED";
    readonly WALLET_TOPUP_SUBMITTED: "WALLET_TOPUP_SUBMITTED";
    readonly WALLET_TOPUP_APPROVED: "WALLET_TOPUP_APPROVED";
    readonly WALLET_TOPUP_REJECTED: "WALLET_TOPUP_REJECTED";
    readonly JOB_PAYMENT_COMPLETED: "JOB_PAYMENT_COMPLETED";
    readonly REFUND_RECEIVED: "REFUND_RECEIVED";
    readonly WITHDRAWAL_REQUEST_SUBMITTED: "WITHDRAWAL_REQUEST_SUBMITTED";
    readonly WITHDRAWAL_APPROVED: "WITHDRAWAL_APPROVED";
    readonly WITHDRAWAL_PROCESSING: "WITHDRAWAL_PROCESSING";
    readonly WITHDRAWAL_COMPLETED: "WITHDRAWAL_COMPLETED";
    readonly WITHDRAWAL_REJECTED: "WITHDRAWAL_REJECTED";
    readonly WITHDRAWAL_CANCELLED: "WITHDRAWAL_CANCELLED";
    readonly SYSTEM_ANNOUNCEMENT: "SYSTEM_ANNOUNCEMENT";
};
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];
export declare const NotificationCategory: {
    readonly JOB: "JOB";
    readonly BID: "BID";
    readonly BOOKING: "BOOKING";
    readonly REVIEW: "REVIEW";
    readonly VERIFICATION: "VERIFICATION";
    readonly WALLET: "WALLET";
    readonly DISPUTE: "DISPUTE";
    readonly PENALTY: "PENALTY";
    readonly SYSTEM: "SYSTEM";
    readonly MARKETING: "MARKETING";
};
export type NotificationCategory = (typeof NotificationCategory)[keyof typeof NotificationCategory];
export declare const NotificationDeliveryStatus: {
    readonly PENDING: "PENDING";
    readonly SENT: "SENT";
    readonly DELIVERED: "DELIVERED";
    readonly FAILED: "FAILED";
};
export type NotificationDeliveryStatus = (typeof NotificationDeliveryStatus)[keyof typeof NotificationDeliveryStatus];
export declare const CancellationType: {
    readonly CUSTOMER: "CUSTOMER";
    readonly PROVIDER: "PROVIDER";
    readonly SYSTEM: "SYSTEM";
};
export type CancellationType = (typeof CancellationType)[keyof typeof CancellationType];
export declare const DisputeStatus: {
    readonly OPEN: "OPEN";
    readonly UNDER_REVIEW: "UNDER_REVIEW";
    readonly WAITING_FOR_RESPONSE: "WAITING_FOR_RESPONSE";
    readonly RESOLVED: "RESOLVED";
    readonly REJECTED: "REJECTED";
};
export type DisputeStatus = (typeof DisputeStatus)[keyof typeof DisputeStatus];
export declare const DisputeResolution: {
    readonly FULL_REFUND: "FULL_REFUND";
    readonly PARTIAL_REFUND: "PARTIAL_REFUND";
    readonly REDO_WORK: "REDO_WORK";
    readonly NO_REFUND: "NO_REFUND";
};
export type DisputeResolution = (typeof DisputeResolution)[keyof typeof DisputeResolution];
export declare const DisputeEvidenceType: {
    readonly IMAGE: "IMAGE";
    readonly VIDEO: "VIDEO";
    readonly DOCUMENT: "DOCUMENT";
};
export type DisputeEvidenceType = (typeof DisputeEvidenceType)[keyof typeof DisputeEvidenceType];
export declare const PenaltyType: {
    readonly WARNING: "WARNING";
    readonly TEMPORARY_BAN: "TEMPORARY_BAN";
    readonly PERMANENT_BAN: "PERMANENT_BAN";
};
export type PenaltyType = (typeof PenaltyType)[keyof typeof PenaltyType];
export declare const AppealStatus: {
    readonly PENDING: "PENDING";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
};
export type AppealStatus = (typeof AppealStatus)[keyof typeof AppealStatus];
export declare const AdminRole: {
    readonly SUPER_ADMIN: "SUPER_ADMIN";
    readonly MODERATOR: "MODERATOR";
    readonly FINANCE_ADMIN: "FINANCE_ADMIN";
    readonly SUPPORT_AGENT: "SUPPORT_AGENT";
};
export type AdminRole = (typeof AdminRole)[keyof typeof AdminRole];
export declare const WalletType: {
    readonly CUSTOMER: "CUSTOMER";
    readonly PROVIDER: "PROVIDER";
};
export type WalletType = (typeof WalletType)[keyof typeof WalletType];
export declare const WalletStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly FROZEN: "FROZEN";
    readonly SUSPENDED: "SUSPENDED";
};
export type WalletStatus = (typeof WalletStatus)[keyof typeof WalletStatus];
export declare const WalletTransactionType: {
    readonly TOP_UP: "TOP_UP";
    readonly JOB_PAYMENT: "JOB_PAYMENT";
    readonly PROVIDER_EARNING: "PROVIDER_EARNING";
    readonly PLATFORM_COMMISSION: "PLATFORM_COMMISSION";
    readonly REFUND: "REFUND";
    readonly WITHDRAWAL_REQUEST: "WITHDRAWAL_REQUEST";
    readonly WITHDRAWAL_COMPLETED: "WITHDRAWAL_COMPLETED";
    readonly WITHDRAWAL_REJECTED: "WITHDRAWAL_REJECTED";
    readonly ADJUSTMENT: "ADJUSTMENT";
};
export type WalletTransactionType = (typeof WalletTransactionType)[keyof typeof WalletTransactionType];
export declare const WalletTransactionStatus: {
    readonly PENDING: "PENDING";
    readonly COMPLETED: "COMPLETED";
    readonly FAILED: "FAILED";
};
export type WalletTransactionStatus = (typeof WalletTransactionStatus)[keyof typeof WalletTransactionStatus];
export declare const TopUpStatus: {
    readonly PENDING: "PENDING";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
};
export type TopUpStatus = (typeof TopUpStatus)[keyof typeof TopUpStatus];
export declare const WithdrawalStatus: {
    readonly PENDING: "PENDING";
    readonly APPROVED: "APPROVED";
    readonly PROCESSING: "PROCESSING";
    readonly COMPLETED: "COMPLETED";
    readonly REJECTED: "REJECTED";
    readonly CANCELLED: "CANCELLED";
};
export type WithdrawalStatus = (typeof WithdrawalStatus)[keyof typeof WithdrawalStatus];
export declare const PaymentMethod: {
    readonly JAZZCASH: "JAZZCASH";
    readonly EASYPAISA: "EASYPAISA";
    readonly BANK_TRANSFER: "BANK_TRANSFER";
    readonly CASH: "CASH";
    readonly OTHER: "OTHER";
};
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];
