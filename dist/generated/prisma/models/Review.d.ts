import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type ReviewModel = runtime.Types.Result.DefaultSelection<Prisma.$ReviewPayload>;
export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null;
    _avg: ReviewAvgAggregateOutputType | null;
    _sum: ReviewSumAggregateOutputType | null;
    _min: ReviewMinAggregateOutputType | null;
    _max: ReviewMaxAggregateOutputType | null;
};
export type ReviewAvgAggregateOutputType = {
    rating: number | null;
};
export type ReviewSumAggregateOutputType = {
    rating: number | null;
};
export type ReviewMinAggregateOutputType = {
    id: string | null;
    bookingId: string | null;
    jobId: string | null;
    customerId: string | null;
    providerId: string | null;
    reviewerId: string | null;
    revieweeId: string | null;
    rating: number | null;
    reviewText: string | null;
    status: $Enums.ReviewStatus | null;
    deletedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ReviewMaxAggregateOutputType = {
    id: string | null;
    bookingId: string | null;
    jobId: string | null;
    customerId: string | null;
    providerId: string | null;
    reviewerId: string | null;
    revieweeId: string | null;
    rating: number | null;
    reviewText: string | null;
    status: $Enums.ReviewStatus | null;
    deletedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ReviewCountAggregateOutputType = {
    id: number;
    bookingId: number;
    jobId: number;
    customerId: number;
    providerId: number;
    reviewerId: number;
    revieweeId: number;
    rating: number;
    reviewText: number;
    status: number;
    deletedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ReviewAvgAggregateInputType = {
    rating?: true;
};
export type ReviewSumAggregateInputType = {
    rating?: true;
};
export type ReviewMinAggregateInputType = {
    id?: true;
    bookingId?: true;
    jobId?: true;
    customerId?: true;
    providerId?: true;
    reviewerId?: true;
    revieweeId?: true;
    rating?: true;
    reviewText?: true;
    status?: true;
    deletedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ReviewMaxAggregateInputType = {
    id?: true;
    bookingId?: true;
    jobId?: true;
    customerId?: true;
    providerId?: true;
    reviewerId?: true;
    revieweeId?: true;
    rating?: true;
    reviewText?: true;
    status?: true;
    deletedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ReviewCountAggregateInputType = {
    id?: true;
    bookingId?: true;
    jobId?: true;
    customerId?: true;
    providerId?: true;
    reviewerId?: true;
    revieweeId?: true;
    rating?: true;
    reviewText?: true;
    status?: true;
    deletedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ReviewAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithRelationInput | Prisma.ReviewOrderByWithRelationInput[];
    cursor?: Prisma.ReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ReviewCountAggregateInputType;
    _avg?: ReviewAvgAggregateInputType;
    _sum?: ReviewSumAggregateInputType;
    _min?: ReviewMinAggregateInputType;
    _max?: ReviewMaxAggregateInputType;
};
export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
    [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateReview[P]> : Prisma.GetScalarType<T[P], AggregateReview[P]>;
};
export type ReviewGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithAggregationInput | Prisma.ReviewOrderByWithAggregationInput[];
    by: Prisma.ReviewScalarFieldEnum[] | Prisma.ReviewScalarFieldEnum;
    having?: Prisma.ReviewScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ReviewCountAggregateInputType | true;
    _avg?: ReviewAvgAggregateInputType;
    _sum?: ReviewSumAggregateInputType;
    _min?: ReviewMinAggregateInputType;
    _max?: ReviewMaxAggregateInputType;
};
export type ReviewGroupByOutputType = {
    id: string;
    bookingId: string;
    jobId: string;
    customerId: string;
    providerId: string;
    reviewerId: string;
    revieweeId: string;
    rating: number;
    reviewText: string | null;
    status: $Enums.ReviewStatus;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: ReviewCountAggregateOutputType | null;
    _avg: ReviewAvgAggregateOutputType | null;
    _sum: ReviewSumAggregateOutputType | null;
    _min: ReviewMinAggregateOutputType | null;
    _max: ReviewMaxAggregateOutputType | null;
};
type GetReviewGroupByPayload<T extends ReviewGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ReviewGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ReviewGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ReviewGroupByOutputType[P]>;
}>>;
export type ReviewWhereInput = {
    AND?: Prisma.ReviewWhereInput | Prisma.ReviewWhereInput[];
    OR?: Prisma.ReviewWhereInput[];
    NOT?: Prisma.ReviewWhereInput | Prisma.ReviewWhereInput[];
    id?: Prisma.StringFilter<"Review"> | string;
    bookingId?: Prisma.StringFilter<"Review"> | string;
    jobId?: Prisma.StringFilter<"Review"> | string;
    customerId?: Prisma.StringFilter<"Review"> | string;
    providerId?: Prisma.StringFilter<"Review"> | string;
    reviewerId?: Prisma.StringFilter<"Review"> | string;
    revieweeId?: Prisma.StringFilter<"Review"> | string;
    rating?: Prisma.IntFilter<"Review"> | number;
    reviewText?: Prisma.StringNullableFilter<"Review"> | string | null;
    status?: Prisma.EnumReviewStatusFilter<"Review"> | $Enums.ReviewStatus;
    deletedAt?: Prisma.DateTimeNullableFilter<"Review"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Review"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Review"> | Date | string;
    booking?: Prisma.XOR<Prisma.BookingScalarRelationFilter, Prisma.BookingWhereInput>;
    job?: Prisma.XOR<Prisma.JobScalarRelationFilter, Prisma.JobWhereInput>;
    customer?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    provider?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    reviewer?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    reviewee?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type ReviewOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    reviewerId?: Prisma.SortOrder;
    revieweeId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviewText?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    booking?: Prisma.BookingOrderByWithRelationInput;
    job?: Prisma.JobOrderByWithRelationInput;
    customer?: Prisma.UserOrderByWithRelationInput;
    provider?: Prisma.UserOrderByWithRelationInput;
    reviewer?: Prisma.UserOrderByWithRelationInput;
    reviewee?: Prisma.UserOrderByWithRelationInput;
};
export type ReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    bookingId_reviewerId?: Prisma.ReviewBookingIdReviewerIdCompoundUniqueInput;
    AND?: Prisma.ReviewWhereInput | Prisma.ReviewWhereInput[];
    OR?: Prisma.ReviewWhereInput[];
    NOT?: Prisma.ReviewWhereInput | Prisma.ReviewWhereInput[];
    bookingId?: Prisma.StringFilter<"Review"> | string;
    jobId?: Prisma.StringFilter<"Review"> | string;
    customerId?: Prisma.StringFilter<"Review"> | string;
    providerId?: Prisma.StringFilter<"Review"> | string;
    reviewerId?: Prisma.StringFilter<"Review"> | string;
    revieweeId?: Prisma.StringFilter<"Review"> | string;
    rating?: Prisma.IntFilter<"Review"> | number;
    reviewText?: Prisma.StringNullableFilter<"Review"> | string | null;
    status?: Prisma.EnumReviewStatusFilter<"Review"> | $Enums.ReviewStatus;
    deletedAt?: Prisma.DateTimeNullableFilter<"Review"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Review"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Review"> | Date | string;
    booking?: Prisma.XOR<Prisma.BookingScalarRelationFilter, Prisma.BookingWhereInput>;
    job?: Prisma.XOR<Prisma.JobScalarRelationFilter, Prisma.JobWhereInput>;
    customer?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    provider?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    reviewer?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    reviewee?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "bookingId_reviewerId">;
export type ReviewOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    reviewerId?: Prisma.SortOrder;
    revieweeId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviewText?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ReviewCountOrderByAggregateInput;
    _avg?: Prisma.ReviewAvgOrderByAggregateInput;
    _max?: Prisma.ReviewMaxOrderByAggregateInput;
    _min?: Prisma.ReviewMinOrderByAggregateInput;
    _sum?: Prisma.ReviewSumOrderByAggregateInput;
};
export type ReviewScalarWhereWithAggregatesInput = {
    AND?: Prisma.ReviewScalarWhereWithAggregatesInput | Prisma.ReviewScalarWhereWithAggregatesInput[];
    OR?: Prisma.ReviewScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ReviewScalarWhereWithAggregatesInput | Prisma.ReviewScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Review"> | string;
    bookingId?: Prisma.StringWithAggregatesFilter<"Review"> | string;
    jobId?: Prisma.StringWithAggregatesFilter<"Review"> | string;
    customerId?: Prisma.StringWithAggregatesFilter<"Review"> | string;
    providerId?: Prisma.StringWithAggregatesFilter<"Review"> | string;
    reviewerId?: Prisma.StringWithAggregatesFilter<"Review"> | string;
    revieweeId?: Prisma.StringWithAggregatesFilter<"Review"> | string;
    rating?: Prisma.IntWithAggregatesFilter<"Review"> | number;
    reviewText?: Prisma.StringNullableWithAggregatesFilter<"Review"> | string | null;
    status?: Prisma.EnumReviewStatusWithAggregatesFilter<"Review"> | $Enums.ReviewStatus;
    deletedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Review"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Review"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Review"> | Date | string;
};
export type ReviewCreateInput = {
    id?: string;
    rating: number;
    reviewText?: string | null;
    status?: $Enums.ReviewStatus;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    booking: Prisma.BookingCreateNestedOneWithoutReviewsInput;
    job: Prisma.JobCreateNestedOneWithoutReviewsInput;
    customer: Prisma.UserCreateNestedOneWithoutCustomerReviewsInput;
    provider: Prisma.UserCreateNestedOneWithoutProviderReviewsInput;
    reviewer: Prisma.UserCreateNestedOneWithoutReviewsWrittenInput;
    reviewee: Prisma.UserCreateNestedOneWithoutReviewsReceivedInput;
};
export type ReviewUncheckedCreateInput = {
    id?: string;
    bookingId: string;
    jobId: string;
    customerId: string;
    providerId: string;
    reviewerId: string;
    revieweeId: string;
    rating: number;
    reviewText?: string | null;
    status?: $Enums.ReviewStatus;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReviewUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    reviewText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    booking?: Prisma.BookingUpdateOneRequiredWithoutReviewsNestedInput;
    job?: Prisma.JobUpdateOneRequiredWithoutReviewsNestedInput;
    customer?: Prisma.UserUpdateOneRequiredWithoutCustomerReviewsNestedInput;
    provider?: Prisma.UserUpdateOneRequiredWithoutProviderReviewsNestedInput;
    reviewer?: Prisma.UserUpdateOneRequiredWithoutReviewsWrittenNestedInput;
    reviewee?: Prisma.UserUpdateOneRequiredWithoutReviewsReceivedNestedInput;
};
export type ReviewUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewerId?: Prisma.StringFieldUpdateOperationsInput | string;
    revieweeId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    reviewText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewCreateManyInput = {
    id?: string;
    bookingId: string;
    jobId: string;
    customerId: string;
    providerId: string;
    reviewerId: string;
    revieweeId: string;
    rating: number;
    reviewText?: string | null;
    status?: $Enums.ReviewStatus;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReviewUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    reviewText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewerId?: Prisma.StringFieldUpdateOperationsInput | string;
    revieweeId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    reviewText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewListRelationFilter = {
    every?: Prisma.ReviewWhereInput;
    some?: Prisma.ReviewWhereInput;
    none?: Prisma.ReviewWhereInput;
};
export type ReviewOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ReviewBookingIdReviewerIdCompoundUniqueInput = {
    bookingId: string;
    reviewerId: string;
};
export type ReviewCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    reviewerId?: Prisma.SortOrder;
    revieweeId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviewText?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ReviewAvgOrderByAggregateInput = {
    rating?: Prisma.SortOrder;
};
export type ReviewMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    reviewerId?: Prisma.SortOrder;
    revieweeId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviewText?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ReviewMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    reviewerId?: Prisma.SortOrder;
    revieweeId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviewText?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ReviewSumOrderByAggregateInput = {
    rating?: Prisma.SortOrder;
};
export type ReviewCreateNestedManyWithoutReviewerInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutReviewerInput, Prisma.ReviewUncheckedCreateWithoutReviewerInput> | Prisma.ReviewCreateWithoutReviewerInput[] | Prisma.ReviewUncheckedCreateWithoutReviewerInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutReviewerInput | Prisma.ReviewCreateOrConnectWithoutReviewerInput[];
    createMany?: Prisma.ReviewCreateManyReviewerInputEnvelope;
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
};
export type ReviewCreateNestedManyWithoutRevieweeInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutRevieweeInput, Prisma.ReviewUncheckedCreateWithoutRevieweeInput> | Prisma.ReviewCreateWithoutRevieweeInput[] | Prisma.ReviewUncheckedCreateWithoutRevieweeInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutRevieweeInput | Prisma.ReviewCreateOrConnectWithoutRevieweeInput[];
    createMany?: Prisma.ReviewCreateManyRevieweeInputEnvelope;
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
};
export type ReviewCreateNestedManyWithoutCustomerInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutCustomerInput, Prisma.ReviewUncheckedCreateWithoutCustomerInput> | Prisma.ReviewCreateWithoutCustomerInput[] | Prisma.ReviewUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutCustomerInput | Prisma.ReviewCreateOrConnectWithoutCustomerInput[];
    createMany?: Prisma.ReviewCreateManyCustomerInputEnvelope;
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
};
export type ReviewCreateNestedManyWithoutProviderInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutProviderInput, Prisma.ReviewUncheckedCreateWithoutProviderInput> | Prisma.ReviewCreateWithoutProviderInput[] | Prisma.ReviewUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutProviderInput | Prisma.ReviewCreateOrConnectWithoutProviderInput[];
    createMany?: Prisma.ReviewCreateManyProviderInputEnvelope;
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
};
export type ReviewUncheckedCreateNestedManyWithoutReviewerInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutReviewerInput, Prisma.ReviewUncheckedCreateWithoutReviewerInput> | Prisma.ReviewCreateWithoutReviewerInput[] | Prisma.ReviewUncheckedCreateWithoutReviewerInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutReviewerInput | Prisma.ReviewCreateOrConnectWithoutReviewerInput[];
    createMany?: Prisma.ReviewCreateManyReviewerInputEnvelope;
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
};
export type ReviewUncheckedCreateNestedManyWithoutRevieweeInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutRevieweeInput, Prisma.ReviewUncheckedCreateWithoutRevieweeInput> | Prisma.ReviewCreateWithoutRevieweeInput[] | Prisma.ReviewUncheckedCreateWithoutRevieweeInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutRevieweeInput | Prisma.ReviewCreateOrConnectWithoutRevieweeInput[];
    createMany?: Prisma.ReviewCreateManyRevieweeInputEnvelope;
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
};
export type ReviewUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutCustomerInput, Prisma.ReviewUncheckedCreateWithoutCustomerInput> | Prisma.ReviewCreateWithoutCustomerInput[] | Prisma.ReviewUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutCustomerInput | Prisma.ReviewCreateOrConnectWithoutCustomerInput[];
    createMany?: Prisma.ReviewCreateManyCustomerInputEnvelope;
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
};
export type ReviewUncheckedCreateNestedManyWithoutProviderInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutProviderInput, Prisma.ReviewUncheckedCreateWithoutProviderInput> | Prisma.ReviewCreateWithoutProviderInput[] | Prisma.ReviewUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutProviderInput | Prisma.ReviewCreateOrConnectWithoutProviderInput[];
    createMany?: Prisma.ReviewCreateManyProviderInputEnvelope;
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
};
export type ReviewUpdateManyWithoutReviewerNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutReviewerInput, Prisma.ReviewUncheckedCreateWithoutReviewerInput> | Prisma.ReviewCreateWithoutReviewerInput[] | Prisma.ReviewUncheckedCreateWithoutReviewerInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutReviewerInput | Prisma.ReviewCreateOrConnectWithoutReviewerInput[];
    upsert?: Prisma.ReviewUpsertWithWhereUniqueWithoutReviewerInput | Prisma.ReviewUpsertWithWhereUniqueWithoutReviewerInput[];
    createMany?: Prisma.ReviewCreateManyReviewerInputEnvelope;
    set?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    disconnect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    delete?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    update?: Prisma.ReviewUpdateWithWhereUniqueWithoutReviewerInput | Prisma.ReviewUpdateWithWhereUniqueWithoutReviewerInput[];
    updateMany?: Prisma.ReviewUpdateManyWithWhereWithoutReviewerInput | Prisma.ReviewUpdateManyWithWhereWithoutReviewerInput[];
    deleteMany?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
};
export type ReviewUpdateManyWithoutRevieweeNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutRevieweeInput, Prisma.ReviewUncheckedCreateWithoutRevieweeInput> | Prisma.ReviewCreateWithoutRevieweeInput[] | Prisma.ReviewUncheckedCreateWithoutRevieweeInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutRevieweeInput | Prisma.ReviewCreateOrConnectWithoutRevieweeInput[];
    upsert?: Prisma.ReviewUpsertWithWhereUniqueWithoutRevieweeInput | Prisma.ReviewUpsertWithWhereUniqueWithoutRevieweeInput[];
    createMany?: Prisma.ReviewCreateManyRevieweeInputEnvelope;
    set?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    disconnect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    delete?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    update?: Prisma.ReviewUpdateWithWhereUniqueWithoutRevieweeInput | Prisma.ReviewUpdateWithWhereUniqueWithoutRevieweeInput[];
    updateMany?: Prisma.ReviewUpdateManyWithWhereWithoutRevieweeInput | Prisma.ReviewUpdateManyWithWhereWithoutRevieweeInput[];
    deleteMany?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
};
export type ReviewUpdateManyWithoutCustomerNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutCustomerInput, Prisma.ReviewUncheckedCreateWithoutCustomerInput> | Prisma.ReviewCreateWithoutCustomerInput[] | Prisma.ReviewUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutCustomerInput | Prisma.ReviewCreateOrConnectWithoutCustomerInput[];
    upsert?: Prisma.ReviewUpsertWithWhereUniqueWithoutCustomerInput | Prisma.ReviewUpsertWithWhereUniqueWithoutCustomerInput[];
    createMany?: Prisma.ReviewCreateManyCustomerInputEnvelope;
    set?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    disconnect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    delete?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    update?: Prisma.ReviewUpdateWithWhereUniqueWithoutCustomerInput | Prisma.ReviewUpdateWithWhereUniqueWithoutCustomerInput[];
    updateMany?: Prisma.ReviewUpdateManyWithWhereWithoutCustomerInput | Prisma.ReviewUpdateManyWithWhereWithoutCustomerInput[];
    deleteMany?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
};
export type ReviewUpdateManyWithoutProviderNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutProviderInput, Prisma.ReviewUncheckedCreateWithoutProviderInput> | Prisma.ReviewCreateWithoutProviderInput[] | Prisma.ReviewUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutProviderInput | Prisma.ReviewCreateOrConnectWithoutProviderInput[];
    upsert?: Prisma.ReviewUpsertWithWhereUniqueWithoutProviderInput | Prisma.ReviewUpsertWithWhereUniqueWithoutProviderInput[];
    createMany?: Prisma.ReviewCreateManyProviderInputEnvelope;
    set?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    disconnect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    delete?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    update?: Prisma.ReviewUpdateWithWhereUniqueWithoutProviderInput | Prisma.ReviewUpdateWithWhereUniqueWithoutProviderInput[];
    updateMany?: Prisma.ReviewUpdateManyWithWhereWithoutProviderInput | Prisma.ReviewUpdateManyWithWhereWithoutProviderInput[];
    deleteMany?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
};
export type ReviewUncheckedUpdateManyWithoutReviewerNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutReviewerInput, Prisma.ReviewUncheckedCreateWithoutReviewerInput> | Prisma.ReviewCreateWithoutReviewerInput[] | Prisma.ReviewUncheckedCreateWithoutReviewerInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutReviewerInput | Prisma.ReviewCreateOrConnectWithoutReviewerInput[];
    upsert?: Prisma.ReviewUpsertWithWhereUniqueWithoutReviewerInput | Prisma.ReviewUpsertWithWhereUniqueWithoutReviewerInput[];
    createMany?: Prisma.ReviewCreateManyReviewerInputEnvelope;
    set?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    disconnect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    delete?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    update?: Prisma.ReviewUpdateWithWhereUniqueWithoutReviewerInput | Prisma.ReviewUpdateWithWhereUniqueWithoutReviewerInput[];
    updateMany?: Prisma.ReviewUpdateManyWithWhereWithoutReviewerInput | Prisma.ReviewUpdateManyWithWhereWithoutReviewerInput[];
    deleteMany?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
};
export type ReviewUncheckedUpdateManyWithoutRevieweeNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutRevieweeInput, Prisma.ReviewUncheckedCreateWithoutRevieweeInput> | Prisma.ReviewCreateWithoutRevieweeInput[] | Prisma.ReviewUncheckedCreateWithoutRevieweeInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutRevieweeInput | Prisma.ReviewCreateOrConnectWithoutRevieweeInput[];
    upsert?: Prisma.ReviewUpsertWithWhereUniqueWithoutRevieweeInput | Prisma.ReviewUpsertWithWhereUniqueWithoutRevieweeInput[];
    createMany?: Prisma.ReviewCreateManyRevieweeInputEnvelope;
    set?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    disconnect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    delete?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    update?: Prisma.ReviewUpdateWithWhereUniqueWithoutRevieweeInput | Prisma.ReviewUpdateWithWhereUniqueWithoutRevieweeInput[];
    updateMany?: Prisma.ReviewUpdateManyWithWhereWithoutRevieweeInput | Prisma.ReviewUpdateManyWithWhereWithoutRevieweeInput[];
    deleteMany?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
};
export type ReviewUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutCustomerInput, Prisma.ReviewUncheckedCreateWithoutCustomerInput> | Prisma.ReviewCreateWithoutCustomerInput[] | Prisma.ReviewUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutCustomerInput | Prisma.ReviewCreateOrConnectWithoutCustomerInput[];
    upsert?: Prisma.ReviewUpsertWithWhereUniqueWithoutCustomerInput | Prisma.ReviewUpsertWithWhereUniqueWithoutCustomerInput[];
    createMany?: Prisma.ReviewCreateManyCustomerInputEnvelope;
    set?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    disconnect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    delete?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    update?: Prisma.ReviewUpdateWithWhereUniqueWithoutCustomerInput | Prisma.ReviewUpdateWithWhereUniqueWithoutCustomerInput[];
    updateMany?: Prisma.ReviewUpdateManyWithWhereWithoutCustomerInput | Prisma.ReviewUpdateManyWithWhereWithoutCustomerInput[];
    deleteMany?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
};
export type ReviewUncheckedUpdateManyWithoutProviderNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutProviderInput, Prisma.ReviewUncheckedCreateWithoutProviderInput> | Prisma.ReviewCreateWithoutProviderInput[] | Prisma.ReviewUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutProviderInput | Prisma.ReviewCreateOrConnectWithoutProviderInput[];
    upsert?: Prisma.ReviewUpsertWithWhereUniqueWithoutProviderInput | Prisma.ReviewUpsertWithWhereUniqueWithoutProviderInput[];
    createMany?: Prisma.ReviewCreateManyProviderInputEnvelope;
    set?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    disconnect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    delete?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    update?: Prisma.ReviewUpdateWithWhereUniqueWithoutProviderInput | Prisma.ReviewUpdateWithWhereUniqueWithoutProviderInput[];
    updateMany?: Prisma.ReviewUpdateManyWithWhereWithoutProviderInput | Prisma.ReviewUpdateManyWithWhereWithoutProviderInput[];
    deleteMany?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
};
export type ReviewCreateNestedManyWithoutBookingInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutBookingInput, Prisma.ReviewUncheckedCreateWithoutBookingInput> | Prisma.ReviewCreateWithoutBookingInput[] | Prisma.ReviewUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutBookingInput | Prisma.ReviewCreateOrConnectWithoutBookingInput[];
    createMany?: Prisma.ReviewCreateManyBookingInputEnvelope;
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
};
export type ReviewUncheckedCreateNestedManyWithoutBookingInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutBookingInput, Prisma.ReviewUncheckedCreateWithoutBookingInput> | Prisma.ReviewCreateWithoutBookingInput[] | Prisma.ReviewUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutBookingInput | Prisma.ReviewCreateOrConnectWithoutBookingInput[];
    createMany?: Prisma.ReviewCreateManyBookingInputEnvelope;
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
};
export type ReviewUpdateManyWithoutBookingNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutBookingInput, Prisma.ReviewUncheckedCreateWithoutBookingInput> | Prisma.ReviewCreateWithoutBookingInput[] | Prisma.ReviewUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutBookingInput | Prisma.ReviewCreateOrConnectWithoutBookingInput[];
    upsert?: Prisma.ReviewUpsertWithWhereUniqueWithoutBookingInput | Prisma.ReviewUpsertWithWhereUniqueWithoutBookingInput[];
    createMany?: Prisma.ReviewCreateManyBookingInputEnvelope;
    set?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    disconnect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    delete?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    update?: Prisma.ReviewUpdateWithWhereUniqueWithoutBookingInput | Prisma.ReviewUpdateWithWhereUniqueWithoutBookingInput[];
    updateMany?: Prisma.ReviewUpdateManyWithWhereWithoutBookingInput | Prisma.ReviewUpdateManyWithWhereWithoutBookingInput[];
    deleteMany?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
};
export type ReviewUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutBookingInput, Prisma.ReviewUncheckedCreateWithoutBookingInput> | Prisma.ReviewCreateWithoutBookingInput[] | Prisma.ReviewUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutBookingInput | Prisma.ReviewCreateOrConnectWithoutBookingInput[];
    upsert?: Prisma.ReviewUpsertWithWhereUniqueWithoutBookingInput | Prisma.ReviewUpsertWithWhereUniqueWithoutBookingInput[];
    createMany?: Prisma.ReviewCreateManyBookingInputEnvelope;
    set?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    disconnect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    delete?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    update?: Prisma.ReviewUpdateWithWhereUniqueWithoutBookingInput | Prisma.ReviewUpdateWithWhereUniqueWithoutBookingInput[];
    updateMany?: Prisma.ReviewUpdateManyWithWhereWithoutBookingInput | Prisma.ReviewUpdateManyWithWhereWithoutBookingInput[];
    deleteMany?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
};
export type ReviewCreateNestedManyWithoutJobInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutJobInput, Prisma.ReviewUncheckedCreateWithoutJobInput> | Prisma.ReviewCreateWithoutJobInput[] | Prisma.ReviewUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutJobInput | Prisma.ReviewCreateOrConnectWithoutJobInput[];
    createMany?: Prisma.ReviewCreateManyJobInputEnvelope;
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
};
export type ReviewUncheckedCreateNestedManyWithoutJobInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutJobInput, Prisma.ReviewUncheckedCreateWithoutJobInput> | Prisma.ReviewCreateWithoutJobInput[] | Prisma.ReviewUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutJobInput | Prisma.ReviewCreateOrConnectWithoutJobInput[];
    createMany?: Prisma.ReviewCreateManyJobInputEnvelope;
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
};
export type ReviewUpdateManyWithoutJobNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutJobInput, Prisma.ReviewUncheckedCreateWithoutJobInput> | Prisma.ReviewCreateWithoutJobInput[] | Prisma.ReviewUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutJobInput | Prisma.ReviewCreateOrConnectWithoutJobInput[];
    upsert?: Prisma.ReviewUpsertWithWhereUniqueWithoutJobInput | Prisma.ReviewUpsertWithWhereUniqueWithoutJobInput[];
    createMany?: Prisma.ReviewCreateManyJobInputEnvelope;
    set?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    disconnect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    delete?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    update?: Prisma.ReviewUpdateWithWhereUniqueWithoutJobInput | Prisma.ReviewUpdateWithWhereUniqueWithoutJobInput[];
    updateMany?: Prisma.ReviewUpdateManyWithWhereWithoutJobInput | Prisma.ReviewUpdateManyWithWhereWithoutJobInput[];
    deleteMany?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
};
export type ReviewUncheckedUpdateManyWithoutJobNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutJobInput, Prisma.ReviewUncheckedCreateWithoutJobInput> | Prisma.ReviewCreateWithoutJobInput[] | Prisma.ReviewUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutJobInput | Prisma.ReviewCreateOrConnectWithoutJobInput[];
    upsert?: Prisma.ReviewUpsertWithWhereUniqueWithoutJobInput | Prisma.ReviewUpsertWithWhereUniqueWithoutJobInput[];
    createMany?: Prisma.ReviewCreateManyJobInputEnvelope;
    set?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    disconnect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    delete?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    update?: Prisma.ReviewUpdateWithWhereUniqueWithoutJobInput | Prisma.ReviewUpdateWithWhereUniqueWithoutJobInput[];
    updateMany?: Prisma.ReviewUpdateManyWithWhereWithoutJobInput | Prisma.ReviewUpdateManyWithWhereWithoutJobInput[];
    deleteMany?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
};
export type EnumReviewStatusFieldUpdateOperationsInput = {
    set?: $Enums.ReviewStatus;
};
export type ReviewCreateWithoutReviewerInput = {
    id?: string;
    rating: number;
    reviewText?: string | null;
    status?: $Enums.ReviewStatus;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    booking: Prisma.BookingCreateNestedOneWithoutReviewsInput;
    job: Prisma.JobCreateNestedOneWithoutReviewsInput;
    customer: Prisma.UserCreateNestedOneWithoutCustomerReviewsInput;
    provider: Prisma.UserCreateNestedOneWithoutProviderReviewsInput;
    reviewee: Prisma.UserCreateNestedOneWithoutReviewsReceivedInput;
};
export type ReviewUncheckedCreateWithoutReviewerInput = {
    id?: string;
    bookingId: string;
    jobId: string;
    customerId: string;
    providerId: string;
    revieweeId: string;
    rating: number;
    reviewText?: string | null;
    status?: $Enums.ReviewStatus;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReviewCreateOrConnectWithoutReviewerInput = {
    where: Prisma.ReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutReviewerInput, Prisma.ReviewUncheckedCreateWithoutReviewerInput>;
};
export type ReviewCreateManyReviewerInputEnvelope = {
    data: Prisma.ReviewCreateManyReviewerInput | Prisma.ReviewCreateManyReviewerInput[];
    skipDuplicates?: boolean;
};
export type ReviewCreateWithoutRevieweeInput = {
    id?: string;
    rating: number;
    reviewText?: string | null;
    status?: $Enums.ReviewStatus;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    booking: Prisma.BookingCreateNestedOneWithoutReviewsInput;
    job: Prisma.JobCreateNestedOneWithoutReviewsInput;
    customer: Prisma.UserCreateNestedOneWithoutCustomerReviewsInput;
    provider: Prisma.UserCreateNestedOneWithoutProviderReviewsInput;
    reviewer: Prisma.UserCreateNestedOneWithoutReviewsWrittenInput;
};
export type ReviewUncheckedCreateWithoutRevieweeInput = {
    id?: string;
    bookingId: string;
    jobId: string;
    customerId: string;
    providerId: string;
    reviewerId: string;
    rating: number;
    reviewText?: string | null;
    status?: $Enums.ReviewStatus;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReviewCreateOrConnectWithoutRevieweeInput = {
    where: Prisma.ReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutRevieweeInput, Prisma.ReviewUncheckedCreateWithoutRevieweeInput>;
};
export type ReviewCreateManyRevieweeInputEnvelope = {
    data: Prisma.ReviewCreateManyRevieweeInput | Prisma.ReviewCreateManyRevieweeInput[];
    skipDuplicates?: boolean;
};
export type ReviewCreateWithoutCustomerInput = {
    id?: string;
    rating: number;
    reviewText?: string | null;
    status?: $Enums.ReviewStatus;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    booking: Prisma.BookingCreateNestedOneWithoutReviewsInput;
    job: Prisma.JobCreateNestedOneWithoutReviewsInput;
    provider: Prisma.UserCreateNestedOneWithoutProviderReviewsInput;
    reviewer: Prisma.UserCreateNestedOneWithoutReviewsWrittenInput;
    reviewee: Prisma.UserCreateNestedOneWithoutReviewsReceivedInput;
};
export type ReviewUncheckedCreateWithoutCustomerInput = {
    id?: string;
    bookingId: string;
    jobId: string;
    providerId: string;
    reviewerId: string;
    revieweeId: string;
    rating: number;
    reviewText?: string | null;
    status?: $Enums.ReviewStatus;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReviewCreateOrConnectWithoutCustomerInput = {
    where: Prisma.ReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutCustomerInput, Prisma.ReviewUncheckedCreateWithoutCustomerInput>;
};
export type ReviewCreateManyCustomerInputEnvelope = {
    data: Prisma.ReviewCreateManyCustomerInput | Prisma.ReviewCreateManyCustomerInput[];
    skipDuplicates?: boolean;
};
export type ReviewCreateWithoutProviderInput = {
    id?: string;
    rating: number;
    reviewText?: string | null;
    status?: $Enums.ReviewStatus;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    booking: Prisma.BookingCreateNestedOneWithoutReviewsInput;
    job: Prisma.JobCreateNestedOneWithoutReviewsInput;
    customer: Prisma.UserCreateNestedOneWithoutCustomerReviewsInput;
    reviewer: Prisma.UserCreateNestedOneWithoutReviewsWrittenInput;
    reviewee: Prisma.UserCreateNestedOneWithoutReviewsReceivedInput;
};
export type ReviewUncheckedCreateWithoutProviderInput = {
    id?: string;
    bookingId: string;
    jobId: string;
    customerId: string;
    reviewerId: string;
    revieweeId: string;
    rating: number;
    reviewText?: string | null;
    status?: $Enums.ReviewStatus;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReviewCreateOrConnectWithoutProviderInput = {
    where: Prisma.ReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutProviderInput, Prisma.ReviewUncheckedCreateWithoutProviderInput>;
};
export type ReviewCreateManyProviderInputEnvelope = {
    data: Prisma.ReviewCreateManyProviderInput | Prisma.ReviewCreateManyProviderInput[];
    skipDuplicates?: boolean;
};
export type ReviewUpsertWithWhereUniqueWithoutReviewerInput = {
    where: Prisma.ReviewWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReviewUpdateWithoutReviewerInput, Prisma.ReviewUncheckedUpdateWithoutReviewerInput>;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutReviewerInput, Prisma.ReviewUncheckedCreateWithoutReviewerInput>;
};
export type ReviewUpdateWithWhereUniqueWithoutReviewerInput = {
    where: Prisma.ReviewWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReviewUpdateWithoutReviewerInput, Prisma.ReviewUncheckedUpdateWithoutReviewerInput>;
};
export type ReviewUpdateManyWithWhereWithoutReviewerInput = {
    where: Prisma.ReviewScalarWhereInput;
    data: Prisma.XOR<Prisma.ReviewUpdateManyMutationInput, Prisma.ReviewUncheckedUpdateManyWithoutReviewerInput>;
};
export type ReviewScalarWhereInput = {
    AND?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
    OR?: Prisma.ReviewScalarWhereInput[];
    NOT?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
    id?: Prisma.StringFilter<"Review"> | string;
    bookingId?: Prisma.StringFilter<"Review"> | string;
    jobId?: Prisma.StringFilter<"Review"> | string;
    customerId?: Prisma.StringFilter<"Review"> | string;
    providerId?: Prisma.StringFilter<"Review"> | string;
    reviewerId?: Prisma.StringFilter<"Review"> | string;
    revieweeId?: Prisma.StringFilter<"Review"> | string;
    rating?: Prisma.IntFilter<"Review"> | number;
    reviewText?: Prisma.StringNullableFilter<"Review"> | string | null;
    status?: Prisma.EnumReviewStatusFilter<"Review"> | $Enums.ReviewStatus;
    deletedAt?: Prisma.DateTimeNullableFilter<"Review"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Review"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Review"> | Date | string;
};
export type ReviewUpsertWithWhereUniqueWithoutRevieweeInput = {
    where: Prisma.ReviewWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReviewUpdateWithoutRevieweeInput, Prisma.ReviewUncheckedUpdateWithoutRevieweeInput>;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutRevieweeInput, Prisma.ReviewUncheckedCreateWithoutRevieweeInput>;
};
export type ReviewUpdateWithWhereUniqueWithoutRevieweeInput = {
    where: Prisma.ReviewWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReviewUpdateWithoutRevieweeInput, Prisma.ReviewUncheckedUpdateWithoutRevieweeInput>;
};
export type ReviewUpdateManyWithWhereWithoutRevieweeInput = {
    where: Prisma.ReviewScalarWhereInput;
    data: Prisma.XOR<Prisma.ReviewUpdateManyMutationInput, Prisma.ReviewUncheckedUpdateManyWithoutRevieweeInput>;
};
export type ReviewUpsertWithWhereUniqueWithoutCustomerInput = {
    where: Prisma.ReviewWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReviewUpdateWithoutCustomerInput, Prisma.ReviewUncheckedUpdateWithoutCustomerInput>;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutCustomerInput, Prisma.ReviewUncheckedCreateWithoutCustomerInput>;
};
export type ReviewUpdateWithWhereUniqueWithoutCustomerInput = {
    where: Prisma.ReviewWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReviewUpdateWithoutCustomerInput, Prisma.ReviewUncheckedUpdateWithoutCustomerInput>;
};
export type ReviewUpdateManyWithWhereWithoutCustomerInput = {
    where: Prisma.ReviewScalarWhereInput;
    data: Prisma.XOR<Prisma.ReviewUpdateManyMutationInput, Prisma.ReviewUncheckedUpdateManyWithoutCustomerInput>;
};
export type ReviewUpsertWithWhereUniqueWithoutProviderInput = {
    where: Prisma.ReviewWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReviewUpdateWithoutProviderInput, Prisma.ReviewUncheckedUpdateWithoutProviderInput>;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutProviderInput, Prisma.ReviewUncheckedCreateWithoutProviderInput>;
};
export type ReviewUpdateWithWhereUniqueWithoutProviderInput = {
    where: Prisma.ReviewWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReviewUpdateWithoutProviderInput, Prisma.ReviewUncheckedUpdateWithoutProviderInput>;
};
export type ReviewUpdateManyWithWhereWithoutProviderInput = {
    where: Prisma.ReviewScalarWhereInput;
    data: Prisma.XOR<Prisma.ReviewUpdateManyMutationInput, Prisma.ReviewUncheckedUpdateManyWithoutProviderInput>;
};
export type ReviewCreateWithoutBookingInput = {
    id?: string;
    rating: number;
    reviewText?: string | null;
    status?: $Enums.ReviewStatus;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    job: Prisma.JobCreateNestedOneWithoutReviewsInput;
    customer: Prisma.UserCreateNestedOneWithoutCustomerReviewsInput;
    provider: Prisma.UserCreateNestedOneWithoutProviderReviewsInput;
    reviewer: Prisma.UserCreateNestedOneWithoutReviewsWrittenInput;
    reviewee: Prisma.UserCreateNestedOneWithoutReviewsReceivedInput;
};
export type ReviewUncheckedCreateWithoutBookingInput = {
    id?: string;
    jobId: string;
    customerId: string;
    providerId: string;
    reviewerId: string;
    revieweeId: string;
    rating: number;
    reviewText?: string | null;
    status?: $Enums.ReviewStatus;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReviewCreateOrConnectWithoutBookingInput = {
    where: Prisma.ReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutBookingInput, Prisma.ReviewUncheckedCreateWithoutBookingInput>;
};
export type ReviewCreateManyBookingInputEnvelope = {
    data: Prisma.ReviewCreateManyBookingInput | Prisma.ReviewCreateManyBookingInput[];
    skipDuplicates?: boolean;
};
export type ReviewUpsertWithWhereUniqueWithoutBookingInput = {
    where: Prisma.ReviewWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReviewUpdateWithoutBookingInput, Prisma.ReviewUncheckedUpdateWithoutBookingInput>;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutBookingInput, Prisma.ReviewUncheckedCreateWithoutBookingInput>;
};
export type ReviewUpdateWithWhereUniqueWithoutBookingInput = {
    where: Prisma.ReviewWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReviewUpdateWithoutBookingInput, Prisma.ReviewUncheckedUpdateWithoutBookingInput>;
};
export type ReviewUpdateManyWithWhereWithoutBookingInput = {
    where: Prisma.ReviewScalarWhereInput;
    data: Prisma.XOR<Prisma.ReviewUpdateManyMutationInput, Prisma.ReviewUncheckedUpdateManyWithoutBookingInput>;
};
export type ReviewCreateWithoutJobInput = {
    id?: string;
    rating: number;
    reviewText?: string | null;
    status?: $Enums.ReviewStatus;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    booking: Prisma.BookingCreateNestedOneWithoutReviewsInput;
    customer: Prisma.UserCreateNestedOneWithoutCustomerReviewsInput;
    provider: Prisma.UserCreateNestedOneWithoutProviderReviewsInput;
    reviewer: Prisma.UserCreateNestedOneWithoutReviewsWrittenInput;
    reviewee: Prisma.UserCreateNestedOneWithoutReviewsReceivedInput;
};
export type ReviewUncheckedCreateWithoutJobInput = {
    id?: string;
    bookingId: string;
    customerId: string;
    providerId: string;
    reviewerId: string;
    revieweeId: string;
    rating: number;
    reviewText?: string | null;
    status?: $Enums.ReviewStatus;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReviewCreateOrConnectWithoutJobInput = {
    where: Prisma.ReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutJobInput, Prisma.ReviewUncheckedCreateWithoutJobInput>;
};
export type ReviewCreateManyJobInputEnvelope = {
    data: Prisma.ReviewCreateManyJobInput | Prisma.ReviewCreateManyJobInput[];
    skipDuplicates?: boolean;
};
export type ReviewUpsertWithWhereUniqueWithoutJobInput = {
    where: Prisma.ReviewWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReviewUpdateWithoutJobInput, Prisma.ReviewUncheckedUpdateWithoutJobInput>;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutJobInput, Prisma.ReviewUncheckedCreateWithoutJobInput>;
};
export type ReviewUpdateWithWhereUniqueWithoutJobInput = {
    where: Prisma.ReviewWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReviewUpdateWithoutJobInput, Prisma.ReviewUncheckedUpdateWithoutJobInput>;
};
export type ReviewUpdateManyWithWhereWithoutJobInput = {
    where: Prisma.ReviewScalarWhereInput;
    data: Prisma.XOR<Prisma.ReviewUpdateManyMutationInput, Prisma.ReviewUncheckedUpdateManyWithoutJobInput>;
};
export type ReviewCreateManyReviewerInput = {
    id?: string;
    bookingId: string;
    jobId: string;
    customerId: string;
    providerId: string;
    revieweeId: string;
    rating: number;
    reviewText?: string | null;
    status?: $Enums.ReviewStatus;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReviewCreateManyRevieweeInput = {
    id?: string;
    bookingId: string;
    jobId: string;
    customerId: string;
    providerId: string;
    reviewerId: string;
    rating: number;
    reviewText?: string | null;
    status?: $Enums.ReviewStatus;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReviewCreateManyCustomerInput = {
    id?: string;
    bookingId: string;
    jobId: string;
    providerId: string;
    reviewerId: string;
    revieweeId: string;
    rating: number;
    reviewText?: string | null;
    status?: $Enums.ReviewStatus;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReviewCreateManyProviderInput = {
    id?: string;
    bookingId: string;
    jobId: string;
    customerId: string;
    reviewerId: string;
    revieweeId: string;
    rating: number;
    reviewText?: string | null;
    status?: $Enums.ReviewStatus;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReviewUpdateWithoutReviewerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    reviewText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    booking?: Prisma.BookingUpdateOneRequiredWithoutReviewsNestedInput;
    job?: Prisma.JobUpdateOneRequiredWithoutReviewsNestedInput;
    customer?: Prisma.UserUpdateOneRequiredWithoutCustomerReviewsNestedInput;
    provider?: Prisma.UserUpdateOneRequiredWithoutProviderReviewsNestedInput;
    reviewee?: Prisma.UserUpdateOneRequiredWithoutReviewsReceivedNestedInput;
};
export type ReviewUncheckedUpdateWithoutReviewerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    revieweeId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    reviewText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewUncheckedUpdateManyWithoutReviewerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    revieweeId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    reviewText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewUpdateWithoutRevieweeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    reviewText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    booking?: Prisma.BookingUpdateOneRequiredWithoutReviewsNestedInput;
    job?: Prisma.JobUpdateOneRequiredWithoutReviewsNestedInput;
    customer?: Prisma.UserUpdateOneRequiredWithoutCustomerReviewsNestedInput;
    provider?: Prisma.UserUpdateOneRequiredWithoutProviderReviewsNestedInput;
    reviewer?: Prisma.UserUpdateOneRequiredWithoutReviewsWrittenNestedInput;
};
export type ReviewUncheckedUpdateWithoutRevieweeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewerId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    reviewText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewUncheckedUpdateManyWithoutRevieweeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewerId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    reviewText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewUpdateWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    reviewText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    booking?: Prisma.BookingUpdateOneRequiredWithoutReviewsNestedInput;
    job?: Prisma.JobUpdateOneRequiredWithoutReviewsNestedInput;
    provider?: Prisma.UserUpdateOneRequiredWithoutProviderReviewsNestedInput;
    reviewer?: Prisma.UserUpdateOneRequiredWithoutReviewsWrittenNestedInput;
    reviewee?: Prisma.UserUpdateOneRequiredWithoutReviewsReceivedNestedInput;
};
export type ReviewUncheckedUpdateWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewerId?: Prisma.StringFieldUpdateOperationsInput | string;
    revieweeId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    reviewText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewUncheckedUpdateManyWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewerId?: Prisma.StringFieldUpdateOperationsInput | string;
    revieweeId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    reviewText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewUpdateWithoutProviderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    reviewText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    booking?: Prisma.BookingUpdateOneRequiredWithoutReviewsNestedInput;
    job?: Prisma.JobUpdateOneRequiredWithoutReviewsNestedInput;
    customer?: Prisma.UserUpdateOneRequiredWithoutCustomerReviewsNestedInput;
    reviewer?: Prisma.UserUpdateOneRequiredWithoutReviewsWrittenNestedInput;
    reviewee?: Prisma.UserUpdateOneRequiredWithoutReviewsReceivedNestedInput;
};
export type ReviewUncheckedUpdateWithoutProviderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewerId?: Prisma.StringFieldUpdateOperationsInput | string;
    revieweeId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    reviewText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewUncheckedUpdateManyWithoutProviderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewerId?: Prisma.StringFieldUpdateOperationsInput | string;
    revieweeId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    reviewText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewCreateManyBookingInput = {
    id?: string;
    jobId: string;
    customerId: string;
    providerId: string;
    reviewerId: string;
    revieweeId: string;
    rating: number;
    reviewText?: string | null;
    status?: $Enums.ReviewStatus;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReviewUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    reviewText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneRequiredWithoutReviewsNestedInput;
    customer?: Prisma.UserUpdateOneRequiredWithoutCustomerReviewsNestedInput;
    provider?: Prisma.UserUpdateOneRequiredWithoutProviderReviewsNestedInput;
    reviewer?: Prisma.UserUpdateOneRequiredWithoutReviewsWrittenNestedInput;
    reviewee?: Prisma.UserUpdateOneRequiredWithoutReviewsReceivedNestedInput;
};
export type ReviewUncheckedUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewerId?: Prisma.StringFieldUpdateOperationsInput | string;
    revieweeId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    reviewText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewUncheckedUpdateManyWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewerId?: Prisma.StringFieldUpdateOperationsInput | string;
    revieweeId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    reviewText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewCreateManyJobInput = {
    id?: string;
    bookingId: string;
    customerId: string;
    providerId: string;
    reviewerId: string;
    revieweeId: string;
    rating: number;
    reviewText?: string | null;
    status?: $Enums.ReviewStatus;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReviewUpdateWithoutJobInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    reviewText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    booking?: Prisma.BookingUpdateOneRequiredWithoutReviewsNestedInput;
    customer?: Prisma.UserUpdateOneRequiredWithoutCustomerReviewsNestedInput;
    provider?: Prisma.UserUpdateOneRequiredWithoutProviderReviewsNestedInput;
    reviewer?: Prisma.UserUpdateOneRequiredWithoutReviewsWrittenNestedInput;
    reviewee?: Prisma.UserUpdateOneRequiredWithoutReviewsReceivedNestedInput;
};
export type ReviewUncheckedUpdateWithoutJobInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewerId?: Prisma.StringFieldUpdateOperationsInput | string;
    revieweeId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    reviewText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewUncheckedUpdateManyWithoutJobInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewerId?: Prisma.StringFieldUpdateOperationsInput | string;
    revieweeId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    reviewText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookingId?: boolean;
    jobId?: boolean;
    customerId?: boolean;
    providerId?: boolean;
    reviewerId?: boolean;
    revieweeId?: boolean;
    rating?: boolean;
    reviewText?: boolean;
    status?: boolean;
    deletedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    reviewer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    reviewee?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["review"]>;
export type ReviewSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookingId?: boolean;
    jobId?: boolean;
    customerId?: boolean;
    providerId?: boolean;
    reviewerId?: boolean;
    revieweeId?: boolean;
    rating?: boolean;
    reviewText?: boolean;
    status?: boolean;
    deletedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    reviewer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    reviewee?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["review"]>;
export type ReviewSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookingId?: boolean;
    jobId?: boolean;
    customerId?: boolean;
    providerId?: boolean;
    reviewerId?: boolean;
    revieweeId?: boolean;
    rating?: boolean;
    reviewText?: boolean;
    status?: boolean;
    deletedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    reviewer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    reviewee?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["review"]>;
export type ReviewSelectScalar = {
    id?: boolean;
    bookingId?: boolean;
    jobId?: boolean;
    customerId?: boolean;
    providerId?: boolean;
    reviewerId?: boolean;
    revieweeId?: boolean;
    rating?: boolean;
    reviewText?: boolean;
    status?: boolean;
    deletedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ReviewOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "bookingId" | "jobId" | "customerId" | "providerId" | "reviewerId" | "revieweeId" | "rating" | "reviewText" | "status" | "deletedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["review"]>;
export type ReviewInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    reviewer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    reviewee?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ReviewIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    reviewer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    reviewee?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ReviewIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    reviewer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    reviewee?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $ReviewPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Review";
    objects: {
        booking: Prisma.$BookingPayload<ExtArgs>;
        job: Prisma.$JobPayload<ExtArgs>;
        customer: Prisma.$UserPayload<ExtArgs>;
        provider: Prisma.$UserPayload<ExtArgs>;
        reviewer: Prisma.$UserPayload<ExtArgs>;
        reviewee: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        bookingId: string;
        jobId: string;
        customerId: string;
        providerId: string;
        reviewerId: string;
        revieweeId: string;
        rating: number;
        reviewText: string | null;
        status: $Enums.ReviewStatus;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["review"]>;
    composites: {};
};
export type ReviewGetPayload<S extends boolean | null | undefined | ReviewDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ReviewPayload, S>;
export type ReviewCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ReviewCountAggregateInputType | true;
};
export interface ReviewDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Review'];
        meta: {
            name: 'Review';
        };
    };
    findUnique<T extends ReviewFindUniqueArgs>(args: Prisma.SelectSubset<T, ReviewFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ReviewFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ReviewFindFirstArgs>(args?: Prisma.SelectSubset<T, ReviewFindFirstArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ReviewFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ReviewFindManyArgs>(args?: Prisma.SelectSubset<T, ReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ReviewCreateArgs>(args: Prisma.SelectSubset<T, ReviewCreateArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ReviewCreateManyArgs>(args?: Prisma.SelectSubset<T, ReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ReviewCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ReviewDeleteArgs>(args: Prisma.SelectSubset<T, ReviewDeleteArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ReviewUpdateArgs>(args: Prisma.SelectSubset<T, ReviewUpdateArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ReviewDeleteManyArgs>(args?: Prisma.SelectSubset<T, ReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ReviewUpdateManyArgs>(args: Prisma.SelectSubset<T, ReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ReviewUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ReviewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ReviewUpsertArgs>(args: Prisma.SelectSubset<T, ReviewUpsertArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ReviewCountArgs>(args?: Prisma.Subset<T, ReviewCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ReviewCountAggregateOutputType> : number>;
    aggregate<T extends ReviewAggregateArgs>(args: Prisma.Subset<T, ReviewAggregateArgs>): Prisma.PrismaPromise<GetReviewAggregateType<T>>;
    groupBy<T extends ReviewGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ReviewGroupByArgs['orderBy'];
    } : {
        orderBy?: ReviewGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ReviewFieldRefs;
}
export interface Prisma__ReviewClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    booking<T extends Prisma.BookingDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BookingDefaultArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    job<T extends Prisma.JobDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.JobDefaultArgs<ExtArgs>>): Prisma.Prisma__JobClient<runtime.Types.Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    customer<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    provider<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    reviewer<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    reviewee<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ReviewFieldRefs {
    readonly id: Prisma.FieldRef<"Review", 'String'>;
    readonly bookingId: Prisma.FieldRef<"Review", 'String'>;
    readonly jobId: Prisma.FieldRef<"Review", 'String'>;
    readonly customerId: Prisma.FieldRef<"Review", 'String'>;
    readonly providerId: Prisma.FieldRef<"Review", 'String'>;
    readonly reviewerId: Prisma.FieldRef<"Review", 'String'>;
    readonly revieweeId: Prisma.FieldRef<"Review", 'String'>;
    readonly rating: Prisma.FieldRef<"Review", 'Int'>;
    readonly reviewText: Prisma.FieldRef<"Review", 'String'>;
    readonly status: Prisma.FieldRef<"Review", 'ReviewStatus'>;
    readonly deletedAt: Prisma.FieldRef<"Review", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Review", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Review", 'DateTime'>;
}
export type ReviewFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where: Prisma.ReviewWhereUniqueInput;
};
export type ReviewFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where: Prisma.ReviewWhereUniqueInput;
};
export type ReviewFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithRelationInput | Prisma.ReviewOrderByWithRelationInput[];
    cursor?: Prisma.ReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReviewScalarFieldEnum | Prisma.ReviewScalarFieldEnum[];
};
export type ReviewFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithRelationInput | Prisma.ReviewOrderByWithRelationInput[];
    cursor?: Prisma.ReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReviewScalarFieldEnum | Prisma.ReviewScalarFieldEnum[];
};
export type ReviewFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithRelationInput | Prisma.ReviewOrderByWithRelationInput[];
    cursor?: Prisma.ReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReviewScalarFieldEnum | Prisma.ReviewScalarFieldEnum[];
};
export type ReviewCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReviewCreateInput, Prisma.ReviewUncheckedCreateInput>;
};
export type ReviewCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ReviewCreateManyInput | Prisma.ReviewCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ReviewCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    data: Prisma.ReviewCreateManyInput | Prisma.ReviewCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ReviewIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ReviewUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReviewUpdateInput, Prisma.ReviewUncheckedUpdateInput>;
    where: Prisma.ReviewWhereUniqueInput;
};
export type ReviewUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ReviewUpdateManyMutationInput, Prisma.ReviewUncheckedUpdateManyInput>;
    where?: Prisma.ReviewWhereInput;
    limit?: number;
};
export type ReviewUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReviewUpdateManyMutationInput, Prisma.ReviewUncheckedUpdateManyInput>;
    where?: Prisma.ReviewWhereInput;
    limit?: number;
    include?: Prisma.ReviewIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ReviewUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where: Prisma.ReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReviewCreateInput, Prisma.ReviewUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ReviewUpdateInput, Prisma.ReviewUncheckedUpdateInput>;
};
export type ReviewDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where: Prisma.ReviewWhereUniqueInput;
};
export type ReviewDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReviewWhereInput;
    limit?: number;
};
export type ReviewDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
};
export {};
