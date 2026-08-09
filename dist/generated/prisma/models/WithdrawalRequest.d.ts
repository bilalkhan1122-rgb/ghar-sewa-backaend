import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type WithdrawalRequestModel = runtime.Types.Result.DefaultSelection<Prisma.$WithdrawalRequestPayload>;
export type AggregateWithdrawalRequest = {
    _count: WithdrawalRequestCountAggregateOutputType | null;
    _avg: WithdrawalRequestAvgAggregateOutputType | null;
    _sum: WithdrawalRequestSumAggregateOutputType | null;
    _min: WithdrawalRequestMinAggregateOutputType | null;
    _max: WithdrawalRequestMaxAggregateOutputType | null;
};
export type WithdrawalRequestAvgAggregateOutputType = {
    amount: runtime.Decimal | null;
};
export type WithdrawalRequestSumAggregateOutputType = {
    amount: runtime.Decimal | null;
};
export type WithdrawalRequestMinAggregateOutputType = {
    id: string | null;
    providerId: string | null;
    walletId: string | null;
    amount: runtime.Decimal | null;
    paymentMethod: $Enums.PaymentMethod | null;
    accountName: string | null;
    accountNumber: string | null;
    bankName: string | null;
    status: $Enums.WithdrawalStatus | null;
    submittedAt: Date | null;
    processedAt: Date | null;
    processedBy: string | null;
    notes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type WithdrawalRequestMaxAggregateOutputType = {
    id: string | null;
    providerId: string | null;
    walletId: string | null;
    amount: runtime.Decimal | null;
    paymentMethod: $Enums.PaymentMethod | null;
    accountName: string | null;
    accountNumber: string | null;
    bankName: string | null;
    status: $Enums.WithdrawalStatus | null;
    submittedAt: Date | null;
    processedAt: Date | null;
    processedBy: string | null;
    notes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type WithdrawalRequestCountAggregateOutputType = {
    id: number;
    providerId: number;
    walletId: number;
    amount: number;
    paymentMethod: number;
    accountName: number;
    accountNumber: number;
    bankName: number;
    status: number;
    submittedAt: number;
    processedAt: number;
    processedBy: number;
    notes: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type WithdrawalRequestAvgAggregateInputType = {
    amount?: true;
};
export type WithdrawalRequestSumAggregateInputType = {
    amount?: true;
};
export type WithdrawalRequestMinAggregateInputType = {
    id?: true;
    providerId?: true;
    walletId?: true;
    amount?: true;
    paymentMethod?: true;
    accountName?: true;
    accountNumber?: true;
    bankName?: true;
    status?: true;
    submittedAt?: true;
    processedAt?: true;
    processedBy?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type WithdrawalRequestMaxAggregateInputType = {
    id?: true;
    providerId?: true;
    walletId?: true;
    amount?: true;
    paymentMethod?: true;
    accountName?: true;
    accountNumber?: true;
    bankName?: true;
    status?: true;
    submittedAt?: true;
    processedAt?: true;
    processedBy?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type WithdrawalRequestCountAggregateInputType = {
    id?: true;
    providerId?: true;
    walletId?: true;
    amount?: true;
    paymentMethod?: true;
    accountName?: true;
    accountNumber?: true;
    bankName?: true;
    status?: true;
    submittedAt?: true;
    processedAt?: true;
    processedBy?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type WithdrawalRequestAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WithdrawalRequestWhereInput;
    orderBy?: Prisma.WithdrawalRequestOrderByWithRelationInput | Prisma.WithdrawalRequestOrderByWithRelationInput[];
    cursor?: Prisma.WithdrawalRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | WithdrawalRequestCountAggregateInputType;
    _avg?: WithdrawalRequestAvgAggregateInputType;
    _sum?: WithdrawalRequestSumAggregateInputType;
    _min?: WithdrawalRequestMinAggregateInputType;
    _max?: WithdrawalRequestMaxAggregateInputType;
};
export type GetWithdrawalRequestAggregateType<T extends WithdrawalRequestAggregateArgs> = {
    [P in keyof T & keyof AggregateWithdrawalRequest]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateWithdrawalRequest[P]> : Prisma.GetScalarType<T[P], AggregateWithdrawalRequest[P]>;
};
export type WithdrawalRequestGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WithdrawalRequestWhereInput;
    orderBy?: Prisma.WithdrawalRequestOrderByWithAggregationInput | Prisma.WithdrawalRequestOrderByWithAggregationInput[];
    by: Prisma.WithdrawalRequestScalarFieldEnum[] | Prisma.WithdrawalRequestScalarFieldEnum;
    having?: Prisma.WithdrawalRequestScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WithdrawalRequestCountAggregateInputType | true;
    _avg?: WithdrawalRequestAvgAggregateInputType;
    _sum?: WithdrawalRequestSumAggregateInputType;
    _min?: WithdrawalRequestMinAggregateInputType;
    _max?: WithdrawalRequestMaxAggregateInputType;
};
export type WithdrawalRequestGroupByOutputType = {
    id: string;
    providerId: string;
    walletId: string;
    amount: runtime.Decimal;
    paymentMethod: $Enums.PaymentMethod;
    accountName: string;
    accountNumber: string;
    bankName: string | null;
    status: $Enums.WithdrawalStatus;
    submittedAt: Date;
    processedAt: Date | null;
    processedBy: string | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: WithdrawalRequestCountAggregateOutputType | null;
    _avg: WithdrawalRequestAvgAggregateOutputType | null;
    _sum: WithdrawalRequestSumAggregateOutputType | null;
    _min: WithdrawalRequestMinAggregateOutputType | null;
    _max: WithdrawalRequestMaxAggregateOutputType | null;
};
type GetWithdrawalRequestGroupByPayload<T extends WithdrawalRequestGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<WithdrawalRequestGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof WithdrawalRequestGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], WithdrawalRequestGroupByOutputType[P]> : Prisma.GetScalarType<T[P], WithdrawalRequestGroupByOutputType[P]>;
}>>;
export type WithdrawalRequestWhereInput = {
    AND?: Prisma.WithdrawalRequestWhereInput | Prisma.WithdrawalRequestWhereInput[];
    OR?: Prisma.WithdrawalRequestWhereInput[];
    NOT?: Prisma.WithdrawalRequestWhereInput | Prisma.WithdrawalRequestWhereInput[];
    id?: Prisma.StringFilter<"WithdrawalRequest"> | string;
    providerId?: Prisma.StringFilter<"WithdrawalRequest"> | string;
    walletId?: Prisma.StringFilter<"WithdrawalRequest"> | string;
    amount?: Prisma.DecimalFilter<"WithdrawalRequest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod?: Prisma.EnumPaymentMethodFilter<"WithdrawalRequest"> | $Enums.PaymentMethod;
    accountName?: Prisma.StringFilter<"WithdrawalRequest"> | string;
    accountNumber?: Prisma.StringFilter<"WithdrawalRequest"> | string;
    bankName?: Prisma.StringNullableFilter<"WithdrawalRequest"> | string | null;
    status?: Prisma.EnumWithdrawalStatusFilter<"WithdrawalRequest"> | $Enums.WithdrawalStatus;
    submittedAt?: Prisma.DateTimeFilter<"WithdrawalRequest"> | Date | string;
    processedAt?: Prisma.DateTimeNullableFilter<"WithdrawalRequest"> | Date | string | null;
    processedBy?: Prisma.StringNullableFilter<"WithdrawalRequest"> | string | null;
    notes?: Prisma.StringNullableFilter<"WithdrawalRequest"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"WithdrawalRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WithdrawalRequest"> | Date | string;
    provider?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    wallet?: Prisma.XOR<Prisma.WalletScalarRelationFilter, Prisma.WalletWhereInput>;
};
export type WithdrawalRequestOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    paymentMethod?: Prisma.SortOrder;
    accountName?: Prisma.SortOrder;
    accountNumber?: Prisma.SortOrder;
    bankName?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    processedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    processedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    provider?: Prisma.UserOrderByWithRelationInput;
    wallet?: Prisma.WalletOrderByWithRelationInput;
};
export type WithdrawalRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.WithdrawalRequestWhereInput | Prisma.WithdrawalRequestWhereInput[];
    OR?: Prisma.WithdrawalRequestWhereInput[];
    NOT?: Prisma.WithdrawalRequestWhereInput | Prisma.WithdrawalRequestWhereInput[];
    providerId?: Prisma.StringFilter<"WithdrawalRequest"> | string;
    walletId?: Prisma.StringFilter<"WithdrawalRequest"> | string;
    amount?: Prisma.DecimalFilter<"WithdrawalRequest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod?: Prisma.EnumPaymentMethodFilter<"WithdrawalRequest"> | $Enums.PaymentMethod;
    accountName?: Prisma.StringFilter<"WithdrawalRequest"> | string;
    accountNumber?: Prisma.StringFilter<"WithdrawalRequest"> | string;
    bankName?: Prisma.StringNullableFilter<"WithdrawalRequest"> | string | null;
    status?: Prisma.EnumWithdrawalStatusFilter<"WithdrawalRequest"> | $Enums.WithdrawalStatus;
    submittedAt?: Prisma.DateTimeFilter<"WithdrawalRequest"> | Date | string;
    processedAt?: Prisma.DateTimeNullableFilter<"WithdrawalRequest"> | Date | string | null;
    processedBy?: Prisma.StringNullableFilter<"WithdrawalRequest"> | string | null;
    notes?: Prisma.StringNullableFilter<"WithdrawalRequest"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"WithdrawalRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WithdrawalRequest"> | Date | string;
    provider?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    wallet?: Prisma.XOR<Prisma.WalletScalarRelationFilter, Prisma.WalletWhereInput>;
}, "id">;
export type WithdrawalRequestOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    paymentMethod?: Prisma.SortOrder;
    accountName?: Prisma.SortOrder;
    accountNumber?: Prisma.SortOrder;
    bankName?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    processedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    processedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.WithdrawalRequestCountOrderByAggregateInput;
    _avg?: Prisma.WithdrawalRequestAvgOrderByAggregateInput;
    _max?: Prisma.WithdrawalRequestMaxOrderByAggregateInput;
    _min?: Prisma.WithdrawalRequestMinOrderByAggregateInput;
    _sum?: Prisma.WithdrawalRequestSumOrderByAggregateInput;
};
export type WithdrawalRequestScalarWhereWithAggregatesInput = {
    AND?: Prisma.WithdrawalRequestScalarWhereWithAggregatesInput | Prisma.WithdrawalRequestScalarWhereWithAggregatesInput[];
    OR?: Prisma.WithdrawalRequestScalarWhereWithAggregatesInput[];
    NOT?: Prisma.WithdrawalRequestScalarWhereWithAggregatesInput | Prisma.WithdrawalRequestScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"WithdrawalRequest"> | string;
    providerId?: Prisma.StringWithAggregatesFilter<"WithdrawalRequest"> | string;
    walletId?: Prisma.StringWithAggregatesFilter<"WithdrawalRequest"> | string;
    amount?: Prisma.DecimalWithAggregatesFilter<"WithdrawalRequest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod?: Prisma.EnumPaymentMethodWithAggregatesFilter<"WithdrawalRequest"> | $Enums.PaymentMethod;
    accountName?: Prisma.StringWithAggregatesFilter<"WithdrawalRequest"> | string;
    accountNumber?: Prisma.StringWithAggregatesFilter<"WithdrawalRequest"> | string;
    bankName?: Prisma.StringNullableWithAggregatesFilter<"WithdrawalRequest"> | string | null;
    status?: Prisma.EnumWithdrawalStatusWithAggregatesFilter<"WithdrawalRequest"> | $Enums.WithdrawalStatus;
    submittedAt?: Prisma.DateTimeWithAggregatesFilter<"WithdrawalRequest"> | Date | string;
    processedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"WithdrawalRequest"> | Date | string | null;
    processedBy?: Prisma.StringNullableWithAggregatesFilter<"WithdrawalRequest"> | string | null;
    notes?: Prisma.StringNullableWithAggregatesFilter<"WithdrawalRequest"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"WithdrawalRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"WithdrawalRequest"> | Date | string;
};
export type WithdrawalRequestCreateInput = {
    id?: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod: $Enums.PaymentMethod;
    accountName: string;
    accountNumber: string;
    bankName?: string | null;
    status?: $Enums.WithdrawalStatus;
    submittedAt?: Date | string;
    processedAt?: Date | string | null;
    processedBy?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    provider: Prisma.UserCreateNestedOneWithoutWithdrawalRequestsInput;
    wallet: Prisma.WalletCreateNestedOneWithoutWithdrawalsInput;
};
export type WithdrawalRequestUncheckedCreateInput = {
    id?: string;
    providerId: string;
    walletId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod: $Enums.PaymentMethod;
    accountName: string;
    accountNumber: string;
    bankName?: string | null;
    status?: $Enums.WithdrawalStatus;
    submittedAt?: Date | string;
    processedAt?: Date | string | null;
    processedBy?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WithdrawalRequestUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    accountName?: Prisma.StringFieldUpdateOperationsInput | string;
    accountNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    processedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    processedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    provider?: Prisma.UserUpdateOneRequiredWithoutWithdrawalRequestsNestedInput;
    wallet?: Prisma.WalletUpdateOneRequiredWithoutWithdrawalsNestedInput;
};
export type WithdrawalRequestUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    walletId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    accountName?: Prisma.StringFieldUpdateOperationsInput | string;
    accountNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    processedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    processedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WithdrawalRequestCreateManyInput = {
    id?: string;
    providerId: string;
    walletId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod: $Enums.PaymentMethod;
    accountName: string;
    accountNumber: string;
    bankName?: string | null;
    status?: $Enums.WithdrawalStatus;
    submittedAt?: Date | string;
    processedAt?: Date | string | null;
    processedBy?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WithdrawalRequestUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    accountName?: Prisma.StringFieldUpdateOperationsInput | string;
    accountNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    processedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    processedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WithdrawalRequestUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    walletId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    accountName?: Prisma.StringFieldUpdateOperationsInput | string;
    accountNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    processedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    processedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WithdrawalRequestListRelationFilter = {
    every?: Prisma.WithdrawalRequestWhereInput;
    some?: Prisma.WithdrawalRequestWhereInput;
    none?: Prisma.WithdrawalRequestWhereInput;
};
export type WithdrawalRequestOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type WithdrawalRequestCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    paymentMethod?: Prisma.SortOrder;
    accountName?: Prisma.SortOrder;
    accountNumber?: Prisma.SortOrder;
    bankName?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    processedAt?: Prisma.SortOrder;
    processedBy?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WithdrawalRequestAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type WithdrawalRequestMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    paymentMethod?: Prisma.SortOrder;
    accountName?: Prisma.SortOrder;
    accountNumber?: Prisma.SortOrder;
    bankName?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    processedAt?: Prisma.SortOrder;
    processedBy?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WithdrawalRequestMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    paymentMethod?: Prisma.SortOrder;
    accountName?: Prisma.SortOrder;
    accountNumber?: Prisma.SortOrder;
    bankName?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    processedAt?: Prisma.SortOrder;
    processedBy?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WithdrawalRequestSumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type WithdrawalRequestCreateNestedManyWithoutProviderInput = {
    create?: Prisma.XOR<Prisma.WithdrawalRequestCreateWithoutProviderInput, Prisma.WithdrawalRequestUncheckedCreateWithoutProviderInput> | Prisma.WithdrawalRequestCreateWithoutProviderInput[] | Prisma.WithdrawalRequestUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.WithdrawalRequestCreateOrConnectWithoutProviderInput | Prisma.WithdrawalRequestCreateOrConnectWithoutProviderInput[];
    createMany?: Prisma.WithdrawalRequestCreateManyProviderInputEnvelope;
    connect?: Prisma.WithdrawalRequestWhereUniqueInput | Prisma.WithdrawalRequestWhereUniqueInput[];
};
export type WithdrawalRequestUncheckedCreateNestedManyWithoutProviderInput = {
    create?: Prisma.XOR<Prisma.WithdrawalRequestCreateWithoutProviderInput, Prisma.WithdrawalRequestUncheckedCreateWithoutProviderInput> | Prisma.WithdrawalRequestCreateWithoutProviderInput[] | Prisma.WithdrawalRequestUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.WithdrawalRequestCreateOrConnectWithoutProviderInput | Prisma.WithdrawalRequestCreateOrConnectWithoutProviderInput[];
    createMany?: Prisma.WithdrawalRequestCreateManyProviderInputEnvelope;
    connect?: Prisma.WithdrawalRequestWhereUniqueInput | Prisma.WithdrawalRequestWhereUniqueInput[];
};
export type WithdrawalRequestUpdateManyWithoutProviderNestedInput = {
    create?: Prisma.XOR<Prisma.WithdrawalRequestCreateWithoutProviderInput, Prisma.WithdrawalRequestUncheckedCreateWithoutProviderInput> | Prisma.WithdrawalRequestCreateWithoutProviderInput[] | Prisma.WithdrawalRequestUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.WithdrawalRequestCreateOrConnectWithoutProviderInput | Prisma.WithdrawalRequestCreateOrConnectWithoutProviderInput[];
    upsert?: Prisma.WithdrawalRequestUpsertWithWhereUniqueWithoutProviderInput | Prisma.WithdrawalRequestUpsertWithWhereUniqueWithoutProviderInput[];
    createMany?: Prisma.WithdrawalRequestCreateManyProviderInputEnvelope;
    set?: Prisma.WithdrawalRequestWhereUniqueInput | Prisma.WithdrawalRequestWhereUniqueInput[];
    disconnect?: Prisma.WithdrawalRequestWhereUniqueInput | Prisma.WithdrawalRequestWhereUniqueInput[];
    delete?: Prisma.WithdrawalRequestWhereUniqueInput | Prisma.WithdrawalRequestWhereUniqueInput[];
    connect?: Prisma.WithdrawalRequestWhereUniqueInput | Prisma.WithdrawalRequestWhereUniqueInput[];
    update?: Prisma.WithdrawalRequestUpdateWithWhereUniqueWithoutProviderInput | Prisma.WithdrawalRequestUpdateWithWhereUniqueWithoutProviderInput[];
    updateMany?: Prisma.WithdrawalRequestUpdateManyWithWhereWithoutProviderInput | Prisma.WithdrawalRequestUpdateManyWithWhereWithoutProviderInput[];
    deleteMany?: Prisma.WithdrawalRequestScalarWhereInput | Prisma.WithdrawalRequestScalarWhereInput[];
};
export type WithdrawalRequestUncheckedUpdateManyWithoutProviderNestedInput = {
    create?: Prisma.XOR<Prisma.WithdrawalRequestCreateWithoutProviderInput, Prisma.WithdrawalRequestUncheckedCreateWithoutProviderInput> | Prisma.WithdrawalRequestCreateWithoutProviderInput[] | Prisma.WithdrawalRequestUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.WithdrawalRequestCreateOrConnectWithoutProviderInput | Prisma.WithdrawalRequestCreateOrConnectWithoutProviderInput[];
    upsert?: Prisma.WithdrawalRequestUpsertWithWhereUniqueWithoutProviderInput | Prisma.WithdrawalRequestUpsertWithWhereUniqueWithoutProviderInput[];
    createMany?: Prisma.WithdrawalRequestCreateManyProviderInputEnvelope;
    set?: Prisma.WithdrawalRequestWhereUniqueInput | Prisma.WithdrawalRequestWhereUniqueInput[];
    disconnect?: Prisma.WithdrawalRequestWhereUniqueInput | Prisma.WithdrawalRequestWhereUniqueInput[];
    delete?: Prisma.WithdrawalRequestWhereUniqueInput | Prisma.WithdrawalRequestWhereUniqueInput[];
    connect?: Prisma.WithdrawalRequestWhereUniqueInput | Prisma.WithdrawalRequestWhereUniqueInput[];
    update?: Prisma.WithdrawalRequestUpdateWithWhereUniqueWithoutProviderInput | Prisma.WithdrawalRequestUpdateWithWhereUniqueWithoutProviderInput[];
    updateMany?: Prisma.WithdrawalRequestUpdateManyWithWhereWithoutProviderInput | Prisma.WithdrawalRequestUpdateManyWithWhereWithoutProviderInput[];
    deleteMany?: Prisma.WithdrawalRequestScalarWhereInput | Prisma.WithdrawalRequestScalarWhereInput[];
};
export type WithdrawalRequestCreateNestedManyWithoutWalletInput = {
    create?: Prisma.XOR<Prisma.WithdrawalRequestCreateWithoutWalletInput, Prisma.WithdrawalRequestUncheckedCreateWithoutWalletInput> | Prisma.WithdrawalRequestCreateWithoutWalletInput[] | Prisma.WithdrawalRequestUncheckedCreateWithoutWalletInput[];
    connectOrCreate?: Prisma.WithdrawalRequestCreateOrConnectWithoutWalletInput | Prisma.WithdrawalRequestCreateOrConnectWithoutWalletInput[];
    createMany?: Prisma.WithdrawalRequestCreateManyWalletInputEnvelope;
    connect?: Prisma.WithdrawalRequestWhereUniqueInput | Prisma.WithdrawalRequestWhereUniqueInput[];
};
export type WithdrawalRequestUncheckedCreateNestedManyWithoutWalletInput = {
    create?: Prisma.XOR<Prisma.WithdrawalRequestCreateWithoutWalletInput, Prisma.WithdrawalRequestUncheckedCreateWithoutWalletInput> | Prisma.WithdrawalRequestCreateWithoutWalletInput[] | Prisma.WithdrawalRequestUncheckedCreateWithoutWalletInput[];
    connectOrCreate?: Prisma.WithdrawalRequestCreateOrConnectWithoutWalletInput | Prisma.WithdrawalRequestCreateOrConnectWithoutWalletInput[];
    createMany?: Prisma.WithdrawalRequestCreateManyWalletInputEnvelope;
    connect?: Prisma.WithdrawalRequestWhereUniqueInput | Prisma.WithdrawalRequestWhereUniqueInput[];
};
export type WithdrawalRequestUpdateManyWithoutWalletNestedInput = {
    create?: Prisma.XOR<Prisma.WithdrawalRequestCreateWithoutWalletInput, Prisma.WithdrawalRequestUncheckedCreateWithoutWalletInput> | Prisma.WithdrawalRequestCreateWithoutWalletInput[] | Prisma.WithdrawalRequestUncheckedCreateWithoutWalletInput[];
    connectOrCreate?: Prisma.WithdrawalRequestCreateOrConnectWithoutWalletInput | Prisma.WithdrawalRequestCreateOrConnectWithoutWalletInput[];
    upsert?: Prisma.WithdrawalRequestUpsertWithWhereUniqueWithoutWalletInput | Prisma.WithdrawalRequestUpsertWithWhereUniqueWithoutWalletInput[];
    createMany?: Prisma.WithdrawalRequestCreateManyWalletInputEnvelope;
    set?: Prisma.WithdrawalRequestWhereUniqueInput | Prisma.WithdrawalRequestWhereUniqueInput[];
    disconnect?: Prisma.WithdrawalRequestWhereUniqueInput | Prisma.WithdrawalRequestWhereUniqueInput[];
    delete?: Prisma.WithdrawalRequestWhereUniqueInput | Prisma.WithdrawalRequestWhereUniqueInput[];
    connect?: Prisma.WithdrawalRequestWhereUniqueInput | Prisma.WithdrawalRequestWhereUniqueInput[];
    update?: Prisma.WithdrawalRequestUpdateWithWhereUniqueWithoutWalletInput | Prisma.WithdrawalRequestUpdateWithWhereUniqueWithoutWalletInput[];
    updateMany?: Prisma.WithdrawalRequestUpdateManyWithWhereWithoutWalletInput | Prisma.WithdrawalRequestUpdateManyWithWhereWithoutWalletInput[];
    deleteMany?: Prisma.WithdrawalRequestScalarWhereInput | Prisma.WithdrawalRequestScalarWhereInput[];
};
export type WithdrawalRequestUncheckedUpdateManyWithoutWalletNestedInput = {
    create?: Prisma.XOR<Prisma.WithdrawalRequestCreateWithoutWalletInput, Prisma.WithdrawalRequestUncheckedCreateWithoutWalletInput> | Prisma.WithdrawalRequestCreateWithoutWalletInput[] | Prisma.WithdrawalRequestUncheckedCreateWithoutWalletInput[];
    connectOrCreate?: Prisma.WithdrawalRequestCreateOrConnectWithoutWalletInput | Prisma.WithdrawalRequestCreateOrConnectWithoutWalletInput[];
    upsert?: Prisma.WithdrawalRequestUpsertWithWhereUniqueWithoutWalletInput | Prisma.WithdrawalRequestUpsertWithWhereUniqueWithoutWalletInput[];
    createMany?: Prisma.WithdrawalRequestCreateManyWalletInputEnvelope;
    set?: Prisma.WithdrawalRequestWhereUniqueInput | Prisma.WithdrawalRequestWhereUniqueInput[];
    disconnect?: Prisma.WithdrawalRequestWhereUniqueInput | Prisma.WithdrawalRequestWhereUniqueInput[];
    delete?: Prisma.WithdrawalRequestWhereUniqueInput | Prisma.WithdrawalRequestWhereUniqueInput[];
    connect?: Prisma.WithdrawalRequestWhereUniqueInput | Prisma.WithdrawalRequestWhereUniqueInput[];
    update?: Prisma.WithdrawalRequestUpdateWithWhereUniqueWithoutWalletInput | Prisma.WithdrawalRequestUpdateWithWhereUniqueWithoutWalletInput[];
    updateMany?: Prisma.WithdrawalRequestUpdateManyWithWhereWithoutWalletInput | Prisma.WithdrawalRequestUpdateManyWithWhereWithoutWalletInput[];
    deleteMany?: Prisma.WithdrawalRequestScalarWhereInput | Prisma.WithdrawalRequestScalarWhereInput[];
};
export type EnumWithdrawalStatusFieldUpdateOperationsInput = {
    set?: $Enums.WithdrawalStatus;
};
export type WithdrawalRequestCreateWithoutProviderInput = {
    id?: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod: $Enums.PaymentMethod;
    accountName: string;
    accountNumber: string;
    bankName?: string | null;
    status?: $Enums.WithdrawalStatus;
    submittedAt?: Date | string;
    processedAt?: Date | string | null;
    processedBy?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    wallet: Prisma.WalletCreateNestedOneWithoutWithdrawalsInput;
};
export type WithdrawalRequestUncheckedCreateWithoutProviderInput = {
    id?: string;
    walletId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod: $Enums.PaymentMethod;
    accountName: string;
    accountNumber: string;
    bankName?: string | null;
    status?: $Enums.WithdrawalStatus;
    submittedAt?: Date | string;
    processedAt?: Date | string | null;
    processedBy?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WithdrawalRequestCreateOrConnectWithoutProviderInput = {
    where: Prisma.WithdrawalRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.WithdrawalRequestCreateWithoutProviderInput, Prisma.WithdrawalRequestUncheckedCreateWithoutProviderInput>;
};
export type WithdrawalRequestCreateManyProviderInputEnvelope = {
    data: Prisma.WithdrawalRequestCreateManyProviderInput | Prisma.WithdrawalRequestCreateManyProviderInput[];
    skipDuplicates?: boolean;
};
export type WithdrawalRequestUpsertWithWhereUniqueWithoutProviderInput = {
    where: Prisma.WithdrawalRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.WithdrawalRequestUpdateWithoutProviderInput, Prisma.WithdrawalRequestUncheckedUpdateWithoutProviderInput>;
    create: Prisma.XOR<Prisma.WithdrawalRequestCreateWithoutProviderInput, Prisma.WithdrawalRequestUncheckedCreateWithoutProviderInput>;
};
export type WithdrawalRequestUpdateWithWhereUniqueWithoutProviderInput = {
    where: Prisma.WithdrawalRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.WithdrawalRequestUpdateWithoutProviderInput, Prisma.WithdrawalRequestUncheckedUpdateWithoutProviderInput>;
};
export type WithdrawalRequestUpdateManyWithWhereWithoutProviderInput = {
    where: Prisma.WithdrawalRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.WithdrawalRequestUpdateManyMutationInput, Prisma.WithdrawalRequestUncheckedUpdateManyWithoutProviderInput>;
};
export type WithdrawalRequestScalarWhereInput = {
    AND?: Prisma.WithdrawalRequestScalarWhereInput | Prisma.WithdrawalRequestScalarWhereInput[];
    OR?: Prisma.WithdrawalRequestScalarWhereInput[];
    NOT?: Prisma.WithdrawalRequestScalarWhereInput | Prisma.WithdrawalRequestScalarWhereInput[];
    id?: Prisma.StringFilter<"WithdrawalRequest"> | string;
    providerId?: Prisma.StringFilter<"WithdrawalRequest"> | string;
    walletId?: Prisma.StringFilter<"WithdrawalRequest"> | string;
    amount?: Prisma.DecimalFilter<"WithdrawalRequest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod?: Prisma.EnumPaymentMethodFilter<"WithdrawalRequest"> | $Enums.PaymentMethod;
    accountName?: Prisma.StringFilter<"WithdrawalRequest"> | string;
    accountNumber?: Prisma.StringFilter<"WithdrawalRequest"> | string;
    bankName?: Prisma.StringNullableFilter<"WithdrawalRequest"> | string | null;
    status?: Prisma.EnumWithdrawalStatusFilter<"WithdrawalRequest"> | $Enums.WithdrawalStatus;
    submittedAt?: Prisma.DateTimeFilter<"WithdrawalRequest"> | Date | string;
    processedAt?: Prisma.DateTimeNullableFilter<"WithdrawalRequest"> | Date | string | null;
    processedBy?: Prisma.StringNullableFilter<"WithdrawalRequest"> | string | null;
    notes?: Prisma.StringNullableFilter<"WithdrawalRequest"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"WithdrawalRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WithdrawalRequest"> | Date | string;
};
export type WithdrawalRequestCreateWithoutWalletInput = {
    id?: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod: $Enums.PaymentMethod;
    accountName: string;
    accountNumber: string;
    bankName?: string | null;
    status?: $Enums.WithdrawalStatus;
    submittedAt?: Date | string;
    processedAt?: Date | string | null;
    processedBy?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    provider: Prisma.UserCreateNestedOneWithoutWithdrawalRequestsInput;
};
export type WithdrawalRequestUncheckedCreateWithoutWalletInput = {
    id?: string;
    providerId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod: $Enums.PaymentMethod;
    accountName: string;
    accountNumber: string;
    bankName?: string | null;
    status?: $Enums.WithdrawalStatus;
    submittedAt?: Date | string;
    processedAt?: Date | string | null;
    processedBy?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WithdrawalRequestCreateOrConnectWithoutWalletInput = {
    where: Prisma.WithdrawalRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.WithdrawalRequestCreateWithoutWalletInput, Prisma.WithdrawalRequestUncheckedCreateWithoutWalletInput>;
};
export type WithdrawalRequestCreateManyWalletInputEnvelope = {
    data: Prisma.WithdrawalRequestCreateManyWalletInput | Prisma.WithdrawalRequestCreateManyWalletInput[];
    skipDuplicates?: boolean;
};
export type WithdrawalRequestUpsertWithWhereUniqueWithoutWalletInput = {
    where: Prisma.WithdrawalRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.WithdrawalRequestUpdateWithoutWalletInput, Prisma.WithdrawalRequestUncheckedUpdateWithoutWalletInput>;
    create: Prisma.XOR<Prisma.WithdrawalRequestCreateWithoutWalletInput, Prisma.WithdrawalRequestUncheckedCreateWithoutWalletInput>;
};
export type WithdrawalRequestUpdateWithWhereUniqueWithoutWalletInput = {
    where: Prisma.WithdrawalRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.WithdrawalRequestUpdateWithoutWalletInput, Prisma.WithdrawalRequestUncheckedUpdateWithoutWalletInput>;
};
export type WithdrawalRequestUpdateManyWithWhereWithoutWalletInput = {
    where: Prisma.WithdrawalRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.WithdrawalRequestUpdateManyMutationInput, Prisma.WithdrawalRequestUncheckedUpdateManyWithoutWalletInput>;
};
export type WithdrawalRequestCreateManyProviderInput = {
    id?: string;
    walletId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod: $Enums.PaymentMethod;
    accountName: string;
    accountNumber: string;
    bankName?: string | null;
    status?: $Enums.WithdrawalStatus;
    submittedAt?: Date | string;
    processedAt?: Date | string | null;
    processedBy?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WithdrawalRequestUpdateWithoutProviderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    accountName?: Prisma.StringFieldUpdateOperationsInput | string;
    accountNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    processedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    processedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    wallet?: Prisma.WalletUpdateOneRequiredWithoutWithdrawalsNestedInput;
};
export type WithdrawalRequestUncheckedUpdateWithoutProviderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    walletId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    accountName?: Prisma.StringFieldUpdateOperationsInput | string;
    accountNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    processedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    processedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WithdrawalRequestUncheckedUpdateManyWithoutProviderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    walletId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    accountName?: Prisma.StringFieldUpdateOperationsInput | string;
    accountNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    processedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    processedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WithdrawalRequestCreateManyWalletInput = {
    id?: string;
    providerId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod: $Enums.PaymentMethod;
    accountName: string;
    accountNumber: string;
    bankName?: string | null;
    status?: $Enums.WithdrawalStatus;
    submittedAt?: Date | string;
    processedAt?: Date | string | null;
    processedBy?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WithdrawalRequestUpdateWithoutWalletInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    accountName?: Prisma.StringFieldUpdateOperationsInput | string;
    accountNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    processedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    processedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    provider?: Prisma.UserUpdateOneRequiredWithoutWithdrawalRequestsNestedInput;
};
export type WithdrawalRequestUncheckedUpdateWithoutWalletInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    accountName?: Prisma.StringFieldUpdateOperationsInput | string;
    accountNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    processedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    processedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WithdrawalRequestUncheckedUpdateManyWithoutWalletInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    accountName?: Prisma.StringFieldUpdateOperationsInput | string;
    accountNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    processedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    processedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WithdrawalRequestSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    providerId?: boolean;
    walletId?: boolean;
    amount?: boolean;
    paymentMethod?: boolean;
    accountName?: boolean;
    accountNumber?: boolean;
    bankName?: boolean;
    status?: boolean;
    submittedAt?: boolean;
    processedAt?: boolean;
    processedBy?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["withdrawalRequest"]>;
export type WithdrawalRequestSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    providerId?: boolean;
    walletId?: boolean;
    amount?: boolean;
    paymentMethod?: boolean;
    accountName?: boolean;
    accountNumber?: boolean;
    bankName?: boolean;
    status?: boolean;
    submittedAt?: boolean;
    processedAt?: boolean;
    processedBy?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["withdrawalRequest"]>;
export type WithdrawalRequestSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    providerId?: boolean;
    walletId?: boolean;
    amount?: boolean;
    paymentMethod?: boolean;
    accountName?: boolean;
    accountNumber?: boolean;
    bankName?: boolean;
    status?: boolean;
    submittedAt?: boolean;
    processedAt?: boolean;
    processedBy?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["withdrawalRequest"]>;
export type WithdrawalRequestSelectScalar = {
    id?: boolean;
    providerId?: boolean;
    walletId?: boolean;
    amount?: boolean;
    paymentMethod?: boolean;
    accountName?: boolean;
    accountNumber?: boolean;
    bankName?: boolean;
    status?: boolean;
    submittedAt?: boolean;
    processedAt?: boolean;
    processedBy?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type WithdrawalRequestOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "providerId" | "walletId" | "amount" | "paymentMethod" | "accountName" | "accountNumber" | "bankName" | "status" | "submittedAt" | "processedAt" | "processedBy" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["withdrawalRequest"]>;
export type WithdrawalRequestInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
};
export type WithdrawalRequestIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
};
export type WithdrawalRequestIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
};
export type $WithdrawalRequestPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "WithdrawalRequest";
    objects: {
        provider: Prisma.$UserPayload<ExtArgs>;
        wallet: Prisma.$WalletPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        providerId: string;
        walletId: string;
        amount: runtime.Decimal;
        paymentMethod: $Enums.PaymentMethod;
        accountName: string;
        accountNumber: string;
        bankName: string | null;
        status: $Enums.WithdrawalStatus;
        submittedAt: Date;
        processedAt: Date | null;
        processedBy: string | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["withdrawalRequest"]>;
    composites: {};
};
export type WithdrawalRequestGetPayload<S extends boolean | null | undefined | WithdrawalRequestDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$WithdrawalRequestPayload, S>;
export type WithdrawalRequestCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<WithdrawalRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WithdrawalRequestCountAggregateInputType | true;
};
export interface WithdrawalRequestDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['WithdrawalRequest'];
        meta: {
            name: 'WithdrawalRequest';
        };
    };
    findUnique<T extends WithdrawalRequestFindUniqueArgs>(args: Prisma.SelectSubset<T, WithdrawalRequestFindUniqueArgs<ExtArgs>>): Prisma.Prisma__WithdrawalRequestClient<runtime.Types.Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends WithdrawalRequestFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, WithdrawalRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__WithdrawalRequestClient<runtime.Types.Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends WithdrawalRequestFindFirstArgs>(args?: Prisma.SelectSubset<T, WithdrawalRequestFindFirstArgs<ExtArgs>>): Prisma.Prisma__WithdrawalRequestClient<runtime.Types.Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends WithdrawalRequestFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, WithdrawalRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__WithdrawalRequestClient<runtime.Types.Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends WithdrawalRequestFindManyArgs>(args?: Prisma.SelectSubset<T, WithdrawalRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends WithdrawalRequestCreateArgs>(args: Prisma.SelectSubset<T, WithdrawalRequestCreateArgs<ExtArgs>>): Prisma.Prisma__WithdrawalRequestClient<runtime.Types.Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends WithdrawalRequestCreateManyArgs>(args?: Prisma.SelectSubset<T, WithdrawalRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends WithdrawalRequestCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, WithdrawalRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends WithdrawalRequestDeleteArgs>(args: Prisma.SelectSubset<T, WithdrawalRequestDeleteArgs<ExtArgs>>): Prisma.Prisma__WithdrawalRequestClient<runtime.Types.Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends WithdrawalRequestUpdateArgs>(args: Prisma.SelectSubset<T, WithdrawalRequestUpdateArgs<ExtArgs>>): Prisma.Prisma__WithdrawalRequestClient<runtime.Types.Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends WithdrawalRequestDeleteManyArgs>(args?: Prisma.SelectSubset<T, WithdrawalRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends WithdrawalRequestUpdateManyArgs>(args: Prisma.SelectSubset<T, WithdrawalRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends WithdrawalRequestUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, WithdrawalRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends WithdrawalRequestUpsertArgs>(args: Prisma.SelectSubset<T, WithdrawalRequestUpsertArgs<ExtArgs>>): Prisma.Prisma__WithdrawalRequestClient<runtime.Types.Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends WithdrawalRequestCountArgs>(args?: Prisma.Subset<T, WithdrawalRequestCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], WithdrawalRequestCountAggregateOutputType> : number>;
    aggregate<T extends WithdrawalRequestAggregateArgs>(args: Prisma.Subset<T, WithdrawalRequestAggregateArgs>): Prisma.PrismaPromise<GetWithdrawalRequestAggregateType<T>>;
    groupBy<T extends WithdrawalRequestGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: WithdrawalRequestGroupByArgs['orderBy'];
    } : {
        orderBy?: WithdrawalRequestGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, WithdrawalRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWithdrawalRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: WithdrawalRequestFieldRefs;
}
export interface Prisma__WithdrawalRequestClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    provider<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    wallet<T extends Prisma.WalletDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WalletDefaultArgs<ExtArgs>>): Prisma.Prisma__WalletClient<runtime.Types.Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface WithdrawalRequestFieldRefs {
    readonly id: Prisma.FieldRef<"WithdrawalRequest", 'String'>;
    readonly providerId: Prisma.FieldRef<"WithdrawalRequest", 'String'>;
    readonly walletId: Prisma.FieldRef<"WithdrawalRequest", 'String'>;
    readonly amount: Prisma.FieldRef<"WithdrawalRequest", 'Decimal'>;
    readonly paymentMethod: Prisma.FieldRef<"WithdrawalRequest", 'PaymentMethod'>;
    readonly accountName: Prisma.FieldRef<"WithdrawalRequest", 'String'>;
    readonly accountNumber: Prisma.FieldRef<"WithdrawalRequest", 'String'>;
    readonly bankName: Prisma.FieldRef<"WithdrawalRequest", 'String'>;
    readonly status: Prisma.FieldRef<"WithdrawalRequest", 'WithdrawalStatus'>;
    readonly submittedAt: Prisma.FieldRef<"WithdrawalRequest", 'DateTime'>;
    readonly processedAt: Prisma.FieldRef<"WithdrawalRequest", 'DateTime'>;
    readonly processedBy: Prisma.FieldRef<"WithdrawalRequest", 'String'>;
    readonly notes: Prisma.FieldRef<"WithdrawalRequest", 'String'>;
    readonly createdAt: Prisma.FieldRef<"WithdrawalRequest", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"WithdrawalRequest", 'DateTime'>;
}
export type WithdrawalRequestFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WithdrawalRequestSelect<ExtArgs> | null;
    omit?: Prisma.WithdrawalRequestOmit<ExtArgs> | null;
    include?: Prisma.WithdrawalRequestInclude<ExtArgs> | null;
    where: Prisma.WithdrawalRequestWhereUniqueInput;
};
export type WithdrawalRequestFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WithdrawalRequestSelect<ExtArgs> | null;
    omit?: Prisma.WithdrawalRequestOmit<ExtArgs> | null;
    include?: Prisma.WithdrawalRequestInclude<ExtArgs> | null;
    where: Prisma.WithdrawalRequestWhereUniqueInput;
};
export type WithdrawalRequestFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WithdrawalRequestSelect<ExtArgs> | null;
    omit?: Prisma.WithdrawalRequestOmit<ExtArgs> | null;
    include?: Prisma.WithdrawalRequestInclude<ExtArgs> | null;
    where?: Prisma.WithdrawalRequestWhereInput;
    orderBy?: Prisma.WithdrawalRequestOrderByWithRelationInput | Prisma.WithdrawalRequestOrderByWithRelationInput[];
    cursor?: Prisma.WithdrawalRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WithdrawalRequestScalarFieldEnum | Prisma.WithdrawalRequestScalarFieldEnum[];
};
export type WithdrawalRequestFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WithdrawalRequestSelect<ExtArgs> | null;
    omit?: Prisma.WithdrawalRequestOmit<ExtArgs> | null;
    include?: Prisma.WithdrawalRequestInclude<ExtArgs> | null;
    where?: Prisma.WithdrawalRequestWhereInput;
    orderBy?: Prisma.WithdrawalRequestOrderByWithRelationInput | Prisma.WithdrawalRequestOrderByWithRelationInput[];
    cursor?: Prisma.WithdrawalRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WithdrawalRequestScalarFieldEnum | Prisma.WithdrawalRequestScalarFieldEnum[];
};
export type WithdrawalRequestFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WithdrawalRequestSelect<ExtArgs> | null;
    omit?: Prisma.WithdrawalRequestOmit<ExtArgs> | null;
    include?: Prisma.WithdrawalRequestInclude<ExtArgs> | null;
    where?: Prisma.WithdrawalRequestWhereInput;
    orderBy?: Prisma.WithdrawalRequestOrderByWithRelationInput | Prisma.WithdrawalRequestOrderByWithRelationInput[];
    cursor?: Prisma.WithdrawalRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WithdrawalRequestScalarFieldEnum | Prisma.WithdrawalRequestScalarFieldEnum[];
};
export type WithdrawalRequestCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WithdrawalRequestSelect<ExtArgs> | null;
    omit?: Prisma.WithdrawalRequestOmit<ExtArgs> | null;
    include?: Prisma.WithdrawalRequestInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WithdrawalRequestCreateInput, Prisma.WithdrawalRequestUncheckedCreateInput>;
};
export type WithdrawalRequestCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.WithdrawalRequestCreateManyInput | Prisma.WithdrawalRequestCreateManyInput[];
    skipDuplicates?: boolean;
};
export type WithdrawalRequestCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WithdrawalRequestSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WithdrawalRequestOmit<ExtArgs> | null;
    data: Prisma.WithdrawalRequestCreateManyInput | Prisma.WithdrawalRequestCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.WithdrawalRequestIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type WithdrawalRequestUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WithdrawalRequestSelect<ExtArgs> | null;
    omit?: Prisma.WithdrawalRequestOmit<ExtArgs> | null;
    include?: Prisma.WithdrawalRequestInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WithdrawalRequestUpdateInput, Prisma.WithdrawalRequestUncheckedUpdateInput>;
    where: Prisma.WithdrawalRequestWhereUniqueInput;
};
export type WithdrawalRequestUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.WithdrawalRequestUpdateManyMutationInput, Prisma.WithdrawalRequestUncheckedUpdateManyInput>;
    where?: Prisma.WithdrawalRequestWhereInput;
    limit?: number;
};
export type WithdrawalRequestUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WithdrawalRequestSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WithdrawalRequestOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WithdrawalRequestUpdateManyMutationInput, Prisma.WithdrawalRequestUncheckedUpdateManyInput>;
    where?: Prisma.WithdrawalRequestWhereInput;
    limit?: number;
    include?: Prisma.WithdrawalRequestIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type WithdrawalRequestUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WithdrawalRequestSelect<ExtArgs> | null;
    omit?: Prisma.WithdrawalRequestOmit<ExtArgs> | null;
    include?: Prisma.WithdrawalRequestInclude<ExtArgs> | null;
    where: Prisma.WithdrawalRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.WithdrawalRequestCreateInput, Prisma.WithdrawalRequestUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.WithdrawalRequestUpdateInput, Prisma.WithdrawalRequestUncheckedUpdateInput>;
};
export type WithdrawalRequestDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WithdrawalRequestSelect<ExtArgs> | null;
    omit?: Prisma.WithdrawalRequestOmit<ExtArgs> | null;
    include?: Prisma.WithdrawalRequestInclude<ExtArgs> | null;
    where: Prisma.WithdrawalRequestWhereUniqueInput;
};
export type WithdrawalRequestDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WithdrawalRequestWhereInput;
    limit?: number;
};
export type WithdrawalRequestDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WithdrawalRequestSelect<ExtArgs> | null;
    omit?: Prisma.WithdrawalRequestOmit<ExtArgs> | null;
    include?: Prisma.WithdrawalRequestInclude<ExtArgs> | null;
};
export {};
