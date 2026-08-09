import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type WalletModel = runtime.Types.Result.DefaultSelection<Prisma.$WalletPayload>;
export type AggregateWallet = {
    _count: WalletCountAggregateOutputType | null;
    _avg: WalletAvgAggregateOutputType | null;
    _sum: WalletSumAggregateOutputType | null;
    _min: WalletMinAggregateOutputType | null;
    _max: WalletMaxAggregateOutputType | null;
};
export type WalletAvgAggregateOutputType = {
    balance: runtime.Decimal | null;
    heldBalance: runtime.Decimal | null;
    lifetimeCredits: runtime.Decimal | null;
    lifetimeDebits: runtime.Decimal | null;
};
export type WalletSumAggregateOutputType = {
    balance: runtime.Decimal | null;
    heldBalance: runtime.Decimal | null;
    lifetimeCredits: runtime.Decimal | null;
    lifetimeDebits: runtime.Decimal | null;
};
export type WalletMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: $Enums.WalletType | null;
    balance: runtime.Decimal | null;
    heldBalance: runtime.Decimal | null;
    lifetimeCredits: runtime.Decimal | null;
    lifetimeDebits: runtime.Decimal | null;
    status: $Enums.WalletStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type WalletMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: $Enums.WalletType | null;
    balance: runtime.Decimal | null;
    heldBalance: runtime.Decimal | null;
    lifetimeCredits: runtime.Decimal | null;
    lifetimeDebits: runtime.Decimal | null;
    status: $Enums.WalletStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type WalletCountAggregateOutputType = {
    id: number;
    userId: number;
    type: number;
    balance: number;
    heldBalance: number;
    lifetimeCredits: number;
    lifetimeDebits: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type WalletAvgAggregateInputType = {
    balance?: true;
    heldBalance?: true;
    lifetimeCredits?: true;
    lifetimeDebits?: true;
};
export type WalletSumAggregateInputType = {
    balance?: true;
    heldBalance?: true;
    lifetimeCredits?: true;
    lifetimeDebits?: true;
};
export type WalletMinAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    balance?: true;
    heldBalance?: true;
    lifetimeCredits?: true;
    lifetimeDebits?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type WalletMaxAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    balance?: true;
    heldBalance?: true;
    lifetimeCredits?: true;
    lifetimeDebits?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type WalletCountAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    balance?: true;
    heldBalance?: true;
    lifetimeCredits?: true;
    lifetimeDebits?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type WalletAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WalletWhereInput;
    orderBy?: Prisma.WalletOrderByWithRelationInput | Prisma.WalletOrderByWithRelationInput[];
    cursor?: Prisma.WalletWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | WalletCountAggregateInputType;
    _avg?: WalletAvgAggregateInputType;
    _sum?: WalletSumAggregateInputType;
    _min?: WalletMinAggregateInputType;
    _max?: WalletMaxAggregateInputType;
};
export type GetWalletAggregateType<T extends WalletAggregateArgs> = {
    [P in keyof T & keyof AggregateWallet]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateWallet[P]> : Prisma.GetScalarType<T[P], AggregateWallet[P]>;
};
export type WalletGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WalletWhereInput;
    orderBy?: Prisma.WalletOrderByWithAggregationInput | Prisma.WalletOrderByWithAggregationInput[];
    by: Prisma.WalletScalarFieldEnum[] | Prisma.WalletScalarFieldEnum;
    having?: Prisma.WalletScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WalletCountAggregateInputType | true;
    _avg?: WalletAvgAggregateInputType;
    _sum?: WalletSumAggregateInputType;
    _min?: WalletMinAggregateInputType;
    _max?: WalletMaxAggregateInputType;
};
export type WalletGroupByOutputType = {
    id: string;
    userId: string;
    type: $Enums.WalletType;
    balance: runtime.Decimal;
    heldBalance: runtime.Decimal;
    lifetimeCredits: runtime.Decimal;
    lifetimeDebits: runtime.Decimal;
    status: $Enums.WalletStatus;
    createdAt: Date;
    updatedAt: Date;
    _count: WalletCountAggregateOutputType | null;
    _avg: WalletAvgAggregateOutputType | null;
    _sum: WalletSumAggregateOutputType | null;
    _min: WalletMinAggregateOutputType | null;
    _max: WalletMaxAggregateOutputType | null;
};
type GetWalletGroupByPayload<T extends WalletGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<WalletGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof WalletGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], WalletGroupByOutputType[P]> : Prisma.GetScalarType<T[P], WalletGroupByOutputType[P]>;
}>>;
export type WalletWhereInput = {
    AND?: Prisma.WalletWhereInput | Prisma.WalletWhereInput[];
    OR?: Prisma.WalletWhereInput[];
    NOT?: Prisma.WalletWhereInput | Prisma.WalletWhereInput[];
    id?: Prisma.StringFilter<"Wallet"> | string;
    userId?: Prisma.StringFilter<"Wallet"> | string;
    type?: Prisma.EnumWalletTypeFilter<"Wallet"> | $Enums.WalletType;
    balance?: Prisma.DecimalFilter<"Wallet"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    heldBalance?: Prisma.DecimalFilter<"Wallet"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeCredits?: Prisma.DecimalFilter<"Wallet"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeDebits?: Prisma.DecimalFilter<"Wallet"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumWalletStatusFilter<"Wallet"> | $Enums.WalletStatus;
    createdAt?: Prisma.DateTimeFilter<"Wallet"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Wallet"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    transactions?: Prisma.WalletTransactionListRelationFilter;
    topUps?: Prisma.TopUpRequestListRelationFilter;
    withdrawals?: Prisma.WithdrawalRequestListRelationFilter;
    auditLogs?: Prisma.WalletAuditLogListRelationFilter;
};
export type WalletOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    heldBalance?: Prisma.SortOrder;
    lifetimeCredits?: Prisma.SortOrder;
    lifetimeDebits?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    transactions?: Prisma.WalletTransactionOrderByRelationAggregateInput;
    topUps?: Prisma.TopUpRequestOrderByRelationAggregateInput;
    withdrawals?: Prisma.WithdrawalRequestOrderByRelationAggregateInput;
    auditLogs?: Prisma.WalletAuditLogOrderByRelationAggregateInput;
};
export type WalletWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    AND?: Prisma.WalletWhereInput | Prisma.WalletWhereInput[];
    OR?: Prisma.WalletWhereInput[];
    NOT?: Prisma.WalletWhereInput | Prisma.WalletWhereInput[];
    type?: Prisma.EnumWalletTypeFilter<"Wallet"> | $Enums.WalletType;
    balance?: Prisma.DecimalFilter<"Wallet"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    heldBalance?: Prisma.DecimalFilter<"Wallet"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeCredits?: Prisma.DecimalFilter<"Wallet"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeDebits?: Prisma.DecimalFilter<"Wallet"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumWalletStatusFilter<"Wallet"> | $Enums.WalletStatus;
    createdAt?: Prisma.DateTimeFilter<"Wallet"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Wallet"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    transactions?: Prisma.WalletTransactionListRelationFilter;
    topUps?: Prisma.TopUpRequestListRelationFilter;
    withdrawals?: Prisma.WithdrawalRequestListRelationFilter;
    auditLogs?: Prisma.WalletAuditLogListRelationFilter;
}, "id" | "userId">;
export type WalletOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    heldBalance?: Prisma.SortOrder;
    lifetimeCredits?: Prisma.SortOrder;
    lifetimeDebits?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.WalletCountOrderByAggregateInput;
    _avg?: Prisma.WalletAvgOrderByAggregateInput;
    _max?: Prisma.WalletMaxOrderByAggregateInput;
    _min?: Prisma.WalletMinOrderByAggregateInput;
    _sum?: Prisma.WalletSumOrderByAggregateInput;
};
export type WalletScalarWhereWithAggregatesInput = {
    AND?: Prisma.WalletScalarWhereWithAggregatesInput | Prisma.WalletScalarWhereWithAggregatesInput[];
    OR?: Prisma.WalletScalarWhereWithAggregatesInput[];
    NOT?: Prisma.WalletScalarWhereWithAggregatesInput | Prisma.WalletScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Wallet"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"Wallet"> | string;
    type?: Prisma.EnumWalletTypeWithAggregatesFilter<"Wallet"> | $Enums.WalletType;
    balance?: Prisma.DecimalWithAggregatesFilter<"Wallet"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    heldBalance?: Prisma.DecimalWithAggregatesFilter<"Wallet"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeCredits?: Prisma.DecimalWithAggregatesFilter<"Wallet"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeDebits?: Prisma.DecimalWithAggregatesFilter<"Wallet"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumWalletStatusWithAggregatesFilter<"Wallet"> | $Enums.WalletStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Wallet"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Wallet"> | Date | string;
};
export type WalletCreateInput = {
    id?: string;
    type: $Enums.WalletType;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    heldBalance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeCredits?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeDebits?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.WalletStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutWalletInput;
    transactions?: Prisma.WalletTransactionCreateNestedManyWithoutWalletInput;
    topUps?: Prisma.TopUpRequestCreateNestedManyWithoutWalletInput;
    withdrawals?: Prisma.WithdrawalRequestCreateNestedManyWithoutWalletInput;
    auditLogs?: Prisma.WalletAuditLogCreateNestedManyWithoutWalletInput;
};
export type WalletUncheckedCreateInput = {
    id?: string;
    userId: string;
    type: $Enums.WalletType;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    heldBalance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeCredits?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeDebits?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.WalletStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    transactions?: Prisma.WalletTransactionUncheckedCreateNestedManyWithoutWalletInput;
    topUps?: Prisma.TopUpRequestUncheckedCreateNestedManyWithoutWalletInput;
    withdrawals?: Prisma.WithdrawalRequestUncheckedCreateNestedManyWithoutWalletInput;
    auditLogs?: Prisma.WalletAuditLogUncheckedCreateNestedManyWithoutWalletInput;
};
export type WalletUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWalletTypeFieldUpdateOperationsInput | $Enums.WalletType;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    heldBalance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeCredits?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeDebits?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumWalletStatusFieldUpdateOperationsInput | $Enums.WalletStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutWalletNestedInput;
    transactions?: Prisma.WalletTransactionUpdateManyWithoutWalletNestedInput;
    topUps?: Prisma.TopUpRequestUpdateManyWithoutWalletNestedInput;
    withdrawals?: Prisma.WithdrawalRequestUpdateManyWithoutWalletNestedInput;
    auditLogs?: Prisma.WalletAuditLogUpdateManyWithoutWalletNestedInput;
};
export type WalletUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWalletTypeFieldUpdateOperationsInput | $Enums.WalletType;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    heldBalance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeCredits?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeDebits?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumWalletStatusFieldUpdateOperationsInput | $Enums.WalletStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transactions?: Prisma.WalletTransactionUncheckedUpdateManyWithoutWalletNestedInput;
    topUps?: Prisma.TopUpRequestUncheckedUpdateManyWithoutWalletNestedInput;
    withdrawals?: Prisma.WithdrawalRequestUncheckedUpdateManyWithoutWalletNestedInput;
    auditLogs?: Prisma.WalletAuditLogUncheckedUpdateManyWithoutWalletNestedInput;
};
export type WalletCreateManyInput = {
    id?: string;
    userId: string;
    type: $Enums.WalletType;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    heldBalance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeCredits?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeDebits?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.WalletStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WalletUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWalletTypeFieldUpdateOperationsInput | $Enums.WalletType;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    heldBalance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeCredits?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeDebits?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumWalletStatusFieldUpdateOperationsInput | $Enums.WalletStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WalletUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWalletTypeFieldUpdateOperationsInput | $Enums.WalletType;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    heldBalance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeCredits?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeDebits?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumWalletStatusFieldUpdateOperationsInput | $Enums.WalletStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WalletNullableScalarRelationFilter = {
    is?: Prisma.WalletWhereInput | null;
    isNot?: Prisma.WalletWhereInput | null;
};
export type WalletCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    heldBalance?: Prisma.SortOrder;
    lifetimeCredits?: Prisma.SortOrder;
    lifetimeDebits?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WalletAvgOrderByAggregateInput = {
    balance?: Prisma.SortOrder;
    heldBalance?: Prisma.SortOrder;
    lifetimeCredits?: Prisma.SortOrder;
    lifetimeDebits?: Prisma.SortOrder;
};
export type WalletMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    heldBalance?: Prisma.SortOrder;
    lifetimeCredits?: Prisma.SortOrder;
    lifetimeDebits?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WalletMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    heldBalance?: Prisma.SortOrder;
    lifetimeCredits?: Prisma.SortOrder;
    lifetimeDebits?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WalletSumOrderByAggregateInput = {
    balance?: Prisma.SortOrder;
    heldBalance?: Prisma.SortOrder;
    lifetimeCredits?: Prisma.SortOrder;
    lifetimeDebits?: Prisma.SortOrder;
};
export type WalletScalarRelationFilter = {
    is?: Prisma.WalletWhereInput;
    isNot?: Prisma.WalletWhereInput;
};
export type WalletCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.WalletCreateWithoutUserInput, Prisma.WalletUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.WalletCreateOrConnectWithoutUserInput;
    connect?: Prisma.WalletWhereUniqueInput;
};
export type WalletUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.WalletCreateWithoutUserInput, Prisma.WalletUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.WalletCreateOrConnectWithoutUserInput;
    connect?: Prisma.WalletWhereUniqueInput;
};
export type WalletUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.WalletCreateWithoutUserInput, Prisma.WalletUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.WalletCreateOrConnectWithoutUserInput;
    upsert?: Prisma.WalletUpsertWithoutUserInput;
    disconnect?: Prisma.WalletWhereInput | boolean;
    delete?: Prisma.WalletWhereInput | boolean;
    connect?: Prisma.WalletWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WalletUpdateToOneWithWhereWithoutUserInput, Prisma.WalletUpdateWithoutUserInput>, Prisma.WalletUncheckedUpdateWithoutUserInput>;
};
export type WalletUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.WalletCreateWithoutUserInput, Prisma.WalletUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.WalletCreateOrConnectWithoutUserInput;
    upsert?: Prisma.WalletUpsertWithoutUserInput;
    disconnect?: Prisma.WalletWhereInput | boolean;
    delete?: Prisma.WalletWhereInput | boolean;
    connect?: Prisma.WalletWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WalletUpdateToOneWithWhereWithoutUserInput, Prisma.WalletUpdateWithoutUserInput>, Prisma.WalletUncheckedUpdateWithoutUserInput>;
};
export type EnumWalletTypeFieldUpdateOperationsInput = {
    set?: $Enums.WalletType;
};
export type EnumWalletStatusFieldUpdateOperationsInput = {
    set?: $Enums.WalletStatus;
};
export type WalletCreateNestedOneWithoutTransactionsInput = {
    create?: Prisma.XOR<Prisma.WalletCreateWithoutTransactionsInput, Prisma.WalletUncheckedCreateWithoutTransactionsInput>;
    connectOrCreate?: Prisma.WalletCreateOrConnectWithoutTransactionsInput;
    connect?: Prisma.WalletWhereUniqueInput;
};
export type WalletUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: Prisma.XOR<Prisma.WalletCreateWithoutTransactionsInput, Prisma.WalletUncheckedCreateWithoutTransactionsInput>;
    connectOrCreate?: Prisma.WalletCreateOrConnectWithoutTransactionsInput;
    upsert?: Prisma.WalletUpsertWithoutTransactionsInput;
    connect?: Prisma.WalletWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WalletUpdateToOneWithWhereWithoutTransactionsInput, Prisma.WalletUpdateWithoutTransactionsInput>, Prisma.WalletUncheckedUpdateWithoutTransactionsInput>;
};
export type WalletCreateNestedOneWithoutTopUpsInput = {
    create?: Prisma.XOR<Prisma.WalletCreateWithoutTopUpsInput, Prisma.WalletUncheckedCreateWithoutTopUpsInput>;
    connectOrCreate?: Prisma.WalletCreateOrConnectWithoutTopUpsInput;
    connect?: Prisma.WalletWhereUniqueInput;
};
export type WalletUpdateOneRequiredWithoutTopUpsNestedInput = {
    create?: Prisma.XOR<Prisma.WalletCreateWithoutTopUpsInput, Prisma.WalletUncheckedCreateWithoutTopUpsInput>;
    connectOrCreate?: Prisma.WalletCreateOrConnectWithoutTopUpsInput;
    upsert?: Prisma.WalletUpsertWithoutTopUpsInput;
    connect?: Prisma.WalletWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WalletUpdateToOneWithWhereWithoutTopUpsInput, Prisma.WalletUpdateWithoutTopUpsInput>, Prisma.WalletUncheckedUpdateWithoutTopUpsInput>;
};
export type WalletCreateNestedOneWithoutWithdrawalsInput = {
    create?: Prisma.XOR<Prisma.WalletCreateWithoutWithdrawalsInput, Prisma.WalletUncheckedCreateWithoutWithdrawalsInput>;
    connectOrCreate?: Prisma.WalletCreateOrConnectWithoutWithdrawalsInput;
    connect?: Prisma.WalletWhereUniqueInput;
};
export type WalletUpdateOneRequiredWithoutWithdrawalsNestedInput = {
    create?: Prisma.XOR<Prisma.WalletCreateWithoutWithdrawalsInput, Prisma.WalletUncheckedCreateWithoutWithdrawalsInput>;
    connectOrCreate?: Prisma.WalletCreateOrConnectWithoutWithdrawalsInput;
    upsert?: Prisma.WalletUpsertWithoutWithdrawalsInput;
    connect?: Prisma.WalletWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WalletUpdateToOneWithWhereWithoutWithdrawalsInput, Prisma.WalletUpdateWithoutWithdrawalsInput>, Prisma.WalletUncheckedUpdateWithoutWithdrawalsInput>;
};
export type WalletCreateNestedOneWithoutAuditLogsInput = {
    create?: Prisma.XOR<Prisma.WalletCreateWithoutAuditLogsInput, Prisma.WalletUncheckedCreateWithoutAuditLogsInput>;
    connectOrCreate?: Prisma.WalletCreateOrConnectWithoutAuditLogsInput;
    connect?: Prisma.WalletWhereUniqueInput;
};
export type WalletUpdateOneRequiredWithoutAuditLogsNestedInput = {
    create?: Prisma.XOR<Prisma.WalletCreateWithoutAuditLogsInput, Prisma.WalletUncheckedCreateWithoutAuditLogsInput>;
    connectOrCreate?: Prisma.WalletCreateOrConnectWithoutAuditLogsInput;
    upsert?: Prisma.WalletUpsertWithoutAuditLogsInput;
    connect?: Prisma.WalletWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WalletUpdateToOneWithWhereWithoutAuditLogsInput, Prisma.WalletUpdateWithoutAuditLogsInput>, Prisma.WalletUncheckedUpdateWithoutAuditLogsInput>;
};
export type WalletCreateWithoutUserInput = {
    id?: string;
    type: $Enums.WalletType;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    heldBalance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeCredits?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeDebits?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.WalletStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    transactions?: Prisma.WalletTransactionCreateNestedManyWithoutWalletInput;
    topUps?: Prisma.TopUpRequestCreateNestedManyWithoutWalletInput;
    withdrawals?: Prisma.WithdrawalRequestCreateNestedManyWithoutWalletInput;
    auditLogs?: Prisma.WalletAuditLogCreateNestedManyWithoutWalletInput;
};
export type WalletUncheckedCreateWithoutUserInput = {
    id?: string;
    type: $Enums.WalletType;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    heldBalance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeCredits?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeDebits?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.WalletStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    transactions?: Prisma.WalletTransactionUncheckedCreateNestedManyWithoutWalletInput;
    topUps?: Prisma.TopUpRequestUncheckedCreateNestedManyWithoutWalletInput;
    withdrawals?: Prisma.WithdrawalRequestUncheckedCreateNestedManyWithoutWalletInput;
    auditLogs?: Prisma.WalletAuditLogUncheckedCreateNestedManyWithoutWalletInput;
};
export type WalletCreateOrConnectWithoutUserInput = {
    where: Prisma.WalletWhereUniqueInput;
    create: Prisma.XOR<Prisma.WalletCreateWithoutUserInput, Prisma.WalletUncheckedCreateWithoutUserInput>;
};
export type WalletUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.WalletUpdateWithoutUserInput, Prisma.WalletUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.WalletCreateWithoutUserInput, Prisma.WalletUncheckedCreateWithoutUserInput>;
    where?: Prisma.WalletWhereInput;
};
export type WalletUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.WalletWhereInput;
    data: Prisma.XOR<Prisma.WalletUpdateWithoutUserInput, Prisma.WalletUncheckedUpdateWithoutUserInput>;
};
export type WalletUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWalletTypeFieldUpdateOperationsInput | $Enums.WalletType;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    heldBalance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeCredits?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeDebits?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumWalletStatusFieldUpdateOperationsInput | $Enums.WalletStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transactions?: Prisma.WalletTransactionUpdateManyWithoutWalletNestedInput;
    topUps?: Prisma.TopUpRequestUpdateManyWithoutWalletNestedInput;
    withdrawals?: Prisma.WithdrawalRequestUpdateManyWithoutWalletNestedInput;
    auditLogs?: Prisma.WalletAuditLogUpdateManyWithoutWalletNestedInput;
};
export type WalletUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWalletTypeFieldUpdateOperationsInput | $Enums.WalletType;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    heldBalance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeCredits?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeDebits?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumWalletStatusFieldUpdateOperationsInput | $Enums.WalletStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transactions?: Prisma.WalletTransactionUncheckedUpdateManyWithoutWalletNestedInput;
    topUps?: Prisma.TopUpRequestUncheckedUpdateManyWithoutWalletNestedInput;
    withdrawals?: Prisma.WithdrawalRequestUncheckedUpdateManyWithoutWalletNestedInput;
    auditLogs?: Prisma.WalletAuditLogUncheckedUpdateManyWithoutWalletNestedInput;
};
export type WalletCreateWithoutTransactionsInput = {
    id?: string;
    type: $Enums.WalletType;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    heldBalance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeCredits?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeDebits?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.WalletStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutWalletInput;
    topUps?: Prisma.TopUpRequestCreateNestedManyWithoutWalletInput;
    withdrawals?: Prisma.WithdrawalRequestCreateNestedManyWithoutWalletInput;
    auditLogs?: Prisma.WalletAuditLogCreateNestedManyWithoutWalletInput;
};
export type WalletUncheckedCreateWithoutTransactionsInput = {
    id?: string;
    userId: string;
    type: $Enums.WalletType;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    heldBalance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeCredits?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeDebits?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.WalletStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    topUps?: Prisma.TopUpRequestUncheckedCreateNestedManyWithoutWalletInput;
    withdrawals?: Prisma.WithdrawalRequestUncheckedCreateNestedManyWithoutWalletInput;
    auditLogs?: Prisma.WalletAuditLogUncheckedCreateNestedManyWithoutWalletInput;
};
export type WalletCreateOrConnectWithoutTransactionsInput = {
    where: Prisma.WalletWhereUniqueInput;
    create: Prisma.XOR<Prisma.WalletCreateWithoutTransactionsInput, Prisma.WalletUncheckedCreateWithoutTransactionsInput>;
};
export type WalletUpsertWithoutTransactionsInput = {
    update: Prisma.XOR<Prisma.WalletUpdateWithoutTransactionsInput, Prisma.WalletUncheckedUpdateWithoutTransactionsInput>;
    create: Prisma.XOR<Prisma.WalletCreateWithoutTransactionsInput, Prisma.WalletUncheckedCreateWithoutTransactionsInput>;
    where?: Prisma.WalletWhereInput;
};
export type WalletUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: Prisma.WalletWhereInput;
    data: Prisma.XOR<Prisma.WalletUpdateWithoutTransactionsInput, Prisma.WalletUncheckedUpdateWithoutTransactionsInput>;
};
export type WalletUpdateWithoutTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWalletTypeFieldUpdateOperationsInput | $Enums.WalletType;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    heldBalance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeCredits?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeDebits?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumWalletStatusFieldUpdateOperationsInput | $Enums.WalletStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutWalletNestedInput;
    topUps?: Prisma.TopUpRequestUpdateManyWithoutWalletNestedInput;
    withdrawals?: Prisma.WithdrawalRequestUpdateManyWithoutWalletNestedInput;
    auditLogs?: Prisma.WalletAuditLogUpdateManyWithoutWalletNestedInput;
};
export type WalletUncheckedUpdateWithoutTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWalletTypeFieldUpdateOperationsInput | $Enums.WalletType;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    heldBalance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeCredits?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeDebits?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumWalletStatusFieldUpdateOperationsInput | $Enums.WalletStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    topUps?: Prisma.TopUpRequestUncheckedUpdateManyWithoutWalletNestedInput;
    withdrawals?: Prisma.WithdrawalRequestUncheckedUpdateManyWithoutWalletNestedInput;
    auditLogs?: Prisma.WalletAuditLogUncheckedUpdateManyWithoutWalletNestedInput;
};
export type WalletCreateWithoutTopUpsInput = {
    id?: string;
    type: $Enums.WalletType;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    heldBalance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeCredits?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeDebits?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.WalletStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutWalletInput;
    transactions?: Prisma.WalletTransactionCreateNestedManyWithoutWalletInput;
    withdrawals?: Prisma.WithdrawalRequestCreateNestedManyWithoutWalletInput;
    auditLogs?: Prisma.WalletAuditLogCreateNestedManyWithoutWalletInput;
};
export type WalletUncheckedCreateWithoutTopUpsInput = {
    id?: string;
    userId: string;
    type: $Enums.WalletType;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    heldBalance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeCredits?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeDebits?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.WalletStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    transactions?: Prisma.WalletTransactionUncheckedCreateNestedManyWithoutWalletInput;
    withdrawals?: Prisma.WithdrawalRequestUncheckedCreateNestedManyWithoutWalletInput;
    auditLogs?: Prisma.WalletAuditLogUncheckedCreateNestedManyWithoutWalletInput;
};
export type WalletCreateOrConnectWithoutTopUpsInput = {
    where: Prisma.WalletWhereUniqueInput;
    create: Prisma.XOR<Prisma.WalletCreateWithoutTopUpsInput, Prisma.WalletUncheckedCreateWithoutTopUpsInput>;
};
export type WalletUpsertWithoutTopUpsInput = {
    update: Prisma.XOR<Prisma.WalletUpdateWithoutTopUpsInput, Prisma.WalletUncheckedUpdateWithoutTopUpsInput>;
    create: Prisma.XOR<Prisma.WalletCreateWithoutTopUpsInput, Prisma.WalletUncheckedCreateWithoutTopUpsInput>;
    where?: Prisma.WalletWhereInput;
};
export type WalletUpdateToOneWithWhereWithoutTopUpsInput = {
    where?: Prisma.WalletWhereInput;
    data: Prisma.XOR<Prisma.WalletUpdateWithoutTopUpsInput, Prisma.WalletUncheckedUpdateWithoutTopUpsInput>;
};
export type WalletUpdateWithoutTopUpsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWalletTypeFieldUpdateOperationsInput | $Enums.WalletType;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    heldBalance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeCredits?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeDebits?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumWalletStatusFieldUpdateOperationsInput | $Enums.WalletStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutWalletNestedInput;
    transactions?: Prisma.WalletTransactionUpdateManyWithoutWalletNestedInput;
    withdrawals?: Prisma.WithdrawalRequestUpdateManyWithoutWalletNestedInput;
    auditLogs?: Prisma.WalletAuditLogUpdateManyWithoutWalletNestedInput;
};
export type WalletUncheckedUpdateWithoutTopUpsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWalletTypeFieldUpdateOperationsInput | $Enums.WalletType;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    heldBalance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeCredits?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeDebits?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumWalletStatusFieldUpdateOperationsInput | $Enums.WalletStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transactions?: Prisma.WalletTransactionUncheckedUpdateManyWithoutWalletNestedInput;
    withdrawals?: Prisma.WithdrawalRequestUncheckedUpdateManyWithoutWalletNestedInput;
    auditLogs?: Prisma.WalletAuditLogUncheckedUpdateManyWithoutWalletNestedInput;
};
export type WalletCreateWithoutWithdrawalsInput = {
    id?: string;
    type: $Enums.WalletType;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    heldBalance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeCredits?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeDebits?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.WalletStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutWalletInput;
    transactions?: Prisma.WalletTransactionCreateNestedManyWithoutWalletInput;
    topUps?: Prisma.TopUpRequestCreateNestedManyWithoutWalletInput;
    auditLogs?: Prisma.WalletAuditLogCreateNestedManyWithoutWalletInput;
};
export type WalletUncheckedCreateWithoutWithdrawalsInput = {
    id?: string;
    userId: string;
    type: $Enums.WalletType;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    heldBalance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeCredits?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeDebits?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.WalletStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    transactions?: Prisma.WalletTransactionUncheckedCreateNestedManyWithoutWalletInput;
    topUps?: Prisma.TopUpRequestUncheckedCreateNestedManyWithoutWalletInput;
    auditLogs?: Prisma.WalletAuditLogUncheckedCreateNestedManyWithoutWalletInput;
};
export type WalletCreateOrConnectWithoutWithdrawalsInput = {
    where: Prisma.WalletWhereUniqueInput;
    create: Prisma.XOR<Prisma.WalletCreateWithoutWithdrawalsInput, Prisma.WalletUncheckedCreateWithoutWithdrawalsInput>;
};
export type WalletUpsertWithoutWithdrawalsInput = {
    update: Prisma.XOR<Prisma.WalletUpdateWithoutWithdrawalsInput, Prisma.WalletUncheckedUpdateWithoutWithdrawalsInput>;
    create: Prisma.XOR<Prisma.WalletCreateWithoutWithdrawalsInput, Prisma.WalletUncheckedCreateWithoutWithdrawalsInput>;
    where?: Prisma.WalletWhereInput;
};
export type WalletUpdateToOneWithWhereWithoutWithdrawalsInput = {
    where?: Prisma.WalletWhereInput;
    data: Prisma.XOR<Prisma.WalletUpdateWithoutWithdrawalsInput, Prisma.WalletUncheckedUpdateWithoutWithdrawalsInput>;
};
export type WalletUpdateWithoutWithdrawalsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWalletTypeFieldUpdateOperationsInput | $Enums.WalletType;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    heldBalance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeCredits?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeDebits?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumWalletStatusFieldUpdateOperationsInput | $Enums.WalletStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutWalletNestedInput;
    transactions?: Prisma.WalletTransactionUpdateManyWithoutWalletNestedInput;
    topUps?: Prisma.TopUpRequestUpdateManyWithoutWalletNestedInput;
    auditLogs?: Prisma.WalletAuditLogUpdateManyWithoutWalletNestedInput;
};
export type WalletUncheckedUpdateWithoutWithdrawalsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWalletTypeFieldUpdateOperationsInput | $Enums.WalletType;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    heldBalance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeCredits?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeDebits?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumWalletStatusFieldUpdateOperationsInput | $Enums.WalletStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transactions?: Prisma.WalletTransactionUncheckedUpdateManyWithoutWalletNestedInput;
    topUps?: Prisma.TopUpRequestUncheckedUpdateManyWithoutWalletNestedInput;
    auditLogs?: Prisma.WalletAuditLogUncheckedUpdateManyWithoutWalletNestedInput;
};
export type WalletCreateWithoutAuditLogsInput = {
    id?: string;
    type: $Enums.WalletType;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    heldBalance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeCredits?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeDebits?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.WalletStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutWalletInput;
    transactions?: Prisma.WalletTransactionCreateNestedManyWithoutWalletInput;
    topUps?: Prisma.TopUpRequestCreateNestedManyWithoutWalletInput;
    withdrawals?: Prisma.WithdrawalRequestCreateNestedManyWithoutWalletInput;
};
export type WalletUncheckedCreateWithoutAuditLogsInput = {
    id?: string;
    userId: string;
    type: $Enums.WalletType;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    heldBalance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeCredits?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeDebits?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.WalletStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    transactions?: Prisma.WalletTransactionUncheckedCreateNestedManyWithoutWalletInput;
    topUps?: Prisma.TopUpRequestUncheckedCreateNestedManyWithoutWalletInput;
    withdrawals?: Prisma.WithdrawalRequestUncheckedCreateNestedManyWithoutWalletInput;
};
export type WalletCreateOrConnectWithoutAuditLogsInput = {
    where: Prisma.WalletWhereUniqueInput;
    create: Prisma.XOR<Prisma.WalletCreateWithoutAuditLogsInput, Prisma.WalletUncheckedCreateWithoutAuditLogsInput>;
};
export type WalletUpsertWithoutAuditLogsInput = {
    update: Prisma.XOR<Prisma.WalletUpdateWithoutAuditLogsInput, Prisma.WalletUncheckedUpdateWithoutAuditLogsInput>;
    create: Prisma.XOR<Prisma.WalletCreateWithoutAuditLogsInput, Prisma.WalletUncheckedCreateWithoutAuditLogsInput>;
    where?: Prisma.WalletWhereInput;
};
export type WalletUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: Prisma.WalletWhereInput;
    data: Prisma.XOR<Prisma.WalletUpdateWithoutAuditLogsInput, Prisma.WalletUncheckedUpdateWithoutAuditLogsInput>;
};
export type WalletUpdateWithoutAuditLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWalletTypeFieldUpdateOperationsInput | $Enums.WalletType;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    heldBalance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeCredits?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeDebits?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumWalletStatusFieldUpdateOperationsInput | $Enums.WalletStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutWalletNestedInput;
    transactions?: Prisma.WalletTransactionUpdateManyWithoutWalletNestedInput;
    topUps?: Prisma.TopUpRequestUpdateManyWithoutWalletNestedInput;
    withdrawals?: Prisma.WithdrawalRequestUpdateManyWithoutWalletNestedInput;
};
export type WalletUncheckedUpdateWithoutAuditLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWalletTypeFieldUpdateOperationsInput | $Enums.WalletType;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    heldBalance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeCredits?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    lifetimeDebits?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumWalletStatusFieldUpdateOperationsInput | $Enums.WalletStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transactions?: Prisma.WalletTransactionUncheckedUpdateManyWithoutWalletNestedInput;
    topUps?: Prisma.TopUpRequestUncheckedUpdateManyWithoutWalletNestedInput;
    withdrawals?: Prisma.WithdrawalRequestUncheckedUpdateManyWithoutWalletNestedInput;
};
export type WalletCountOutputType = {
    transactions: number;
    topUps: number;
    withdrawals: number;
    auditLogs: number;
};
export type WalletCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    transactions?: boolean | WalletCountOutputTypeCountTransactionsArgs;
    topUps?: boolean | WalletCountOutputTypeCountTopUpsArgs;
    withdrawals?: boolean | WalletCountOutputTypeCountWithdrawalsArgs;
    auditLogs?: boolean | WalletCountOutputTypeCountAuditLogsArgs;
};
export type WalletCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletCountOutputTypeSelect<ExtArgs> | null;
};
export type WalletCountOutputTypeCountTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WalletTransactionWhereInput;
};
export type WalletCountOutputTypeCountTopUpsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TopUpRequestWhereInput;
};
export type WalletCountOutputTypeCountWithdrawalsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WithdrawalRequestWhereInput;
};
export type WalletCountOutputTypeCountAuditLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WalletAuditLogWhereInput;
};
export type WalletSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    balance?: boolean;
    heldBalance?: boolean;
    lifetimeCredits?: boolean;
    lifetimeDebits?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    transactions?: boolean | Prisma.Wallet$transactionsArgs<ExtArgs>;
    topUps?: boolean | Prisma.Wallet$topUpsArgs<ExtArgs>;
    withdrawals?: boolean | Prisma.Wallet$withdrawalsArgs<ExtArgs>;
    auditLogs?: boolean | Prisma.Wallet$auditLogsArgs<ExtArgs>;
    _count?: boolean | Prisma.WalletCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["wallet"]>;
