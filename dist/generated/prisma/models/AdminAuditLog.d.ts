import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
export type AdminAuditLogModel = runtime.Types.Result.DefaultSelection<Prisma.$AdminAuditLogPayload>;
export type AggregateAdminAuditLog = {
    _count: AdminAuditLogCountAggregateOutputType | null;
    _min: AdminAuditLogMinAggregateOutputType | null;
    _max: AdminAuditLogMaxAggregateOutputType | null;
};
export type AdminAuditLogMinAggregateOutputType = {
    id: string | null;
    adminId: string | null;
    action: string | null;
    entityType: string | null;
    entityId: string | null;
    ipAddress: string | null;
    userAgent: string | null;
    createdAt: Date | null;
};
export type AdminAuditLogMaxAggregateOutputType = {
    id: string | null;
    adminId: string | null;
    action: string | null;
    entityType: string | null;
    entityId: string | null;
    ipAddress: string | null;
    userAgent: string | null;
    createdAt: Date | null;
};
export type AdminAuditLogCountAggregateOutputType = {
    id: number;
    adminId: number;
    action: number;
    entityType: number;
    entityId: number;
    previousValues: number;
    newValues: number;
    ipAddress: number;
    userAgent: number;
    createdAt: number;
    _all: number;
};
export type AdminAuditLogMinAggregateInputType = {
    id?: true;
    adminId?: true;
    action?: true;
    entityType?: true;
    entityId?: true;
    ipAddress?: true;
    userAgent?: true;
    createdAt?: true;
};
export type AdminAuditLogMaxAggregateInputType = {
    id?: true;
    adminId?: true;
    action?: true;
    entityType?: true;
    entityId?: true;
    ipAddress?: true;
    userAgent?: true;
    createdAt?: true;
};
export type AdminAuditLogCountAggregateInputType = {
    id?: true;
    adminId?: true;
    action?: true;
    entityType?: true;
    entityId?: true;
    previousValues?: true;
    newValues?: true;
    ipAddress?: true;
    userAgent?: true;
    createdAt?: true;
    _all?: true;
};
export type AdminAuditLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AdminAuditLogWhereInput;
    orderBy?: Prisma.AdminAuditLogOrderByWithRelationInput | Prisma.AdminAuditLogOrderByWithRelationInput[];
    cursor?: Prisma.AdminAuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AdminAuditLogCountAggregateInputType;
    _min?: AdminAuditLogMinAggregateInputType;
    _max?: AdminAuditLogMaxAggregateInputType;
};
export type GetAdminAuditLogAggregateType<T extends AdminAuditLogAggregateArgs> = {
    [P in keyof T & keyof AggregateAdminAuditLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAdminAuditLog[P]> : Prisma.GetScalarType<T[P], AggregateAdminAuditLog[P]>;
};
export type AdminAuditLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AdminAuditLogWhereInput;
    orderBy?: Prisma.AdminAuditLogOrderByWithAggregationInput | Prisma.AdminAuditLogOrderByWithAggregationInput[];
    by: Prisma.AdminAuditLogScalarFieldEnum[] | Prisma.AdminAuditLogScalarFieldEnum;
    having?: Prisma.AdminAuditLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AdminAuditLogCountAggregateInputType | true;
    _min?: AdminAuditLogMinAggregateInputType;
    _max?: AdminAuditLogMaxAggregateInputType;
};
export type AdminAuditLogGroupByOutputType = {
    id: string;
    adminId: string;
    action: string;
    entityType: string;
    entityId: string | null;
    previousValues: runtime.JsonValue | null;
    newValues: runtime.JsonValue | null;
    ipAddress: string | null;
    userAgent: string | null;
    createdAt: Date;
    _count: AdminAuditLogCountAggregateOutputType | null;
    _min: AdminAuditLogMinAggregateOutputType | null;
    _max: AdminAuditLogMaxAggregateOutputType | null;
};
type GetAdminAuditLogGroupByPayload<T extends AdminAuditLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AdminAuditLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AdminAuditLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AdminAuditLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AdminAuditLogGroupByOutputType[P]>;
}>>;
export type AdminAuditLogWhereInput = {
    AND?: Prisma.AdminAuditLogWhereInput | Prisma.AdminAuditLogWhereInput[];
    OR?: Prisma.AdminAuditLogWhereInput[];
    NOT?: Prisma.AdminAuditLogWhereInput | Prisma.AdminAuditLogWhereInput[];
    id?: Prisma.StringFilter<"AdminAuditLog"> | string;
    adminId?: Prisma.StringFilter<"AdminAuditLog"> | string;
    action?: Prisma.StringFilter<"AdminAuditLog"> | string;
    entityType?: Prisma.StringFilter<"AdminAuditLog"> | string;
    entityId?: Prisma.StringNullableFilter<"AdminAuditLog"> | string | null;
    previousValues?: Prisma.JsonNullableFilter<"AdminAuditLog">;
    newValues?: Prisma.JsonNullableFilter<"AdminAuditLog">;
    ipAddress?: Prisma.StringNullableFilter<"AdminAuditLog"> | string | null;
    userAgent?: Prisma.StringNullableFilter<"AdminAuditLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"AdminAuditLog"> | Date | string;
    admin?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type AdminAuditLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    adminId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    entityType?: Prisma.SortOrder;
    entityId?: Prisma.SortOrderInput | Prisma.SortOrder;
    previousValues?: Prisma.SortOrderInput | Prisma.SortOrder;
    newValues?: Prisma.SortOrderInput | Prisma.SortOrder;
    ipAddress?: Prisma.SortOrderInput | Prisma.SortOrder;
    userAgent?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    admin?: Prisma.UserOrderByWithRelationInput;
};
export type AdminAuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.AdminAuditLogWhereInput | Prisma.AdminAuditLogWhereInput[];
    OR?: Prisma.AdminAuditLogWhereInput[];
    NOT?: Prisma.AdminAuditLogWhereInput | Prisma.AdminAuditLogWhereInput[];
    adminId?: Prisma.StringFilter<"AdminAuditLog"> | string;
    action?: Prisma.StringFilter<"AdminAuditLog"> | string;
    entityType?: Prisma.StringFilter<"AdminAuditLog"> | string;
    entityId?: Prisma.StringNullableFilter<"AdminAuditLog"> | string | null;
    previousValues?: Prisma.JsonNullableFilter<"AdminAuditLog">;
    newValues?: Prisma.JsonNullableFilter<"AdminAuditLog">;
    ipAddress?: Prisma.StringNullableFilter<"AdminAuditLog"> | string | null;
    userAgent?: Prisma.StringNullableFilter<"AdminAuditLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"AdminAuditLog"> | Date | string;
    admin?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type AdminAuditLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    adminId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    entityType?: Prisma.SortOrder;
    entityId?: Prisma.SortOrderInput | Prisma.SortOrder;
    previousValues?: Prisma.SortOrderInput | Prisma.SortOrder;
    newValues?: Prisma.SortOrderInput | Prisma.SortOrder;
    ipAddress?: Prisma.SortOrderInput | Prisma.SortOrder;
    userAgent?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.AdminAuditLogCountOrderByAggregateInput;
    _max?: Prisma.AdminAuditLogMaxOrderByAggregateInput;
    _min?: Prisma.AdminAuditLogMinOrderByAggregateInput;
};
export type AdminAuditLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.AdminAuditLogScalarWhereWithAggregatesInput | Prisma.AdminAuditLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.AdminAuditLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AdminAuditLogScalarWhereWithAggregatesInput | Prisma.AdminAuditLogScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"AdminAuditLog"> | string;
    adminId?: Prisma.StringWithAggregatesFilter<"AdminAuditLog"> | string;
    action?: Prisma.StringWithAggregatesFilter<"AdminAuditLog"> | string;
    entityType?: Prisma.StringWithAggregatesFilter<"AdminAuditLog"> | string;
    entityId?: Prisma.StringNullableWithAggregatesFilter<"AdminAuditLog"> | string | null;
    previousValues?: Prisma.JsonNullableWithAggregatesFilter<"AdminAuditLog">;
    newValues?: Prisma.JsonNullableWithAggregatesFilter<"AdminAuditLog">;
    ipAddress?: Prisma.StringNullableWithAggregatesFilter<"AdminAuditLog"> | string | null;
    userAgent?: Prisma.StringNullableWithAggregatesFilter<"AdminAuditLog"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"AdminAuditLog"> | Date | string;
};
export type AdminAuditLogCreateInput = {
    id?: string;
    action: string;
    entityType: string;
    entityId?: string | null;
    previousValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt?: Date | string;
    admin: Prisma.UserCreateNestedOneWithoutAdminAuditLogsInput;
};
export type AdminAuditLogUncheckedCreateInput = {
    id?: string;
    adminId: string;
    action: string;
    entityType: string;
    entityId?: string | null;
    previousValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt?: Date | string;
};
export type AdminAuditLogUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    previousValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    admin?: Prisma.UserUpdateOneRequiredWithoutAdminAuditLogsNestedInput;
};
export type AdminAuditLogUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    adminId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    previousValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AdminAuditLogCreateManyInput = {
    id?: string;
    adminId: string;
    action: string;
    entityType: string;
    entityId?: string | null;
    previousValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt?: Date | string;
};
export type AdminAuditLogUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    previousValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AdminAuditLogUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    adminId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    previousValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AdminAuditLogListRelationFilter = {
    every?: Prisma.AdminAuditLogWhereInput;
    some?: Prisma.AdminAuditLogWhereInput;
    none?: Prisma.AdminAuditLogWhereInput;
};
export type AdminAuditLogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AdminAuditLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    adminId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    entityType?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    previousValues?: Prisma.SortOrder;
    newValues?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AdminAuditLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    adminId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    entityType?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AdminAuditLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    adminId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    entityType?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AdminAuditLogCreateNestedManyWithoutAdminInput = {
    create?: Prisma.XOR<Prisma.AdminAuditLogCreateWithoutAdminInput, Prisma.AdminAuditLogUncheckedCreateWithoutAdminInput> | Prisma.AdminAuditLogCreateWithoutAdminInput[] | Prisma.AdminAuditLogUncheckedCreateWithoutAdminInput[];
    connectOrCreate?: Prisma.AdminAuditLogCreateOrConnectWithoutAdminInput | Prisma.AdminAuditLogCreateOrConnectWithoutAdminInput[];
    createMany?: Prisma.AdminAuditLogCreateManyAdminInputEnvelope;
    connect?: Prisma.AdminAuditLogWhereUniqueInput | Prisma.AdminAuditLogWhereUniqueInput[];
};
export type AdminAuditLogUncheckedCreateNestedManyWithoutAdminInput = {
    create?: Prisma.XOR<Prisma.AdminAuditLogCreateWithoutAdminInput, Prisma.AdminAuditLogUncheckedCreateWithoutAdminInput> | Prisma.AdminAuditLogCreateWithoutAdminInput[] | Prisma.AdminAuditLogUncheckedCreateWithoutAdminInput[];
    connectOrCreate?: Prisma.AdminAuditLogCreateOrConnectWithoutAdminInput | Prisma.AdminAuditLogCreateOrConnectWithoutAdminInput[];
    createMany?: Prisma.AdminAuditLogCreateManyAdminInputEnvelope;
    connect?: Prisma.AdminAuditLogWhereUniqueInput | Prisma.AdminAuditLogWhereUniqueInput[];
};
export type AdminAuditLogUpdateManyWithoutAdminNestedInput = {
    create?: Prisma.XOR<Prisma.AdminAuditLogCreateWithoutAdminInput, Prisma.AdminAuditLogUncheckedCreateWithoutAdminInput> | Prisma.AdminAuditLogCreateWithoutAdminInput[] | Prisma.AdminAuditLogUncheckedCreateWithoutAdminInput[];
    connectOrCreate?: Prisma.AdminAuditLogCreateOrConnectWithoutAdminInput | Prisma.AdminAuditLogCreateOrConnectWithoutAdminInput[];
    upsert?: Prisma.AdminAuditLogUpsertWithWhereUniqueWithoutAdminInput | Prisma.AdminAuditLogUpsertWithWhereUniqueWithoutAdminInput[];
    createMany?: Prisma.AdminAuditLogCreateManyAdminInputEnvelope;
    set?: Prisma.AdminAuditLogWhereUniqueInput | Prisma.AdminAuditLogWhereUniqueInput[];
    disconnect?: Prisma.AdminAuditLogWhereUniqueInput | Prisma.AdminAuditLogWhereUniqueInput[];
    delete?: Prisma.AdminAuditLogWhereUniqueInput | Prisma.AdminAuditLogWhereUniqueInput[];
    connect?: Prisma.AdminAuditLogWhereUniqueInput | Prisma.AdminAuditLogWhereUniqueInput[];
    update?: Prisma.AdminAuditLogUpdateWithWhereUniqueWithoutAdminInput | Prisma.AdminAuditLogUpdateWithWhereUniqueWithoutAdminInput[];
    updateMany?: Prisma.AdminAuditLogUpdateManyWithWhereWithoutAdminInput | Prisma.AdminAuditLogUpdateManyWithWhereWithoutAdminInput[];
    deleteMany?: Prisma.AdminAuditLogScalarWhereInput | Prisma.AdminAuditLogScalarWhereInput[];
};
export type AdminAuditLogUncheckedUpdateManyWithoutAdminNestedInput = {
    create?: Prisma.XOR<Prisma.AdminAuditLogCreateWithoutAdminInput, Prisma.AdminAuditLogUncheckedCreateWithoutAdminInput> | Prisma.AdminAuditLogCreateWithoutAdminInput[] | Prisma.AdminAuditLogUncheckedCreateWithoutAdminInput[];
    connectOrCreate?: Prisma.AdminAuditLogCreateOrConnectWithoutAdminInput | Prisma.AdminAuditLogCreateOrConnectWithoutAdminInput[];
    upsert?: Prisma.AdminAuditLogUpsertWithWhereUniqueWithoutAdminInput | Prisma.AdminAuditLogUpsertWithWhereUniqueWithoutAdminInput[];
    createMany?: Prisma.AdminAuditLogCreateManyAdminInputEnvelope;
    set?: Prisma.AdminAuditLogWhereUniqueInput | Prisma.AdminAuditLogWhereUniqueInput[];
    disconnect?: Prisma.AdminAuditLogWhereUniqueInput | Prisma.AdminAuditLogWhereUniqueInput[];
    delete?: Prisma.AdminAuditLogWhereUniqueInput | Prisma.AdminAuditLogWhereUniqueInput[];
    connect?: Prisma.AdminAuditLogWhereUniqueInput | Prisma.AdminAuditLogWhereUniqueInput[];
    update?: Prisma.AdminAuditLogUpdateWithWhereUniqueWithoutAdminInput | Prisma.AdminAuditLogUpdateWithWhereUniqueWithoutAdminInput[];
    updateMany?: Prisma.AdminAuditLogUpdateManyWithWhereWithoutAdminInput | Prisma.AdminAuditLogUpdateManyWithWhereWithoutAdminInput[];
    deleteMany?: Prisma.AdminAuditLogScalarWhereInput | Prisma.AdminAuditLogScalarWhereInput[];
};
export type AdminAuditLogCreateWithoutAdminInput = {
    id?: string;
    action: string;
    entityType: string;
    entityId?: string | null;
    previousValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt?: Date | string;
};
export type AdminAuditLogUncheckedCreateWithoutAdminInput = {
    id?: string;
    action: string;
    entityType: string;
    entityId?: string | null;
    previousValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt?: Date | string;
};
export type AdminAuditLogCreateOrConnectWithoutAdminInput = {
    where: Prisma.AdminAuditLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.AdminAuditLogCreateWithoutAdminInput, Prisma.AdminAuditLogUncheckedCreateWithoutAdminInput>;
};
export type AdminAuditLogCreateManyAdminInputEnvelope = {
    data: Prisma.AdminAuditLogCreateManyAdminInput | Prisma.AdminAuditLogCreateManyAdminInput[];
    skipDuplicates?: boolean;
};
export type AdminAuditLogUpsertWithWhereUniqueWithoutAdminInput = {
    where: Prisma.AdminAuditLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.AdminAuditLogUpdateWithoutAdminInput, Prisma.AdminAuditLogUncheckedUpdateWithoutAdminInput>;
    create: Prisma.XOR<Prisma.AdminAuditLogCreateWithoutAdminInput, Prisma.AdminAuditLogUncheckedCreateWithoutAdminInput>;
};
export type AdminAuditLogUpdateWithWhereUniqueWithoutAdminInput = {
    where: Prisma.AdminAuditLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.AdminAuditLogUpdateWithoutAdminInput, Prisma.AdminAuditLogUncheckedUpdateWithoutAdminInput>;
};
export type AdminAuditLogUpdateManyWithWhereWithoutAdminInput = {
    where: Prisma.AdminAuditLogScalarWhereInput;
    data: Prisma.XOR<Prisma.AdminAuditLogUpdateManyMutationInput, Prisma.AdminAuditLogUncheckedUpdateManyWithoutAdminInput>;
};
export type AdminAuditLogScalarWhereInput = {
    AND?: Prisma.AdminAuditLogScalarWhereInput | Prisma.AdminAuditLogScalarWhereInput[];
    OR?: Prisma.AdminAuditLogScalarWhereInput[];
    NOT?: Prisma.AdminAuditLogScalarWhereInput | Prisma.AdminAuditLogScalarWhereInput[];
    id?: Prisma.StringFilter<"AdminAuditLog"> | string;
    adminId?: Prisma.StringFilter<"AdminAuditLog"> | string;
    action?: Prisma.StringFilter<"AdminAuditLog"> | string;
    entityType?: Prisma.StringFilter<"AdminAuditLog"> | string;
    entityId?: Prisma.StringNullableFilter<"AdminAuditLog"> | string | null;
    previousValues?: Prisma.JsonNullableFilter<"AdminAuditLog">;
    newValues?: Prisma.JsonNullableFilter<"AdminAuditLog">;
    ipAddress?: Prisma.StringNullableFilter<"AdminAuditLog"> | string | null;
    userAgent?: Prisma.StringNullableFilter<"AdminAuditLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"AdminAuditLog"> | Date | string;
};
export type AdminAuditLogCreateManyAdminInput = {
    id?: string;
    action: string;
    entityType: string;
    entityId?: string | null;
    previousValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt?: Date | string;
};
export type AdminAuditLogUpdateWithoutAdminInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    previousValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AdminAuditLogUncheckedUpdateWithoutAdminInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    previousValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AdminAuditLogUncheckedUpdateManyWithoutAdminInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    previousValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AdminAuditLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    adminId?: boolean;
    action?: boolean;
    entityType?: boolean;
    entityId?: boolean;
    previousValues?: boolean;
    newValues?: boolean;
    ipAddress?: boolean;
    userAgent?: boolean;
    createdAt?: boolean;
    admin?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["adminAuditLog"]>;
