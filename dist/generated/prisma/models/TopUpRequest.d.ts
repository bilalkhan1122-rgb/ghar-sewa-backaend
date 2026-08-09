import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type TopUpRequestModel = runtime.Types.Result.DefaultSelection<Prisma.$TopUpRequestPayload>;
export type AggregateTopUpRequest = {
    _count: TopUpRequestCountAggregateOutputType | null;
    _avg: TopUpRequestAvgAggregateOutputType | null;
    _sum: TopUpRequestSumAggregateOutputType | null;
    _min: TopUpRequestMinAggregateOutputType | null;
    _max: TopUpRequestMaxAggregateOutputType | null;
};
export type TopUpRequestAvgAggregateOutputType = {
    amount: runtime.Decimal | null;
};
export type TopUpRequestSumAggregateOutputType = {
    amount: runtime.Decimal | null;
};
export type TopUpRequestMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    walletId: string | null;
    amount: runtime.Decimal | null;
    paymentMethod: $Enums.PaymentMethod | null;
    transactionReference: string | null;
    proofImage: string | null;
    notes: string | null;
    status: $Enums.TopUpStatus | null;
    submittedAt: Date | null;
    reviewedAt: Date | null;
    reviewedBy: string | null;
    rejectionReason: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type TopUpRequestMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    walletId: string | null;
    amount: runtime.Decimal | null;
    paymentMethod: $Enums.PaymentMethod | null;
    transactionReference: string | null;
    proofImage: string | null;
    notes: string | null;
    status: $Enums.TopUpStatus | null;
    submittedAt: Date | null;
    reviewedAt: Date | null;
    reviewedBy: string | null;
    rejectionReason: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type TopUpRequestCountAggregateOutputType = {
    id: number;
    userId: number;
    walletId: number;
    amount: number;
    paymentMethod: number;
    transactionReference: number;
    proofImage: number;
    notes: number;
    status: number;
    submittedAt: number;
    reviewedAt: number;
    reviewedBy: number;
    rejectionReason: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type TopUpRequestAvgAggregateInputType = {
    amount?: true;
};
export type TopUpRequestSumAggregateInputType = {
    amount?: true;
};
export type TopUpRequestMinAggregateInputType = {
    id?: true;
    userId?: true;
    walletId?: true;
    amount?: true;
    paymentMethod?: true;
    transactionReference?: true;
    proofImage?: true;
    notes?: true;
    status?: true;
    submittedAt?: true;
    reviewedAt?: true;
    reviewedBy?: true;
    rejectionReason?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type TopUpRequestMaxAggregateInputType = {
    id?: true;
    userId?: true;
    walletId?: true;
    amount?: true;
    paymentMethod?: true;
    transactionReference?: true;
    proofImage?: true;
    notes?: true;
    status?: true;
    submittedAt?: true;
    reviewedAt?: true;
    reviewedBy?: true;
    rejectionReason?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type TopUpRequestCountAggregateInputType = {
    id?: true;
    userId?: true;
    walletId?: true;
    amount?: true;
    paymentMethod?: true;
    transactionReference?: true;
    proofImage?: true;
    notes?: true;
    status?: true;
    submittedAt?: true;
    reviewedAt?: true;
    reviewedBy?: true;
    rejectionReason?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type TopUpRequestAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TopUpRequestWhereInput;
    orderBy?: Prisma.TopUpRequestOrderByWithRelationInput | Prisma.TopUpRequestOrderByWithRelationInput[];
    cursor?: Prisma.TopUpRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TopUpRequestCountAggregateInputType;
    _avg?: TopUpRequestAvgAggregateInputType;
    _sum?: TopUpRequestSumAggregateInputType;
    _min?: TopUpRequestMinAggregateInputType;
    _max?: TopUpRequestMaxAggregateInputType;
};
export type GetTopUpRequestAggregateType<T extends TopUpRequestAggregateArgs> = {
    [P in keyof T & keyof AggregateTopUpRequest]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTopUpRequest[P]> : Prisma.GetScalarType<T[P], AggregateTopUpRequest[P]>;
};
export type TopUpRequestGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TopUpRequestWhereInput;
    orderBy?: Prisma.TopUpRequestOrderByWithAggregationInput | Prisma.TopUpRequestOrderByWithAggregationInput[];
    by: Prisma.TopUpRequestScalarFieldEnum[] | Prisma.TopUpRequestScalarFieldEnum;
    having?: Prisma.TopUpRequestScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TopUpRequestCountAggregateInputType | true;
    _avg?: TopUpRequestAvgAggregateInputType;
    _sum?: TopUpRequestSumAggregateInputType;
    _min?: TopUpRequestMinAggregateInputType;
    _max?: TopUpRequestMaxAggregateInputType;
};
export type TopUpRequestGroupByOutputType = {
    id: string;
    userId: string;
    walletId: string;
    amount: runtime.Decimal;
    paymentMethod: $Enums.PaymentMethod;
    transactionReference: string | null;
    proofImage: string | null;
    notes: string | null;
    status: $Enums.TopUpStatus;
    submittedAt: Date;
    reviewedAt: Date | null;
    reviewedBy: string | null;
    rejectionReason: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: TopUpRequestCountAggregateOutputType | null;
    _avg: TopUpRequestAvgAggregateOutputType | null;
    _sum: TopUpRequestSumAggregateOutputType | null;
    _min: TopUpRequestMinAggregateOutputType | null;
    _max: TopUpRequestMaxAggregateOutputType | null;
};
type GetTopUpRequestGroupByPayload<T extends TopUpRequestGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TopUpRequestGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TopUpRequestGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TopUpRequestGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TopUpRequestGroupByOutputType[P]>;
}>>;
export type TopUpRequestWhereInput = {
    AND?: Prisma.TopUpRequestWhereInput | Prisma.TopUpRequestWhereInput[];
    OR?: Prisma.TopUpRequestWhereInput[];
    NOT?: Prisma.TopUpRequestWhereInput | Prisma.TopUpRequestWhereInput[];
    id?: Prisma.StringFilter<"TopUpRequest"> | string;
    userId?: Prisma.StringFilter<"TopUpRequest"> | string;
    walletId?: Prisma.StringFilter<"TopUpRequest"> | string;
    amount?: Prisma.DecimalFilter<"TopUpRequest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod?: Prisma.EnumPaymentMethodFilter<"TopUpRequest"> | $Enums.PaymentMethod;
    transactionReference?: Prisma.StringNullableFilter<"TopUpRequest"> | string | null;
    proofImage?: Prisma.StringNullableFilter<"TopUpRequest"> | string | null;
    notes?: Prisma.StringNullableFilter<"TopUpRequest"> | string | null;
    status?: Prisma.EnumTopUpStatusFilter<"TopUpRequest"> | $Enums.TopUpStatus;
    submittedAt?: Prisma.DateTimeFilter<"TopUpRequest"> | Date | string;
    reviewedAt?: Prisma.DateTimeNullableFilter<"TopUpRequest"> | Date | string | null;
    reviewedBy?: Prisma.StringNullableFilter<"TopUpRequest"> | string | null;
    rejectionReason?: Prisma.StringNullableFilter<"TopUpRequest"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"TopUpRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"TopUpRequest"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    wallet?: Prisma.XOR<Prisma.WalletScalarRelationFilter, Prisma.WalletWhereInput>;
};
export type TopUpRequestOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    paymentMethod?: Prisma.SortOrder;
    transactionReference?: Prisma.SortOrderInput | Prisma.SortOrder;
    proofImage?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    wallet?: Prisma.WalletOrderByWithRelationInput;
};
export type TopUpRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.TopUpRequestWhereInput | Prisma.TopUpRequestWhereInput[];
    OR?: Prisma.TopUpRequestWhereInput[];
    NOT?: Prisma.TopUpRequestWhereInput | Prisma.TopUpRequestWhereInput[];
    userId?: Prisma.StringFilter<"TopUpRequest"> | string;
    walletId?: Prisma.StringFilter<"TopUpRequest"> | string;
    amount?: Prisma.DecimalFilter<"TopUpRequest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod?: Prisma.EnumPaymentMethodFilter<"TopUpRequest"> | $Enums.PaymentMethod;
    transactionReference?: Prisma.StringNullableFilter<"TopUpRequest"> | string | null;
    proofImage?: Prisma.StringNullableFilter<"TopUpRequest"> | string | null;
    notes?: Prisma.StringNullableFilter<"TopUpRequest"> | string | null;
    status?: Prisma.EnumTopUpStatusFilter<"TopUpRequest"> | $Enums.TopUpStatus;
    submittedAt?: Prisma.DateTimeFilter<"TopUpRequest"> | Date | string;
    reviewedAt?: Prisma.DateTimeNullableFilter<"TopUpRequest"> | Date | string | null;
    reviewedBy?: Prisma.StringNullableFilter<"TopUpRequest"> | string | null;
    rejectionReason?: Prisma.StringNullableFilter<"TopUpRequest"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"TopUpRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"TopUpRequest"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    wallet?: Prisma.XOR<Prisma.WalletScalarRelationFilter, Prisma.WalletWhereInput>;
}, "id">;
export type TopUpRequestOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    paymentMethod?: Prisma.SortOrder;
    transactionReference?: Prisma.SortOrderInput | Prisma.SortOrder;
    proofImage?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.TopUpRequestCountOrderByAggregateInput;
    _avg?: Prisma.TopUpRequestAvgOrderByAggregateInput;
    _max?: Prisma.TopUpRequestMaxOrderByAggregateInput;
    _min?: Prisma.TopUpRequestMinOrderByAggregateInput;
    _sum?: Prisma.TopUpRequestSumOrderByAggregateInput;
};
export type TopUpRequestScalarWhereWithAggregatesInput = {
    AND?: Prisma.TopUpRequestScalarWhereWithAggregatesInput | Prisma.TopUpRequestScalarWhereWithAggregatesInput[];
    OR?: Prisma.TopUpRequestScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TopUpRequestScalarWhereWithAggregatesInput | Prisma.TopUpRequestScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"TopUpRequest"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"TopUpRequest"> | string;
    walletId?: Prisma.StringWithAggregatesFilter<"TopUpRequest"> | string;
    amount?: Prisma.DecimalWithAggregatesFilter<"TopUpRequest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod?: Prisma.EnumPaymentMethodWithAggregatesFilter<"TopUpRequest"> | $Enums.PaymentMethod;
    transactionReference?: Prisma.StringNullableWithAggregatesFilter<"TopUpRequest"> | string | null;
    proofImage?: Prisma.StringNullableWithAggregatesFilter<"TopUpRequest"> | string | null;
    notes?: Prisma.StringNullableWithAggregatesFilter<"TopUpRequest"> | string | null;
    status?: Prisma.EnumTopUpStatusWithAggregatesFilter<"TopUpRequest"> | $Enums.TopUpStatus;
    submittedAt?: Prisma.DateTimeWithAggregatesFilter<"TopUpRequest"> | Date | string;
    reviewedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"TopUpRequest"> | Date | string | null;
    reviewedBy?: Prisma.StringNullableWithAggregatesFilter<"TopUpRequest"> | string | null;
    rejectionReason?: Prisma.StringNullableWithAggregatesFilter<"TopUpRequest"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"TopUpRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"TopUpRequest"> | Date | string;
};
export type TopUpRequestCreateInput = {
    id?: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod: $Enums.PaymentMethod;
    transactionReference?: string | null;
    proofImage?: string | null;
    notes?: string | null;
    status?: $Enums.TopUpStatus;
    submittedAt?: Date | string;
    reviewedAt?: Date | string | null;
    reviewedBy?: string | null;
    rejectionReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutTopUpRequestsInput;
    wallet: Prisma.WalletCreateNestedOneWithoutTopUpsInput;
};
export type TopUpRequestUncheckedCreateInput = {
    id?: string;
    userId: string;
    walletId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod: $Enums.PaymentMethod;
    transactionReference?: string | null;
    proofImage?: string | null;
    notes?: string | null;
    status?: $Enums.TopUpStatus;
    submittedAt?: Date | string;
    reviewedAt?: Date | string | null;
    reviewedBy?: string | null;
    rejectionReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TopUpRequestUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    transactionReference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proofImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumTopUpStatusFieldUpdateOperationsInput | $Enums.TopUpStatus;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutTopUpRequestsNestedInput;
    wallet?: Prisma.WalletUpdateOneRequiredWithoutTopUpsNestedInput;
};
export type TopUpRequestUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    walletId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    transactionReference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proofImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumTopUpStatusFieldUpdateOperationsInput | $Enums.TopUpStatus;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TopUpRequestCreateManyInput = {
    id?: string;
    userId: string;
    walletId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod: $Enums.PaymentMethod;
    transactionReference?: string | null;
    proofImage?: string | null;
    notes?: string | null;
    status?: $Enums.TopUpStatus;
    submittedAt?: Date | string;
    reviewedAt?: Date | string | null;
    reviewedBy?: string | null;
    rejectionReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TopUpRequestUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    transactionReference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proofImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumTopUpStatusFieldUpdateOperationsInput | $Enums.TopUpStatus;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TopUpRequestUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    walletId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    transactionReference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proofImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumTopUpStatusFieldUpdateOperationsInput | $Enums.TopUpStatus;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TopUpRequestListRelationFilter = {
    every?: Prisma.TopUpRequestWhereInput;
    some?: Prisma.TopUpRequestWhereInput;
    none?: Prisma.TopUpRequestWhereInput;
};
export type TopUpRequestOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TopUpRequestCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    paymentMethod?: Prisma.SortOrder;
    transactionReference?: Prisma.SortOrder;
    proofImage?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    reviewedBy?: Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TopUpRequestAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type TopUpRequestMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    paymentMethod?: Prisma.SortOrder;
    transactionReference?: Prisma.SortOrder;
    proofImage?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    reviewedBy?: Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TopUpRequestMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    paymentMethod?: Prisma.SortOrder;
    transactionReference?: Prisma.SortOrder;
    proofImage?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    reviewedBy?: Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TopUpRequestSumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type TopUpRequestCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.TopUpRequestCreateWithoutUserInput, Prisma.TopUpRequestUncheckedCreateWithoutUserInput> | Prisma.TopUpRequestCreateWithoutUserInput[] | Prisma.TopUpRequestUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TopUpRequestCreateOrConnectWithoutUserInput | Prisma.TopUpRequestCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.TopUpRequestCreateManyUserInputEnvelope;
    connect?: Prisma.TopUpRequestWhereUniqueInput | Prisma.TopUpRequestWhereUniqueInput[];
};
export type TopUpRequestUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.TopUpRequestCreateWithoutUserInput, Prisma.TopUpRequestUncheckedCreateWithoutUserInput> | Prisma.TopUpRequestCreateWithoutUserInput[] | Prisma.TopUpRequestUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TopUpRequestCreateOrConnectWithoutUserInput | Prisma.TopUpRequestCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.TopUpRequestCreateManyUserInputEnvelope;
    connect?: Prisma.TopUpRequestWhereUniqueInput | Prisma.TopUpRequestWhereUniqueInput[];
};
export type TopUpRequestUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.TopUpRequestCreateWithoutUserInput, Prisma.TopUpRequestUncheckedCreateWithoutUserInput> | Prisma.TopUpRequestCreateWithoutUserInput[] | Prisma.TopUpRequestUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TopUpRequestCreateOrConnectWithoutUserInput | Prisma.TopUpRequestCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.TopUpRequestUpsertWithWhereUniqueWithoutUserInput | Prisma.TopUpRequestUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.TopUpRequestCreateManyUserInputEnvelope;
    set?: Prisma.TopUpRequestWhereUniqueInput | Prisma.TopUpRequestWhereUniqueInput[];
    disconnect?: Prisma.TopUpRequestWhereUniqueInput | Prisma.TopUpRequestWhereUniqueInput[];
    delete?: Prisma.TopUpRequestWhereUniqueInput | Prisma.TopUpRequestWhereUniqueInput[];
    connect?: Prisma.TopUpRequestWhereUniqueInput | Prisma.TopUpRequestWhereUniqueInput[];
    update?: Prisma.TopUpRequestUpdateWithWhereUniqueWithoutUserInput | Prisma.TopUpRequestUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.TopUpRequestUpdateManyWithWhereWithoutUserInput | Prisma.TopUpRequestUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.TopUpRequestScalarWhereInput | Prisma.TopUpRequestScalarWhereInput[];
};
export type TopUpRequestUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.TopUpRequestCreateWithoutUserInput, Prisma.TopUpRequestUncheckedCreateWithoutUserInput> | Prisma.TopUpRequestCreateWithoutUserInput[] | Prisma.TopUpRequestUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TopUpRequestCreateOrConnectWithoutUserInput | Prisma.TopUpRequestCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.TopUpRequestUpsertWithWhereUniqueWithoutUserInput | Prisma.TopUpRequestUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.TopUpRequestCreateManyUserInputEnvelope;
    set?: Prisma.TopUpRequestWhereUniqueInput | Prisma.TopUpRequestWhereUniqueInput[];
    disconnect?: Prisma.TopUpRequestWhereUniqueInput | Prisma.TopUpRequestWhereUniqueInput[];
    delete?: Prisma.TopUpRequestWhereUniqueInput | Prisma.TopUpRequestWhereUniqueInput[];
    connect?: Prisma.TopUpRequestWhereUniqueInput | Prisma.TopUpRequestWhereUniqueInput[];
    update?: Prisma.TopUpRequestUpdateWithWhereUniqueWithoutUserInput | Prisma.TopUpRequestUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.TopUpRequestUpdateManyWithWhereWithoutUserInput | Prisma.TopUpRequestUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.TopUpRequestScalarWhereInput | Prisma.TopUpRequestScalarWhereInput[];
};
export type TopUpRequestCreateNestedManyWithoutWalletInput = {
    create?: Prisma.XOR<Prisma.TopUpRequestCreateWithoutWalletInput, Prisma.TopUpRequestUncheckedCreateWithoutWalletInput> | Prisma.TopUpRequestCreateWithoutWalletInput[] | Prisma.TopUpRequestUncheckedCreateWithoutWalletInput[];
    connectOrCreate?: Prisma.TopUpRequestCreateOrConnectWithoutWalletInput | Prisma.TopUpRequestCreateOrConnectWithoutWalletInput[];
    createMany?: Prisma.TopUpRequestCreateManyWalletInputEnvelope;
    connect?: Prisma.TopUpRequestWhereUniqueInput | Prisma.TopUpRequestWhereUniqueInput[];
};
export type TopUpRequestUncheckedCreateNestedManyWithoutWalletInput = {
    create?: Prisma.XOR<Prisma.TopUpRequestCreateWithoutWalletInput, Prisma.TopUpRequestUncheckedCreateWithoutWalletInput> | Prisma.TopUpRequestCreateWithoutWalletInput[] | Prisma.TopUpRequestUncheckedCreateWithoutWalletInput[];
    connectOrCreate?: Prisma.TopUpRequestCreateOrConnectWithoutWalletInput | Prisma.TopUpRequestCreateOrConnectWithoutWalletInput[];
    createMany?: Prisma.TopUpRequestCreateManyWalletInputEnvelope;
    connect?: Prisma.TopUpRequestWhereUniqueInput | Prisma.TopUpRequestWhereUniqueInput[];
};
export type TopUpRequestUpdateManyWithoutWalletNestedInput = {
    create?: Prisma.XOR<Prisma.TopUpRequestCreateWithoutWalletInput, Prisma.TopUpRequestUncheckedCreateWithoutWalletInput> | Prisma.TopUpRequestCreateWithoutWalletInput[] | Prisma.TopUpRequestUncheckedCreateWithoutWalletInput[];
    connectOrCreate?: Prisma.TopUpRequestCreateOrConnectWithoutWalletInput | Prisma.TopUpRequestCreateOrConnectWithoutWalletInput[];
    upsert?: Prisma.TopUpRequestUpsertWithWhereUniqueWithoutWalletInput | Prisma.TopUpRequestUpsertWithWhereUniqueWithoutWalletInput[];
    createMany?: Prisma.TopUpRequestCreateManyWalletInputEnvelope;
    set?: Prisma.TopUpRequestWhereUniqueInput | Prisma.TopUpRequestWhereUniqueInput[];
    disconnect?: Prisma.TopUpRequestWhereUniqueInput | Prisma.TopUpRequestWhereUniqueInput[];
    delete?: Prisma.TopUpRequestWhereUniqueInput | Prisma.TopUpRequestWhereUniqueInput[];
    connect?: Prisma.TopUpRequestWhereUniqueInput | Prisma.TopUpRequestWhereUniqueInput[];
    update?: Prisma.TopUpRequestUpdateWithWhereUniqueWithoutWalletInput | Prisma.TopUpRequestUpdateWithWhereUniqueWithoutWalletInput[];
    updateMany?: Prisma.TopUpRequestUpdateManyWithWhereWithoutWalletInput | Prisma.TopUpRequestUpdateManyWithWhereWithoutWalletInput[];
    deleteMany?: Prisma.TopUpRequestScalarWhereInput | Prisma.TopUpRequestScalarWhereInput[];
};
export type TopUpRequestUncheckedUpdateManyWithoutWalletNestedInput = {
    create?: Prisma.XOR<Prisma.TopUpRequestCreateWithoutWalletInput, Prisma.TopUpRequestUncheckedCreateWithoutWalletInput> | Prisma.TopUpRequestCreateWithoutWalletInput[] | Prisma.TopUpRequestUncheckedCreateWithoutWalletInput[];
    connectOrCreate?: Prisma.TopUpRequestCreateOrConnectWithoutWalletInput | Prisma.TopUpRequestCreateOrConnectWithoutWalletInput[];
    upsert?: Prisma.TopUpRequestUpsertWithWhereUniqueWithoutWalletInput | Prisma.TopUpRequestUpsertWithWhereUniqueWithoutWalletInput[];
    createMany?: Prisma.TopUpRequestCreateManyWalletInputEnvelope;
    set?: Prisma.TopUpRequestWhereUniqueInput | Prisma.TopUpRequestWhereUniqueInput[];
    disconnect?: Prisma.TopUpRequestWhereUniqueInput | Prisma.TopUpRequestWhereUniqueInput[];
    delete?: Prisma.TopUpRequestWhereUniqueInput | Prisma.TopUpRequestWhereUniqueInput[];
    connect?: Prisma.TopUpRequestWhereUniqueInput | Prisma.TopUpRequestWhereUniqueInput[];
    update?: Prisma.TopUpRequestUpdateWithWhereUniqueWithoutWalletInput | Prisma.TopUpRequestUpdateWithWhereUniqueWithoutWalletInput[];
    updateMany?: Prisma.TopUpRequestUpdateManyWithWhereWithoutWalletInput | Prisma.TopUpRequestUpdateManyWithWhereWithoutWalletInput[];
    deleteMany?: Prisma.TopUpRequestScalarWhereInput | Prisma.TopUpRequestScalarWhereInput[];
};
export type EnumPaymentMethodFieldUpdateOperationsInput = {
    set?: $Enums.PaymentMethod;
};
export type EnumTopUpStatusFieldUpdateOperationsInput = {
    set?: $Enums.TopUpStatus;
};
export type TopUpRequestCreateWithoutUserInput = {
    id?: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod: $Enums.PaymentMethod;
    transactionReference?: string | null;
    proofImage?: string | null;
    notes?: string | null;
    status?: $Enums.TopUpStatus;
    submittedAt?: Date | string;
    reviewedAt?: Date | string | null;
    reviewedBy?: string | null;
    rejectionReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    wallet: Prisma.WalletCreateNestedOneWithoutTopUpsInput;
};
export type TopUpRequestUncheckedCreateWithoutUserInput = {
    id?: string;
    walletId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod: $Enums.PaymentMethod;
    transactionReference?: string | null;
    proofImage?: string | null;
    notes?: string | null;
    status?: $Enums.TopUpStatus;
    submittedAt?: Date | string;
    reviewedAt?: Date | string | null;
    reviewedBy?: string | null;
    rejectionReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TopUpRequestCreateOrConnectWithoutUserInput = {
    where: Prisma.TopUpRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.TopUpRequestCreateWithoutUserInput, Prisma.TopUpRequestUncheckedCreateWithoutUserInput>;
};
export type TopUpRequestCreateManyUserInputEnvelope = {
    data: Prisma.TopUpRequestCreateManyUserInput | Prisma.TopUpRequestCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type TopUpRequestUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.TopUpRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.TopUpRequestUpdateWithoutUserInput, Prisma.TopUpRequestUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.TopUpRequestCreateWithoutUserInput, Prisma.TopUpRequestUncheckedCreateWithoutUserInput>;
};
export type TopUpRequestUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.TopUpRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.TopUpRequestUpdateWithoutUserInput, Prisma.TopUpRequestUncheckedUpdateWithoutUserInput>;
};
export type TopUpRequestUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.TopUpRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.TopUpRequestUpdateManyMutationInput, Prisma.TopUpRequestUncheckedUpdateManyWithoutUserInput>;
};
export type TopUpRequestScalarWhereInput = {
    AND?: Prisma.TopUpRequestScalarWhereInput | Prisma.TopUpRequestScalarWhereInput[];
    OR?: Prisma.TopUpRequestScalarWhereInput[];
    NOT?: Prisma.TopUpRequestScalarWhereInput | Prisma.TopUpRequestScalarWhereInput[];
    id?: Prisma.StringFilter<"TopUpRequest"> | string;
    userId?: Prisma.StringFilter<"TopUpRequest"> | string;
    walletId?: Prisma.StringFilter<"TopUpRequest"> | string;
    amount?: Prisma.DecimalFilter<"TopUpRequest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod?: Prisma.EnumPaymentMethodFilter<"TopUpRequest"> | $Enums.PaymentMethod;
    transactionReference?: Prisma.StringNullableFilter<"TopUpRequest"> | string | null;
    proofImage?: Prisma.StringNullableFilter<"TopUpRequest"> | string | null;
    notes?: Prisma.StringNullableFilter<"TopUpRequest"> | string | null;
    status?: Prisma.EnumTopUpStatusFilter<"TopUpRequest"> | $Enums.TopUpStatus;
    submittedAt?: Prisma.DateTimeFilter<"TopUpRequest"> | Date | string;
    reviewedAt?: Prisma.DateTimeNullableFilter<"TopUpRequest"> | Date | string | null;
    reviewedBy?: Prisma.StringNullableFilter<"TopUpRequest"> | string | null;
    rejectionReason?: Prisma.StringNullableFilter<"TopUpRequest"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"TopUpRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"TopUpRequest"> | Date | string;
};
export type TopUpRequestCreateWithoutWalletInput = {
    id?: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod: $Enums.PaymentMethod;
    transactionReference?: string | null;
    proofImage?: string | null;
    notes?: string | null;
    status?: $Enums.TopUpStatus;
    submittedAt?: Date | string;
    reviewedAt?: Date | string | null;
    reviewedBy?: string | null;
    rejectionReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutTopUpRequestsInput;
};
export type TopUpRequestUncheckedCreateWithoutWalletInput = {
    id?: string;
    userId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod: $Enums.PaymentMethod;
    transactionReference?: string | null;
    proofImage?: string | null;
    notes?: string | null;
    status?: $Enums.TopUpStatus;
    submittedAt?: Date | string;
    reviewedAt?: Date | string | null;
    reviewedBy?: string | null;
    rejectionReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TopUpRequestCreateOrConnectWithoutWalletInput = {
    where: Prisma.TopUpRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.TopUpRequestCreateWithoutWalletInput, Prisma.TopUpRequestUncheckedCreateWithoutWalletInput>;
};
export type TopUpRequestCreateManyWalletInputEnvelope = {
    data: Prisma.TopUpRequestCreateManyWalletInput | Prisma.TopUpRequestCreateManyWalletInput[];
    skipDuplicates?: boolean;
};
export type TopUpRequestUpsertWithWhereUniqueWithoutWalletInput = {
    where: Prisma.TopUpRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.TopUpRequestUpdateWithoutWalletInput, Prisma.TopUpRequestUncheckedUpdateWithoutWalletInput>;
    create: Prisma.XOR<Prisma.TopUpRequestCreateWithoutWalletInput, Prisma.TopUpRequestUncheckedCreateWithoutWalletInput>;
};
export type TopUpRequestUpdateWithWhereUniqueWithoutWalletInput = {
    where: Prisma.TopUpRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.TopUpRequestUpdateWithoutWalletInput, Prisma.TopUpRequestUncheckedUpdateWithoutWalletInput>;
};
export type TopUpRequestUpdateManyWithWhereWithoutWalletInput = {
    where: Prisma.TopUpRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.TopUpRequestUpdateManyMutationInput, Prisma.TopUpRequestUncheckedUpdateManyWithoutWalletInput>;
};
export type TopUpRequestCreateManyUserInput = {
    id?: string;
    walletId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod: $Enums.PaymentMethod;
    transactionReference?: string | null;
    proofImage?: string | null;
    notes?: string | null;
    status?: $Enums.TopUpStatus;
    submittedAt?: Date | string;
    reviewedAt?: Date | string | null;
    reviewedBy?: string | null;
    rejectionReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TopUpRequestUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    transactionReference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proofImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumTopUpStatusFieldUpdateOperationsInput | $Enums.TopUpStatus;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    wallet?: Prisma.WalletUpdateOneRequiredWithoutTopUpsNestedInput;
};
export type TopUpRequestUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    walletId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    transactionReference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proofImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumTopUpStatusFieldUpdateOperationsInput | $Enums.TopUpStatus;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TopUpRequestUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    walletId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    transactionReference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proofImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumTopUpStatusFieldUpdateOperationsInput | $Enums.TopUpStatus;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TopUpRequestCreateManyWalletInput = {
    id?: string;
    userId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod: $Enums.PaymentMethod;
    transactionReference?: string | null;
    proofImage?: string | null;
    notes?: string | null;
    status?: $Enums.TopUpStatus;
    submittedAt?: Date | string;
    reviewedAt?: Date | string | null;
    reviewedBy?: string | null;
    rejectionReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TopUpRequestUpdateWithoutWalletInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    transactionReference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proofImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumTopUpStatusFieldUpdateOperationsInput | $Enums.TopUpStatus;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutTopUpRequestsNestedInput;
};
export type TopUpRequestUncheckedUpdateWithoutWalletInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    transactionReference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proofImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumTopUpStatusFieldUpdateOperationsInput | $Enums.TopUpStatus;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TopUpRequestUncheckedUpdateManyWithoutWalletInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    transactionReference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proofImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumTopUpStatusFieldUpdateOperationsInput | $Enums.TopUpStatus;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TopUpRequestSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    walletId?: boolean;
    amount?: boolean;
    paymentMethod?: boolean;
    transactionReference?: boolean;
    proofImage?: boolean;
    notes?: boolean;
    status?: boolean;
    submittedAt?: boolean;
    reviewedAt?: boolean;
    reviewedBy?: boolean;
    rejectionReason?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["topUpRequest"]>;
export type TopUpRequestSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    walletId?: boolean;
    amount?: boolean;
    paymentMethod?: boolean;
    transactionReference?: boolean;
    proofImage?: boolean;
    notes?: boolean;
    status?: boolean;
    submittedAt?: boolean;
    reviewedAt?: boolean;
    reviewedBy?: boolean;
    rejectionReason?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["topUpRequest"]>;
export type TopUpRequestSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    walletId?: boolean;
    amount?: boolean;
    paymentMethod?: boolean;
    transactionReference?: boolean;
    proofImage?: boolean;
    notes?: boolean;
    status?: boolean;
    submittedAt?: boolean;
    reviewedAt?: boolean;
    reviewedBy?: boolean;
    rejectionReason?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["topUpRequest"]>;
export type TopUpRequestSelectScalar = {
    id?: boolean;
    userId?: boolean;
    walletId?: boolean;
    amount?: boolean;
    paymentMethod?: boolean;
    transactionReference?: boolean;
    proofImage?: boolean;
    notes?: boolean;
    status?: boolean;
    submittedAt?: boolean;
    reviewedAt?: boolean;
    reviewedBy?: boolean;
    rejectionReason?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type TopUpRequestOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "walletId" | "amount" | "paymentMethod" | "transactionReference" | "proofImage" | "notes" | "status" | "submittedAt" | "reviewedAt" | "reviewedBy" | "rejectionReason" | "createdAt" | "updatedAt", ExtArgs["result"]["topUpRequest"]>;
export type TopUpRequestInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
};
export type TopUpRequestIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
};
export type TopUpRequestIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
};
export type $TopUpRequestPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "TopUpRequest";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        wallet: Prisma.$WalletPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        walletId: string;
        amount: runtime.Decimal;
        paymentMethod: $Enums.PaymentMethod;
        transactionReference: string | null;
        proofImage: string | null;
        notes: string | null;
        status: $Enums.TopUpStatus;
        submittedAt: Date;
        reviewedAt: Date | null;
        reviewedBy: string | null;
        rejectionReason: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["topUpRequest"]>;
    composites: {};
};
export type TopUpRequestGetPayload<S extends boolean | null | undefined | TopUpRequestDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TopUpRequestPayload, S>;
export type TopUpRequestCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TopUpRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TopUpRequestCountAggregateInputType | true;
};
export interface TopUpRequestDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['TopUpRequest'];
        meta: {
            name: 'TopUpRequest';
        };
    };
    findUnique<T extends TopUpRequestFindUniqueArgs>(args: Prisma.SelectSubset<T, TopUpRequestFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TopUpRequestClient<runtime.Types.Result.GetResult<Prisma.$TopUpRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TopUpRequestFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TopUpRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TopUpRequestClient<runtime.Types.Result.GetResult<Prisma.$TopUpRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TopUpRequestFindFirstArgs>(args?: Prisma.SelectSubset<T, TopUpRequestFindFirstArgs<ExtArgs>>): Prisma.Prisma__TopUpRequestClient<runtime.Types.Result.GetResult<Prisma.$TopUpRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TopUpRequestFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TopUpRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TopUpRequestClient<runtime.Types.Result.GetResult<Prisma.$TopUpRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TopUpRequestFindManyArgs>(args?: Prisma.SelectSubset<T, TopUpRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TopUpRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TopUpRequestCreateArgs>(args: Prisma.SelectSubset<T, TopUpRequestCreateArgs<ExtArgs>>): Prisma.Prisma__TopUpRequestClient<runtime.Types.Result.GetResult<Prisma.$TopUpRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TopUpRequestCreateManyArgs>(args?: Prisma.SelectSubset<T, TopUpRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TopUpRequestCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TopUpRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TopUpRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TopUpRequestDeleteArgs>(args: Prisma.SelectSubset<T, TopUpRequestDeleteArgs<ExtArgs>>): Prisma.Prisma__TopUpRequestClient<runtime.Types.Result.GetResult<Prisma.$TopUpRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TopUpRequestUpdateArgs>(args: Prisma.SelectSubset<T, TopUpRequestUpdateArgs<ExtArgs>>): Prisma.Prisma__TopUpRequestClient<runtime.Types.Result.GetResult<Prisma.$TopUpRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TopUpRequestDeleteManyArgs>(args?: Prisma.SelectSubset<T, TopUpRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TopUpRequestUpdateManyArgs>(args: Prisma.SelectSubset<T, TopUpRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TopUpRequestUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TopUpRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TopUpRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TopUpRequestUpsertArgs>(args: Prisma.SelectSubset<T, TopUpRequestUpsertArgs<ExtArgs>>): Prisma.Prisma__TopUpRequestClient<runtime.Types.Result.GetResult<Prisma.$TopUpRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TopUpRequestCountArgs>(args?: Prisma.Subset<T, TopUpRequestCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TopUpRequestCountAggregateOutputType> : number>;
    aggregate<T extends TopUpRequestAggregateArgs>(args: Prisma.Subset<T, TopUpRequestAggregateArgs>): Prisma.PrismaPromise<GetTopUpRequestAggregateType<T>>;
    groupBy<T extends TopUpRequestGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TopUpRequestGroupByArgs['orderBy'];
    } : {
        orderBy?: TopUpRequestGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TopUpRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTopUpRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TopUpRequestFieldRefs;
}
export interface Prisma__TopUpRequestClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    wallet<T extends Prisma.WalletDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WalletDefaultArgs<ExtArgs>>): Prisma.Prisma__WalletClient<runtime.Types.Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TopUpRequestFieldRefs {
    readonly id: Prisma.FieldRef<"TopUpRequest", 'String'>;
    readonly userId: Prisma.FieldRef<"TopUpRequest", 'String'>;
    readonly walletId: Prisma.FieldRef<"TopUpRequest", 'String'>;
    readonly amount: Prisma.FieldRef<"TopUpRequest", 'Decimal'>;
    readonly paymentMethod: Prisma.FieldRef<"TopUpRequest", 'PaymentMethod'>;
    readonly transactionReference: Prisma.FieldRef<"TopUpRequest", 'String'>;
    readonly proofImage: Prisma.FieldRef<"TopUpRequest", 'String'>;
    readonly notes: Prisma.FieldRef<"TopUpRequest", 'String'>;
    readonly status: Prisma.FieldRef<"TopUpRequest", 'TopUpStatus'>;
    readonly submittedAt: Prisma.FieldRef<"TopUpRequest", 'DateTime'>;
    readonly reviewedAt: Prisma.FieldRef<"TopUpRequest", 'DateTime'>;
    readonly reviewedBy: Prisma.FieldRef<"TopUpRequest", 'String'>;
    readonly rejectionReason: Prisma.FieldRef<"TopUpRequest", 'String'>;
    readonly createdAt: Prisma.FieldRef<"TopUpRequest", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"TopUpRequest", 'DateTime'>;
}
export type TopUpRequestFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TopUpRequestSelect<ExtArgs> | null;
    omit?: Prisma.TopUpRequestOmit<ExtArgs> | null;
    include?: Prisma.TopUpRequestInclude<ExtArgs> | null;
    where: Prisma.TopUpRequestWhereUniqueInput;
};
export type TopUpRequestFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TopUpRequestSelect<ExtArgs> | null;
    omit?: Prisma.TopUpRequestOmit<ExtArgs> | null;
    include?: Prisma.TopUpRequestInclude<ExtArgs> | null;
    where: Prisma.TopUpRequestWhereUniqueInput;
};
export type TopUpRequestFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TopUpRequestSelect<ExtArgs> | null;
    omit?: Prisma.TopUpRequestOmit<ExtArgs> | null;
    include?: Prisma.TopUpRequestInclude<ExtArgs> | null;
    where?: Prisma.TopUpRequestWhereInput;
    orderBy?: Prisma.TopUpRequestOrderByWithRelationInput | Prisma.TopUpRequestOrderByWithRelationInput[];
    cursor?: Prisma.TopUpRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TopUpRequestScalarFieldEnum | Prisma.TopUpRequestScalarFieldEnum[];
};
export type TopUpRequestFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TopUpRequestSelect<ExtArgs> | null;
    omit?: Prisma.TopUpRequestOmit<ExtArgs> | null;
    include?: Prisma.TopUpRequestInclude<ExtArgs> | null;
    where?: Prisma.TopUpRequestWhereInput;
    orderBy?: Prisma.TopUpRequestOrderByWithRelationInput | Prisma.TopUpRequestOrderByWithRelationInput[];
    cursor?: Prisma.TopUpRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TopUpRequestScalarFieldEnum | Prisma.TopUpRequestScalarFieldEnum[];
};
export type TopUpRequestFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TopUpRequestSelect<ExtArgs> | null;
    omit?: Prisma.TopUpRequestOmit<ExtArgs> | null;
    include?: Prisma.TopUpRequestInclude<ExtArgs> | null;
    where?: Prisma.TopUpRequestWhereInput;
    orderBy?: Prisma.TopUpRequestOrderByWithRelationInput | Prisma.TopUpRequestOrderByWithRelationInput[];
    cursor?: Prisma.TopUpRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TopUpRequestScalarFieldEnum | Prisma.TopUpRequestScalarFieldEnum[];
};
export type TopUpRequestCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TopUpRequestSelect<ExtArgs> | null;
    omit?: Prisma.TopUpRequestOmit<ExtArgs> | null;
    include?: Prisma.TopUpRequestInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TopUpRequestCreateInput, Prisma.TopUpRequestUncheckedCreateInput>;
};
export type TopUpRequestCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TopUpRequestCreateManyInput | Prisma.TopUpRequestCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TopUpRequestCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TopUpRequestSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TopUpRequestOmit<ExtArgs> | null;
    data: Prisma.TopUpRequestCreateManyInput | Prisma.TopUpRequestCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.TopUpRequestIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type TopUpRequestUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TopUpRequestSelect<ExtArgs> | null;
    omit?: Prisma.TopUpRequestOmit<ExtArgs> | null;
    include?: Prisma.TopUpRequestInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TopUpRequestUpdateInput, Prisma.TopUpRequestUncheckedUpdateInput>;
    where: Prisma.TopUpRequestWhereUniqueInput;
};
export type TopUpRequestUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TopUpRequestUpdateManyMutationInput, Prisma.TopUpRequestUncheckedUpdateManyInput>;
    where?: Prisma.TopUpRequestWhereInput;
    limit?: number;
};
export type TopUpRequestUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TopUpRequestSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TopUpRequestOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TopUpRequestUpdateManyMutationInput, Prisma.TopUpRequestUncheckedUpdateManyInput>;
    where?: Prisma.TopUpRequestWhereInput;
    limit?: number;
    include?: Prisma.TopUpRequestIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type TopUpRequestUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TopUpRequestSelect<ExtArgs> | null;
    omit?: Prisma.TopUpRequestOmit<ExtArgs> | null;
    include?: Prisma.TopUpRequestInclude<ExtArgs> | null;
    where: Prisma.TopUpRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.TopUpRequestCreateInput, Prisma.TopUpRequestUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TopUpRequestUpdateInput, Prisma.TopUpRequestUncheckedUpdateInput>;
};
export type TopUpRequestDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TopUpRequestSelect<ExtArgs> | null;
    omit?: Prisma.TopUpRequestOmit<ExtArgs> | null;
    include?: Prisma.TopUpRequestInclude<ExtArgs> | null;
    where: Prisma.TopUpRequestWhereUniqueInput;
};
export type TopUpRequestDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TopUpRequestWhereInput;
    limit?: number;
};
export type TopUpRequestDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TopUpRequestSelect<ExtArgs> | null;
    omit?: Prisma.TopUpRequestOmit<ExtArgs> | null;
    include?: Prisma.TopUpRequestInclude<ExtArgs> | null;
};
export {};