export type WalletSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    balance?: boolean;
    heldBalance?: boolean;
    lifetimeCredits?: boolean;
    lifetimeDebits?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["wallet"]>;
export type WalletSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    balance?: boolean;
    heldBalance?: boolean;
    lifetimeCredits?: boolean;
    lifetimeDebits?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["wallet"]>;
export type WalletSelectScalar = {
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    balance?: boolean;
    heldBalance?: boolean;
    lifetimeCredits?: boolean;
    lifetimeDebits?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type WalletOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "type" | "balance" | "heldBalance" | "lifetimeCredits" | "lifetimeDebits" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["wallet"]>;
export type WalletInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    transactions?: boolean | Prisma.Wallet$transactionsArgs<ExtArgs>;
    topUps?: boolean | Prisma.Wallet$topUpsArgs<ExtArgs>;
    withdrawals?: boolean | Prisma.Wallet$withdrawalsArgs<ExtArgs>;
    auditLogs?: boolean | Prisma.Wallet$auditLogsArgs<ExtArgs>;
    _count?: boolean | Prisma.WalletCountOutputTypeDefaultArgs<ExtArgs>;
};
export type WalletIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type WalletIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $WalletPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Wallet";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        transactions: Prisma.$WalletTransactionPayload<ExtArgs>[];
        topUps: Prisma.$TopUpRequestPayload<ExtArgs>[];
        withdrawals: Prisma.$WithdrawalRequestPayload<ExtArgs>[];
        auditLogs: Prisma.$WalletAuditLogPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        type: $Enums.WalletType;
        balance: runtime.Decimal;
        heldBalance: runtime.Decimal;
        lifetimeCredits: runtime.Decimal;
        lifetimeDebits: runtime.Decimal;
        status: $Enums.WalletStatus;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["wallet"]>;
    composites: {};
};
export type WalletGetPayload<S extends boolean | null | undefined | WalletDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$WalletPayload, S>;
export type WalletCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<WalletFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WalletCountAggregateInputType | true;
};
export interface WalletDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Wallet'];
        meta: {
            name: 'Wallet';
        };
    };
    findUnique<T extends WalletFindUniqueArgs>(args: Prisma.SelectSubset<T, WalletFindUniqueArgs<ExtArgs>>): Prisma.Prisma__WalletClient<runtime.Types.Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends WalletFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, WalletFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__WalletClient<runtime.Types.Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends WalletFindFirstArgs>(args?: Prisma.SelectSubset<T, WalletFindFirstArgs<ExtArgs>>): Prisma.Prisma__WalletClient<runtime.Types.Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends WalletFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, WalletFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__WalletClient<runtime.Types.Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends WalletFindManyArgs>(args?: Prisma.SelectSubset<T, WalletFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends WalletCreateArgs>(args: Prisma.SelectSubset<T, WalletCreateArgs<ExtArgs>>): Prisma.Prisma__WalletClient<runtime.Types.Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends WalletCreateManyArgs>(args?: Prisma.SelectSubset<T, WalletCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends WalletCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, WalletCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends WalletDeleteArgs>(args: Prisma.SelectSubset<T, WalletDeleteArgs<ExtArgs>>): Prisma.Prisma__WalletClient<runtime.Types.Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends WalletUpdateArgs>(args: Prisma.SelectSubset<T, WalletUpdateArgs<ExtArgs>>): Prisma.Prisma__WalletClient<runtime.Types.Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends WalletDeleteManyArgs>(args?: Prisma.SelectSubset<T, WalletDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends WalletUpdateManyArgs>(args: Prisma.SelectSubset<T, WalletUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends WalletUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, WalletUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends WalletUpsertArgs>(args: Prisma.SelectSubset<T, WalletUpsertArgs<ExtArgs>>): Prisma.Prisma__WalletClient<runtime.Types.Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends WalletCountArgs>(args?: Prisma.Subset<T, WalletCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], WalletCountAggregateOutputType> : number>;
    aggregate<T extends WalletAggregateArgs>(args: Prisma.Subset<T, WalletAggregateArgs>): Prisma.PrismaPromise<GetWalletAggregateType<T>>;
    groupBy<T extends WalletGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: WalletGroupByArgs['orderBy'];
    } : {
        orderBy?: WalletGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, WalletGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWalletGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: WalletFieldRefs;
}
export interface Prisma__WalletClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    transactions<T extends Prisma.Wallet$transactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Wallet$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    topUps<T extends Prisma.Wallet$topUpsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Wallet$topUpsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TopUpRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    withdrawals<T extends Prisma.Wallet$withdrawalsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Wallet$withdrawalsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    auditLogs<T extends Prisma.Wallet$auditLogsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Wallet$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WalletAuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface WalletFieldRefs {
    readonly id: Prisma.FieldRef<"Wallet", 'String'>;
    readonly userId: Prisma.FieldRef<"Wallet", 'String'>;
    readonly type: Prisma.FieldRef<"Wallet", 'WalletType'>;
    readonly balance: Prisma.FieldRef<"Wallet", 'Decimal'>;
    readonly heldBalance: Prisma.FieldRef<"Wallet", 'Decimal'>;
    readonly lifetimeCredits: Prisma.FieldRef<"Wallet", 'Decimal'>;
    readonly lifetimeDebits: Prisma.FieldRef<"Wallet", 'Decimal'>;
    readonly status: Prisma.FieldRef<"Wallet", 'WalletStatus'>;
    readonly createdAt: Prisma.FieldRef<"Wallet", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Wallet", 'DateTime'>;
}
export type WalletFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletSelect<ExtArgs> | null;
    omit?: Prisma.WalletOmit<ExtArgs> | null;
    include?: Prisma.WalletInclude<ExtArgs> | null;
    where: Prisma.WalletWhereUniqueInput;
};
export type WalletFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletSelect<ExtArgs> | null;
    omit?: Prisma.WalletOmit<ExtArgs> | null;
    include?: Prisma.WalletInclude<ExtArgs> | null;
    where: Prisma.WalletWhereUniqueInput;
};
export type WalletFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletSelect<ExtArgs> | null;
    omit?: Prisma.WalletOmit<ExtArgs> | null;
    include?: Prisma.WalletInclude<ExtArgs> | null;
    where?: Prisma.WalletWhereInput;
    orderBy?: Prisma.WalletOrderByWithRelationInput | Prisma.WalletOrderByWithRelationInput[];
    cursor?: Prisma.WalletWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WalletScalarFieldEnum | Prisma.WalletScalarFieldEnum[];
};
export type WalletFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletSelect<ExtArgs> | null;
    omit?: Prisma.WalletOmit<ExtArgs> | null;
    include?: Prisma.WalletInclude<ExtArgs> | null;
    where?: Prisma.WalletWhereInput;
    orderBy?: Prisma.WalletOrderByWithRelationInput | Prisma.WalletOrderByWithRelationInput[];
    cursor?: Prisma.WalletWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WalletScalarFieldEnum | Prisma.WalletScalarFieldEnum[];
};
export type WalletFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletSelect<ExtArgs> | null;
    omit?: Prisma.WalletOmit<ExtArgs> | null;
    include?: Prisma.WalletInclude<ExtArgs> | null;
    where?: Prisma.WalletWhereInput;
    orderBy?: Prisma.WalletOrderByWithRelationInput | Prisma.WalletOrderByWithRelationInput[];
    cursor?: Prisma.WalletWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WalletScalarFieldEnum | Prisma.WalletScalarFieldEnum[];
};
export type WalletCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletSelect<ExtArgs> | null;
    omit?: Prisma.WalletOmit<ExtArgs> | null;
    include?: Prisma.WalletInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WalletCreateInput, Prisma.WalletUncheckedCreateInput>;
};
export type WalletCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.WalletCreateManyInput | Prisma.WalletCreateManyInput[];
    skipDuplicates?: boolean;
};
export type WalletCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WalletOmit<ExtArgs> | null;
    data: Prisma.WalletCreateManyInput | Prisma.WalletCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.WalletIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type WalletUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletSelect<ExtArgs> | null;
    omit?: Prisma.WalletOmit<ExtArgs> | null;
    include?: Prisma.WalletInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WalletUpdateInput, Prisma.WalletUncheckedUpdateInput>;
    where: Prisma.WalletWhereUniqueInput;
};
export type WalletUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.WalletUpdateManyMutationInput, Prisma.WalletUncheckedUpdateManyInput>;
    where?: Prisma.WalletWhereInput;
    limit?: number;
};
export type WalletUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WalletOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WalletUpdateManyMutationInput, Prisma.WalletUncheckedUpdateManyInput>;
    where?: Prisma.WalletWhereInput;
    limit?: number;
    include?: Prisma.WalletIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type WalletUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletSelect<ExtArgs> | null;
    omit?: Prisma.WalletOmit<ExtArgs> | null;
    include?: Prisma.WalletInclude<ExtArgs> | null;
    where: Prisma.WalletWhereUniqueInput;
    create: Prisma.XOR<Prisma.WalletCreateInput, Prisma.WalletUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.WalletUpdateInput, Prisma.WalletUncheckedUpdateInput>;
};
export type WalletDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletSelect<ExtArgs> | null;
    omit?: Prisma.WalletOmit<ExtArgs> | null;
    include?: Prisma.WalletInclude<ExtArgs> | null;
    where: Prisma.WalletWhereUniqueInput;
};
export type WalletDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WalletWhereInput;
    limit?: number;
};
export type Wallet$transactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletTransactionSelect<ExtArgs> | null;
    omit?: Prisma.WalletTransactionOmit<ExtArgs> | null;
    include?: Prisma.WalletTransactionInclude<ExtArgs> | null;
    where?: Prisma.WalletTransactionWhereInput;
    orderBy?: Prisma.WalletTransactionOrderByWithRelationInput | Prisma.WalletTransactionOrderByWithRelationInput[];
    cursor?: Prisma.WalletTransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WalletTransactionScalarFieldEnum | Prisma.WalletTransactionScalarFieldEnum[];
};
export type Wallet$topUpsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Wallet$withdrawalsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Wallet$auditLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.WalletAuditLogOmit<ExtArgs> | null;
    include?: Prisma.WalletAuditLogInclude<ExtArgs> | null;
    where?: Prisma.WalletAuditLogWhereInput;
    orderBy?: Prisma.WalletAuditLogOrderByWithRelationInput | Prisma.WalletAuditLogOrderByWithRelationInput[];
    cursor?: Prisma.WalletAuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WalletAuditLogScalarFieldEnum | Prisma.WalletAuditLogScalarFieldEnum[];
};
export type WalletDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletSelect<ExtArgs> | null;
    omit?: Prisma.WalletOmit<ExtArgs> | null;
    include?: Prisma.WalletInclude<ExtArgs> | null;
};
export {};
