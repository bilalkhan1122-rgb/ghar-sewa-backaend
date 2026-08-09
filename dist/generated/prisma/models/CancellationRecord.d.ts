import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type CancellationRecordModel = runtime.Types.Result.DefaultSelection<Prisma.$CancellationRecordPayload>;
export type AggregateCancellationRecord = {
    _count: CancellationRecordCountAggregateOutputType | null;
    _min: CancellationRecordMinAggregateOutputType | null;
    _max: CancellationRecordMaxAggregateOutputType | null;
};
export type CancellationRecordMinAggregateOutputType = {
    id: string | null;
    jobId: string | null;
    bookingId: string | null;
    cancelledBy: string | null;
    cancellationType: $Enums.CancellationType | null;
    penaltyApplied: boolean | null;
    penaltyId: string | null;
    reason: string | null;
    createdAt: Date | null;
};
export type CancellationRecordMaxAggregateOutputType = {
    id: string | null;
    jobId: string | null;
    bookingId: string | null;
    cancelledBy: string | null;
    cancellationType: $Enums.CancellationType | null;
    penaltyApplied: boolean | null;
    penaltyId: string | null;
    reason: string | null;
    createdAt: Date | null;
};
export type CancellationRecordCountAggregateOutputType = {
    id: number;
    jobId: number;
    bookingId: number;
    cancelledBy: number;
    cancellationType: number;
    penaltyApplied: number;
    penaltyId: number;
    reason: number;
    createdAt: number;
    _all: number;
};
export type CancellationRecordMinAggregateInputType = {
    id?: true;
    jobId?: true;
    bookingId?: true;
    cancelledBy?: true;
    cancellationType?: true;
    penaltyApplied?: true;
    penaltyId?: true;
    reason?: true;
    createdAt?: true;
};
export type CancellationRecordMaxAggregateInputType = {
    id?: true;
    jobId?: true;
    bookingId?: true;
    cancelledBy?: true;
    cancellationType?: true;
    penaltyApplied?: true;
    penaltyId?: true;
    reason?: true;
    createdAt?: true;
};
export type CancellationRecordCountAggregateInputType = {
    id?: true;
    jobId?: true;
    bookingId?: true;
    cancelledBy?: true;
    cancellationType?: true;
    penaltyApplied?: true;
    penaltyId?: true;
    reason?: true;
    createdAt?: true;
    _all?: true;
};
export type CancellationRecordAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CancellationRecordWhereInput;
    orderBy?: Prisma.CancellationRecordOrderByWithRelationInput | Prisma.CancellationRecordOrderByWithRelationInput[];
    cursor?: Prisma.CancellationRecordWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CancellationRecordCountAggregateInputType;
    _min?: CancellationRecordMinAggregateInputType;
    _max?: CancellationRecordMaxAggregateInputType;
};
export type GetCancellationRecordAggregateType<T extends CancellationRecordAggregateArgs> = {
    [P in keyof T & keyof AggregateCancellationRecord]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCancellationRecord[P]> : Prisma.GetScalarType<T[P], AggregateCancellationRecord[P]>;
};
export type CancellationRecordGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CancellationRecordWhereInput;
    orderBy?: Prisma.CancellationRecordOrderByWithAggregationInput | Prisma.CancellationRecordOrderByWithAggregationInput[];
    by: Prisma.CancellationRecordScalarFieldEnum[] | Prisma.CancellationRecordScalarFieldEnum;
    having?: Prisma.CancellationRecordScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CancellationRecordCountAggregateInputType | true;
    _min?: CancellationRecordMinAggregateInputType;
    _max?: CancellationRecordMaxAggregateInputType;
};
export type CancellationRecordGroupByOutputType = {
    id: string;
    jobId: string | null;
    bookingId: string | null;
    cancelledBy: string;
    cancellationType: $Enums.CancellationType;
    penaltyApplied: boolean;
    penaltyId: string | null;
    reason: string | null;
    createdAt: Date;
    _count: CancellationRecordCountAggregateOutputType | null;
    _min: CancellationRecordMinAggregateOutputType | null;
    _max: CancellationRecordMaxAggregateOutputType | null;
};
type GetCancellationRecordGroupByPayload<T extends CancellationRecordGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CancellationRecordGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CancellationRecordGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CancellationRecordGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CancellationRecordGroupByOutputType[P]>;
}>>;
export type CancellationRecordWhereInput = {
    AND?: Prisma.CancellationRecordWhereInput | Prisma.CancellationRecordWhereInput[];
    OR?: Prisma.CancellationRecordWhereInput[];
    NOT?: Prisma.CancellationRecordWhereInput | Prisma.CancellationRecordWhereInput[];
    id?: Prisma.StringFilter<"CancellationRecord"> | string;
    jobId?: Prisma.StringNullableFilter<"CancellationRecord"> | string | null;
    bookingId?: Prisma.StringNullableFilter<"CancellationRecord"> | string | null;
    cancelledBy?: Prisma.StringFilter<"CancellationRecord"> | string;
    cancellationType?: Prisma.EnumCancellationTypeFilter<"CancellationRecord"> | $Enums.CancellationType;
    penaltyApplied?: Prisma.BoolFilter<"CancellationRecord"> | boolean;
    penaltyId?: Prisma.StringNullableFilter<"CancellationRecord"> | string | null;
    reason?: Prisma.StringNullableFilter<"CancellationRecord"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"CancellationRecord"> | Date | string;
    job?: Prisma.XOR<Prisma.JobNullableScalarRelationFilter, Prisma.JobWhereInput> | null;
    booking?: Prisma.XOR<Prisma.BookingNullableScalarRelationFilter, Prisma.BookingWhereInput> | null;
    penalty?: Prisma.XOR<Prisma.ProviderPenaltyNullableScalarRelationFilter, Prisma.ProviderPenaltyWhereInput> | null;
};
export type CancellationRecordOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrderInput | Prisma.SortOrder;
    bookingId?: Prisma.SortOrderInput | Prisma.SortOrder;
    cancelledBy?: Prisma.SortOrder;
    cancellationType?: Prisma.SortOrder;
    penaltyApplied?: Prisma.SortOrder;
    penaltyId?: Prisma.SortOrderInput | Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    job?: Prisma.JobOrderByWithRelationInput;
    booking?: Prisma.BookingOrderByWithRelationInput;
    penalty?: Prisma.ProviderPenaltyOrderByWithRelationInput;
};
export type CancellationRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CancellationRecordWhereInput | Prisma.CancellationRecordWhereInput[];
    OR?: Prisma.CancellationRecordWhereInput[];
    NOT?: Prisma.CancellationRecordWhereInput | Prisma.CancellationRecordWhereInput[];
    jobId?: Prisma.StringNullableFilter<"CancellationRecord"> | string | null;
    bookingId?: Prisma.StringNullableFilter<"CancellationRecord"> | string | null;
    cancelledBy?: Prisma.StringFilter<"CancellationRecord"> | string;
    cancellationType?: Prisma.EnumCancellationTypeFilter<"CancellationRecord"> | $Enums.CancellationType;
    penaltyApplied?: Prisma.BoolFilter<"CancellationRecord"> | boolean;
    penaltyId?: Prisma.StringNullableFilter<"CancellationRecord"> | string | null;
    reason?: Prisma.StringNullableFilter<"CancellationRecord"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"CancellationRecord"> | Date | string;
    job?: Prisma.XOR<Prisma.JobNullableScalarRelationFilter, Prisma.JobWhereInput> | null;
    booking?: Prisma.XOR<Prisma.BookingNullableScalarRelationFilter, Prisma.BookingWhereInput> | null;
    penalty?: Prisma.XOR<Prisma.ProviderPenaltyNullableScalarRelationFilter, Prisma.ProviderPenaltyWhereInput> | null;
}, "id">;
export type CancellationRecordOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrderInput | Prisma.SortOrder;
    bookingId?: Prisma.SortOrderInput | Prisma.SortOrder;
    cancelledBy?: Prisma.SortOrder;
    cancellationType?: Prisma.SortOrder;
    penaltyApplied?: Prisma.SortOrder;
    penaltyId?: Prisma.SortOrderInput | Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.CancellationRecordCountOrderByAggregateInput;
    _max?: Prisma.CancellationRecordMaxOrderByAggregateInput;
    _min?: Prisma.CancellationRecordMinOrderByAggregateInput;
};
export type CancellationRecordScalarWhereWithAggregatesInput = {
    AND?: Prisma.CancellationRecordScalarWhereWithAggregatesInput | Prisma.CancellationRecordScalarWhereWithAggregatesInput[];
    OR?: Prisma.CancellationRecordScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CancellationRecordScalarWhereWithAggregatesInput | Prisma.CancellationRecordScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"CancellationRecord"> | string;
    jobId?: Prisma.StringNullableWithAggregatesFilter<"CancellationRecord"> | string | null;
    bookingId?: Prisma.StringNullableWithAggregatesFilter<"CancellationRecord"> | string | null;
    cancelledBy?: Prisma.StringWithAggregatesFilter<"CancellationRecord"> | string;
    cancellationType?: Prisma.EnumCancellationTypeWithAggregatesFilter<"CancellationRecord"> | $Enums.CancellationType;
    penaltyApplied?: Prisma.BoolWithAggregatesFilter<"CancellationRecord"> | boolean;
    penaltyId?: Prisma.StringNullableWithAggregatesFilter<"CancellationRecord"> | string | null;
    reason?: Prisma.StringNullableWithAggregatesFilter<"CancellationRecord"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CancellationRecord"> | Date | string;
};
export type CancellationRecordCreateInput = {
    id?: string;
    cancelledBy: string;
    cancellationType?: $Enums.CancellationType;
    penaltyApplied?: boolean;
    reason?: string | null;
    createdAt?: Date | string;
    job?: Prisma.JobCreateNestedOneWithoutCancellationsInput;
    booking?: Prisma.BookingCreateNestedOneWithoutCancellationRecordsInput;
    penalty?: Prisma.ProviderPenaltyCreateNestedOneWithoutCancellationsInput;
};
export type CancellationRecordUncheckedCreateInput = {
    id?: string;
    jobId?: string | null;
    bookingId?: string | null;
    cancelledBy: string;
    cancellationType?: $Enums.CancellationType;
    penaltyApplied?: boolean;
    penaltyId?: string | null;
    reason?: string | null;
    createdAt?: Date | string;
};
export type CancellationRecordUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cancelledBy?: Prisma.StringFieldUpdateOperationsInput | string;
    cancellationType?: Prisma.EnumCancellationTypeFieldUpdateOperationsInput | $Enums.CancellationType;
    penaltyApplied?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneWithoutCancellationsNestedInput;
    booking?: Prisma.BookingUpdateOneWithoutCancellationRecordsNestedInput;
    penalty?: Prisma.ProviderPenaltyUpdateOneWithoutCancellationsNestedInput;
};
export type CancellationRecordUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelledBy?: Prisma.StringFieldUpdateOperationsInput | string;
    cancellationType?: Prisma.EnumCancellationTypeFieldUpdateOperationsInput | $Enums.CancellationType;
    penaltyApplied?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    penaltyId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CancellationRecordCreateManyInput = {
    id?: string;
    jobId?: string | null;
    bookingId?: string | null;
    cancelledBy: string;
    cancellationType?: $Enums.CancellationType;
    penaltyApplied?: boolean;
    penaltyId?: string | null;
    reason?: string | null;
    createdAt?: Date | string;
};
export type CancellationRecordUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cancelledBy?: Prisma.StringFieldUpdateOperationsInput | string;
    cancellationType?: Prisma.EnumCancellationTypeFieldUpdateOperationsInput | $Enums.CancellationType;
    penaltyApplied?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CancellationRecordUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelledBy?: Prisma.StringFieldUpdateOperationsInput | string;
    cancellationType?: Prisma.EnumCancellationTypeFieldUpdateOperationsInput | $Enums.CancellationType;
    penaltyApplied?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    penaltyId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CancellationRecordListRelationFilter = {
    every?: Prisma.CancellationRecordWhereInput;
    some?: Prisma.CancellationRecordWhereInput;
    none?: Prisma.CancellationRecordWhereInput;
};
export type CancellationRecordOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CancellationRecordCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    cancelledBy?: Prisma.SortOrder;
    cancellationType?: Prisma.SortOrder;
    penaltyApplied?: Prisma.SortOrder;
    penaltyId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CancellationRecordMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    cancelledBy?: Prisma.SortOrder;
    cancellationType?: Prisma.SortOrder;
    penaltyApplied?: Prisma.SortOrder;
    penaltyId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CancellationRecordMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    cancelledBy?: Prisma.SortOrder;
    cancellationType?: Prisma.SortOrder;
    penaltyApplied?: Prisma.SortOrder;
    penaltyId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CancellationRecordCreateNestedManyWithoutBookingInput = {
    create?: Prisma.XOR<Prisma.CancellationRecordCreateWithoutBookingInput, Prisma.CancellationRecordUncheckedCreateWithoutBookingInput> | Prisma.CancellationRecordCreateWithoutBookingInput[] | Prisma.CancellationRecordUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.CancellationRecordCreateOrConnectWithoutBookingInput | Prisma.CancellationRecordCreateOrConnectWithoutBookingInput[];
    createMany?: Prisma.CancellationRecordCreateManyBookingInputEnvelope;
    connect?: Prisma.CancellationRecordWhereUniqueInput | Prisma.CancellationRecordWhereUniqueInput[];
};
export type CancellationRecordUncheckedCreateNestedManyWithoutBookingInput = {
    create?: Prisma.XOR<Prisma.CancellationRecordCreateWithoutBookingInput, Prisma.CancellationRecordUncheckedCreateWithoutBookingInput> | Prisma.CancellationRecordCreateWithoutBookingInput[] | Prisma.CancellationRecordUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.CancellationRecordCreateOrConnectWithoutBookingInput | Prisma.CancellationRecordCreateOrConnectWithoutBookingInput[];
    createMany?: Prisma.CancellationRecordCreateManyBookingInputEnvelope;
    connect?: Prisma.CancellationRecordWhereUniqueInput | Prisma.CancellationRecordWhereUniqueInput[];
};
export type CancellationRecordUpdateManyWithoutBookingNestedInput = {
    create?: Prisma.XOR<Prisma.CancellationRecordCreateWithoutBookingInput, Prisma.CancellationRecordUncheckedCreateWithoutBookingInput> | Prisma.CancellationRecordCreateWithoutBookingInput[] | Prisma.CancellationRecordUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.CancellationRecordCreateOrConnectWithoutBookingInput | Prisma.CancellationRecordCreateOrConnectWithoutBookingInput[];
    upsert?: Prisma.CancellationRecordUpsertWithWhereUniqueWithoutBookingInput | Prisma.CancellationRecordUpsertWithWhereUniqueWithoutBookingInput[];
    createMany?: Prisma.CancellationRecordCreateManyBookingInputEnvelope;
    set?: Prisma.CancellationRecordWhereUniqueInput | Prisma.CancellationRecordWhereUniqueInput[];
    disconnect?: Prisma.CancellationRecordWhereUniqueInput | Prisma.CancellationRecordWhereUniqueInput[];
    delete?: Prisma.CancellationRecordWhereUniqueInput | Prisma.CancellationRecordWhereUniqueInput[];
    connect?: Prisma.CancellationRecordWhereUniqueInput | Prisma.CancellationRecordWhereUniqueInput[];
    update?: Prisma.CancellationRecordUpdateWithWhereUniqueWithoutBookingInput | Prisma.CancellationRecordUpdateWithWhereUniqueWithoutBookingInput[];
    updateMany?: Prisma.CancellationRecordUpdateManyWithWhereWithoutBookingInput | Prisma.CancellationRecordUpdateManyWithWhereWithoutBookingInput[];
    deleteMany?: Prisma.CancellationRecordScalarWhereInput | Prisma.CancellationRecordScalarWhereInput[];
};
export type CancellationRecordUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: Prisma.XOR<Prisma.CancellationRecordCreateWithoutBookingInput, Prisma.CancellationRecordUncheckedCreateWithoutBookingInput> | Prisma.CancellationRecordCreateWithoutBookingInput[] | Prisma.CancellationRecordUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.CancellationRecordCreateOrConnectWithoutBookingInput | Prisma.CancellationRecordCreateOrConnectWithoutBookingInput[];
    upsert?: Prisma.CancellationRecordUpsertWithWhereUniqueWithoutBookingInput | Prisma.CancellationRecordUpsertWithWhereUniqueWithoutBookingInput[];
    createMany?: Prisma.CancellationRecordCreateManyBookingInputEnvelope;
    set?: Prisma.CancellationRecordWhereUniqueInput | Prisma.CancellationRecordWhereUniqueInput[];
    disconnect?: Prisma.CancellationRecordWhereUniqueInput | Prisma.CancellationRecordWhereUniqueInput[];
    delete?: Prisma.CancellationRecordWhereUniqueInput | Prisma.CancellationRecordWhereUniqueInput[];
    connect?: Prisma.CancellationRecordWhereUniqueInput | Prisma.CancellationRecordWhereUniqueInput[];
    update?: Prisma.CancellationRecordUpdateWithWhereUniqueWithoutBookingInput | Prisma.CancellationRecordUpdateWithWhereUniqueWithoutBookingInput[];
    updateMany?: Prisma.CancellationRecordUpdateManyWithWhereWithoutBookingInput | Prisma.CancellationRecordUpdateManyWithWhereWithoutBookingInput[];
    deleteMany?: Prisma.CancellationRecordScalarWhereInput | Prisma.CancellationRecordScalarWhereInput[];
};
export type CancellationRecordCreateNestedManyWithoutJobInput = {
    create?: Prisma.XOR<Prisma.CancellationRecordCreateWithoutJobInput, Prisma.CancellationRecordUncheckedCreateWithoutJobInput> | Prisma.CancellationRecordCreateWithoutJobInput[] | Prisma.CancellationRecordUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.CancellationRecordCreateOrConnectWithoutJobInput | Prisma.CancellationRecordCreateOrConnectWithoutJobInput[];
    createMany?: Prisma.CancellationRecordCreateManyJobInputEnvelope;
    connect?: Prisma.CancellationRecordWhereUniqueInput | Prisma.CancellationRecordWhereUniqueInput[];
};
export type CancellationRecordUncheckedCreateNestedManyWithoutJobInput = {
    create?: Prisma.XOR<Prisma.CancellationRecordCreateWithoutJobInput, Prisma.CancellationRecordUncheckedCreateWithoutJobInput> | Prisma.CancellationRecordCreateWithoutJobInput[] | Prisma.CancellationRecordUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.CancellationRecordCreateOrConnectWithoutJobInput | Prisma.CancellationRecordCreateOrConnectWithoutJobInput[];
    createMany?: Prisma.CancellationRecordCreateManyJobInputEnvelope;
    connect?: Prisma.CancellationRecordWhereUniqueInput | Prisma.CancellationRecordWhereUniqueInput[];
};
export type CancellationRecordUpdateManyWithoutJobNestedInput = {
    create?: Prisma.XOR<Prisma.CancellationRecordCreateWithoutJobInput, Prisma.CancellationRecordUncheckedCreateWithoutJobInput> | Prisma.CancellationRecordCreateWithoutJobInput[] | Prisma.CancellationRecordUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.CancellationRecordCreateOrConnectWithoutJobInput | Prisma.CancellationRecordCreateOrConnectWithoutJobInput[];
    upsert?: Prisma.CancellationRecordUpsertWithWhereUniqueWithoutJobInput | Prisma.CancellationRecordUpsertWithWhereUniqueWithoutJobInput[];
    createMany?: Prisma.CancellationRecordCreateManyJobInputEnvelope;
    set?: Prisma.CancellationRecordWhereUniqueInput | Prisma.CancellationRecordWhereUniqueInput[];
    disconnect?: Prisma.CancellationRecordWhereUniqueInput | Prisma.CancellationRecordWhereUniqueInput[];
    delete?: Prisma.CancellationRecordWhereUniqueInput | Prisma.CancellationRecordWhereUniqueInput[];
    connect?: Prisma.CancellationRecordWhereUniqueInput | Prisma.CancellationRecordWhereUniqueInput[];
    update?: Prisma.CancellationRecordUpdateWithWhereUniqueWithoutJobInput | Prisma.CancellationRecordUpdateWithWhereUniqueWithoutJobInput[];
    updateMany?: Prisma.CancellationRecordUpdateManyWithWhereWithoutJobInput | Prisma.CancellationRecordUpdateManyWithWhereWithoutJobInput[];
    deleteMany?: Prisma.CancellationRecordScalarWhereInput | Prisma.CancellationRecordScalarWhereInput[];
};
export type CancellationRecordUncheckedUpdateManyWithoutJobNestedInput = {
    create?: Prisma.XOR<Prisma.CancellationRecordCreateWithoutJobInput, Prisma.CancellationRecordUncheckedCreateWithoutJobInput> | Prisma.CancellationRecordCreateWithoutJobInput[] | Prisma.CancellationRecordUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.CancellationRecordCreateOrConnectWithoutJobInput | Prisma.CancellationRecordCreateOrConnectWithoutJobInput[];
    upsert?: Prisma.CancellationRecordUpsertWithWhereUniqueWithoutJobInput | Prisma.CancellationRecordUpsertWithWhereUniqueWithoutJobInput[];
    createMany?: Prisma.CancellationRecordCreateManyJobInputEnvelope;
    set?: Prisma.CancellationRecordWhereUniqueInput | Prisma.CancellationRecordWhereUniqueInput[];
    disconnect?: Prisma.CancellationRecordWhereUniqueInput | Prisma.CancellationRecordWhereUniqueInput[];
    delete?: Prisma.CancellationRecordWhereUniqueInput | Prisma.CancellationRecordWhereUniqueInput[];
    connect?: Prisma.CancellationRecordWhereUniqueInput | Prisma.CancellationRecordWhereUniqueInput[];
    update?: Prisma.CancellationRecordUpdateWithWhereUniqueWithoutJobInput | Prisma.CancellationRecordUpdateWithWhereUniqueWithoutJobInput[];
    updateMany?: Prisma.CancellationRecordUpdateManyWithWhereWithoutJobInput | Prisma.CancellationRecordUpdateManyWithWhereWithoutJobInput[];
    deleteMany?: Prisma.CancellationRecordScalarWhereInput | Prisma.CancellationRecordScalarWhereInput[];
};
export type EnumCancellationTypeFieldUpdateOperationsInput = {
    set?: $Enums.CancellationType;
};
export type CancellationRecordCreateNestedManyWithoutPenaltyInput = {
    create?: Prisma.XOR<Prisma.CancellationRecordCreateWithoutPenaltyInput, Prisma.CancellationRecordUncheckedCreateWithoutPenaltyInput> | Prisma.CancellationRecordCreateWithoutPenaltyInput[] | Prisma.CancellationRecordUncheckedCreateWithoutPenaltyInput[];
    connectOrCreate?: Prisma.CancellationRecordCreateOrConnectWithoutPenaltyInput | Prisma.CancellationRecordCreateOrConnectWithoutPenaltyInput[];
    createMany?: Prisma.CancellationRecordCreateManyPenaltyInputEnvelope;
    connect?: Prisma.CancellationRecordWhereUniqueInput | Prisma.CancellationRecordWhereUniqueInput[];
};
export type CancellationRecordUncheckedCreateNestedManyWithoutPenaltyInput = {
    create?: Prisma.XOR<Prisma.CancellationRecordCreateWithoutPenaltyInput, Prisma.CancellationRecordUncheckedCreateWithoutPenaltyInput> | Prisma.CancellationRecordCreateWithoutPenaltyInput[] | Prisma.CancellationRecordUncheckedCreateWithoutPenaltyInput[];
    connectOrCreate?: Prisma.CancellationRecordCreateOrConnectWithoutPenaltyInput | Prisma.CancellationRecordCreateOrConnectWithoutPenaltyInput[];
    createMany?: Prisma.CancellationRecordCreateManyPenaltyInputEnvelope;
    connect?: Prisma.CancellationRecordWhereUniqueInput | Prisma.CancellationRecordWhereUniqueInput[];
};
export type CancellationRecordUpdateManyWithoutPenaltyNestedInput = {
    create?: Prisma.XOR<Prisma.CancellationRecordCreateWithoutPenaltyInput, Prisma.CancellationRecordUncheckedCreateWithoutPenaltyInput> | Prisma.CancellationRecordCreateWithoutPenaltyInput[] | Prisma.CancellationRecordUncheckedCreateWithoutPenaltyInput[];
    connectOrCreate?: Prisma.CancellationRecordCreateOrConnectWithoutPenaltyInput | Prisma.CancellationRecordCreateOrConnectWithoutPenaltyInput[];
    upsert?: Prisma.CancellationRecordUpsertWithWhereUniqueWithoutPenaltyInput | Prisma.CancellationRecordUpsertWithWhereUniqueWithoutPenaltyInput[];
    createMany?: Prisma.CancellationRecordCreateManyPenaltyInputEnvelope;
    set?: Prisma.CancellationRecordWhereUniqueInput | Prisma.CancellationRecordWhereUniqueInput[];
    disconnect?: Prisma.CancellationRecordWhereUniqueInput | Prisma.CancellationRecordWhereUniqueInput[];
    delete?: Prisma.CancellationRecordWhereUniqueInput | Prisma.CancellationRecordWhereUniqueInput[];
    connect?: Prisma.CancellationRecordWhereUniqueInput | Prisma.CancellationRecordWhereUniqueInput[];
    update?: Prisma.CancellationRecordUpdateWithWhereUniqueWithoutPenaltyInput | Prisma.CancellationRecordUpdateWithWhereUniqueWithoutPenaltyInput[];
    updateMany?: Prisma.CancellationRecordUpdateManyWithWhereWithoutPenaltyInput | Prisma.CancellationRecordUpdateManyWithWhereWithoutPenaltyInput[];
    deleteMany?: Prisma.CancellationRecordScalarWhereInput | Prisma.CancellationRecordScalarWhereInput[];
};
export type CancellationRecordUncheckedUpdateManyWithoutPenaltyNestedInput = {
    create?: Prisma.XOR<Prisma.CancellationRecordCreateWithoutPenaltyInput, Prisma.CancellationRecordUncheckedCreateWithoutPenaltyInput> | Prisma.CancellationRecordCreateWithoutPenaltyInput[] | Prisma.CancellationRecordUncheckedCreateWithoutPenaltyInput[];
    connectOrCreate?: Prisma.CancellationRecordCreateOrConnectWithoutPenaltyInput | Prisma.CancellationRecordCreateOrConnectWithoutPenaltyInput[];
    upsert?: Prisma.CancellationRecordUpsertWithWhereUniqueWithoutPenaltyInput | Prisma.CancellationRecordUpsertWithWhereUniqueWithoutPenaltyInput[];
    createMany?: Prisma.CancellationRecordCreateManyPenaltyInputEnvelope;
    set?: Prisma.CancellationRecordWhereUniqueInput | Prisma.CancellationRecordWhereUniqueInput[];
    disconnect?: Prisma.CancellationRecordWhereUniqueInput | Prisma.CancellationRecordWhereUniqueInput[];
    delete?: Prisma.CancellationRecordWhereUniqueInput | Prisma.CancellationRecordWhereUniqueInput[];
    connect?: Prisma.CancellationRecordWhereUniqueInput | Prisma.CancellationRecordWhereUniqueInput[];
    update?: Prisma.CancellationRecordUpdateWithWhereUniqueWithoutPenaltyInput | Prisma.CancellationRecordUpdateWithWhereUniqueWithoutPenaltyInput[];
    updateMany?: Prisma.CancellationRecordUpdateManyWithWhereWithoutPenaltyInput | Prisma.CancellationRecordUpdateManyWithWhereWithoutPenaltyInput[];
    deleteMany?: Prisma.CancellationRecordScalarWhereInput | Prisma.CancellationRecordScalarWhereInput[];
};
export type CancellationRecordCreateWithoutBookingInput = {
    id?: string;
    cancelledBy: string;
    cancellationType?: $Enums.CancellationType;
    penaltyApplied?: boolean;
    reason?: string | null;
    createdAt?: Date | string;
    job?: Prisma.JobCreateNestedOneWithoutCancellationsInput;
    penalty?: Prisma.ProviderPenaltyCreateNestedOneWithoutCancellationsInput;
};
export type CancellationRecordUncheckedCreateWithoutBookingInput = {
    id?: string;
    jobId?: string | null;
    cancelledBy: string;
    cancellationType?: $Enums.CancellationType;
    penaltyApplied?: boolean;
    penaltyId?: string | null;
    reason?: string | null;
    createdAt?: Date | string;
};
export type CancellationRecordCreateOrConnectWithoutBookingInput = {
    where: Prisma.CancellationRecordWhereUniqueInput;
    create: Prisma.XOR<Prisma.CancellationRecordCreateWithoutBookingInput, Prisma.CancellationRecordUncheckedCreateWithoutBookingInput>;
};
export type CancellationRecordCreateManyBookingInputEnvelope = {
    data: Prisma.CancellationRecordCreateManyBookingInput | Prisma.CancellationRecordCreateManyBookingInput[];
    skipDuplicates?: boolean;
};
export type CancellationRecordUpsertWithWhereUniqueWithoutBookingInput = {
    where: Prisma.CancellationRecordWhereUniqueInput;
    update: Prisma.XOR<Prisma.CancellationRecordUpdateWithoutBookingInput, Prisma.CancellationRecordUncheckedUpdateWithoutBookingInput>;
    create: Prisma.XOR<Prisma.CancellationRecordCreateWithoutBookingInput, Prisma.CancellationRecordUncheckedCreateWithoutBookingInput>;
};
export type CancellationRecordUpdateWithWhereUniqueWithoutBookingInput = {
    where: Prisma.CancellationRecordWhereUniqueInput;
    data: Prisma.XOR<Prisma.CancellationRecordUpdateWithoutBookingInput, Prisma.CancellationRecordUncheckedUpdateWithoutBookingInput>;
};
export type CancellationRecordUpdateManyWithWhereWithoutBookingInput = {
    where: Prisma.CancellationRecordScalarWhereInput;
    data: Prisma.XOR<Prisma.CancellationRecordUpdateManyMutationInput, Prisma.CancellationRecordUncheckedUpdateManyWithoutBookingInput>;
};
export type CancellationRecordScalarWhereInput = {
    AND?: Prisma.CancellationRecordScalarWhereInput | Prisma.CancellationRecordScalarWhereInput[];
    OR?: Prisma.CancellationRecordScalarWhereInput[];
    NOT?: Prisma.CancellationRecordScalarWhereInput | Prisma.CancellationRecordScalarWhereInput[];
    id?: Prisma.StringFilter<"CancellationRecord"> | string;
    jobId?: Prisma.StringNullableFilter<"CancellationRecord"> | string | null;
    bookingId?: Prisma.StringNullableFilter<"CancellationRecord"> | string | null;
    cancelledBy?: Prisma.StringFilter<"CancellationRecord"> | string;
    cancellationType?: Prisma.EnumCancellationTypeFilter<"CancellationRecord"> | $Enums.CancellationType;
    penaltyApplied?: Prisma.BoolFilter<"CancellationRecord"> | boolean;
    penaltyId?: Prisma.StringNullableFilter<"CancellationRecord"> | string | null;
    reason?: Prisma.StringNullableFilter<"CancellationRecord"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"CancellationRecord"> | Date | string;
};
export type CancellationRecordCreateWithoutJobInput = {
    id?: string;
    cancelledBy: string;
    cancellationType?: $Enums.CancellationType;
    penaltyApplied?: boolean;
    reason?: string | null;
    createdAt?: Date | string;
    booking?: Prisma.BookingCreateNestedOneWithoutCancellationRecordsInput;
    penalty?: Prisma.ProviderPenaltyCreateNestedOneWithoutCancellationsInput;
};
export type CancellationRecordUncheckedCreateWithoutJobInput = {
    id?: string;
    bookingId?: string | null;
    cancelledBy: string;
    cancellationType?: $Enums.CancellationType;
    penaltyApplied?: boolean;
    penaltyId?: string | null;
    reason?: string | null;
    createdAt?: Date | string;
};
export type CancellationRecordCreateOrConnectWithoutJobInput = {
    where: Prisma.CancellationRecordWhereUniqueInput;
    create: Prisma.XOR<Prisma.CancellationRecordCreateWithoutJobInput, Prisma.CancellationRecordUncheckedCreateWithoutJobInput>;
};
export type CancellationRecordCreateManyJobInputEnvelope = {
    data: Prisma.CancellationRecordCreateManyJobInput | Prisma.CancellationRecordCreateManyJobInput[];
    skipDuplicates?: boolean;
};
export type CancellationRecordUpsertWithWhereUniqueWithoutJobInput = {
    where: Prisma.CancellationRecordWhereUniqueInput;
    update: Prisma.XOR<Prisma.CancellationRecordUpdateWithoutJobInput, Prisma.CancellationRecordUncheckedUpdateWithoutJobInput>;
    create: Prisma.XOR<Prisma.CancellationRecordCreateWithoutJobInput, Prisma.CancellationRecordUncheckedCreateWithoutJobInput>;
};
export type CancellationRecordUpdateWithWhereUniqueWithoutJobInput = {
    where: Prisma.CancellationRecordWhereUniqueInput;
    data: Prisma.XOR<Prisma.CancellationRecordUpdateWithoutJobInput, Prisma.CancellationRecordUncheckedUpdateWithoutJobInput>;
};
export type CancellationRecordUpdateManyWithWhereWithoutJobInput = {
    where: Prisma.CancellationRecordScalarWhereInput;
    data: Prisma.XOR<Prisma.CancellationRecordUpdateManyMutationInput, Prisma.CancellationRecordUncheckedUpdateManyWithoutJobInput>;
};
export type CancellationRecordCreateWithoutPenaltyInput = {
    id?: string;
    cancelledBy: string;
    cancellationType?: $Enums.CancellationType;
    penaltyApplied?: boolean;
    reason?: string | null;
    createdAt?: Date | string;
    job?: Prisma.JobCreateNestedOneWithoutCancellationsInput;
    booking?: Prisma.BookingCreateNestedOneWithoutCancellationRecordsInput;
};
export type CancellationRecordUncheckedCreateWithoutPenaltyInput = {
    id?: string;
    jobId?: string | null;
    bookingId?: string | null;
    cancelledBy: string;
    cancellationType?: $Enums.CancellationType;
    penaltyApplied?: boolean;
    reason?: string | null;
    createdAt?: Date | string;
};
export type CancellationRecordCreateOrConnectWithoutPenaltyInput = {
    where: Prisma.CancellationRecordWhereUniqueInput;
    create: Prisma.XOR<Prisma.CancellationRecordCreateWithoutPenaltyInput, Prisma.CancellationRecordUncheckedCreateWithoutPenaltyInput>;
};
export type CancellationRecordCreateManyPenaltyInputEnvelope = {
    data: Prisma.CancellationRecordCreateManyPenaltyInput | Prisma.CancellationRecordCreateManyPenaltyInput[];
    skipDuplicates?: boolean;
};
export type CancellationRecordUpsertWithWhereUniqueWithoutPenaltyInput = {
    where: Prisma.CancellationRecordWhereUniqueInput;
    update: Prisma.XOR<Prisma.CancellationRecordUpdateWithoutPenaltyInput, Prisma.CancellationRecordUncheckedUpdateWithoutPenaltyInput>;
    create: Prisma.XOR<Prisma.CancellationRecordCreateWithoutPenaltyInput, Prisma.CancellationRecordUncheckedCreateWithoutPenaltyInput>;
};
export type CancellationRecordUpdateWithWhereUniqueWithoutPenaltyInput = {
    where: Prisma.CancellationRecordWhereUniqueInput;
    data: Prisma.XOR<Prisma.CancellationRecordUpdateWithoutPenaltyInput, Prisma.CancellationRecordUncheckedUpdateWithoutPenaltyInput>;
};
export type CancellationRecordUpdateManyWithWhereWithoutPenaltyInput = {
    where: Prisma.CancellationRecordScalarWhereInput;
    data: Prisma.XOR<Prisma.CancellationRecordUpdateManyMutationInput, Prisma.CancellationRecordUncheckedUpdateManyWithoutPenaltyInput>;
};
export type CancellationRecordCreateManyBookingInput = {
    id?: string;
    jobId?: string | null;
    cancelledBy: string;
    cancellationType?: $Enums.CancellationType;
    penaltyApplied?: boolean;
    penaltyId?: string | null;
    reason?: string | null;
    createdAt?: Date | string;
};
export type CancellationRecordUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cancelledBy?: Prisma.StringFieldUpdateOperationsInput | string;
    cancellationType?: Prisma.EnumCancellationTypeFieldUpdateOperationsInput | $Enums.CancellationType;
    penaltyApplied?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneWithoutCancellationsNestedInput;
    penalty?: Prisma.ProviderPenaltyUpdateOneWithoutCancellationsNestedInput;
};
export type CancellationRecordUncheckedUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelledBy?: Prisma.StringFieldUpdateOperationsInput | string;
    cancellationType?: Prisma.EnumCancellationTypeFieldUpdateOperationsInput | $Enums.CancellationType;
    penaltyApplied?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    penaltyId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CancellationRecordUncheckedUpdateManyWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelledBy?: Prisma.StringFieldUpdateOperationsInput | string;
    cancellationType?: Prisma.EnumCancellationTypeFieldUpdateOperationsInput | $Enums.CancellationType;
    penaltyApplied?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    penaltyId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CancellationRecordCreateManyJobInput = {
    id?: string;
    bookingId?: string | null;
    cancelledBy: string;
    cancellationType?: $Enums.CancellationType;
    penaltyApplied?: boolean;
    penaltyId?: string | null;
    reason?: string | null;
    createdAt?: Date | string;
};
export type CancellationRecordUpdateWithoutJobInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cancelledBy?: Prisma.StringFieldUpdateOperationsInput | string;
    cancellationType?: Prisma.EnumCancellationTypeFieldUpdateOperationsInput | $Enums.CancellationType;
    penaltyApplied?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    booking?: Prisma.BookingUpdateOneWithoutCancellationRecordsNestedInput;
    penalty?: Prisma.ProviderPenaltyUpdateOneWithoutCancellationsNestedInput;
};
export type CancellationRecordUncheckedUpdateWithoutJobInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelledBy?: Prisma.StringFieldUpdateOperationsInput | string;
    cancellationType?: Prisma.EnumCancellationTypeFieldUpdateOperationsInput | $Enums.CancellationType;
    penaltyApplied?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    penaltyId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CancellationRecordUncheckedUpdateManyWithoutJobInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelledBy?: Prisma.StringFieldUpdateOperationsInput | string;
    cancellationType?: Prisma.EnumCancellationTypeFieldUpdateOperationsInput | $Enums.CancellationType;
    penaltyApplied?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    penaltyId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CancellationRecordCreateManyPenaltyInput = {
    id?: string;
    jobId?: string | null;
    bookingId?: string | null;
    cancelledBy: string;
    cancellationType?: $Enums.CancellationType;
    penaltyApplied?: boolean;
    reason?: string | null;
    createdAt?: Date | string;
};
export type CancellationRecordUpdateWithoutPenaltyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cancelledBy?: Prisma.StringFieldUpdateOperationsInput | string;
    cancellationType?: Prisma.EnumCancellationTypeFieldUpdateOperationsInput | $Enums.CancellationType;
    penaltyApplied?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneWithoutCancellationsNestedInput;
    booking?: Prisma.BookingUpdateOneWithoutCancellationRecordsNestedInput;
};
export type CancellationRecordUncheckedUpdateWithoutPenaltyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelledBy?: Prisma.StringFieldUpdateOperationsInput | string;
    cancellationType?: Prisma.EnumCancellationTypeFieldUpdateOperationsInput | $Enums.CancellationType;
    penaltyApplied?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CancellationRecordUncheckedUpdateManyWithoutPenaltyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelledBy?: Prisma.StringFieldUpdateOperationsInput | string;
    cancellationType?: Prisma.EnumCancellationTypeFieldUpdateOperationsInput | $Enums.CancellationType;
    penaltyApplied?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CancellationRecordSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    jobId?: boolean;
    bookingId?: boolean;
    cancelledBy?: boolean;
    cancellationType?: boolean;
    penaltyApplied?: boolean;
    penaltyId?: boolean;
    reason?: boolean;
    createdAt?: boolean;
    job?: boolean | Prisma.CancellationRecord$jobArgs<ExtArgs>;
    booking?: boolean | Prisma.CancellationRecord$bookingArgs<ExtArgs>;
    penalty?: boolean | Prisma.CancellationRecord$penaltyArgs<ExtArgs>;
}, ExtArgs["result"]["cancellationRecord"]>;
export type CancellationRecordSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    jobId?: boolean;
    bookingId?: boolean;
    cancelledBy?: boolean;
    cancellationType?: boolean;
    penaltyApplied?: boolean;
    penaltyId?: boolean;
    reason?: boolean;
    createdAt?: boolean;
    job?: boolean | Prisma.CancellationRecord$jobArgs<ExtArgs>;
    booking?: boolean | Prisma.CancellationRecord$bookingArgs<ExtArgs>;
    penalty?: boolean | Prisma.CancellationRecord$penaltyArgs<ExtArgs>;
}, ExtArgs["result"]["cancellationRecord"]>;
export type CancellationRecordSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    jobId?: boolean;
    bookingId?: boolean;
    cancelledBy?: boolean;
    cancellationType?: boolean;
    penaltyApplied?: boolean;
    penaltyId?: boolean;
    reason?: boolean;
    createdAt?: boolean;
    job?: boolean | Prisma.CancellationRecord$jobArgs<ExtArgs>;
    booking?: boolean | Prisma.CancellationRecord$bookingArgs<ExtArgs>;
    penalty?: boolean | Prisma.CancellationRecord$penaltyArgs<ExtArgs>;
}, ExtArgs["result"]["cancellationRecord"]>;
export type CancellationRecordSelectScalar = {
    id?: boolean;
    jobId?: boolean;
    bookingId?: boolean;
    cancelledBy?: boolean;
    cancellationType?: boolean;
    penaltyApplied?: boolean;
    penaltyId?: boolean;
    reason?: boolean;
    createdAt?: boolean;
};
export type CancellationRecordOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "jobId" | "bookingId" | "cancelledBy" | "cancellationType" | "penaltyApplied" | "penaltyId" | "reason" | "createdAt", ExtArgs["result"]["cancellationRecord"]>;
export type CancellationRecordInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    job?: boolean | Prisma.CancellationRecord$jobArgs<ExtArgs>;
    booking?: boolean | Prisma.CancellationRecord$bookingArgs<ExtArgs>;
    penalty?: boolean | Prisma.CancellationRecord$penaltyArgs<ExtArgs>;
};
export type CancellationRecordIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    job?: boolean | Prisma.CancellationRecord$jobArgs<ExtArgs>;
    booking?: boolean | Prisma.CancellationRecord$bookingArgs<ExtArgs>;
    penalty?: boolean | Prisma.CancellationRecord$penaltyArgs<ExtArgs>;
};
export type CancellationRecordIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    job?: boolean | Prisma.CancellationRecord$jobArgs<ExtArgs>;
    booking?: boolean | Prisma.CancellationRecord$bookingArgs<ExtArgs>;
    penalty?: boolean | Prisma.CancellationRecord$penaltyArgs<ExtArgs>;
};
export type $CancellationRecordPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CancellationRecord";
    objects: {
        job: Prisma.$JobPayload<ExtArgs> | null;
        booking: Prisma.$BookingPayload<ExtArgs> | null;
        penalty: Prisma.$ProviderPenaltyPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        jobId: string | null;
        bookingId: string | null;
        cancelledBy: string;
        cancellationType: $Enums.CancellationType;
        penaltyApplied: boolean;
        penaltyId: string | null;
        reason: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["cancellationRecord"]>;
    composites: {};
};
export type CancellationRecordGetPayload<S extends boolean | null | undefined | CancellationRecordDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CancellationRecordPayload, S>;
export type CancellationRecordCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CancellationRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CancellationRecordCountAggregateInputType | true;
};
export interface CancellationRecordDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CancellationRecord'];
        meta: {
            name: 'CancellationRecord';
        };
    };
    findUnique<T extends CancellationRecordFindUniqueArgs>(args: Prisma.SelectSubset<T, CancellationRecordFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CancellationRecordClient<runtime.Types.Result.GetResult<Prisma.$CancellationRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CancellationRecordFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CancellationRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CancellationRecordClient<runtime.Types.Result.GetResult<Prisma.$CancellationRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CancellationRecordFindFirstArgs>(args?: Prisma.SelectSubset<T, CancellationRecordFindFirstArgs<ExtArgs>>): Prisma.Prisma__CancellationRecordClient<runtime.Types.Result.GetResult<Prisma.$CancellationRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CancellationRecordFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CancellationRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CancellationRecordClient<runtime.Types.Result.GetResult<Prisma.$CancellationRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CancellationRecordFindManyArgs>(args?: Prisma.SelectSubset<T, CancellationRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CancellationRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CancellationRecordCreateArgs>(args: Prisma.SelectSubset<T, CancellationRecordCreateArgs<ExtArgs>>): Prisma.Prisma__CancellationRecordClient<runtime.Types.Result.GetResult<Prisma.$CancellationRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CancellationRecordCreateManyArgs>(args?: Prisma.SelectSubset<T, CancellationRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CancellationRecordCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CancellationRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CancellationRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CancellationRecordDeleteArgs>(args: Prisma.SelectSubset<T, CancellationRecordDeleteArgs<ExtArgs>>): Prisma.Prisma__CancellationRecordClient<runtime.Types.Result.GetResult<Prisma.$CancellationRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CancellationRecordUpdateArgs>(args: Prisma.SelectSubset<T, CancellationRecordUpdateArgs<ExtArgs>>): Prisma.Prisma__CancellationRecordClient<runtime.Types.Result.GetResult<Prisma.$CancellationRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CancellationRecordDeleteManyArgs>(args?: Prisma.SelectSubset<T, CancellationRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CancellationRecordUpdateManyArgs>(args: Prisma.SelectSubset<T, CancellationRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CancellationRecordUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CancellationRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CancellationRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CancellationRecordUpsertArgs>(args: Prisma.SelectSubset<T, CancellationRecordUpsertArgs<ExtArgs>>): Prisma.Prisma__CancellationRecordClient<runtime.Types.Result.GetResult<Prisma.$CancellationRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CancellationRecordCountArgs>(args?: Prisma.Subset<T, CancellationRecordCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CancellationRecordCountAggregateOutputType> : number>;
    aggregate<T extends CancellationRecordAggregateArgs>(args: Prisma.Subset<T, CancellationRecordAggregateArgs>): Prisma.PrismaPromise<GetCancellationRecordAggregateType<T>>;
    groupBy<T extends CancellationRecordGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CancellationRecordGroupByArgs['orderBy'];
    } : {
        orderBy?: CancellationRecordGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CancellationRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCancellationRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CancellationRecordFieldRefs;
}
export interface Prisma__CancellationRecordClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    job<T extends Prisma.CancellationRecord$jobArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CancellationRecord$jobArgs<ExtArgs>>): Prisma.Prisma__JobClient<runtime.Types.Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    booking<T extends Prisma.CancellationRecord$bookingArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CancellationRecord$bookingArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    penalty<T extends Prisma.CancellationRecord$penaltyArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CancellationRecord$penaltyArgs<ExtArgs>>): Prisma.Prisma__ProviderPenaltyClient<runtime.Types.Result.GetResult<Prisma.$ProviderPenaltyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CancellationRecordFieldRefs {
    readonly id: Prisma.FieldRef<"CancellationRecord", 'String'>;
    readonly jobId: Prisma.FieldRef<"CancellationRecord", 'String'>;
    readonly bookingId: Prisma.FieldRef<"CancellationRecord", 'String'>;
    readonly cancelledBy: Prisma.FieldRef<"CancellationRecord", 'String'>;
    readonly cancellationType: Prisma.FieldRef<"CancellationRecord", 'CancellationType'>;
    readonly penaltyApplied: Prisma.FieldRef<"CancellationRecord", 'Boolean'>;
    readonly penaltyId: Prisma.FieldRef<"CancellationRecord", 'String'>;
    readonly reason: Prisma.FieldRef<"CancellationRecord", 'String'>;
    readonly createdAt: Prisma.FieldRef<"CancellationRecord", 'DateTime'>;
}
export type CancellationRecordFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CancellationRecordSelect<ExtArgs> | null;
    omit?: Prisma.CancellationRecordOmit<ExtArgs> | null;
    include?: Prisma.CancellationRecordInclude<ExtArgs> | null;
    where: Prisma.CancellationRecordWhereUniqueInput;
};
export type CancellationRecordFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CancellationRecordSelect<ExtArgs> | null;
    omit?: Prisma.CancellationRecordOmit<ExtArgs> | null;
    include?: Prisma.CancellationRecordInclude<ExtArgs> | null;
    where: Prisma.CancellationRecordWhereUniqueInput;
};
export type CancellationRecordFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CancellationRecordSelect<ExtArgs> | null;
    omit?: Prisma.CancellationRecordOmit<ExtArgs> | null;
    include?: Prisma.CancellationRecordInclude<ExtArgs> | null;
    where?: Prisma.CancellationRecordWhereInput;
    orderBy?: Prisma.CancellationRecordOrderByWithRelationInput | Prisma.CancellationRecordOrderByWithRelationInput[];
    cursor?: Prisma.CancellationRecordWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CancellationRecordScalarFieldEnum | Prisma.CancellationRecordScalarFieldEnum[];
};
export type CancellationRecordFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CancellationRecordSelect<ExtArgs> | null;
    omit?: Prisma.CancellationRecordOmit<ExtArgs> | null;
    include?: Prisma.CancellationRecordInclude<ExtArgs> | null;
    where?: Prisma.CancellationRecordWhereInput;
    orderBy?: Prisma.CancellationRecordOrderByWithRelationInput | Prisma.CancellationRecordOrderByWithRelationInput[];
    cursor?: Prisma.CancellationRecordWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CancellationRecordScalarFieldEnum | Prisma.CancellationRecordScalarFieldEnum[];
};
export type CancellationRecordFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CancellationRecordSelect<ExtArgs> | null;
    omit?: Prisma.CancellationRecordOmit<ExtArgs> | null;
    include?: Prisma.CancellationRecordInclude<ExtArgs> | null;
    where?: Prisma.CancellationRecordWhereInput;
    orderBy?: Prisma.CancellationRecordOrderByWithRelationInput | Prisma.CancellationRecordOrderByWithRelationInput[];
    cursor?: Prisma.CancellationRecordWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CancellationRecordScalarFieldEnum | Prisma.CancellationRecordScalarFieldEnum[];
};
export type CancellationRecordCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CancellationRecordSelect<ExtArgs> | null;
    omit?: Prisma.CancellationRecordOmit<ExtArgs> | null;
    include?: Prisma.CancellationRecordInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CancellationRecordCreateInput, Prisma.CancellationRecordUncheckedCreateInput>;
};
export type CancellationRecordCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CancellationRecordCreateManyInput | Prisma.CancellationRecordCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CancellationRecordCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CancellationRecordSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CancellationRecordOmit<ExtArgs> | null;
    data: Prisma.CancellationRecordCreateManyInput | Prisma.CancellationRecordCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CancellationRecordIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CancellationRecordUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CancellationRecordSelect<ExtArgs> | null;
    omit?: Prisma.CancellationRecordOmit<ExtArgs> | null;
    include?: Prisma.CancellationRecordInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CancellationRecordUpdateInput, Prisma.CancellationRecordUncheckedUpdateInput>;
    where: Prisma.CancellationRecordWhereUniqueInput;
};
export type CancellationRecordUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CancellationRecordUpdateManyMutationInput, Prisma.CancellationRecordUncheckedUpdateManyInput>;
    where?: Prisma.CancellationRecordWhereInput;
    limit?: number;
};
export type CancellationRecordUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CancellationRecordSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CancellationRecordOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CancellationRecordUpdateManyMutationInput, Prisma.CancellationRecordUncheckedUpdateManyInput>;
    where?: Prisma.CancellationRecordWhereInput;
    limit?: number;
    include?: Prisma.CancellationRecordIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CancellationRecordUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CancellationRecordSelect<ExtArgs> | null;
    omit?: Prisma.CancellationRecordOmit<ExtArgs> | null;
    include?: Prisma.CancellationRecordInclude<ExtArgs> | null;
    where: Prisma.CancellationRecordWhereUniqueInput;
    create: Prisma.XOR<Prisma.CancellationRecordCreateInput, Prisma.CancellationRecordUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CancellationRecordUpdateInput, Prisma.CancellationRecordUncheckedUpdateInput>;
};
export type CancellationRecordDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CancellationRecordSelect<ExtArgs> | null;
    omit?: Prisma.CancellationRecordOmit<ExtArgs> | null;
    include?: Prisma.CancellationRecordInclude<ExtArgs> | null;
    where: Prisma.CancellationRecordWhereUniqueInput;
};
export type CancellationRecordDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CancellationRecordWhereInput;
    limit?: number;
};
export type CancellationRecord$jobArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobSelect<ExtArgs> | null;
    omit?: Prisma.JobOmit<ExtArgs> | null;
    include?: Prisma.JobInclude<ExtArgs> | null;
    where?: Prisma.JobWhereInput;
};
export type CancellationRecord$bookingArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    where?: Prisma.BookingWhereInput;
};
export type CancellationRecord$penaltyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderPenaltySelect<ExtArgs> | null;
    omit?: Prisma.ProviderPenaltyOmit<ExtArgs> | null;
    include?: Prisma.ProviderPenaltyInclude<ExtArgs> | null;
    where?: Prisma.ProviderPenaltyWhereInput;
};
export type CancellationRecordDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CancellationRecordSelect<ExtArgs> | null;
    omit?: Prisma.CancellationRecordOmit<ExtArgs> | null;
    include?: Prisma.CancellationRecordInclude<ExtArgs> | null;
};
export {};
