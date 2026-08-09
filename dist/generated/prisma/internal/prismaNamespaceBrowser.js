"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonNullValueFilter = exports.NullsOrder = exports.QueryMode = exports.NullableJsonNullValueInput = exports.SortOrder = exports.AdminAuditLogScalarFieldEnum = exports.AdminScalarFieldEnum = exports.WalletAuditLogScalarFieldEnum = exports.WithdrawalRequestScalarFieldEnum = exports.TopUpRequestScalarFieldEnum = exports.WalletTransactionScalarFieldEnum = exports.WalletScalarFieldEnum = exports.NotificationPreferenceScalarFieldEnum = exports.DeviceRegistrationScalarFieldEnum = exports.NotificationScalarFieldEnum = exports.MessageScalarFieldEnum = exports.ConversationScalarFieldEnum = exports.RatingFlagScalarFieldEnum = exports.RatingSummaryScalarFieldEnum = exports.ReviewScalarFieldEnum = exports.AppealScalarFieldEnum = exports.ProviderPenaltyScalarFieldEnum = exports.DisputeTimelineScalarFieldEnum = exports.DisputeEvidenceScalarFieldEnum = exports.DisputeScalarFieldEnum = exports.VerificationRequestScalarFieldEnum = exports.CancellationRecordScalarFieldEnum = exports.JobTimelineScalarFieldEnum = exports.BidScalarFieldEnum = exports.JobImageScalarFieldEnum = exports.JobScalarFieldEnum = exports.BookingScalarFieldEnum = exports.GalleryImageScalarFieldEnum = exports.ProviderServiceCategoryScalarFieldEnum = exports.ProviderProfileScalarFieldEnum = exports.ServiceCategoryScalarFieldEnum = exports.RefreshTokenScalarFieldEnum = exports.UserScalarFieldEnum = exports.CityScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.Decimal = void 0;
const runtime = __importStar(require("@prisma/client/runtime/index-browser"));
exports.Decimal = runtime.Decimal;
exports.NullTypes = {
    DbNull: runtime.objectEnumValues.classes.DbNull,
    JsonNull: runtime.objectEnumValues.classes.JsonNull,
    AnyNull: runtime.objectEnumValues.classes.AnyNull,
};
exports.DbNull = runtime.objectEnumValues.instances.DbNull;
exports.JsonNull = runtime.objectEnumValues.instances.JsonNull;
exports.AnyNull = runtime.objectEnumValues.instances.AnyNull;
exports.ModelName = {
    City: 'City',
    User: 'User',
    RefreshToken: 'RefreshToken',
    ServiceCategory: 'ServiceCategory',
    ProviderProfile: 'ProviderProfile',
    ProviderServiceCategory: 'ProviderServiceCategory',
    GalleryImage: 'GalleryImage',
    Booking: 'Booking',
    Job: 'Job',
    JobImage: 'JobImage',
    Bid: 'Bid',
    JobTimeline: 'JobTimeline',
    CancellationRecord: 'CancellationRecord',
    VerificationRequest: 'VerificationRequest',
    Dispute: 'Dispute',
    DisputeEvidence: 'DisputeEvidence',
    DisputeTimeline: 'DisputeTimeline',
    ProviderPenalty: 'ProviderPenalty',
    Appeal: 'Appeal',
    Review: 'Review',
    RatingSummary: 'RatingSummary',
    RatingFlag: 'RatingFlag',
    Conversation: 'Conversation',
    Message: 'Message',
    Notification: 'Notification',
    DeviceRegistration: 'DeviceRegistration',
    NotificationPreference: 'NotificationPreference',
    Wallet: 'Wallet',
    WalletTransaction: 'WalletTransaction',
    TopUpRequest: 'TopUpRequest',
    WithdrawalRequest: 'WithdrawalRequest',
    WalletAuditLog: 'WalletAuditLog',
    Admin: 'Admin',
    AdminAuditLog: 'AdminAuditLog'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.CityScalarFieldEnum = {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.UserScalarFieldEnum = {
    id: 'id',
    fullName: 'fullName',
    phone: 'phone',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    cityId: 'cityId',
    address: 'address',
    status: 'status',
    profileCompleted: 'profileCompleted',
    verificationStatus: 'verificationStatus',
    refreshToken: 'refreshToken',
    isActive: 'isActive',
    profilePhoto: 'profilePhoto',
    walletBalance: 'walletBalance',
    totalSpent: 'totalSpent',
    totalTopups: 'totalTopups',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.RefreshTokenScalarFieldEnum = {
    id: 'id',
    token: 'token',
    userId: 'userId',
    deviceInfo: 'deviceInfo',
    ipAddress: 'ipAddress',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ServiceCategoryScalarFieldEnum = {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    icon: 'icon',
    isActive: 'isActive',
    displayOrder: 'displayOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ProviderProfileScalarFieldEnum = {
    userId: 'userId',
    bio: 'bio',
    hourlyRate: 'hourlyRate',
    serviceRadius: 'serviceRadius',
    serviceLocation: 'serviceLocation',
    facePhoto: 'facePhoto',
    cnicNumber: 'cnicNumber',
    cnicFrontImage: 'cnicFrontImage',
    cnicBackImage: 'cnicBackImage',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ProviderServiceCategoryScalarFieldEnum = {
    providerId: 'providerId',
    categoryId: 'categoryId'
};
exports.GalleryImageScalarFieldEnum = {
    id: 'id',
    providerId: 'providerId',
    imageUrl: 'imageUrl',
    createdAt: 'createdAt'
};
exports.BookingScalarFieldEnum = {
    id: 'id',
    jobId: 'jobId',
    customerId: 'customerId',
    providerId: 'providerId',
    status: 'status',
    bookingType: 'bookingType',
    totalAmount: 'totalAmount',
    acceptedAt: 'acceptedAt',
    startedAt: 'startedAt',
    completedAt: 'completedAt',
    confirmedAt: 'confirmedAt',
    cancelledAt: 'cancelledAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.JobScalarFieldEnum = {
    id: 'id',
    customerId: 'customerId',
    categoryId: 'categoryId',
    title: 'title',
    description: 'description',
    address: 'address',
    latitude: 'latitude',
    longitude: 'longitude',
    offeredPrice: 'offeredPrice',
    status: 'status',
    expiresAt: 'expiresAt',
    preferredSchedule: 'preferredSchedule',
    additionalNotes: 'additionalNotes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.JobImageScalarFieldEnum = {
    id: 'id',
    jobId: 'jobId',
    imageUrl: 'imageUrl',
    createdAt: 'createdAt'
};
exports.BidScalarFieldEnum = {
    id: 'id',
    jobId: 'jobId',
    providerId: 'providerId',
    offeredPrice: 'offeredPrice',
    message: 'message',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.JobTimelineScalarFieldEnum = {
    id: 'id',
    jobId: 'jobId',
    event: 'event',
    description: 'description',
    createdAt: 'createdAt'
};
exports.CancellationRecordScalarFieldEnum = {
    id: 'id',
    jobId: 'jobId',
    bookingId: 'bookingId',
    cancelledBy: 'cancelledBy',
    cancellationType: 'cancellationType',
    penaltyApplied: 'penaltyApplied',
    penaltyId: 'penaltyId',
    reason: 'reason',
    createdAt: 'createdAt'
};
exports.VerificationRequestScalarFieldEnum = {
    id: 'id',
    providerId: 'providerId',
    cnicNumber: 'cnicNumber',
    facePhoto: 'facePhoto',
    cnicFrontImage: 'cnicFrontImage',
    cnicBackImage: 'cnicBackImage',
    status: 'status',
    submittedAt: 'submittedAt',
    reviewedAt: 'reviewedAt',
    reviewedBy: 'reviewedBy',
    rejectionReason: 'rejectionReason',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.DisputeScalarFieldEnum = {
    id: 'id',
    bookingId: 'bookingId',
    jobId: 'jobId',
    raisedById: 'raisedById',
    opponentId: 'opponentId',
    reason: 'reason',
    description: 'description',
    status: 'status',
    resolution: 'resolution',
    refundAmount: 'refundAmount',
    evidenceCount: 'evidenceCount',
    resolvedAt: 'resolvedAt',
    resolvedBy: 'resolvedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.DisputeEvidenceScalarFieldEnum = {
    id: 'id',
    disputeId: 'disputeId',
    uploaderId: 'uploaderId',
    type: 'type',
    fileUrl: 'fileUrl',
    mimeType: 'mimeType',
    size: 'size',
    createdAt: 'createdAt'
};
exports.DisputeTimelineScalarFieldEnum = {
    id: 'id',
    disputeId: 'disputeId',
    actorId: 'actorId',
    action: 'action',
    description: 'description',
    createdAt: 'createdAt'
};
exports.ProviderPenaltyScalarFieldEnum = {
    id: 'id',
    providerId: 'providerId',
    penaltyType: 'penaltyType',
    reason: 'reason',
    startDate: 'startDate',
    endDate: 'endDate',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.AppealScalarFieldEnum = {
    id: 'id',
    penaltyId: 'penaltyId',
    providerId: 'providerId',
    explanation: 'explanation',
    supportingFile: 'supportingFile',
    status: 'status',
    reviewedBy: 'reviewedBy',
    reviewedAt: 'reviewedAt',
    adminNote: 'adminNote',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ReviewScalarFieldEnum = {
    id: 'id',
    bookingId: 'bookingId',
    jobId: 'jobId',
    customerId: 'customerId',
    providerId: 'providerId',
    reviewerId: 'reviewerId',
    revieweeId: 'revieweeId',
    rating: 'rating',
    reviewText: 'reviewText',
    status: 'status',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.RatingSummaryScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    averageRating: 'averageRating',
    totalReviews: 'totalReviews',
    fiveStarCount: 'fiveStarCount',
    fourStarCount: 'fourStarCount',
    threeStarCount: 'threeStarCount',
    twoStarCount: 'twoStarCount',
    oneStarCount: 'oneStarCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.RatingFlagScalarFieldEnum = {
    id: 'id',
    providerId: 'providerId',
    reason: 'reason',
    averageRating: 'averageRating',
    status: 'status',
    createdAt: 'createdAt'
};
exports.ConversationScalarFieldEnum = {
    id: 'id',
    jobId: 'jobId',
    bookingId: 'bookingId',
    customerId: 'customerId',
    providerId: 'providerId',
    lastMessage: 'lastMessage',
    lastMessageAt: 'lastMessageAt',
    lastActivity: 'lastActivity',
    customerDeletedAt: 'customerDeletedAt',
    providerDeletedAt: 'providerDeletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.MessageScalarFieldEnum = {
    id: 'id',
    conversationId: 'conversationId',
    senderId: 'senderId',
    type: 'type',
    content: 'content',
    attachmentUrl: 'attachmentUrl',
    latitude: 'latitude',
    longitude: 'longitude',
    deliveredAt: 'deliveredAt',
    readAt: 'readAt',
    editedAt: 'editedAt',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.NotificationScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    type: 'type',
    category: 'category',
    title: 'title',
    message: 'message',
    relatedEntityType: 'relatedEntityType',
    relatedEntityId: 'relatedEntityId',
    isRead: 'isRead',
    deliveryStatus: 'deliveryStatus',
    deliveryError: 'deliveryError',
    sentAt: 'sentAt',
    readAt: 'readAt',
    deliveredAt: 'deliveredAt',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt'
};
exports.DeviceRegistrationScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    deviceToken: 'deviceToken',
    platform: 'platform',
    lastActiveAt: 'lastActiveAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.NotificationPreferenceScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    jobEnabled: 'jobEnabled',
    chatEnabled: 'chatEnabled',
    bookingEnabled: 'bookingEnabled',
    marketingEnabled: 'marketingEnabled',
    systemEnabled: 'systemEnabled',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.WalletScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    type: 'type',
    balance: 'balance',
    heldBalance: 'heldBalance',
    lifetimeCredits: 'lifetimeCredits',
    lifetimeDebits: 'lifetimeDebits',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.WalletTransactionScalarFieldEnum = {
    id: 'id',
    walletId: 'walletId',
    type: 'type',
    amount: 'amount',
    balanceBefore: 'balanceBefore',
    balanceAfter: 'balanceAfter',
    referenceType: 'referenceType',
    referenceId: 'referenceId',
    processingKey: 'processingKey',
    description: 'description',
    status: 'status',
    createdAt: 'createdAt'
};
exports.TopUpRequestScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    walletId: 'walletId',
    amount: 'amount',
    paymentMethod: 'paymentMethod',
    transactionReference: 'transactionReference',
    proofImage: 'proofImage',
    notes: 'notes',
    status: 'status',
    submittedAt: 'submittedAt',
    reviewedAt: 'reviewedAt',
    reviewedBy: 'reviewedBy',
    rejectionReason: 'rejectionReason',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.WithdrawalRequestScalarFieldEnum = {
    id: 'id',
    providerId: 'providerId',
    walletId: 'walletId',
    amount: 'amount',
    paymentMethod: 'paymentMethod',
    accountName: 'accountName',
    accountNumber: 'accountNumber',
    bankName: 'bankName',
    status: 'status',
    submittedAt: 'submittedAt',
    processedAt: 'processedAt',
    processedBy: 'processedBy',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.WalletAuditLogScalarFieldEnum = {
    id: 'id',
    walletId: 'walletId',
    actorUserId: 'actorUserId',
    actorAdminId: 'actorAdminId',
    action: 'action',
    previousValues: 'previousValues',
    newValues: 'newValues',
    referenceType: 'referenceType',
    referenceId: 'referenceId',
    createdAt: 'createdAt'
};
exports.AdminScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    role: 'role',
    permissions: 'permissions',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.AdminAuditLogScalarFieldEnum = {
    id: 'id',
    adminId: 'adminId',
    action: 'action',
    entityType: 'entityType',
    entityId: 'entityId',
    previousValues: 'previousValues',
    newValues: 'newValues',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    createdAt: 'createdAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.NullableJsonNullValueInput = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map