export type AdminAuditLogSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    adminId?: boolean;
    action?: boolean;
    entityType?: boolean;
    entityId?: boolean;
    previousValues?: boolean;
    newValues?: boolean;
    ipAddress?: boolean;
    userAgent?: boolean;
    createdAt?: boolean;
    admin?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["adminAuditLog"]>;
export type AdminAuditLogSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    adminId?: boolean;
    action?: boolean;
    entityType?: boolean;
    entityId?: boolean;
    previousValues?: boolean;
    newValues?: boolean;
    ipAddress?: boolean;
    userAgent?: boolean;
    createdAt?: boolean;
    admin?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["adminAuditLog"]>;
export type AdminAuditLogSelectScalar = {
    id?: boolean;
    adminId?: boolean;
    action?: boolean;
    entityType?: boolean;
    entityId?: boolean;
    previousValues?: boolean;
    newValues?: boolean;
    ipAddress?: boolean;
    userAgent?: boolean;
    createdAt?: boolean;
};
export type AdminAuditLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "adminId" | "action" | "entityType" | "entityId" | "previousValues" | "newValues" | "ipAddress" | "userAgent" | "createdAt", ExtArgs["result"]["adminAuditLog"]>;
export type AdminAuditLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    admin?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type AdminAuditLogIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    admin?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type AdminAuditLogIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    admin?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $AdminAuditLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AdminAuditLog";
    objects: {
        admin: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        adminId: string;
        action: string;
        entityType: string;
        entityId: string | null;
        previousValues: runtime.JsonValue | null;
        newValues: runtime.JsonValue | null;
        ipAddress: string | null;
        userAgent: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["adminAuditLog"]>;
    composites: {};
};
export type AdminAuditLogGetPayload<S extends boolean | null | undefined | AdminAuditLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AdminAuditLogPayload, S>;
export type AdminAuditLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AdminAuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AdminAuditLogCountAggregateInputType | true;
};
export interface AdminAuditLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AdminAuditLog'];
        meta: {
            name: 'AdminAuditLog';
        };
    };
    findUnique<T extends AdminAuditLogFindUniqueArgs>(args: Prisma.SelectSubset<T, AdminAuditLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AdminAuditLogClient<runtime.Types.Result.GetResult<Prisma.$AdminAuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AdminAuditLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AdminAuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AdminAuditLogClient<runtime.Types.Result.GetResult<Prisma.$AdminAuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AdminAuditLogFindFirstArgs>(args?: Prisma.SelectSubset<T, AdminAuditLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__AdminAuditLogClient<runtime.Types.Result.GetResult<Prisma.$AdminAuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AdminAuditLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AdminAuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AdminAuditLogClient<runtime.Types.Result.GetResult<Prisma.$AdminAuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AdminAuditLogFindManyArgs>(args?: Prisma.SelectSubset<T, AdminAuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AdminAuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AdminAuditLogCreateArgs>(args: Prisma.SelectSubset<T, AdminAuditLogCreateArgs<ExtArgs>>): Prisma.Prisma__AdminAuditLogClient<runtime.Types.Result.GetResult<Prisma.$AdminAuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AdminAuditLogCreateManyArgs>(args?: Prisma.SelectSubset<T, AdminAuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AdminAuditLogCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AdminAuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AdminAuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AdminAuditLogDeleteArgs>(args: Prisma.SelectSubset<T, AdminAuditLogDeleteArgs<ExtArgs>>): Prisma.Prisma__AdminAuditLogClient<runtime.Types.Result.GetResult<Prisma.$AdminAuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AdminAuditLogUpdateArgs>(args: Prisma.SelectSubset<T, AdminAuditLogUpdateArgs<ExtArgs>>): Prisma.Prisma__AdminAuditLogClient<runtime.Types.Result.GetResult<Prisma.$AdminAuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AdminAuditLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, AdminAuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AdminAuditLogUpdateManyArgs>(args: Prisma.SelectSubset<T, AdminAuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AdminAuditLogUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AdminAuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AdminAuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AdminAuditLogUpsertArgs>(args: Prisma.SelectSubset<T, AdminAuditLogUpsertArgs<ExtArgs>>): Prisma.Prisma__AdminAuditLogClient<runtime.Types.Result.GetResult<Prisma.$AdminAuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AdminAuditLogCountArgs>(args?: Prisma.Subset<T, AdminAuditLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AdminAuditLogCountAggregateOutputType> : number>;
    aggregate<T extends AdminAuditLogAggregateArgs>(args: Prisma.Subset<T, AdminAuditLogAggregateArgs>): Prisma.PrismaPromise<GetAdminAuditLogAggregateType<T>>;
    groupBy<T extends AdminAuditLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AdminAuditLogGroupByArgs['orderBy'];
    } : {
        orderBy?: AdminAuditLogGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AdminAuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AdminAuditLogFieldRefs;
}
export interface Prisma__AdminAuditLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    admin<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AdminAuditLogFieldRefs {
    readonly id: Prisma.FieldRef<"AdminAuditLog", 'String'>;
    readonly adminId: Prisma.FieldRef<"AdminAuditLog", 'String'>;
    readonly action: Prisma.FieldRef<"AdminAuditLog", 'String'>;
    readonly entityType: Prisma.FieldRef<"AdminAuditLog", 'String'>;
    readonly entityId: Prisma.FieldRef<"AdminAuditLog", 'String'>;
    readonly previousValues: Prisma.FieldRef<"AdminAuditLog", 'Json'>;
    readonly newValues: Prisma.FieldRef<"AdminAuditLog", 'Json'>;
    readonly ipAddress: Prisma.FieldRef<"AdminAuditLog", 'String'>;
    readonly userAgent: Prisma.FieldRef<"AdminAuditLog", 'String'>;
    readonly createdAt: Prisma.FieldRef<"AdminAuditLog", 'DateTime'>;
}
export type AdminAuditLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AdminAuditLogOmit<ExtArgs> | null;
    include?: Prisma.AdminAuditLogInclude<ExtArgs> | null;
    where: Prisma.AdminAuditLogWhereUniqueInput;
};
export type AdminAuditLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AdminAuditLogOmit<ExtArgs> | null;
    include?: Prisma.AdminAuditLogInclude<ExtArgs> | null;
    where: Prisma.AdminAuditLogWhereUniqueInput;
};
export type AdminAuditLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AdminAuditLogOmit<ExtArgs> | null;
    include?: Prisma.AdminAuditLogInclude<ExtArgs> | null;
    where?: Prisma.AdminAuditLogWhereInput;
    orderBy?: Prisma.AdminAuditLogOrderByWithRelationInput | Prisma.AdminAuditLogOrderByWithRelationInput[];
    cursor?: Prisma.AdminAuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AdminAuditLogScalarFieldEnum | Prisma.AdminAuditLogScalarFieldEnum[];
};
export type AdminAuditLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AdminAuditLogOmit<ExtArgs> | null;
    include?: Prisma.AdminAuditLogInclude<ExtArgs> | null;
    where?: Prisma.AdminAuditLogWhereInput;
    orderBy?: Prisma.AdminAuditLogOrderByWithRelationInput | Prisma.AdminAuditLogOrderByWithRelationInput[];
    cursor?: Prisma.AdminAuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AdminAuditLogScalarFieldEnum | Prisma.AdminAuditLogScalarFieldEnum[];
};
export type AdminAuditLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AdminAuditLogOmit<ExtArgs> | null;
    include?: Prisma.AdminAuditLogInclude<ExtArgs> | null;
    where?: Prisma.AdminAuditLogWhereInput;
    orderBy?: Prisma.AdminAuditLogOrderByWithRelationInput | Prisma.AdminAuditLogOrderByWithRelationInput[];
    cursor?: Prisma.AdminAuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AdminAuditLogScalarFieldEnum | Prisma.AdminAuditLogScalarFieldEnum[];
};
export type AdminAuditLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AdminAuditLogOmit<ExtArgs> | null;
    include?: Prisma.AdminAuditLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AdminAuditLogCreateInput, Prisma.AdminAuditLogUncheckedCreateInput>;
};
export type AdminAuditLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AdminAuditLogCreateManyInput | Prisma.AdminAuditLogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AdminAuditLogCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminAuditLogSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AdminAuditLogOmit<ExtArgs> | null;
    data: Prisma.AdminAuditLogCreateManyInput | Prisma.AdminAuditLogCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AdminAuditLogIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AdminAuditLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AdminAuditLogOmit<ExtArgs> | null;
    include?: Prisma.AdminAuditLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AdminAuditLogUpdateInput, Prisma.AdminAuditLogUncheckedUpdateInput>;
    where: Prisma.AdminAuditLogWhereUniqueInput;
};
export type AdminAuditLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AdminAuditLogUpdateManyMutationInput, Prisma.AdminAuditLogUncheckedUpdateManyInput>;
    where?: Prisma.AdminAuditLogWhereInput;
    limit?: number;
};
export type AdminAuditLogUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminAuditLogSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AdminAuditLogOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AdminAuditLogUpdateManyMutationInput, Prisma.AdminAuditLogUncheckedUpdateManyInput>;
    where?: Prisma.AdminAuditLogWhereInput;
    limit?: number;
    include?: Prisma.AdminAuditLogIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AdminAuditLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AdminAuditLogOmit<ExtArgs> | null;
    include?: Prisma.AdminAuditLogInclude<ExtArgs> | null;
    where: Prisma.AdminAuditLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.AdminAuditLogCreateInput, Prisma.AdminAuditLogUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AdminAuditLogUpdateInput, Prisma.AdminAuditLogUncheckedUpdateInput>;
};
export type AdminAuditLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AdminAuditLogOmit<ExtArgs> | null;
    include?: Prisma.AdminAuditLogInclude<ExtArgs> | null;
    where: Prisma.AdminAuditLogWhereUniqueInput;
};
export type AdminAuditLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AdminAuditLogWhereInput;
    limit?: number;
};
export type AdminAuditLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AdminAuditLogOmit<ExtArgs> | null;
    include?: Prisma.AdminAuditLogInclude<ExtArgs> | null;
};
export {};
