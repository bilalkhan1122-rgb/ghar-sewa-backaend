import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
export type WalletAuditLogModel = runtime.Types.Result.DefaultSelection<Prisma.$WalletAuditLogPayload>;
export type AggregateWalletAuditLog = {
    _count: WalletAuditLogCountAggregateOutputType | null;
    _min: WalletAuditLogMinAggregateOutputType | null;
    _max: WalletAuditLogMaxAggregateOutputType | null;
};
export type WalletAuditLogMinAggregateOutputType = {
    id: string | null;
    walletId: string | null;
    actorUserId: string | null;
    actorAdminId: string | null;
    action: string | null;
    referenceType: string | null;
    referenceId: string | null;
    createdAt: Date | null;
};
export type WalletAuditLogMaxAggregateOutputType = {
    id: string | null;
    walletId: string | null;
    actorUserId: string | null;
    actorAdminId: string | null;
    action: string | null;
    referenceType: string | null;
    referenceId: string | null;
    createdAt: Date | null;
};
export type WalletAuditLogCountAggregateOutputType = {
    id: number;
    walletId: number;
    actorUserId: number;
    actorAdminId: number;
    action: number;
    previousValues: number;
    newValues: number;
    referenceType: number;
    referenceId: number;
    createdAt: number;
    _all: number;
};
export type WalletAuditLogMinAggregateInputType = {
    id?: true;
    walletId?: true;
    actorUserId?: true;
    actorAdminId?: true;
    action?: true;
    referenceType?: true;
    referenceId?: true;
    createdAt?: true;
};
export type WalletAuditLogMaxAggregateInputType = {
    id?: true;
    walletId?: true;
    actorUserId?: true;
    actorAdminId?: true;
    action?: true;
    referenceType?: true;
    referenceId?: true;
    createdAt?: true;
};
export type WalletAuditLogCountAggregateInputType = {
    id?: true;
    walletId?: true;
    actorUserId?: true;
    actorAdminId?: true;
    action?: true;
    previousValues?: true;
    newValues?: true;
    referenceType?: true;
    referenceId?: true;
    createdAt?: true;
    _all?: true;
};
export type WalletAuditLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WalletAuditLogWhereInput;
    orderBy?: Prisma.WalletAuditLogOrderByWithRelationInput | Prisma.WalletAuditLogOrderByWithRelationInput[];
    cursor?: Prisma.WalletAuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | WalletAuditLogCountAggregateInputType;
    _min?: WalletAuditLogMinAggregateInputType;
    _max?: WalletAuditLogMaxAggregateInputType;
};
export type GetWalletAuditLogAggregateType<T extends WalletAuditLogAggregateArgs> = {
    [P in keyof T & keyof AggregateWalletAuditLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateWalletAuditLog[P]> : Prisma.GetScalarType<T[P], AggregateWalletAuditLog[P]>;
};
export type WalletAuditLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WalletAuditLogWhereInput;
    orderBy?: Prisma.WalletAuditLogOrderByWithAggregationInput | Prisma.WalletAuditLogOrderByWithAggregationInput[];
    by: Prisma.WalletAuditLogScalarFieldEnum[] | Prisma.WalletAuditLogScalarFieldEnum;
    having?: Prisma.WalletAuditLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WalletAuditLogCountAggregateInputType | true;
    _min?: WalletAuditLogMinAggregateInputType;
    _max?: WalletAuditLogMaxAggregateInputType;
};
export type WalletAuditLogGroupByOutputType = {
    id: string;
    walletId: string;
    actorUserId: string | null;
    actorAdminId: string | null;
    action: string;
    previousValues: runtime.JsonValue | null;
    newValues: runtime.JsonValue | null;
    referenceType: string | null;
    referenceId: string | null;
    createdAt: Date;
    _count: WalletAuditLogCountAggregateOutputType | null;
    _min: WalletAuditLogMinAggregateOutputType | null;
    _max: WalletAuditLogMaxAggregateOutputType | null;
};
type GetWalletAuditLogGroupByPayload<T extends WalletAuditLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<WalletAuditLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof WalletAuditLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], WalletAuditLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], WalletAuditLogGroupByOutputType[P]>;
}>>;
export type WalletAuditLogWhereInput = {
    AND?: Prisma.WalletAuditLogWhereInput | Prisma.WalletAuditLogWhereInput[];
    OR?: Prisma.WalletAuditLogWhereInput[];
    NOT?: Prisma.WalletAuditLogWhereInput | Prisma.WalletAuditLogWhereInput[];
    id?: Prisma.StringFilter<"WalletAuditLog"> | string;
    walletId?: Prisma.StringFilter<"WalletAuditLog"> | string;
    actorUserId?: Prisma.StringNullableFilter<"WalletAuditLog"> | string | null;
    actorAdminId?: Prisma.StringNullableFilter<"WalletAuditLog"> | string | null;
    action?: Prisma.StringFilter<"WalletAuditLog"> | string;
    previousValues?: Prisma.JsonNullableFilter<"WalletAuditLog">;
    newValues?: Prisma.JsonNullableFilter<"WalletAuditLog">;
    referenceType?: Prisma.StringNullableFilter<"WalletAuditLog"> | string | null;
    referenceId?: Prisma.StringNullableFilter<"WalletAuditLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"WalletAuditLog"> | Date | string;
    wallet?: Prisma.XOR<Prisma.WalletScalarRelationFilter, Prisma.WalletWhereInput>;
};
export type WalletAuditLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    actorUserId?: Prisma.SortOrderInput | Prisma.SortOrder;
    actorAdminId?: Prisma.SortOrderInput | Prisma.SortOrder;
    action?: Prisma.SortOrder;
    previousValues?: Prisma.SortOrderInput | Prisma.SortOrder;
    newValues?: Prisma.SortOrderInput | Prisma.SortOrder;
    referenceType?: Prisma.SortOrderInput | Prisma.SortOrder;
    referenceId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    wallet?: Prisma.WalletOrderByWithRelationInput;
};
export type WalletAuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.WalletAuditLogWhereInput | Prisma.WalletAuditLogWhereInput[];
    OR?: Prisma.WalletAuditLogWhereInput[];
    NOT?: Prisma.WalletAuditLogWhereInput | Prisma.WalletAuditLogWhereInput[];
    walletId?: Prisma.StringFilter<"WalletAuditLog"> | string;
    actorUserId?: Prisma.StringNullableFilter<"WalletAuditLog"> | string | null;
    actorAdminId?: Prisma.StringNullableFilter<"WalletAuditLog"> | string | null;
    action?: Prisma.StringFilter<"WalletAuditLog"> | string;
    previousValues?: Prisma.JsonNullableFilter<"WalletAuditLog">;
    newValues?: Prisma.JsonNullableFilter<"WalletAuditLog">;
    referenceType?: Prisma.StringNullableFilter<"WalletAuditLog"> | string | null;
    referenceId?: Prisma.StringNullableFilter<"WalletAuditLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"WalletAuditLog"> | Date | string;
    wallet?: Prisma.XOR<Prisma.WalletScalarRelationFilter, Prisma.WalletWhereInput>;
}, "id">;
export type WalletAuditLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    actorUserId?: Prisma.SortOrderInput | Prisma.SortOrder;
    actorAdminId?: Prisma.SortOrderInput | Prisma.SortOrder;
    action?: Prisma.SortOrder;
    previousValues?: Prisma.SortOrderInput | Prisma.SortOrder;
    newValues?: Prisma.SortOrderInput | Prisma.SortOrder;
    referenceType?: Prisma.SortOrderInput | Prisma.SortOrder;
    referenceId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.WalletAuditLogCountOrderByAggregateInput;
    _max?: Prisma.WalletAuditLogMaxOrderByAggregateInput;
    _min?: Prisma.WalletAuditLogMinOrderByAggregateInput;
};
export type WalletAuditLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.WalletAuditLogScalarWhereWithAggregatesInput | Prisma.WalletAuditLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.WalletAuditLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.WalletAuditLogScalarWhereWithAggregatesInput | Prisma.WalletAuditLogScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"WalletAuditLog"> | string;
    walletId?: Prisma.StringWithAggregatesFilter<"WalletAuditLog"> | string;
    actorUserId?: Prisma.StringNullableWithAggregatesFilter<"WalletAuditLog"> | string | null;
    actorAdminId?: Prisma.StringNullableWithAggregatesFilter<"WalletAuditLog"> | string | null;
    action?: Prisma.StringWithAggregatesFilter<"WalletAuditLog"> | string;
    previousValues?: Prisma.JsonNullableWithAggregatesFilter<"WalletAuditLog">;
    newValues?: Prisma.JsonNullableWithAggregatesFilter<"WalletAuditLog">;
    referenceType?: Prisma.StringNullableWithAggregatesFilter<"WalletAuditLog"> | string | null;
    referenceId?: Prisma.StringNullableWithAggregatesFilter<"WalletAuditLog"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"WalletAuditLog"> | Date | string;
};
export type WalletAuditLogCreateInput = {
    id?: string;
    actorUserId?: string | null;
    actorAdminId?: string | null;
    action: string;
    previousValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    referenceType?: string | null;
    referenceId?: string | null;
    createdAt?: Date | string;
    wallet: Prisma.WalletCreateNestedOneWithoutAuditLogsInput;
};
export type WalletAuditLogUncheckedCreateInput = {
    id?: string;
    walletId: string;
    actorUserId?: string | null;
    actorAdminId?: string | null;
    action: string;
    previousValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    referenceType?: string | null;
    referenceId?: string | null;
    createdAt?: Date | string;
};
export type WalletAuditLogUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actorUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    actorAdminId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    previousValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    referenceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    wallet?: Prisma.WalletUpdateOneRequiredWithoutAuditLogsNestedInput;
};
export type WalletAuditLogUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    walletId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    actorAdminId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    previousValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    referenceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WalletAuditLogCreateManyInput = {
    id?: string;
    walletId: string;
    actorUserId?: string | null;
    actorAdminId?: string | null;
    action: string;
    previousValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    referenceType?: string | null;
    referenceId?: string | null;
    createdAt?: Date | string;
};
export type WalletAuditLogUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actorUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    actorAdminId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    previousValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    referenceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WalletAuditLogUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    walletId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    actorAdminId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    previousValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    referenceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WalletAuditLogListRelationFilter = {
    every?: Prisma.WalletAuditLogWhereInput;
    some?: Prisma.WalletAuditLogWhereInput;
    none?: Prisma.WalletAuditLogWhereInput;
};
export type WalletAuditLogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type WalletAuditLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    actorUserId?: Prisma.SortOrder;
    actorAdminId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    previousValues?: Prisma.SortOrder;
    newValues?: Prisma.SortOrder;
    referenceType?: Prisma.SortOrder;
    referenceId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type WalletAuditLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    actorUserId?: Prisma.SortOrder;
    actorAdminId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    referenceType?: Prisma.SortOrder;
    referenceId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type WalletAuditLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    actorUserId?: Prisma.SortOrder;
    actorAdminId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    referenceType?: Prisma.SortOrder;
    referenceId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type WalletAuditLogCreateNestedManyWithoutWalletInput = {
    create?: Prisma.XOR<Prisma.WalletAuditLogCreateWithoutWalletInput, Prisma.WalletAuditLogUncheckedCreateWithoutWalletInput> | Prisma.WalletAuditLogCreateWithoutWalletInput[] | Prisma.WalletAuditLogUncheckedCreateWithoutWalletInput[];
    connectOrCreate?: Prisma.WalletAuditLogCreateOrConnectWithoutWalletInput | Prisma.WalletAuditLogCreateOrConnectWithoutWalletInput[];
    createMany?: Prisma.WalletAuditLogCreateManyWalletInputEnvelope;
    connect?: Prisma.WalletAuditLogWhereUniqueInput | Prisma.WalletAuditLogWhereUniqueInput[];
};
export type WalletAuditLogUncheckedCreateNestedManyWithoutWalletInput = {
    create?: Prisma.XOR<Prisma.WalletAuditLogCreateWithoutWalletInput, Prisma.WalletAuditLogUncheckedCreateWithoutWalletInput> | Prisma.WalletAuditLogCreateWithoutWalletInput[] | Prisma.WalletAuditLogUncheckedCreateWithoutWalletInput[];
    connectOrCreate?: Prisma.WalletAuditLogCreateOrConnectWithoutWalletInput | Prisma.WalletAuditLogCreateOrConnectWithoutWalletInput[];
    createMany?: Prisma.WalletAuditLogCreateManyWalletInputEnvelope;
    connect?: Prisma.WalletAuditLogWhereUniqueInput | Prisma.WalletAuditLogWhereUniqueInput[];
};
export type WalletAuditLogUpdateManyWithoutWalletNestedInput = {
    create?: Prisma.XOR<Prisma.WalletAuditLogCreateWithoutWalletInput, Prisma.WalletAuditLogUncheckedCreateWithoutWalletInput> | Prisma.WalletAuditLogCreateWithoutWalletInput[] | Prisma.WalletAuditLogUncheckedCreateWithoutWalletInput[];
    connectOrCreate?: Prisma.WalletAuditLogCreateOrConnectWithoutWalletInput | Prisma.WalletAuditLogCreateOrConnectWithoutWalletInput[];
    upsert?: Prisma.WalletAuditLogUpsertWithWhereUniqueWithoutWalletInput | Prisma.WalletAuditLogUpsertWithWhereUniqueWithoutWalletInput[];
    createMany?: Prisma.WalletAuditLogCreateManyWalletInputEnvelope;
    set?: Prisma.WalletAuditLogWhereUniqueInput | Prisma.WalletAuditLogWhereUniqueInput[];
    disconnect?: Prisma.WalletAuditLogWhereUniqueInput | Prisma.WalletAuditLogWhereUniqueInput[];
    delete?: Prisma.WalletAuditLogWhereUniqueInput | Prisma.WalletAuditLogWhereUniqueInput[];
    connect?: Prisma.WalletAuditLogWhereUniqueInput | Prisma.WalletAuditLogWhereUniqueInput[];
    update?: Prisma.WalletAuditLogUpdateWithWhereUniqueWithoutWalletInput | Prisma.WalletAuditLogUpdateWithWhereUniqueWithoutWalletInput[];
    updateMany?: Prisma.WalletAuditLogUpdateManyWithWhereWithoutWalletInput | Prisma.WalletAuditLogUpdateManyWithWhereWithoutWalletInput[];
    deleteMany?: Prisma.WalletAuditLogScalarWhereInput | Prisma.WalletAuditLogScalarWhereInput[];
};
export type WalletAuditLogUncheckedUpdateManyWithoutWalletNestedInput = {
    create?: Prisma.XOR<Prisma.WalletAuditLogCreateWithoutWalletInput, Prisma.WalletAuditLogUncheckedCreateWithoutWalletInput> | Prisma.WalletAuditLogCreateWithoutWalletInput[] | Prisma.WalletAuditLogUncheckedCreateWithoutWalletInput[];
    connectOrCreate?: Prisma.WalletAuditLogCreateOrConnectWithoutWalletInput | Prisma.WalletAuditLogCreateOrConnectWithoutWalletInput[];
    upsert?: Prisma.WalletAuditLogUpsertWithWhereUniqueWithoutWalletInput | Prisma.WalletAuditLogUpsertWithWhereUniqueWithoutWalletInput[];
    createMany?: Prisma.WalletAuditLogCreateManyWalletInputEnvelope;
    set?: Prisma.WalletAuditLogWhereUniqueInput | Prisma.WalletAuditLogWhereUniqueInput[];
    disconnect?: Prisma.WalletAuditLogWhereUniqueInput | Prisma.WalletAuditLogWhereUniqueInput[];
    delete?: Prisma.WalletAuditLogWhereUniqueInput | Prisma.WalletAuditLogWhereUniqueInput[];
    connect?: Prisma.WalletAuditLogWhereUniqueInput | Prisma.WalletAuditLogWhereUniqueInput[];
    update?: Prisma.WalletAuditLogUpdateWithWhereUniqueWithoutWalletInput | Prisma.WalletAuditLogUpdateWithWhereUniqueWithoutWalletInput[];
    updateMany?: Prisma.WalletAuditLogUpdateManyWithWhereWithoutWalletInput | Prisma.WalletAuditLogUpdateManyWithWhereWithoutWalletInput[];
    deleteMany?: Prisma.WalletAuditLogScalarWhereInput | Prisma.WalletAuditLogScalarWhereInput[];
};
export type WalletAuditLogCreateWithoutWalletInput = {
    id?: string;
    actorUserId?: string | null;
    actorAdminId?: string | null;
    action: string;
    previousValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    referenceType?: string | null;
    referenceId?: string | null;
    createdAt?: Date | string;
};
export type WalletAuditLogUncheckedCreateWithoutWalletInput = {
    id?: string;
    actorUserId?: string | null;
    actorAdminId?: string | null;
    action: string;
    previousValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    referenceType?: string | null;
    referenceId?: string | null;
    createdAt?: Date | string;
};
export type WalletAuditLogCreateOrConnectWithoutWalletInput = {
    where: Prisma.WalletAuditLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.WalletAuditLogCreateWithoutWalletInput, Prisma.WalletAuditLogUncheckedCreateWithoutWalletInput>;
};
export type WalletAuditLogCreateManyWalletInputEnvelope = {
    data: Prisma.WalletAuditLogCreateManyWalletInput | Prisma.WalletAuditLogCreateManyWalletInput[];
    skipDuplicates?: boolean;
};
export type WalletAuditLogUpsertWithWhereUniqueWithoutWalletInput = {
    where: Prisma.WalletAuditLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.WalletAuditLogUpdateWithoutWalletInput, Prisma.WalletAuditLogUncheckedUpdateWithoutWalletInput>;
    create: Prisma.XOR<Prisma.WalletAuditLogCreateWithoutWalletInput, Prisma.WalletAuditLogUncheckedCreateWithoutWalletInput>;
};
export type WalletAuditLogUpdateWithWhereUniqueWithoutWalletInput = {
    where: Prisma.WalletAuditLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.WalletAuditLogUpdateWithoutWalletInput, Prisma.WalletAuditLogUncheckedUpdateWithoutWalletInput>;
};
export type WalletAuditLogUpdateManyWithWhereWithoutWalletInput = {
    where: Prisma.WalletAuditLogScalarWhereInput;
    data: Prisma.XOR<Prisma.WalletAuditLogUpdateManyMutationInput, Prisma.WalletAuditLogUncheckedUpdateManyWithoutWalletInput>;
};
export type WalletAuditLogScalarWhereInput = {
    AND?: Prisma.WalletAuditLogScalarWhereInput | Prisma.WalletAuditLogScalarWhereInput[];
    OR?: Prisma.WalletAuditLogScalarWhereInput[];
    NOT?: Prisma.WalletAuditLogScalarWhereInput | Prisma.WalletAuditLogScalarWhereInput[];
    id?: Prisma.StringFilter<"WalletAuditLog"> | string;
    walletId?: Prisma.StringFilter<"WalletAuditLog"> | string;
    actorUserId?: Prisma.StringNullableFilter<"WalletAuditLog"> | string | null;
    actorAdminId?: Prisma.StringNullableFilter<"WalletAuditLog"> | string | null;
    action?: Prisma.StringFilter<"WalletAuditLog"> | string;
    previousValues?: Prisma.JsonNullableFilter<"WalletAuditLog">;
    newValues?: Prisma.JsonNullableFilter<"WalletAuditLog">;
    referenceType?: Prisma.StringNullableFilter<"WalletAuditLog"> | string | null;
    referenceId?: Prisma.StringNullableFilter<"WalletAuditLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"WalletAuditLog"> | Date | string;
};
export type WalletAuditLogCreateManyWalletInput = {
    id?: string;
    actorUserId?: string | null;
    actorAdminId?: string | null;
    action: string;
    previousValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    referenceType?: string | null;
    referenceId?: string | null;
    createdAt?: Date | string;
};
export type WalletAuditLogUpdateWithoutWalletInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actorUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    actorAdminId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    previousValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    referenceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WalletAuditLogUncheckedUpdateWithoutWalletInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actorUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    actorAdminId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    previousValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    referenceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WalletAuditLogUncheckedUpdateManyWithoutWalletInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actorUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    actorAdminId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    previousValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    referenceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WalletAuditLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    walletId?: boolean;
    actorUserId?: boolean;
    actorAdminId?: boolean;
    action?: boolean;
    previousValues?: boolean;
    newValues?: boolean;
    referenceType?: boolean;
    referenceId?: boolean;
    createdAt?: boolean;
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["walletAuditLog"]>;
export type WalletAuditLogSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    walletId?: boolean;
    actorUserId?: boolean;
    actorAdminId?: boolean;
    action?: boolean;
    previousValues?: boolean;
    newValues?: boolean;
    referenceType?: boolean;
    referenceId?: boolean;
    createdAt?: boolean;
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["walletAuditLog"]>;
export type WalletAuditLogSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    walletId?: boolean;
    actorUserId?: boolean;
    actorAdminId?: boolean;
    action?: boolean;
    previousValues?: boolean;
    newValues?: boolean;
    referenceType?: boolean;
    referenceId?: boolean;
    createdAt?: boolean;
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["walletAuditLog"]>;
export type WalletAuditLogSelectScalar = {
    id?: boolean;
    walletId?: boolean;
    actorUserId?: boolean;
    actorAdminId?: boolean;
    action?: boolean;
    previousValues?: boolean;
    newValues?: boolean;
    referenceType?: boolean;
    referenceId?: boolean;
    createdAt?: boolean;
};
export type WalletAuditLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "walletId" | "actorUserId" | "actorAdminId" | "action" | "previousValues" | "newValues" | "referenceType" | "referenceId" | "createdAt", ExtArgs["result"]["walletAuditLog"]>;
export type WalletAuditLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
};
export type WalletAuditLogIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
};
export type WalletAuditLogIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
};
export type $WalletAuditLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "WalletAuditLog";
    objects: {
        wallet: Prisma.$WalletPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        walletId: string;
        actorUserId: string | null;
        actorAdminId: string | null;
        action: string;
        previousValues: runtime.JsonValue | null;
        newValues: runtime.JsonValue | null;
        referenceType: string | null;
        referenceId: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["walletAuditLog"]>;
    composites: {};
};
export type WalletAuditLogGetPayload<S extends boolean | null | undefined | WalletAuditLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$WalletAuditLogPayload, S>;
export type WalletAuditLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<WalletAuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WalletAuditLogCountAggregateInputType | true;
};
export interface WalletAuditLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['WalletAuditLog'];
        meta: {
            name: 'WalletAuditLog';
        };
    };
    findUnique<T extends WalletAuditLogFindUniqueArgs>(args: Prisma.SelectSubset<T, WalletAuditLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__WalletAuditLogClient<runtime.Types.Result.GetResult<Prisma.$WalletAuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends WalletAuditLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, WalletAuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__WalletAuditLogClient<runtime.Types.Result.GetResult<Prisma.$WalletAuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends WalletAuditLogFindFirstArgs>(args?: Prisma.SelectSubset<T, WalletAuditLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__WalletAuditLogClient<runtime.Types.Result.GetResult<Prisma.$WalletAuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends WalletAuditLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, WalletAuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__WalletAuditLogClient<runtime.Types.Result.GetResult<Prisma.$WalletAuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends WalletAuditLogFindManyArgs>(args?: Prisma.SelectSubset<T, WalletAuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WalletAuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends WalletAuditLogCreateArgs>(args: Prisma.SelectSubset<T, WalletAuditLogCreateArgs<ExtArgs>>): Prisma.Prisma__WalletAuditLogClient<runtime.Types.Result.GetResult<Prisma.$WalletAuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends WalletAuditLogCreateManyArgs>(args?: Prisma.SelectSubset<T, WalletAuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends WalletAuditLogCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, WalletAuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WalletAuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends WalletAuditLogDeleteArgs>(args: Prisma.SelectSubset<T, WalletAuditLogDeleteArgs<ExtArgs>>): Prisma.Prisma__WalletAuditLogClient<runtime.Types.Result.GetResult<Prisma.$WalletAuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends WalletAuditLogUpdateArgs>(args: Prisma.SelectSubset<T, WalletAuditLogUpdateArgs<ExtArgs>>): Prisma.Prisma__WalletAuditLogClient<runtime.Types.Result.GetResult<Prisma.$WalletAuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends WalletAuditLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, WalletAuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends WalletAuditLogUpdateManyArgs>(args: Prisma.SelectSubset<T, WalletAuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends WalletAuditLogUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, WalletAuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WalletAuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends WalletAuditLogUpsertArgs>(args: Prisma.SelectSubset<T, WalletAuditLogUpsertArgs<ExtArgs>>): Prisma.Prisma__WalletAuditLogClient<runtime.Types.Result.GetResult<Prisma.$WalletAuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends WalletAuditLogCountArgs>(args?: Prisma.Subset<T, WalletAuditLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], WalletAuditLogCountAggregateOutputType> : number>;
    aggregate<T extends WalletAuditLogAggregateArgs>(args: Prisma.Subset<T, WalletAuditLogAggregateArgs>): Prisma.PrismaPromise<GetWalletAuditLogAggregateType<T>>;
    groupBy<T extends WalletAuditLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: WalletAuditLogGroupByArgs['orderBy'];
    } : {
        orderBy?: WalletAuditLogGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, WalletAuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWalletAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: WalletAuditLogFieldRefs;
}
export interface Prisma__WalletAuditLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    wallet<T extends Prisma.WalletDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WalletDefaultArgs<ExtArgs>>): Prisma.Prisma__WalletClient<runtime.Types.Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface WalletAuditLogFieldRefs {
    readonly id: Prisma.FieldRef<"WalletAuditLog", 'String'>;
    readonly walletId: Prisma.FieldRef<"WalletAuditLog", 'String'>;
    readonly actorUserId: Prisma.FieldRef<"WalletAuditLog", 'String'>;
    readonly actorAdminId: Prisma.FieldRef<"WalletAuditLog", 'String'>;
    readonly action: Prisma.FieldRef<"WalletAuditLog", 'String'>;
    readonly previousValues: Prisma.FieldRef<"WalletAuditLog", 'Json'>;
    readonly newValues: Prisma.FieldRef<"WalletAuditLog", 'Json'>;
    readonly referenceType: Prisma.FieldRef<"WalletAuditLog", 'String'>;
    readonly referenceId: Prisma.FieldRef<"WalletAuditLog", 'String'>;
    readonly createdAt: Prisma.FieldRef<"WalletAuditLog", 'DateTime'>;
}
export type WalletAuditLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.WalletAuditLogOmit<ExtArgs> | null;
    include?: Prisma.WalletAuditLogInclude<ExtArgs> | null;
    where: Prisma.WalletAuditLogWhereUniqueInput;
};
export type WalletAuditLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.WalletAuditLogOmit<ExtArgs> | null;
    include?: Prisma.WalletAuditLogInclude<ExtArgs> | null;
    where: Prisma.WalletAuditLogWhereUniqueInput;
};
export type WalletAuditLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type WalletAuditLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type WalletAuditLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type WalletAuditLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.WalletAuditLogOmit<ExtArgs> | null;
    include?: Prisma.WalletAuditLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WalletAuditLogCreateInput, Prisma.WalletAuditLogUncheckedCreateInput>;
};
export type WalletAuditLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.WalletAuditLogCreateManyInput | Prisma.WalletAuditLogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type WalletAuditLogCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletAuditLogSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WalletAuditLogOmit<ExtArgs> | null;
    data: Prisma.WalletAuditLogCreateManyInput | Prisma.WalletAuditLogCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.WalletAuditLogIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type WalletAuditLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.WalletAuditLogOmit<ExtArgs> | null;
    include?: Prisma.WalletAuditLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WalletAuditLogUpdateInput, Prisma.WalletAuditLogUncheckedUpdateInput>;
    where: Prisma.WalletAuditLogWhereUniqueInput;
};
export type WalletAuditLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.WalletAuditLogUpdateManyMutationInput, Prisma.WalletAuditLogUncheckedUpdateManyInput>;
    where?: Prisma.WalletAuditLogWhereInput;
    limit?: number;
};
export type WalletAuditLogUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletAuditLogSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WalletAuditLogOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WalletAuditLogUpdateManyMutationInput, Prisma.WalletAuditLogUncheckedUpdateManyInput>;
    where?: Prisma.WalletAuditLogWhereInput;
    limit?: number;
    include?: Prisma.WalletAuditLogIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type WalletAuditLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.WalletAuditLogOmit<ExtArgs> | null;
    include?: Prisma.WalletAuditLogInclude<ExtArgs> | null;
    where: Prisma.WalletAuditLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.WalletAuditLogCreateInput, Prisma.WalletAuditLogUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.WalletAuditLogUpdateInput, Prisma.WalletAuditLogUncheckedUpdateInput>;
};
export type WalletAuditLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.WalletAuditLogOmit<ExtArgs> | null;
    include?: Prisma.WalletAuditLogInclude<ExtArgs> | null;
    where: Prisma.WalletAuditLogWhereUniqueInput;
};
export type WalletAuditLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WalletAuditLogWhereInput;
    limit?: number;
};
export type WalletAuditLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.WalletAuditLogOmit<ExtArgs> | null;
    include?: Prisma.WalletAuditLogInclude<ExtArgs> | null;
};
export {};
