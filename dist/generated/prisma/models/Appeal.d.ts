import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type AppealModel = runtime.Types.Result.DefaultSelection<Prisma.$AppealPayload>;
export type AggregateAppeal = {
    _count: AppealCountAggregateOutputType | null;
    _min: AppealMinAggregateOutputType | null;
    _max: AppealMaxAggregateOutputType | null;
};
export type AppealMinAggregateOutputType = {
    id: string | null;
    penaltyId: string | null;
    providerId: string | null;
    explanation: string | null;
    supportingFile: string | null;
    status: $Enums.AppealStatus | null;
    reviewedBy: string | null;
    reviewedAt: Date | null;
    adminNote: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AppealMaxAggregateOutputType = {
    id: string | null;
    penaltyId: string | null;
    providerId: string | null;
    explanation: string | null;
    supportingFile: string | null;
    status: $Enums.AppealStatus | null;
    reviewedBy: string | null;
    reviewedAt: Date | null;
    adminNote: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AppealCountAggregateOutputType = {
    id: number;
    penaltyId: number;
    providerId: number;
    explanation: number;
    supportingFile: number;
    status: number;
    reviewedBy: number;
    reviewedAt: number;
    adminNote: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type AppealMinAggregateInputType = {
    id?: true;
    penaltyId?: true;
    providerId?: true;
    explanation?: true;
    supportingFile?: true;
    status?: true;
    reviewedBy?: true;
    reviewedAt?: true;
    adminNote?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AppealMaxAggregateInputType = {
    id?: true;
    penaltyId?: true;
    providerId?: true;
    explanation?: true;
    supportingFile?: true;
    status?: true;
    reviewedBy?: true;
    reviewedAt?: true;
    adminNote?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AppealCountAggregateInputType = {
    id?: true;
    penaltyId?: true;
    providerId?: true;
    explanation?: true;
    supportingFile?: true;
    status?: true;
    reviewedBy?: true;
    reviewedAt?: true;
    adminNote?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type AppealAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AppealWhereInput;
    orderBy?: Prisma.AppealOrderByWithRelationInput | Prisma.AppealOrderByWithRelationInput[];
    cursor?: Prisma.AppealWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AppealCountAggregateInputType;
    _min?: AppealMinAggregateInputType;
    _max?: AppealMaxAggregateInputType;
};
export type GetAppealAggregateType<T extends AppealAggregateArgs> = {
    [P in keyof T & keyof AggregateAppeal]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAppeal[P]> : Prisma.GetScalarType<T[P], AggregateAppeal[P]>;
};
export type AppealGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AppealWhereInput;
    orderBy?: Prisma.AppealOrderByWithAggregationInput | Prisma.AppealOrderByWithAggregationInput[];
    by: Prisma.AppealScalarFieldEnum[] | Prisma.AppealScalarFieldEnum;
    having?: Prisma.AppealScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AppealCountAggregateInputType | true;
    _min?: AppealMinAggregateInputType;
    _max?: AppealMaxAggregateInputType;
};
export type AppealGroupByOutputType = {
    id: string;
    penaltyId: string;
    providerId: string;
    explanation: string;
    supportingFile: string | null;
    status: $Enums.AppealStatus;
    reviewedBy: string | null;
    reviewedAt: Date | null;
    adminNote: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: AppealCountAggregateOutputType | null;
    _min: AppealMinAggregateOutputType | null;
    _max: AppealMaxAggregateOutputType | null;
};
type GetAppealGroupByPayload<T extends AppealGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AppealGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AppealGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AppealGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AppealGroupByOutputType[P]>;
}>>;
export type AppealWhereInput = {
    AND?: Prisma.AppealWhereInput | Prisma.AppealWhereInput[];
    OR?: Prisma.AppealWhereInput[];
    NOT?: Prisma.AppealWhereInput | Prisma.AppealWhereInput[];
    id?: Prisma.StringFilter<"Appeal"> | string;
    penaltyId?: Prisma.StringFilter<"Appeal"> | string;
    providerId?: Prisma.StringFilter<"Appeal"> | string;
    explanation?: Prisma.StringFilter<"Appeal"> | string;
    supportingFile?: Prisma.StringNullableFilter<"Appeal"> | string | null;
    status?: Prisma.EnumAppealStatusFilter<"Appeal"> | $Enums.AppealStatus;
    reviewedBy?: Prisma.StringNullableFilter<"Appeal"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"Appeal"> | Date | string | null;
    adminNote?: Prisma.StringNullableFilter<"Appeal"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Appeal"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Appeal"> | Date | string;
    penalty?: Prisma.XOR<Prisma.ProviderPenaltyScalarRelationFilter, Prisma.ProviderPenaltyWhereInput>;
    provider?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type AppealOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    penaltyId?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    explanation?: Prisma.SortOrder;
    supportingFile?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reviewedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    adminNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    penalty?: Prisma.ProviderPenaltyOrderByWithRelationInput;
    provider?: Prisma.UserOrderByWithRelationInput;
};
export type AppealWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.AppealWhereInput | Prisma.AppealWhereInput[];
    OR?: Prisma.AppealWhereInput[];
    NOT?: Prisma.AppealWhereInput | Prisma.AppealWhereInput[];
    penaltyId?: Prisma.StringFilter<"Appeal"> | string;
    providerId?: Prisma.StringFilter<"Appeal"> | string;
    explanation?: Prisma.StringFilter<"Appeal"> | string;
    supportingFile?: Prisma.StringNullableFilter<"Appeal"> | string | null;
    status?: Prisma.EnumAppealStatusFilter<"Appeal"> | $Enums.AppealStatus;
    reviewedBy?: Prisma.StringNullableFilter<"Appeal"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"Appeal"> | Date | string | null;
    adminNote?: Prisma.StringNullableFilter<"Appeal"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Appeal"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Appeal"> | Date | string;
    penalty?: Prisma.XOR<Prisma.ProviderPenaltyScalarRelationFilter, Prisma.ProviderPenaltyWhereInput>;
    provider?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type AppealOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    penaltyId?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    explanation?: Prisma.SortOrder;
    supportingFile?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reviewedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    adminNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.AppealCountOrderByAggregateInput;
    _max?: Prisma.AppealMaxOrderByAggregateInput;
    _min?: Prisma.AppealMinOrderByAggregateInput;
};
export type AppealScalarWhereWithAggregatesInput = {
    AND?: Prisma.AppealScalarWhereWithAggregatesInput | Prisma.AppealScalarWhereWithAggregatesInput[];
    OR?: Prisma.AppealScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AppealScalarWhereWithAggregatesInput | Prisma.AppealScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Appeal"> | string;
    penaltyId?: Prisma.StringWithAggregatesFilter<"Appeal"> | string;
    providerId?: Prisma.StringWithAggregatesFilter<"Appeal"> | string;
    explanation?: Prisma.StringWithAggregatesFilter<"Appeal"> | string;
    supportingFile?: Prisma.StringNullableWithAggregatesFilter<"Appeal"> | string | null;
    status?: Prisma.EnumAppealStatusWithAggregatesFilter<"Appeal"> | $Enums.AppealStatus;
    reviewedBy?: Prisma.StringNullableWithAggregatesFilter<"Appeal"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Appeal"> | Date | string | null;
    adminNote?: Prisma.StringNullableWithAggregatesFilter<"Appeal"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Appeal"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Appeal"> | Date | string;
};
export type AppealCreateInput = {
    id?: string;
    explanation: string;
    supportingFile?: string | null;
    status?: $Enums.AppealStatus;
    reviewedBy?: string | null;
    reviewedAt?: Date | string | null;
    adminNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    penalty: Prisma.ProviderPenaltyCreateNestedOneWithoutAppealsInput;
    provider: Prisma.UserCreateNestedOneWithoutAppealsInput;
};
export type AppealUncheckedCreateInput = {
    id?: string;
    penaltyId: string;
    providerId: string;
    explanation: string;
    supportingFile?: string | null;
    status?: $Enums.AppealStatus;
    reviewedBy?: string | null;
    reviewedAt?: Date | string | null;
    adminNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AppealUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    explanation?: Prisma.StringFieldUpdateOperationsInput | string;
    supportingFile?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumAppealStatusFieldUpdateOperationsInput | $Enums.AppealStatus;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    penalty?: Prisma.ProviderPenaltyUpdateOneRequiredWithoutAppealsNestedInput;
    provider?: Prisma.UserUpdateOneRequiredWithoutAppealsNestedInput;
};
export type AppealUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    penaltyId?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    explanation?: Prisma.StringFieldUpdateOperationsInput | string;
    supportingFile?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumAppealStatusFieldUpdateOperationsInput | $Enums.AppealStatus;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AppealCreateManyInput = {
    id?: string;
    penaltyId: string;
    providerId: string;
    explanation: string;
    supportingFile?: string | null;
    status?: $Enums.AppealStatus;
    reviewedBy?: string | null;
    reviewedAt?: Date | string | null;
    adminNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AppealUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    explanation?: Prisma.StringFieldUpdateOperationsInput | string;
    supportingFile?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumAppealStatusFieldUpdateOperationsInput | $Enums.AppealStatus;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AppealUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    penaltyId?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    explanation?: Prisma.StringFieldUpdateOperationsInput | string;
    supportingFile?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumAppealStatusFieldUpdateOperationsInput | $Enums.AppealStatus;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AppealListRelationFilter = {
    every?: Prisma.AppealWhereInput;
    some?: Prisma.AppealWhereInput;
    none?: Prisma.AppealWhereInput;
};
export type AppealOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AppealCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    penaltyId?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    explanation?: Prisma.SortOrder;
    supportingFile?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reviewedBy?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    adminNote?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AppealMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    penaltyId?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    explanation?: Prisma.SortOrder;
    supportingFile?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reviewedBy?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    adminNote?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AppealMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    penaltyId?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    explanation?: Prisma.SortOrder;
    supportingFile?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reviewedBy?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    adminNote?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AppealCreateNestedManyWithoutProviderInput = {
    create?: Prisma.XOR<Prisma.AppealCreateWithoutProviderInput, Prisma.AppealUncheckedCreateWithoutProviderInput> | Prisma.AppealCreateWithoutProviderInput[] | Prisma.AppealUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.AppealCreateOrConnectWithoutProviderInput | Prisma.AppealCreateOrConnectWithoutProviderInput[];
    createMany?: Prisma.AppealCreateManyProviderInputEnvelope;
    connect?: Prisma.AppealWhereUniqueInput | Prisma.AppealWhereUniqueInput[];
};
export type AppealUncheckedCreateNestedManyWithoutProviderInput = {
    create?: Prisma.XOR<Prisma.AppealCreateWithoutProviderInput, Prisma.AppealUncheckedCreateWithoutProviderInput> | Prisma.AppealCreateWithoutProviderInput[] | Prisma.AppealUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.AppealCreateOrConnectWithoutProviderInput | Prisma.AppealCreateOrConnectWithoutProviderInput[];
    createMany?: Prisma.AppealCreateManyProviderInputEnvelope;
    connect?: Prisma.AppealWhereUniqueInput | Prisma.AppealWhereUniqueInput[];
};
export type AppealUpdateManyWithoutProviderNestedInput = {
    create?: Prisma.XOR<Prisma.AppealCreateWithoutProviderInput, Prisma.AppealUncheckedCreateWithoutProviderInput> | Prisma.AppealCreateWithoutProviderInput[] | Prisma.AppealUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.AppealCreateOrConnectWithoutProviderInput | Prisma.AppealCreateOrConnectWithoutProviderInput[];
    upsert?: Prisma.AppealUpsertWithWhereUniqueWithoutProviderInput | Prisma.AppealUpsertWithWhereUniqueWithoutProviderInput[];
    createMany?: Prisma.AppealCreateManyProviderInputEnvelope;
    set?: Prisma.AppealWhereUniqueInput | Prisma.AppealWhereUniqueInput[];
    disconnect?: Prisma.AppealWhereUniqueInput | Prisma.AppealWhereUniqueInput[];
    delete?: Prisma.AppealWhereUniqueInput | Prisma.AppealWhereUniqueInput[];
    connect?: Prisma.AppealWhereUniqueInput | Prisma.AppealWhereUniqueInput[];
    update?: Prisma.AppealUpdateWithWhereUniqueWithoutProviderInput | Prisma.AppealUpdateWithWhereUniqueWithoutProviderInput[];
    updateMany?: Prisma.AppealUpdateManyWithWhereWithoutProviderInput | Prisma.AppealUpdateManyWithWhereWithoutProviderInput[];
    deleteMany?: Prisma.AppealScalarWhereInput | Prisma.AppealScalarWhereInput[];
};
export type AppealUncheckedUpdateManyWithoutProviderNestedInput = {
    create?: Prisma.XOR<Prisma.AppealCreateWithoutProviderInput, Prisma.AppealUncheckedCreateWithoutProviderInput> | Prisma.AppealCreateWithoutProviderInput[] | Prisma.AppealUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.AppealCreateOrConnectWithoutProviderInput | Prisma.AppealCreateOrConnectWithoutProviderInput[];
    upsert?: Prisma.AppealUpsertWithWhereUniqueWithoutProviderInput | Prisma.AppealUpsertWithWhereUniqueWithoutProviderInput[];
    createMany?: Prisma.AppealCreateManyProviderInputEnvelope;
    set?: Prisma.AppealWhereUniqueInput | Prisma.AppealWhereUniqueInput[];
    disconnect?: Prisma.AppealWhereUniqueInput | Prisma.AppealWhereUniqueInput[];
    delete?: Prisma.AppealWhereUniqueInput | Prisma.AppealWhereUniqueInput[];
    connect?: Prisma.AppealWhereUniqueInput | Prisma.AppealWhereUniqueInput[];
    update?: Prisma.AppealUpdateWithWhereUniqueWithoutProviderInput | Prisma.AppealUpdateWithWhereUniqueWithoutProviderInput[];
    updateMany?: Prisma.AppealUpdateManyWithWhereWithoutProviderInput | Prisma.AppealUpdateManyWithWhereWithoutProviderInput[];
    deleteMany?: Prisma.AppealScalarWhereInput | Prisma.AppealScalarWhereInput[];
};
export type AppealCreateNestedManyWithoutPenaltyInput = {
    create?: Prisma.XOR<Prisma.AppealCreateWithoutPenaltyInput, Prisma.AppealUncheckedCreateWithoutPenaltyInput> | Prisma.AppealCreateWithoutPenaltyInput[] | Prisma.AppealUncheckedCreateWithoutPenaltyInput[];
    connectOrCreate?: Prisma.AppealCreateOrConnectWithoutPenaltyInput | Prisma.AppealCreateOrConnectWithoutPenaltyInput[];
    createMany?: Prisma.AppealCreateManyPenaltyInputEnvelope;
    connect?: Prisma.AppealWhereUniqueInput | Prisma.AppealWhereUniqueInput[];
};
export type AppealUncheckedCreateNestedManyWithoutPenaltyInput = {
    create?: Prisma.XOR<Prisma.AppealCreateWithoutPenaltyInput, Prisma.AppealUncheckedCreateWithoutPenaltyInput> | Prisma.AppealCreateWithoutPenaltyInput[] | Prisma.AppealUncheckedCreateWithoutPenaltyInput[];
    connectOrCreate?: Prisma.AppealCreateOrConnectWithoutPenaltyInput | Prisma.AppealCreateOrConnectWithoutPenaltyInput[];
    createMany?: Prisma.AppealCreateManyPenaltyInputEnvelope;
    connect?: Prisma.AppealWhereUniqueInput | Prisma.AppealWhereUniqueInput[];
};
export type AppealUpdateManyWithoutPenaltyNestedInput = {
    create?: Prisma.XOR<Prisma.AppealCreateWithoutPenaltyInput, Prisma.AppealUncheckedCreateWithoutPenaltyInput> | Prisma.AppealCreateWithoutPenaltyInput[] | Prisma.AppealUncheckedCreateWithoutPenaltyInput[];
    connectOrCreate?: Prisma.AppealCreateOrConnectWithoutPenaltyInput | Prisma.AppealCreateOrConnectWithoutPenaltyInput[];
    upsert?: Prisma.AppealUpsertWithWhereUniqueWithoutPenaltyInput | Prisma.AppealUpsertWithWhereUniqueWithoutPenaltyInput[];
    createMany?: Prisma.AppealCreateManyPenaltyInputEnvelope;
    set?: Prisma.AppealWhereUniqueInput | Prisma.AppealWhereUniqueInput[];
    disconnect?: Prisma.AppealWhereUniqueInput | Prisma.AppealWhereUniqueInput[];
    delete?: Prisma.AppealWhereUniqueInput | Prisma.AppealWhereUniqueInput[];
    connect?: Prisma.AppealWhereUniqueInput | Prisma.AppealWhereUniqueInput[];
    update?: Prisma.AppealUpdateWithWhereUniqueWithoutPenaltyInput | Prisma.AppealUpdateWithWhereUniqueWithoutPenaltyInput[];
    updateMany?: Prisma.AppealUpdateManyWithWhereWithoutPenaltyInput | Prisma.AppealUpdateManyWithWhereWithoutPenaltyInput[];
    deleteMany?: Prisma.AppealScalarWhereInput | Prisma.AppealScalarWhereInput[];
};
export type AppealUncheckedUpdateManyWithoutPenaltyNestedInput = {
    create?: Prisma.XOR<Prisma.AppealCreateWithoutPenaltyInput, Prisma.AppealUncheckedCreateWithoutPenaltyInput> | Prisma.AppealCreateWithoutPenaltyInput[] | Prisma.AppealUncheckedCreateWithoutPenaltyInput[];
    connectOrCreate?: Prisma.AppealCreateOrConnectWithoutPenaltyInput | Prisma.AppealCreateOrConnectWithoutPenaltyInput[];
    upsert?: Prisma.AppealUpsertWithWhereUniqueWithoutPenaltyInput | Prisma.AppealUpsertWithWhereUniqueWithoutPenaltyInput[];
    createMany?: Prisma.AppealCreateManyPenaltyInputEnvelope;
    set?: Prisma.AppealWhereUniqueInput | Prisma.AppealWhereUniqueInput[];
    disconnect?: Prisma.AppealWhereUniqueInput | Prisma.AppealWhereUniqueInput[];
    delete?: Prisma.AppealWhereUniqueInput | Prisma.AppealWhereUniqueInput[];
    connect?: Prisma.AppealWhereUniqueInput | Prisma.AppealWhereUniqueInput[];
    update?: Prisma.AppealUpdateWithWhereUniqueWithoutPenaltyInput | Prisma.AppealUpdateWithWhereUniqueWithoutPenaltyInput[];
    updateMany?: Prisma.AppealUpdateManyWithWhereWithoutPenaltyInput | Prisma.AppealUpdateManyWithWhereWithoutPenaltyInput[];
    deleteMany?: Prisma.AppealScalarWhereInput | Prisma.AppealScalarWhereInput[];
};
export type EnumAppealStatusFieldUpdateOperationsInput = {
    set?: $Enums.AppealStatus;
};
export type AppealCreateWithoutProviderInput = {
    id?: string;
    explanation: string;
    supportingFile?: string | null;
    status?: $Enums.AppealStatus;
    reviewedBy?: string | null;
    reviewedAt?: Date | string | null;
    adminNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    penalty: Prisma.ProviderPenaltyCreateNestedOneWithoutAppealsInput;
};
export type AppealUncheckedCreateWithoutProviderInput = {
    id?: string;
    penaltyId: string;
    explanation: string;
    supportingFile?: string | null;
    status?: $Enums.AppealStatus;
    reviewedBy?: string | null;
    reviewedAt?: Date | string | null;
    adminNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AppealCreateOrConnectWithoutProviderInput = {
    where: Prisma.AppealWhereUniqueInput;
    create: Prisma.XOR<Prisma.AppealCreateWithoutProviderInput, Prisma.AppealUncheckedCreateWithoutProviderInput>;
};
export type AppealCreateManyProviderInputEnvelope = {
    data: Prisma.AppealCreateManyProviderInput | Prisma.AppealCreateManyProviderInput[];
    skipDuplicates?: boolean;
};
export type AppealUpsertWithWhereUniqueWithoutProviderInput = {
    where: Prisma.AppealWhereUniqueInput;
    update: Prisma.XOR<Prisma.AppealUpdateWithoutProviderInput, Prisma.AppealUncheckedUpdateWithoutProviderInput>;
    create: Prisma.XOR<Prisma.AppealCreateWithoutProviderInput, Prisma.AppealUncheckedCreateWithoutProviderInput>;
};
export type AppealUpdateWithWhereUniqueWithoutProviderInput = {
    where: Prisma.AppealWhereUniqueInput;
    data: Prisma.XOR<Prisma.AppealUpdateWithoutProviderInput, Prisma.AppealUncheckedUpdateWithoutProviderInput>;
};
export type AppealUpdateManyWithWhereWithoutProviderInput = {
    where: Prisma.AppealScalarWhereInput;
    data: Prisma.XOR<Prisma.AppealUpdateManyMutationInput, Prisma.AppealUncheckedUpdateManyWithoutProviderInput>;
};
export type AppealScalarWhereInput = {
    AND?: Prisma.AppealScalarWhereInput | Prisma.AppealScalarWhereInput[];
    OR?: Prisma.AppealScalarWhereInput[];
    NOT?: Prisma.AppealScalarWhereInput | Prisma.AppealScalarWhereInput[];
    id?: Prisma.StringFilter<"Appeal"> | string;
    penaltyId?: Prisma.StringFilter<"Appeal"> | string;
    providerId?: Prisma.StringFilter<"Appeal"> | string;
    explanation?: Prisma.StringFilter<"Appeal"> | string;
    supportingFile?: Prisma.StringNullableFilter<"Appeal"> | string | null;
    status?: Prisma.EnumAppealStatusFilter<"Appeal"> | $Enums.AppealStatus;
    reviewedBy?: Prisma.StringNullableFilter<"Appeal"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"Appeal"> | Date | string | null;
    adminNote?: Prisma.StringNullableFilter<"Appeal"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Appeal"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Appeal"> | Date | string;
};
export type AppealCreateWithoutPenaltyInput = {
    id?: string;
    explanation: string;
    supportingFile?: string | null;
    status?: $Enums.AppealStatus;
    reviewedBy?: string | null;
    reviewedAt?: Date | string | null;
    adminNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    provider: Prisma.UserCreateNestedOneWithoutAppealsInput;
};
export type AppealUncheckedCreateWithoutPenaltyInput = {
    id?: string;
    providerId: string;
    explanation: string;
    supportingFile?: string | null;
    status?: $Enums.AppealStatus;
    reviewedBy?: string | null;
    reviewedAt?: Date | string | null;
    adminNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AppealCreateOrConnectWithoutPenaltyInput = {
    where: Prisma.AppealWhereUniqueInput;
    create: Prisma.XOR<Prisma.AppealCreateWithoutPenaltyInput, Prisma.AppealUncheckedCreateWithoutPenaltyInput>;
};
export type AppealCreateManyPenaltyInputEnvelope = {
    data: Prisma.AppealCreateManyPenaltyInput | Prisma.AppealCreateManyPenaltyInput[];
    skipDuplicates?: boolean;
};
export type AppealUpsertWithWhereUniqueWithoutPenaltyInput = {
    where: Prisma.AppealWhereUniqueInput;
    update: Prisma.XOR<Prisma.AppealUpdateWithoutPenaltyInput, Prisma.AppealUncheckedUpdateWithoutPenaltyInput>;
    create: Prisma.XOR<Prisma.AppealCreateWithoutPenaltyInput, Prisma.AppealUncheckedCreateWithoutPenaltyInput>;
};
export type AppealUpdateWithWhereUniqueWithoutPenaltyInput = {
    where: Prisma.AppealWhereUniqueInput;
    data: Prisma.XOR<Prisma.AppealUpdateWithoutPenaltyInput, Prisma.AppealUncheckedUpdateWithoutPenaltyInput>;
};
export type AppealUpdateManyWithWhereWithoutPenaltyInput = {
    where: Prisma.AppealScalarWhereInput;
    data: Prisma.XOR<Prisma.AppealUpdateManyMutationInput, Prisma.AppealUncheckedUpdateManyWithoutPenaltyInput>;
};
export type AppealCreateManyProviderInput = {
    id?: string;
    penaltyId: string;
    explanation: string;
    supportingFile?: string | null;
    status?: $Enums.AppealStatus;
    reviewedBy?: string | null;
    reviewedAt?: Date | string | null;
    adminNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AppealUpdateWithoutProviderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    explanation?: Prisma.StringFieldUpdateOperationsInput | string;
    supportingFile?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumAppealStatusFieldUpdateOperationsInput | $Enums.AppealStatus;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    penalty?: Prisma.ProviderPenaltyUpdateOneRequiredWithoutAppealsNestedInput;
};
export type AppealUncheckedUpdateWithoutProviderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    penaltyId?: Prisma.StringFieldUpdateOperationsInput | string;
    explanation?: Prisma.StringFieldUpdateOperationsInput | string;
    supportingFile?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumAppealStatusFieldUpdateOperationsInput | $Enums.AppealStatus;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AppealUncheckedUpdateManyWithoutProviderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    penaltyId?: Prisma.StringFieldUpdateOperationsInput | string;
    explanation?: Prisma.StringFieldUpdateOperationsInput | string;
    supportingFile?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumAppealStatusFieldUpdateOperationsInput | $Enums.AppealStatus;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AppealCreateManyPenaltyInput = {
    id?: string;
    providerId: string;
    explanation: string;
    supportingFile?: string | null;
    status?: $Enums.AppealStatus;
    reviewedBy?: string | null;
    reviewedAt?: Date | string | null;
    adminNote?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AppealUpdateWithoutPenaltyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    explanation?: Prisma.StringFieldUpdateOperationsInput | string;
    supportingFile?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumAppealStatusFieldUpdateOperationsInput | $Enums.AppealStatus;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    provider?: Prisma.UserUpdateOneRequiredWithoutAppealsNestedInput;
};
export type AppealUncheckedUpdateWithoutPenaltyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    explanation?: Prisma.StringFieldUpdateOperationsInput | string;
    supportingFile?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumAppealStatusFieldUpdateOperationsInput | $Enums.AppealStatus;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AppealUncheckedUpdateManyWithoutPenaltyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    explanation?: Prisma.StringFieldUpdateOperationsInput | string;
    supportingFile?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumAppealStatusFieldUpdateOperationsInput | $Enums.AppealStatus;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AppealSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    penaltyId?: boolean;
    providerId?: boolean;
    explanation?: boolean;
    supportingFile?: boolean;
    status?: boolean;
    reviewedBy?: boolean;
    reviewedAt?: boolean;
    adminNote?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    penalty?: boolean | Prisma.ProviderPenaltyDefaultArgs<ExtArgs>;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["appeal"]>;
export type AppealSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    penaltyId?: boolean;
    providerId?: boolean;
    explanation?: boolean;
    supportingFile?: boolean;
    status?: boolean;
    reviewedBy?: boolean;
    reviewedAt?: boolean;
    adminNote?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    penalty?: boolean | Prisma.ProviderPenaltyDefaultArgs<ExtArgs>;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["appeal"]>;
export type AppealSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    penaltyId?: boolean;
    providerId?: boolean;
    explanation?: boolean;
    supportingFile?: boolean;
    status?: boolean;
    reviewedBy?: boolean;
    reviewedAt?: boolean;
    adminNote?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    penalty?: boolean | Prisma.ProviderPenaltyDefaultArgs<ExtArgs>;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["appeal"]>;
export type AppealSelectScalar = {
    id?: boolean;
    penaltyId?: boolean;
    providerId?: boolean;
    explanation?: boolean;
    supportingFile?: boolean;
    status?: boolean;
    reviewedBy?: boolean;
    reviewedAt?: boolean;
    adminNote?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type AppealOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "penaltyId" | "providerId" | "explanation" | "supportingFile" | "status" | "reviewedBy" | "reviewedAt" | "adminNote" | "createdAt" | "updatedAt", ExtArgs["result"]["appeal"]>;
export type AppealInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    penalty?: boolean | Prisma.ProviderPenaltyDefaultArgs<ExtArgs>;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type AppealIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    penalty?: boolean | Prisma.ProviderPenaltyDefaultArgs<ExtArgs>;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type AppealIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    penalty?: boolean | Prisma.ProviderPenaltyDefaultArgs<ExtArgs>;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $AppealPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Appeal";
    objects: {
        penalty: Prisma.$ProviderPenaltyPayload<ExtArgs>;
        provider: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        penaltyId: string;
        providerId: string;
        explanation: string;
        supportingFile: string | null;
        status: $Enums.AppealStatus;
        reviewedBy: string | null;
        reviewedAt: Date | null;
        adminNote: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["appeal"]>;
    composites: {};
};
export type AppealGetPayload<S extends boolean | null | undefined | AppealDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AppealPayload, S>;
export type AppealCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AppealFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AppealCountAggregateInputType | true;
};
export interface AppealDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Appeal'];
        meta: {
            name: 'Appeal';
        };
    };
    findUnique<T extends AppealFindUniqueArgs>(args: Prisma.SelectSubset<T, AppealFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AppealClient<runtime.Types.Result.GetResult<Prisma.$AppealPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AppealFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AppealFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AppealClient<runtime.Types.Result.GetResult<Prisma.$AppealPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AppealFindFirstArgs>(args?: Prisma.SelectSubset<T, AppealFindFirstArgs<ExtArgs>>): Prisma.Prisma__AppealClient<runtime.Types.Result.GetResult<Prisma.$AppealPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AppealFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AppealFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AppealClient<runtime.Types.Result.GetResult<Prisma.$AppealPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AppealFindManyArgs>(args?: Prisma.SelectSubset<T, AppealFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AppealPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AppealCreateArgs>(args: Prisma.SelectSubset<T, AppealCreateArgs<ExtArgs>>): Prisma.Prisma__AppealClient<runtime.Types.Result.GetResult<Prisma.$AppealPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AppealCreateManyArgs>(args?: Prisma.SelectSubset<T, AppealCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AppealCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AppealCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AppealPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AppealDeleteArgs>(args: Prisma.SelectSubset<T, AppealDeleteArgs<ExtArgs>>): Prisma.Prisma__AppealClient<runtime.Types.Result.GetResult<Prisma.$AppealPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AppealUpdateArgs>(args: Prisma.SelectSubset<T, AppealUpdateArgs<ExtArgs>>): Prisma.Prisma__AppealClient<runtime.Types.Result.GetResult<Prisma.$AppealPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AppealDeleteManyArgs>(args?: Prisma.SelectSubset<T, AppealDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AppealUpdateManyArgs>(args: Prisma.SelectSubset<T, AppealUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AppealUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AppealUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AppealPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AppealUpsertArgs>(args: Prisma.SelectSubset<T, AppealUpsertArgs<ExtArgs>>): Prisma.Prisma__AppealClient<runtime.Types.Result.GetResult<Prisma.$AppealPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AppealCountArgs>(args?: Prisma.Subset<T, AppealCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AppealCountAggregateOutputType> : number>;
    aggregate<T extends AppealAggregateArgs>(args: Prisma.Subset<T, AppealAggregateArgs>): Prisma.PrismaPromise<GetAppealAggregateType<T>>;
    groupBy<T extends AppealGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AppealGroupByArgs['orderBy'];
    } : {
        orderBy?: AppealGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AppealGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppealGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AppealFieldRefs;
}
export interface Prisma__AppealClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    penalty<T extends Prisma.ProviderPenaltyDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProviderPenaltyDefaultArgs<ExtArgs>>): Prisma.Prisma__ProviderPenaltyClient<runtime.Types.Result.GetResult<Prisma.$ProviderPenaltyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    provider<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AppealFieldRefs {
    readonly id: Prisma.FieldRef<"Appeal", 'String'>;
    readonly penaltyId: Prisma.FieldRef<"Appeal", 'String'>;
    readonly providerId: Prisma.FieldRef<"Appeal", 'String'>;
    readonly explanation: Prisma.FieldRef<"Appeal", 'String'>;
    readonly supportingFile: Prisma.FieldRef<"Appeal", 'String'>;
    readonly status: Prisma.FieldRef<"Appeal", 'AppealStatus'>;
    readonly reviewedBy: Prisma.FieldRef<"Appeal", 'String'>;
    readonly reviewedAt: Prisma.FieldRef<"Appeal", 'DateTime'>;
    readonly adminNote: Prisma.FieldRef<"Appeal", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Appeal", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Appeal", 'DateTime'>;
}
export type AppealFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppealSelect<ExtArgs> | null;
    omit?: Prisma.AppealOmit<ExtArgs> | null;
    include?: Prisma.AppealInclude<ExtArgs> | null;
    where: Prisma.AppealWhereUniqueInput;
};
export type AppealFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppealSelect<ExtArgs> | null;
    omit?: Prisma.AppealOmit<ExtArgs> | null;
    include?: Prisma.AppealInclude<ExtArgs> | null;
    where: Prisma.AppealWhereUniqueInput;
};
export type AppealFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppealSelect<ExtArgs> | null;
    omit?: Prisma.AppealOmit<ExtArgs> | null;
    include?: Prisma.AppealInclude<ExtArgs> | null;
    where?: Prisma.AppealWhereInput;
    orderBy?: Prisma.AppealOrderByWithRelationInput | Prisma.AppealOrderByWithRelationInput[];
    cursor?: Prisma.AppealWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AppealScalarFieldEnum | Prisma.AppealScalarFieldEnum[];
};
export type AppealFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppealSelect<ExtArgs> | null;
    omit?: Prisma.AppealOmit<ExtArgs> | null;
    include?: Prisma.AppealInclude<ExtArgs> | null;
    where?: Prisma.AppealWhereInput;
    orderBy?: Prisma.AppealOrderByWithRelationInput | Prisma.AppealOrderByWithRelationInput[];
    cursor?: Prisma.AppealWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AppealScalarFieldEnum | Prisma.AppealScalarFieldEnum[];
};
export type AppealFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppealSelect<ExtArgs> | null;
    omit?: Prisma.AppealOmit<ExtArgs> | null;
    include?: Prisma.AppealInclude<ExtArgs> | null;
    where?: Prisma.AppealWhereInput;
    orderBy?: Prisma.AppealOrderByWithRelationInput | Prisma.AppealOrderByWithRelationInput[];
    cursor?: Prisma.AppealWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AppealScalarFieldEnum | Prisma.AppealScalarFieldEnum[];
};
export type AppealCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppealSelect<ExtArgs> | null;
    omit?: Prisma.AppealOmit<ExtArgs> | null;
    include?: Prisma.AppealInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AppealCreateInput, Prisma.AppealUncheckedCreateInput>;
};
export type AppealCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AppealCreateManyInput | Prisma.AppealCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AppealCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppealSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AppealOmit<ExtArgs> | null;
    data: Prisma.AppealCreateManyInput | Prisma.AppealCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AppealIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AppealUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppealSelect<ExtArgs> | null;
    omit?: Prisma.AppealOmit<ExtArgs> | null;
    include?: Prisma.AppealInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AppealUpdateInput, Prisma.AppealUncheckedUpdateInput>;
    where: Prisma.AppealWhereUniqueInput;
};
export type AppealUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AppealUpdateManyMutationInput, Prisma.AppealUncheckedUpdateManyInput>;
    where?: Prisma.AppealWhereInput;
    limit?: number;
};
export type AppealUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppealSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AppealOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AppealUpdateManyMutationInput, Prisma.AppealUncheckedUpdateManyInput>;
    where?: Prisma.AppealWhereInput;
    limit?: number;
    include?: Prisma.AppealIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AppealUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppealSelect<ExtArgs> | null;
    omit?: Prisma.AppealOmit<ExtArgs> | null;
    include?: Prisma.AppealInclude<ExtArgs> | null;
    where: Prisma.AppealWhereUniqueInput;
    create: Prisma.XOR<Prisma.AppealCreateInput, Prisma.AppealUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AppealUpdateInput, Prisma.AppealUncheckedUpdateInput>;
};
export type AppealDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppealSelect<ExtArgs> | null;
    omit?: Prisma.AppealOmit<ExtArgs> | null;
    include?: Prisma.AppealInclude<ExtArgs> | null;
    where: Prisma.AppealWhereUniqueInput;
};
export type AppealDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AppealWhereInput;
    limit?: number;
};
export type AppealDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppealSelect<ExtArgs> | null;
    omit?: Prisma.AppealOmit<ExtArgs> | null;
    include?: Prisma.AppealInclude<ExtArgs> | null;
};
export {};
