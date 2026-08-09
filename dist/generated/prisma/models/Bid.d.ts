import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type BidModel = runtime.Types.Result.DefaultSelection<Prisma.$BidPayload>;
export type AggregateBid = {
    _count: BidCountAggregateOutputType | null;
    _avg: BidAvgAggregateOutputType | null;
    _sum: BidSumAggregateOutputType | null;
    _min: BidMinAggregateOutputType | null;
    _max: BidMaxAggregateOutputType | null;
};
export type BidAvgAggregateOutputType = {
    offeredPrice: runtime.Decimal | null;
};
export type BidSumAggregateOutputType = {
    offeredPrice: runtime.Decimal | null;
};
export type BidMinAggregateOutputType = {
    id: string | null;
    jobId: string | null;
    providerId: string | null;
    offeredPrice: runtime.Decimal | null;
    message: string | null;
    status: $Enums.BidStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BidMaxAggregateOutputType = {
    id: string | null;
    jobId: string | null;
    providerId: string | null;
    offeredPrice: runtime.Decimal | null;
    message: string | null;
    status: $Enums.BidStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BidCountAggregateOutputType = {
    id: number;
    jobId: number;
    providerId: number;
    offeredPrice: number;
    message: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type BidAvgAggregateInputType = {
    offeredPrice?: true;
};
export type BidSumAggregateInputType = {
    offeredPrice?: true;
};
export type BidMinAggregateInputType = {
    id?: true;
    jobId?: true;
    providerId?: true;
    offeredPrice?: true;
    message?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BidMaxAggregateInputType = {
    id?: true;
    jobId?: true;
    providerId?: true;
    offeredPrice?: true;
    message?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BidCountAggregateInputType = {
    id?: true;
    jobId?: true;
    providerId?: true;
    offeredPrice?: true;
    message?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type BidAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BidWhereInput;
    orderBy?: Prisma.BidOrderByWithRelationInput | Prisma.BidOrderByWithRelationInput[];
    cursor?: Prisma.BidWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BidCountAggregateInputType;
    _avg?: BidAvgAggregateInputType;
    _sum?: BidSumAggregateInputType;
    _min?: BidMinAggregateInputType;
    _max?: BidMaxAggregateInputType;
};
export type GetBidAggregateType<T extends BidAggregateArgs> = {
    [P in keyof T & keyof AggregateBid]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBid[P]> : Prisma.GetScalarType<T[P], AggregateBid[P]>;
};
export type BidGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BidWhereInput;
    orderBy?: Prisma.BidOrderByWithAggregationInput | Prisma.BidOrderByWithAggregationInput[];
    by: Prisma.BidScalarFieldEnum[] | Prisma.BidScalarFieldEnum;
    having?: Prisma.BidScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BidCountAggregateInputType | true;
    _avg?: BidAvgAggregateInputType;
    _sum?: BidSumAggregateInputType;
    _min?: BidMinAggregateInputType;
    _max?: BidMaxAggregateInputType;
};
export type BidGroupByOutputType = {
    id: string;
    jobId: string;
    providerId: string;
    offeredPrice: runtime.Decimal;
    message: string | null;
    status: $Enums.BidStatus;
    createdAt: Date;
    updatedAt: Date;
    _count: BidCountAggregateOutputType | null;
    _avg: BidAvgAggregateOutputType | null;
    _sum: BidSumAggregateOutputType | null;
    _min: BidMinAggregateOutputType | null;
    _max: BidMaxAggregateOutputType | null;
};
type GetBidGroupByPayload<T extends BidGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BidGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BidGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BidGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BidGroupByOutputType[P]>;
}>>;
export type BidWhereInput = {
    AND?: Prisma.BidWhereInput | Prisma.BidWhereInput[];
    OR?: Prisma.BidWhereInput[];
    NOT?: Prisma.BidWhereInput | Prisma.BidWhereInput[];
    id?: Prisma.StringFilter<"Bid"> | string;
    jobId?: Prisma.StringFilter<"Bid"> | string;
    providerId?: Prisma.StringFilter<"Bid"> | string;
    offeredPrice?: Prisma.DecimalFilter<"Bid"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    message?: Prisma.StringNullableFilter<"Bid"> | string | null;
    status?: Prisma.EnumBidStatusFilter<"Bid"> | $Enums.BidStatus;
    createdAt?: Prisma.DateTimeFilter<"Bid"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Bid"> | Date | string;
    job?: Prisma.XOR<Prisma.JobScalarRelationFilter, Prisma.JobWhereInput>;
    provider?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type BidOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    offeredPrice?: Prisma.SortOrder;
    message?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    job?: Prisma.JobOrderByWithRelationInput;
    provider?: Prisma.UserOrderByWithRelationInput;
};
export type BidWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.BidWhereInput | Prisma.BidWhereInput[];
    OR?: Prisma.BidWhereInput[];
    NOT?: Prisma.BidWhereInput | Prisma.BidWhereInput[];
    jobId?: Prisma.StringFilter<"Bid"> | string;
    providerId?: Prisma.StringFilter<"Bid"> | string;
    offeredPrice?: Prisma.DecimalFilter<"Bid"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    message?: Prisma.StringNullableFilter<"Bid"> | string | null;
    status?: Prisma.EnumBidStatusFilter<"Bid"> | $Enums.BidStatus;
    createdAt?: Prisma.DateTimeFilter<"Bid"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Bid"> | Date | string;
    job?: Prisma.XOR<Prisma.JobScalarRelationFilter, Prisma.JobWhereInput>;
    provider?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type BidOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    offeredPrice?: Prisma.SortOrder;
    message?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.BidCountOrderByAggregateInput;
    _avg?: Prisma.BidAvgOrderByAggregateInput;
    _max?: Prisma.BidMaxOrderByAggregateInput;
    _min?: Prisma.BidMinOrderByAggregateInput;
    _sum?: Prisma.BidSumOrderByAggregateInput;
};
export type BidScalarWhereWithAggregatesInput = {
    AND?: Prisma.BidScalarWhereWithAggregatesInput | Prisma.BidScalarWhereWithAggregatesInput[];
    OR?: Prisma.BidScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BidScalarWhereWithAggregatesInput | Prisma.BidScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Bid"> | string;
    jobId?: Prisma.StringWithAggregatesFilter<"Bid"> | string;
    providerId?: Prisma.StringWithAggregatesFilter<"Bid"> | string;
    offeredPrice?: Prisma.DecimalWithAggregatesFilter<"Bid"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    message?: Prisma.StringNullableWithAggregatesFilter<"Bid"> | string | null;
    status?: Prisma.EnumBidStatusWithAggregatesFilter<"Bid"> | $Enums.BidStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Bid"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Bid"> | Date | string;
};
export type BidCreateInput = {
    id?: string;
    offeredPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    message?: string | null;
    status?: $Enums.BidStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    job: Prisma.JobCreateNestedOneWithoutBidsInput;
    provider: Prisma.UserCreateNestedOneWithoutProviderBidsInput;
};
export type BidUncheckedCreateInput = {
    id?: string;
    jobId: string;
    providerId: string;
    offeredPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    message?: string | null;
    status?: $Enums.BidStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BidUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    offeredPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumBidStatusFieldUpdateOperationsInput | $Enums.BidStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneRequiredWithoutBidsNestedInput;
    provider?: Prisma.UserUpdateOneRequiredWithoutProviderBidsNestedInput;
};
export type BidUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    offeredPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumBidStatusFieldUpdateOperationsInput | $Enums.BidStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BidCreateManyInput = {
    id?: string;
    jobId: string;
    providerId: string;
    offeredPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    message?: string | null;
    status?: $Enums.BidStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BidUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    offeredPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumBidStatusFieldUpdateOperationsInput | $Enums.BidStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BidUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    offeredPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumBidStatusFieldUpdateOperationsInput | $Enums.BidStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BidListRelationFilter = {
    every?: Prisma.BidWhereInput;
    some?: Prisma.BidWhereInput;
    none?: Prisma.BidWhereInput;
};
export type BidOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type BidCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    offeredPrice?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BidAvgOrderByAggregateInput = {
    offeredPrice?: Prisma.SortOrder;
};
export type BidMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    offeredPrice?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BidMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    offeredPrice?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BidSumOrderByAggregateInput = {
    offeredPrice?: Prisma.SortOrder;
};
export type BidCreateNestedManyWithoutProviderInput = {
    create?: Prisma.XOR<Prisma.BidCreateWithoutProviderInput, Prisma.BidUncheckedCreateWithoutProviderInput> | Prisma.BidCreateWithoutProviderInput[] | Prisma.BidUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.BidCreateOrConnectWithoutProviderInput | Prisma.BidCreateOrConnectWithoutProviderInput[];
    createMany?: Prisma.BidCreateManyProviderInputEnvelope;
    connect?: Prisma.BidWhereUniqueInput | Prisma.BidWhereUniqueInput[];
};
export type BidUncheckedCreateNestedManyWithoutProviderInput = {
    create?: Prisma.XOR<Prisma.BidCreateWithoutProviderInput, Prisma.BidUncheckedCreateWithoutProviderInput> | Prisma.BidCreateWithoutProviderInput[] | Prisma.BidUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.BidCreateOrConnectWithoutProviderInput | Prisma.BidCreateOrConnectWithoutProviderInput[];
    createMany?: Prisma.BidCreateManyProviderInputEnvelope;
    connect?: Prisma.BidWhereUniqueInput | Prisma.BidWhereUniqueInput[];
};
export type BidUpdateManyWithoutProviderNestedInput = {
    create?: Prisma.XOR<Prisma.BidCreateWithoutProviderInput, Prisma.BidUncheckedCreateWithoutProviderInput> | Prisma.BidCreateWithoutProviderInput[] | Prisma.BidUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.BidCreateOrConnectWithoutProviderInput | Prisma.BidCreateOrConnectWithoutProviderInput[];
    upsert?: Prisma.BidUpsertWithWhereUniqueWithoutProviderInput | Prisma.BidUpsertWithWhereUniqueWithoutProviderInput[];
    createMany?: Prisma.BidCreateManyProviderInputEnvelope;
    set?: Prisma.BidWhereUniqueInput | Prisma.BidWhereUniqueInput[];
    disconnect?: Prisma.BidWhereUniqueInput | Prisma.BidWhereUniqueInput[];
    delete?: Prisma.BidWhereUniqueInput | Prisma.BidWhereUniqueInput[];
    connect?: Prisma.BidWhereUniqueInput | Prisma.BidWhereUniqueInput[];
    update?: Prisma.BidUpdateWithWhereUniqueWithoutProviderInput | Prisma.BidUpdateWithWhereUniqueWithoutProviderInput[];
    updateMany?: Prisma.BidUpdateManyWithWhereWithoutProviderInput | Prisma.BidUpdateManyWithWhereWithoutProviderInput[];
    deleteMany?: Prisma.BidScalarWhereInput | Prisma.BidScalarWhereInput[];
};
export type BidUncheckedUpdateManyWithoutProviderNestedInput = {
    create?: Prisma.XOR<Prisma.BidCreateWithoutProviderInput, Prisma.BidUncheckedCreateWithoutProviderInput> | Prisma.BidCreateWithoutProviderInput[] | Prisma.BidUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.BidCreateOrConnectWithoutProviderInput | Prisma.BidCreateOrConnectWithoutProviderInput[];
    upsert?: Prisma.BidUpsertWithWhereUniqueWithoutProviderInput | Prisma.BidUpsertWithWhereUniqueWithoutProviderInput[];
    createMany?: Prisma.BidCreateManyProviderInputEnvelope;
    set?: Prisma.BidWhereUniqueInput | Prisma.BidWhereUniqueInput[];
    disconnect?: Prisma.BidWhereUniqueInput | Prisma.BidWhereUniqueInput[];
    delete?: Prisma.BidWhereUniqueInput | Prisma.BidWhereUniqueInput[];
    connect?: Prisma.BidWhereUniqueInput | Prisma.BidWhereUniqueInput[];
    update?: Prisma.BidUpdateWithWhereUniqueWithoutProviderInput | Prisma.BidUpdateWithWhereUniqueWithoutProviderInput[];
    updateMany?: Prisma.BidUpdateManyWithWhereWithoutProviderInput | Prisma.BidUpdateManyWithWhereWithoutProviderInput[];
    deleteMany?: Prisma.BidScalarWhereInput | Prisma.BidScalarWhereInput[];
};
export type BidCreateNestedManyWithoutJobInput = {
    create?: Prisma.XOR<Prisma.BidCreateWithoutJobInput, Prisma.BidUncheckedCreateWithoutJobInput> | Prisma.BidCreateWithoutJobInput[] | Prisma.BidUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.BidCreateOrConnectWithoutJobInput | Prisma.BidCreateOrConnectWithoutJobInput[];
    createMany?: Prisma.BidCreateManyJobInputEnvelope;
    connect?: Prisma.BidWhereUniqueInput | Prisma.BidWhereUniqueInput[];
};
export type BidUncheckedCreateNestedManyWithoutJobInput = {
    create?: Prisma.XOR<Prisma.BidCreateWithoutJobInput, Prisma.BidUncheckedCreateWithoutJobInput> | Prisma.BidCreateWithoutJobInput[] | Prisma.BidUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.BidCreateOrConnectWithoutJobInput | Prisma.BidCreateOrConnectWithoutJobInput[];
    createMany?: Prisma.BidCreateManyJobInputEnvelope;
    connect?: Prisma.BidWhereUniqueInput | Prisma.BidWhereUniqueInput[];
};
export type BidUpdateManyWithoutJobNestedInput = {
    create?: Prisma.XOR<Prisma.BidCreateWithoutJobInput, Prisma.BidUncheckedCreateWithoutJobInput> | Prisma.BidCreateWithoutJobInput[] | Prisma.BidUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.BidCreateOrConnectWithoutJobInput | Prisma.BidCreateOrConnectWithoutJobInput[];
    upsert?: Prisma.BidUpsertWithWhereUniqueWithoutJobInput | Prisma.BidUpsertWithWhereUniqueWithoutJobInput[];
    createMany?: Prisma.BidCreateManyJobInputEnvelope;
    set?: Prisma.BidWhereUniqueInput | Prisma.BidWhereUniqueInput[];
    disconnect?: Prisma.BidWhereUniqueInput | Prisma.BidWhereUniqueInput[];
    delete?: Prisma.BidWhereUniqueInput | Prisma.BidWhereUniqueInput[];
    connect?: Prisma.BidWhereUniqueInput | Prisma.BidWhereUniqueInput[];
    update?: Prisma.BidUpdateWithWhereUniqueWithoutJobInput | Prisma.BidUpdateWithWhereUniqueWithoutJobInput[];
    updateMany?: Prisma.BidUpdateManyWithWhereWithoutJobInput | Prisma.BidUpdateManyWithWhereWithoutJobInput[];
    deleteMany?: Prisma.BidScalarWhereInput | Prisma.BidScalarWhereInput[];
};
export type BidUncheckedUpdateManyWithoutJobNestedInput = {
    create?: Prisma.XOR<Prisma.BidCreateWithoutJobInput, Prisma.BidUncheckedCreateWithoutJobInput> | Prisma.BidCreateWithoutJobInput[] | Prisma.BidUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.BidCreateOrConnectWithoutJobInput | Prisma.BidCreateOrConnectWithoutJobInput[];
    upsert?: Prisma.BidUpsertWithWhereUniqueWithoutJobInput | Prisma.BidUpsertWithWhereUniqueWithoutJobInput[];
    createMany?: Prisma.BidCreateManyJobInputEnvelope;
    set?: Prisma.BidWhereUniqueInput | Prisma.BidWhereUniqueInput[];
    disconnect?: Prisma.BidWhereUniqueInput | Prisma.BidWhereUniqueInput[];
    delete?: Prisma.BidWhereUniqueInput | Prisma.BidWhereUniqueInput[];
    connect?: Prisma.BidWhereUniqueInput | Prisma.BidWhereUniqueInput[];
    update?: Prisma.BidUpdateWithWhereUniqueWithoutJobInput | Prisma.BidUpdateWithWhereUniqueWithoutJobInput[];
    updateMany?: Prisma.BidUpdateManyWithWhereWithoutJobInput | Prisma.BidUpdateManyWithWhereWithoutJobInput[];
    deleteMany?: Prisma.BidScalarWhereInput | Prisma.BidScalarWhereInput[];
};
export type EnumBidStatusFieldUpdateOperationsInput = {
    set?: $Enums.BidStatus;
};
export type BidCreateWithoutProviderInput = {
    id?: string;
    offeredPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    message?: string | null;
    status?: $Enums.BidStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    job: Prisma.JobCreateNestedOneWithoutBidsInput;
};
export type BidUncheckedCreateWithoutProviderInput = {
    id?: string;
    jobId: string;
    offeredPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    message?: string | null;
    status?: $Enums.BidStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BidCreateOrConnectWithoutProviderInput = {
    where: Prisma.BidWhereUniqueInput;
    create: Prisma.XOR<Prisma.BidCreateWithoutProviderInput, Prisma.BidUncheckedCreateWithoutProviderInput>;
};
export type BidCreateManyProviderInputEnvelope = {
    data: Prisma.BidCreateManyProviderInput | Prisma.BidCreateManyProviderInput[];
    skipDuplicates?: boolean;
};
export type BidUpsertWithWhereUniqueWithoutProviderInput = {
    where: Prisma.BidWhereUniqueInput;
    update: Prisma.XOR<Prisma.BidUpdateWithoutProviderInput, Prisma.BidUncheckedUpdateWithoutProviderInput>;
    create: Prisma.XOR<Prisma.BidCreateWithoutProviderInput, Prisma.BidUncheckedCreateWithoutProviderInput>;
};
export type BidUpdateWithWhereUniqueWithoutProviderInput = {
    where: Prisma.BidWhereUniqueInput;
    data: Prisma.XOR<Prisma.BidUpdateWithoutProviderInput, Prisma.BidUncheckedUpdateWithoutProviderInput>;
};
export type BidUpdateManyWithWhereWithoutProviderInput = {
    where: Prisma.BidScalarWhereInput;
    data: Prisma.XOR<Prisma.BidUpdateManyMutationInput, Prisma.BidUncheckedUpdateManyWithoutProviderInput>;
};
export type BidScalarWhereInput = {
    AND?: Prisma.BidScalarWhereInput | Prisma.BidScalarWhereInput[];
    OR?: Prisma.BidScalarWhereInput[];
    NOT?: Prisma.BidScalarWhereInput | Prisma.BidScalarWhereInput[];
    id?: Prisma.StringFilter<"Bid"> | string;
    jobId?: Prisma.StringFilter<"Bid"> | string;
    providerId?: Prisma.StringFilter<"Bid"> | string;
    offeredPrice?: Prisma.DecimalFilter<"Bid"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    message?: Prisma.StringNullableFilter<"Bid"> | string | null;
    status?: Prisma.EnumBidStatusFilter<"Bid"> | $Enums.BidStatus;
    createdAt?: Prisma.DateTimeFilter<"Bid"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Bid"> | Date | string;
};
export type BidCreateWithoutJobInput = {
    id?: string;
    offeredPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    message?: string | null;
    status?: $Enums.BidStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    provider: Prisma.UserCreateNestedOneWithoutProviderBidsInput;
};
export type BidUncheckedCreateWithoutJobInput = {
    id?: string;
    providerId: string;
    offeredPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    message?: string | null;
    status?: $Enums.BidStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BidCreateOrConnectWithoutJobInput = {
    where: Prisma.BidWhereUniqueInput;
    create: Prisma.XOR<Prisma.BidCreateWithoutJobInput, Prisma.BidUncheckedCreateWithoutJobInput>;
};
export type BidCreateManyJobInputEnvelope = {
    data: Prisma.BidCreateManyJobInput | Prisma.BidCreateManyJobInput[];
    skipDuplicates?: boolean;
};
export type BidUpsertWithWhereUniqueWithoutJobInput = {
    where: Prisma.BidWhereUniqueInput;
    update: Prisma.XOR<Prisma.BidUpdateWithoutJobInput, Prisma.BidUncheckedUpdateWithoutJobInput>;
    create: Prisma.XOR<Prisma.BidCreateWithoutJobInput, Prisma.BidUncheckedCreateWithoutJobInput>;
};
export type BidUpdateWithWhereUniqueWithoutJobInput = {
    where: Prisma.BidWhereUniqueInput;
    data: Prisma.XOR<Prisma.BidUpdateWithoutJobInput, Prisma.BidUncheckedUpdateWithoutJobInput>;
};
export type BidUpdateManyWithWhereWithoutJobInput = {
    where: Prisma.BidScalarWhereInput;
    data: Prisma.XOR<Prisma.BidUpdateManyMutationInput, Prisma.BidUncheckedUpdateManyWithoutJobInput>;
};
export type BidCreateManyProviderInput = {
    id?: string;
    jobId: string;
    offeredPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    message?: string | null;
    status?: $Enums.BidStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BidUpdateWithoutProviderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    offeredPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumBidStatusFieldUpdateOperationsInput | $Enums.BidStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneRequiredWithoutBidsNestedInput;
};
export type BidUncheckedUpdateWithoutProviderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.StringFieldUpdateOperationsInput | string;
    offeredPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumBidStatusFieldUpdateOperationsInput | $Enums.BidStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BidUncheckedUpdateManyWithoutProviderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.StringFieldUpdateOperationsInput | string;
    offeredPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumBidStatusFieldUpdateOperationsInput | $Enums.BidStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BidCreateManyJobInput = {
    id?: string;
    providerId: string;
    offeredPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    message?: string | null;
    status?: $Enums.BidStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BidUpdateWithoutJobInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    offeredPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumBidStatusFieldUpdateOperationsInput | $Enums.BidStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    provider?: Prisma.UserUpdateOneRequiredWithoutProviderBidsNestedInput;
};
export type BidUncheckedUpdateWithoutJobInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    offeredPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumBidStatusFieldUpdateOperationsInput | $Enums.BidStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BidUncheckedUpdateManyWithoutJobInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    offeredPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumBidStatusFieldUpdateOperationsInput | $Enums.BidStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BidSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    jobId?: boolean;
    providerId?: boolean;
    offeredPrice?: boolean;
    message?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["bid"]>;
export type BidSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    jobId?: boolean;
    providerId?: boolean;
    offeredPrice?: boolean;
    message?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["bid"]>;
export type BidSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    jobId?: boolean;
    providerId?: boolean;
    offeredPrice?: boolean;
    message?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["bid"]>;
export type BidSelectScalar = {
    id?: boolean;
    jobId?: boolean;
    providerId?: boolean;
    offeredPrice?: boolean;
    message?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type BidOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "jobId" | "providerId" | "offeredPrice" | "message" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["bid"]>;
export type BidInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type BidIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type BidIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $BidPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Bid";
    objects: {
        job: Prisma.$JobPayload<ExtArgs>;
        provider: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        jobId: string;
        providerId: string;
        offeredPrice: runtime.Decimal;
        message: string | null;
        status: $Enums.BidStatus;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["bid"]>;
    composites: {};
};
export type BidGetPayload<S extends boolean | null | undefined | BidDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BidPayload, S>;
export type BidCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BidFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BidCountAggregateInputType | true;
};
export interface BidDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Bid'];
        meta: {
            name: 'Bid';
        };
    };
    findUnique<T extends BidFindUniqueArgs>(args: Prisma.SelectSubset<T, BidFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BidClient<runtime.Types.Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BidFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BidFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BidClient<runtime.Types.Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BidFindFirstArgs>(args?: Prisma.SelectSubset<T, BidFindFirstArgs<ExtArgs>>): Prisma.Prisma__BidClient<runtime.Types.Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BidFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BidFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BidClient<runtime.Types.Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BidFindManyArgs>(args?: Prisma.SelectSubset<T, BidFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BidCreateArgs>(args: Prisma.SelectSubset<T, BidCreateArgs<ExtArgs>>): Prisma.Prisma__BidClient<runtime.Types.Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BidCreateManyArgs>(args?: Prisma.SelectSubset<T, BidCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BidCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BidCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BidDeleteArgs>(args: Prisma.SelectSubset<T, BidDeleteArgs<ExtArgs>>): Prisma.Prisma__BidClient<runtime.Types.Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BidUpdateArgs>(args: Prisma.SelectSubset<T, BidUpdateArgs<ExtArgs>>): Prisma.Prisma__BidClient<runtime.Types.Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BidDeleteManyArgs>(args?: Prisma.SelectSubset<T, BidDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BidUpdateManyArgs>(args: Prisma.SelectSubset<T, BidUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BidUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BidUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BidUpsertArgs>(args: Prisma.SelectSubset<T, BidUpsertArgs<ExtArgs>>): Prisma.Prisma__BidClient<runtime.Types.Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BidCountArgs>(args?: Prisma.Subset<T, BidCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BidCountAggregateOutputType> : number>;
    aggregate<T extends BidAggregateArgs>(args: Prisma.Subset<T, BidAggregateArgs>): Prisma.PrismaPromise<GetBidAggregateType<T>>;
    groupBy<T extends BidGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BidGroupByArgs['orderBy'];
    } : {
        orderBy?: BidGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BidGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBidGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BidFieldRefs;
}
export interface Prisma__BidClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    job<T extends Prisma.JobDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.JobDefaultArgs<ExtArgs>>): Prisma.Prisma__JobClient<runtime.Types.Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    provider<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BidFieldRefs {
    readonly id: Prisma.FieldRef<"Bid", 'String'>;
    readonly jobId: Prisma.FieldRef<"Bid", 'String'>;
    readonly providerId: Prisma.FieldRef<"Bid", 'String'>;
    readonly offeredPrice: Prisma.FieldRef<"Bid", 'Decimal'>;
    readonly message: Prisma.FieldRef<"Bid", 'String'>;
    readonly status: Prisma.FieldRef<"Bid", 'BidStatus'>;
    readonly createdAt: Prisma.FieldRef<"Bid", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Bid", 'DateTime'>;
}
export type BidFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BidSelect<ExtArgs> | null;
    omit?: Prisma.BidOmit<ExtArgs> | null;
    include?: Prisma.BidInclude<ExtArgs> | null;
    where: Prisma.BidWhereUniqueInput;
};
export type BidFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BidSelect<ExtArgs> | null;
    omit?: Prisma.BidOmit<ExtArgs> | null;
    include?: Prisma.BidInclude<ExtArgs> | null;
    where: Prisma.BidWhereUniqueInput;
};
export type BidFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BidSelect<ExtArgs> | null;
    omit?: Prisma.BidOmit<ExtArgs> | null;
    include?: Prisma.BidInclude<ExtArgs> | null;
    where?: Prisma.BidWhereInput;
    orderBy?: Prisma.BidOrderByWithRelationInput | Prisma.BidOrderByWithRelationInput[];
    cursor?: Prisma.BidWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BidScalarFieldEnum | Prisma.BidScalarFieldEnum[];
};
export type BidFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BidSelect<ExtArgs> | null;
    omit?: Prisma.BidOmit<ExtArgs> | null;
    include?: Prisma.BidInclude<ExtArgs> | null;
    where?: Prisma.BidWhereInput;
    orderBy?: Prisma.BidOrderByWithRelationInput | Prisma.BidOrderByWithRelationInput[];
    cursor?: Prisma.BidWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BidScalarFieldEnum | Prisma.BidScalarFieldEnum[];
};
export type BidFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BidSelect<ExtArgs> | null;
    omit?: Prisma.BidOmit<ExtArgs> | null;
    include?: Prisma.BidInclude<ExtArgs> | null;
    where?: Prisma.BidWhereInput;
    orderBy?: Prisma.BidOrderByWithRelationInput | Prisma.BidOrderByWithRelationInput[];
    cursor?: Prisma.BidWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BidScalarFieldEnum | Prisma.BidScalarFieldEnum[];
};
export type BidCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BidSelect<ExtArgs> | null;
    omit?: Prisma.BidOmit<ExtArgs> | null;
    include?: Prisma.BidInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BidCreateInput, Prisma.BidUncheckedCreateInput>;
};
export type BidCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BidCreateManyInput | Prisma.BidCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BidCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BidSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BidOmit<ExtArgs> | null;
    data: Prisma.BidCreateManyInput | Prisma.BidCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.BidIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type BidUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BidSelect<ExtArgs> | null;
    omit?: Prisma.BidOmit<ExtArgs> | null;
    include?: Prisma.BidInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BidUpdateInput, Prisma.BidUncheckedUpdateInput>;
    where: Prisma.BidWhereUniqueInput;
};
export type BidUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BidUpdateManyMutationInput, Prisma.BidUncheckedUpdateManyInput>;
    where?: Prisma.BidWhereInput;
    limit?: number;
};
export type BidUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BidSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BidOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BidUpdateManyMutationInput, Prisma.BidUncheckedUpdateManyInput>;
    where?: Prisma.BidWhereInput;
    limit?: number;
    include?: Prisma.BidIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type BidUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BidSelect<ExtArgs> | null;
    omit?: Prisma.BidOmit<ExtArgs> | null;
    include?: Prisma.BidInclude<ExtArgs> | null;
    where: Prisma.BidWhereUniqueInput;
    create: Prisma.XOR<Prisma.BidCreateInput, Prisma.BidUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BidUpdateInput, Prisma.BidUncheckedUpdateInput>;
};
export type BidDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BidSelect<ExtArgs> | null;
    omit?: Prisma.BidOmit<ExtArgs> | null;
    include?: Prisma.BidInclude<ExtArgs> | null;
    where: Prisma.BidWhereUniqueInput;
};
export type BidDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BidWhereInput;
    limit?: number;
};
export type BidDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BidSelect<ExtArgs> | null;
    omit?: Prisma.BidOmit<ExtArgs> | null;
    include?: Prisma.BidInclude<ExtArgs> | null;
};
export {};
