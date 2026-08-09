import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type ProviderPenaltyModel = runtime.Types.Result.DefaultSelection<Prisma.$ProviderPenaltyPayload>;
export type AggregateProviderPenalty = {
    _count: ProviderPenaltyCountAggregateOutputType | null;
    _min: ProviderPenaltyMinAggregateOutputType | null;
    _max: ProviderPenaltyMaxAggregateOutputType | null;
};
export type ProviderPenaltyMinAggregateOutputType = {
    id: string | null;
    providerId: string | null;
    penaltyType: $Enums.PenaltyType | null;
    reason: string | null;
    startDate: Date | null;
    endDate: Date | null;
    active: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProviderPenaltyMaxAggregateOutputType = {
    id: string | null;
    providerId: string | null;
    penaltyType: $Enums.PenaltyType | null;
    reason: string | null;
    startDate: Date | null;
    endDate: Date | null;
    active: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProviderPenaltyCountAggregateOutputType = {
    id: number;
    providerId: number;
    penaltyType: number;
    reason: number;
    startDate: number;
    endDate: number;
    active: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ProviderPenaltyMinAggregateInputType = {
    id?: true;
    providerId?: true;
    penaltyType?: true;
    reason?: true;
    startDate?: true;
    endDate?: true;
    active?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProviderPenaltyMaxAggregateInputType = {
    id?: true;
    providerId?: true;
    penaltyType?: true;
    reason?: true;
    startDate?: true;
    endDate?: true;
    active?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProviderPenaltyCountAggregateInputType = {
    id?: true;
    providerId?: true;
    penaltyType?: true;
    reason?: true;
    startDate?: true;
    endDate?: true;
    active?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ProviderPenaltyAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProviderPenaltyWhereInput;
    orderBy?: Prisma.ProviderPenaltyOrderByWithRelationInput | Prisma.ProviderPenaltyOrderByWithRelationInput[];
    cursor?: Prisma.ProviderPenaltyWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProviderPenaltyCountAggregateInputType;
    _min?: ProviderPenaltyMinAggregateInputType;
    _max?: ProviderPenaltyMaxAggregateInputType;
};
export type GetProviderPenaltyAggregateType<T extends ProviderPenaltyAggregateArgs> = {
    [P in keyof T & keyof AggregateProviderPenalty]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProviderPenalty[P]> : Prisma.GetScalarType<T[P], AggregateProviderPenalty[P]>;
};
export type ProviderPenaltyGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProviderPenaltyWhereInput;
    orderBy?: Prisma.ProviderPenaltyOrderByWithAggregationInput | Prisma.ProviderPenaltyOrderByWithAggregationInput[];
    by: Prisma.ProviderPenaltyScalarFieldEnum[] | Prisma.ProviderPenaltyScalarFieldEnum;
    having?: Prisma.ProviderPenaltyScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProviderPenaltyCountAggregateInputType | true;
    _min?: ProviderPenaltyMinAggregateInputType;
    _max?: ProviderPenaltyMaxAggregateInputType;
};
export type ProviderPenaltyGroupByOutputType = {
    id: string;
    providerId: string;
    penaltyType: $Enums.PenaltyType;
    reason: string;
    startDate: Date;
    endDate: Date | null;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: ProviderPenaltyCountAggregateOutputType | null;
    _min: ProviderPenaltyMinAggregateOutputType | null;
    _max: ProviderPenaltyMaxAggregateOutputType | null;
};
type GetProviderPenaltyGroupByPayload<T extends ProviderPenaltyGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProviderPenaltyGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProviderPenaltyGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProviderPenaltyGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProviderPenaltyGroupByOutputType[P]>;
}>>;
export type ProviderPenaltyWhereInput = {
    AND?: Prisma.ProviderPenaltyWhereInput | Prisma.ProviderPenaltyWhereInput[];
    OR?: Prisma.ProviderPenaltyWhereInput[];
    NOT?: Prisma.ProviderPenaltyWhereInput | Prisma.ProviderPenaltyWhereInput[];
    id?: Prisma.StringFilter<"ProviderPenalty"> | string;
    providerId?: Prisma.StringFilter<"ProviderPenalty"> | string;
    penaltyType?: Prisma.EnumPenaltyTypeFilter<"ProviderPenalty"> | $Enums.PenaltyType;
    reason?: Prisma.StringFilter<"ProviderPenalty"> | string;
    startDate?: Prisma.DateTimeFilter<"ProviderPenalty"> | Date | string;
    endDate?: Prisma.DateTimeNullableFilter<"ProviderPenalty"> | Date | string | null;
    active?: Prisma.BoolFilter<"ProviderPenalty"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"ProviderPenalty"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ProviderPenalty"> | Date | string;
    provider?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    cancellations?: Prisma.CancellationRecordListRelationFilter;
    appeals?: Prisma.AppealListRelationFilter;
};
export type ProviderPenaltyOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    penaltyType?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    provider?: Prisma.UserOrderByWithRelationInput;
    cancellations?: Prisma.CancellationRecordOrderByRelationAggregateInput;
    appeals?: Prisma.AppealOrderByRelationAggregateInput;
};
export type ProviderPenaltyWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ProviderPenaltyWhereInput | Prisma.ProviderPenaltyWhereInput[];
    OR?: Prisma.ProviderPenaltyWhereInput[];
    NOT?: Prisma.ProviderPenaltyWhereInput | Prisma.ProviderPenaltyWhereInput[];
    providerId?: Prisma.StringFilter<"ProviderPenalty"> | string;
    penaltyType?: Prisma.EnumPenaltyTypeFilter<"ProviderPenalty"> | $Enums.PenaltyType;
    reason?: Prisma.StringFilter<"ProviderPenalty"> | string;
    startDate?: Prisma.DateTimeFilter<"ProviderPenalty"> | Date | string;
    endDate?: Prisma.DateTimeNullableFilter<"ProviderPenalty"> | Date | string | null;
    active?: Prisma.BoolFilter<"ProviderPenalty"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"ProviderPenalty"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ProviderPenalty"> | Date | string;
    provider?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    cancellations?: Prisma.CancellationRecordListRelationFilter;
    appeals?: Prisma.AppealListRelationFilter;
}, "id">;
export type ProviderPenaltyOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    penaltyType?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ProviderPenaltyCountOrderByAggregateInput;
    _max?: Prisma.ProviderPenaltyMaxOrderByAggregateInput;
    _min?: Prisma.ProviderPenaltyMinOrderByAggregateInput;
};
export type ProviderPenaltyScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProviderPenaltyScalarWhereWithAggregatesInput | Prisma.ProviderPenaltyScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProviderPenaltyScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProviderPenaltyScalarWhereWithAggregatesInput | Prisma.ProviderPenaltyScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ProviderPenalty"> | string;
    providerId?: Prisma.StringWithAggregatesFilter<"ProviderPenalty"> | string;
    penaltyType?: Prisma.EnumPenaltyTypeWithAggregatesFilter<"ProviderPenalty"> | $Enums.PenaltyType;
    reason?: Prisma.StringWithAggregatesFilter<"ProviderPenalty"> | string;
    startDate?: Prisma.DateTimeWithAggregatesFilter<"ProviderPenalty"> | Date | string;
    endDate?: Prisma.DateTimeNullableWithAggregatesFilter<"ProviderPenalty"> | Date | string | null;
    active?: Prisma.BoolWithAggregatesFilter<"ProviderPenalty"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ProviderPenalty"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ProviderPenalty"> | Date | string;
};
export type ProviderPenaltyCreateInput = {
    id?: string;
    penaltyType: $Enums.PenaltyType;
    reason: string;
    startDate?: Date | string;
    endDate?: Date | string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    provider: Prisma.UserCreateNestedOneWithoutPenaltiesInput;
    cancellations?: Prisma.CancellationRecordCreateNestedManyWithoutPenaltyInput;
    appeals?: Prisma.AppealCreateNestedManyWithoutPenaltyInput;
};
export type ProviderPenaltyUncheckedCreateInput = {
    id?: string;
    providerId: string;
    penaltyType: $Enums.PenaltyType;
    reason: string;
    startDate?: Date | string;
    endDate?: Date | string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    cancellations?: Prisma.CancellationRecordUncheckedCreateNestedManyWithoutPenaltyInput;
    appeals?: Prisma.AppealUncheckedCreateNestedManyWithoutPenaltyInput;
};
export type ProviderPenaltyUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    penaltyType?: Prisma.EnumPenaltyTypeFieldUpdateOperationsInput | $Enums.PenaltyType;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    provider?: Prisma.UserUpdateOneRequiredWithoutPenaltiesNestedInput;
    cancellations?: Prisma.CancellationRecordUpdateManyWithoutPenaltyNestedInput;
    appeals?: Prisma.AppealUpdateManyWithoutPenaltyNestedInput;
};
export type ProviderPenaltyUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    penaltyType?: Prisma.EnumPenaltyTypeFieldUpdateOperationsInput | $Enums.PenaltyType;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cancellations?: Prisma.CancellationRecordUncheckedUpdateManyWithoutPenaltyNestedInput;
    appeals?: Prisma.AppealUncheckedUpdateManyWithoutPenaltyNestedInput;
};
export type ProviderPenaltyCreateManyInput = {
    id?: string;
    providerId: string;
    penaltyType: $Enums.PenaltyType;
    reason: string;
    startDate?: Date | string;
    endDate?: Date | string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProviderPenaltyUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    penaltyType?: Prisma.EnumPenaltyTypeFieldUpdateOperationsInput | $Enums.PenaltyType;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProviderPenaltyUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    penaltyType?: Prisma.EnumPenaltyTypeFieldUpdateOperationsInput | $Enums.PenaltyType;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProviderPenaltyListRelationFilter = {
    every?: Prisma.ProviderPenaltyWhereInput;
    some?: Prisma.ProviderPenaltyWhereInput;
    none?: Prisma.ProviderPenaltyWhereInput;
};
export type ProviderPenaltyOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProviderPenaltyNullableScalarRelationFilter = {
    is?: Prisma.ProviderPenaltyWhereInput | null;
    isNot?: Prisma.ProviderPenaltyWhereInput | null;
};
export type ProviderPenaltyCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    penaltyType?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProviderPenaltyMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    penaltyType?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProviderPenaltyMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    penaltyType?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProviderPenaltyScalarRelationFilter = {
    is?: Prisma.ProviderPenaltyWhereInput;
    isNot?: Prisma.ProviderPenaltyWhereInput;
};
export type ProviderPenaltyCreateNestedManyWithoutProviderInput = {
    create?: Prisma.XOR<Prisma.ProviderPenaltyCreateWithoutProviderInput, Prisma.ProviderPenaltyUncheckedCreateWithoutProviderInput> | Prisma.ProviderPenaltyCreateWithoutProviderInput[] | Prisma.ProviderPenaltyUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.ProviderPenaltyCreateOrConnectWithoutProviderInput | Prisma.ProviderPenaltyCreateOrConnectWithoutProviderInput[];
    createMany?: Prisma.ProviderPenaltyCreateManyProviderInputEnvelope;
    connect?: Prisma.ProviderPenaltyWhereUniqueInput | Prisma.ProviderPenaltyWhereUniqueInput[];
};
export type ProviderPenaltyUncheckedCreateNestedManyWithoutProviderInput = {
    create?: Prisma.XOR<Prisma.ProviderPenaltyCreateWithoutProviderInput, Prisma.ProviderPenaltyUncheckedCreateWithoutProviderInput> | Prisma.ProviderPenaltyCreateWithoutProviderInput[] | Prisma.ProviderPenaltyUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.ProviderPenaltyCreateOrConnectWithoutProviderInput | Prisma.ProviderPenaltyCreateOrConnectWithoutProviderInput[];
    createMany?: Prisma.ProviderPenaltyCreateManyProviderInputEnvelope;
    connect?: Prisma.ProviderPenaltyWhereUniqueInput | Prisma.ProviderPenaltyWhereUniqueInput[];
};
export type ProviderPenaltyUpdateManyWithoutProviderNestedInput = {
    create?: Prisma.XOR<Prisma.ProviderPenaltyCreateWithoutProviderInput, Prisma.ProviderPenaltyUncheckedCreateWithoutProviderInput> | Prisma.ProviderPenaltyCreateWithoutProviderInput[] | Prisma.ProviderPenaltyUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.ProviderPenaltyCreateOrConnectWithoutProviderInput | Prisma.ProviderPenaltyCreateOrConnectWithoutProviderInput[];
    upsert?: Prisma.ProviderPenaltyUpsertWithWhereUniqueWithoutProviderInput | Prisma.ProviderPenaltyUpsertWithWhereUniqueWithoutProviderInput[];
    createMany?: Prisma.ProviderPenaltyCreateManyProviderInputEnvelope;
    set?: Prisma.ProviderPenaltyWhereUniqueInput | Prisma.ProviderPenaltyWhereUniqueInput[];
    disconnect?: Prisma.ProviderPenaltyWhereUniqueInput | Prisma.ProviderPenaltyWhereUniqueInput[];
    delete?: Prisma.ProviderPenaltyWhereUniqueInput | Prisma.ProviderPenaltyWhereUniqueInput[];
    connect?: Prisma.ProviderPenaltyWhereUniqueInput | Prisma.ProviderPenaltyWhereUniqueInput[];
    update?: Prisma.ProviderPenaltyUpdateWithWhereUniqueWithoutProviderInput | Prisma.ProviderPenaltyUpdateWithWhereUniqueWithoutProviderInput[];
    updateMany?: Prisma.ProviderPenaltyUpdateManyWithWhereWithoutProviderInput | Prisma.ProviderPenaltyUpdateManyWithWhereWithoutProviderInput[];
    deleteMany?: Prisma.ProviderPenaltyScalarWhereInput | Prisma.ProviderPenaltyScalarWhereInput[];
};
export type ProviderPenaltyUncheckedUpdateManyWithoutProviderNestedInput = {
    create?: Prisma.XOR<Prisma.ProviderPenaltyCreateWithoutProviderInput, Prisma.ProviderPenaltyUncheckedCreateWithoutProviderInput> | Prisma.ProviderPenaltyCreateWithoutProviderInput[] | Prisma.ProviderPenaltyUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.ProviderPenaltyCreateOrConnectWithoutProviderInput | Prisma.ProviderPenaltyCreateOrConnectWithoutProviderInput[];
    upsert?: Prisma.ProviderPenaltyUpsertWithWhereUniqueWithoutProviderInput | Prisma.ProviderPenaltyUpsertWithWhereUniqueWithoutProviderInput[];
    createMany?: Prisma.ProviderPenaltyCreateManyProviderInputEnvelope;
    set?: Prisma.ProviderPenaltyWhereUniqueInput | Prisma.ProviderPenaltyWhereUniqueInput[];
    disconnect?: Prisma.ProviderPenaltyWhereUniqueInput | Prisma.ProviderPenaltyWhereUniqueInput[];
    delete?: Prisma.ProviderPenaltyWhereUniqueInput | Prisma.ProviderPenaltyWhereUniqueInput[];
    connect?: Prisma.ProviderPenaltyWhereUniqueInput | Prisma.ProviderPenaltyWhereUniqueInput[];
    update?: Prisma.ProviderPenaltyUpdateWithWhereUniqueWithoutProviderInput | Prisma.ProviderPenaltyUpdateWithWhereUniqueWithoutProviderInput[];
    updateMany?: Prisma.ProviderPenaltyUpdateManyWithWhereWithoutProviderInput | Prisma.ProviderPenaltyUpdateManyWithWhereWithoutProviderInput[];
    deleteMany?: Prisma.ProviderPenaltyScalarWhereInput | Prisma.ProviderPenaltyScalarWhereInput[];
};
export type ProviderPenaltyCreateNestedOneWithoutCancellationsInput = {
    create?: Prisma.XOR<Prisma.ProviderPenaltyCreateWithoutCancellationsInput, Prisma.ProviderPenaltyUncheckedCreateWithoutCancellationsInput>;
    connectOrCreate?: Prisma.ProviderPenaltyCreateOrConnectWithoutCancellationsInput;
    connect?: Prisma.ProviderPenaltyWhereUniqueInput;
};
export type ProviderPenaltyUpdateOneWithoutCancellationsNestedInput = {
    create?: Prisma.XOR<Prisma.ProviderPenaltyCreateWithoutCancellationsInput, Prisma.ProviderPenaltyUncheckedCreateWithoutCancellationsInput>;
    connectOrCreate?: Prisma.ProviderPenaltyCreateOrConnectWithoutCancellationsInput;
    upsert?: Prisma.ProviderPenaltyUpsertWithoutCancellationsInput;
    disconnect?: Prisma.ProviderPenaltyWhereInput | boolean;
    delete?: Prisma.ProviderPenaltyWhereInput | boolean;
    connect?: Prisma.ProviderPenaltyWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProviderPenaltyUpdateToOneWithWhereWithoutCancellationsInput, Prisma.ProviderPenaltyUpdateWithoutCancellationsInput>, Prisma.ProviderPenaltyUncheckedUpdateWithoutCancellationsInput>;
};
export type EnumPenaltyTypeFieldUpdateOperationsInput = {
    set?: $Enums.PenaltyType;
};
export type ProviderPenaltyCreateNestedOneWithoutAppealsInput = {
    create?: Prisma.XOR<Prisma.ProviderPenaltyCreateWithoutAppealsInput, Prisma.ProviderPenaltyUncheckedCreateWithoutAppealsInput>;
    connectOrCreate?: Prisma.ProviderPenaltyCreateOrConnectWithoutAppealsInput;
    connect?: Prisma.ProviderPenaltyWhereUniqueInput;
};
export type ProviderPenaltyUpdateOneRequiredWithoutAppealsNestedInput = {
    create?: Prisma.XOR<Prisma.ProviderPenaltyCreateWithoutAppealsInput, Prisma.ProviderPenaltyUncheckedCreateWithoutAppealsInput>;
    connectOrCreate?: Prisma.ProviderPenaltyCreateOrConnectWithoutAppealsInput;
    upsert?: Prisma.ProviderPenaltyUpsertWithoutAppealsInput;
    connect?: Prisma.ProviderPenaltyWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProviderPenaltyUpdateToOneWithWhereWithoutAppealsInput, Prisma.ProviderPenaltyUpdateWithoutAppealsInput>, Prisma.ProviderPenaltyUncheckedUpdateWithoutAppealsInput>;
};
export type ProviderPenaltyCreateWithoutProviderInput = {
    id?: string;
    penaltyType: $Enums.PenaltyType;
    reason: string;
    startDate?: Date | string;
    endDate?: Date | string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    cancellations?: Prisma.CancellationRecordCreateNestedManyWithoutPenaltyInput;
    appeals?: Prisma.AppealCreateNestedManyWithoutPenaltyInput;
};
export type ProviderPenaltyUncheckedCreateWithoutProviderInput = {
    id?: string;
    penaltyType: $Enums.PenaltyType;
    reason: string;
    startDate?: Date | string;
    endDate?: Date | string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    cancellations?: Prisma.CancellationRecordUncheckedCreateNestedManyWithoutPenaltyInput;
    appeals?: Prisma.AppealUncheckedCreateNestedManyWithoutPenaltyInput;
};
export type ProviderPenaltyCreateOrConnectWithoutProviderInput = {
    where: Prisma.ProviderPenaltyWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProviderPenaltyCreateWithoutProviderInput, Prisma.ProviderPenaltyUncheckedCreateWithoutProviderInput>;
};
export type ProviderPenaltyCreateManyProviderInputEnvelope = {
    data: Prisma.ProviderPenaltyCreateManyProviderInput | Prisma.ProviderPenaltyCreateManyProviderInput[];
    skipDuplicates?: boolean;
};
export type ProviderPenaltyUpsertWithWhereUniqueWithoutProviderInput = {
    where: Prisma.ProviderPenaltyWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProviderPenaltyUpdateWithoutProviderInput, Prisma.ProviderPenaltyUncheckedUpdateWithoutProviderInput>;
    create: Prisma.XOR<Prisma.ProviderPenaltyCreateWithoutProviderInput, Prisma.ProviderPenaltyUncheckedCreateWithoutProviderInput>;
};
export type ProviderPenaltyUpdateWithWhereUniqueWithoutProviderInput = {
    where: Prisma.ProviderPenaltyWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProviderPenaltyUpdateWithoutProviderInput, Prisma.ProviderPenaltyUncheckedUpdateWithoutProviderInput>;
};
export type ProviderPenaltyUpdateManyWithWhereWithoutProviderInput = {
    where: Prisma.ProviderPenaltyScalarWhereInput;
    data: Prisma.XOR<Prisma.ProviderPenaltyUpdateManyMutationInput, Prisma.ProviderPenaltyUncheckedUpdateManyWithoutProviderInput>;
};
export type ProviderPenaltyScalarWhereInput = {
    AND?: Prisma.ProviderPenaltyScalarWhereInput | Prisma.ProviderPenaltyScalarWhereInput[];
    OR?: Prisma.ProviderPenaltyScalarWhereInput[];
    NOT?: Prisma.ProviderPenaltyScalarWhereInput | Prisma.ProviderPenaltyScalarWhereInput[];
    id?: Prisma.StringFilter<"ProviderPenalty"> | string;
    providerId?: Prisma.StringFilter<"ProviderPenalty"> | string;
    penaltyType?: Prisma.EnumPenaltyTypeFilter<"ProviderPenalty"> | $Enums.PenaltyType;
    reason?: Prisma.StringFilter<"ProviderPenalty"> | string;
    startDate?: Prisma.DateTimeFilter<"ProviderPenalty"> | Date | string;
    endDate?: Prisma.DateTimeNullableFilter<"ProviderPenalty"> | Date | string | null;
    active?: Prisma.BoolFilter<"ProviderPenalty"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"ProviderPenalty"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ProviderPenalty"> | Date | string;
};
export type ProviderPenaltyCreateWithoutCancellationsInput = {
    id?: string;
    penaltyType: $Enums.PenaltyType;
    reason: string;
    startDate?: Date | string;
    endDate?: Date | string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    provider: Prisma.UserCreateNestedOneWithoutPenaltiesInput;
    appeals?: Prisma.AppealCreateNestedManyWithoutPenaltyInput;
};
export type ProviderPenaltyUncheckedCreateWithoutCancellationsInput = {
    id?: string;
    providerId: string;
    penaltyType: $Enums.PenaltyType;
    reason: string;
    startDate?: Date | string;
    endDate?: Date | string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    appeals?: Prisma.AppealUncheckedCreateNestedManyWithoutPenaltyInput;
};
export type ProviderPenaltyCreateOrConnectWithoutCancellationsInput = {
    where: Prisma.ProviderPenaltyWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProviderPenaltyCreateWithoutCancellationsInput, Prisma.ProviderPenaltyUncheckedCreateWithoutCancellationsInput>;
};
export type ProviderPenaltyUpsertWithoutCancellationsInput = {
    update: Prisma.XOR<Prisma.ProviderPenaltyUpdateWithoutCancellationsInput, Prisma.ProviderPenaltyUncheckedUpdateWithoutCancellationsInput>;
    create: Prisma.XOR<Prisma.ProviderPenaltyCreateWithoutCancellationsInput, Prisma.ProviderPenaltyUncheckedCreateWithoutCancellationsInput>;
    where?: Prisma.ProviderPenaltyWhereInput;
};
export type ProviderPenaltyUpdateToOneWithWhereWithoutCancellationsInput = {
    where?: Prisma.ProviderPenaltyWhereInput;
    data: Prisma.XOR<Prisma.ProviderPenaltyUpdateWithoutCancellationsInput, Prisma.ProviderPenaltyUncheckedUpdateWithoutCancellationsInput>;
};
export type ProviderPenaltyUpdateWithoutCancellationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    penaltyType?: Prisma.EnumPenaltyTypeFieldUpdateOperationsInput | $Enums.PenaltyType;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    provider?: Prisma.UserUpdateOneRequiredWithoutPenaltiesNestedInput;
    appeals?: Prisma.AppealUpdateManyWithoutPenaltyNestedInput;
};
export type ProviderPenaltyUncheckedUpdateWithoutCancellationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    penaltyType?: Prisma.EnumPenaltyTypeFieldUpdateOperationsInput | $Enums.PenaltyType;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    appeals?: Prisma.AppealUncheckedUpdateManyWithoutPenaltyNestedInput;
};
export type ProviderPenaltyCreateWithoutAppealsInput = {
    id?: string;
    penaltyType: $Enums.PenaltyType;
    reason: string;
    startDate?: Date | string;
    endDate?: Date | string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    provider: Prisma.UserCreateNestedOneWithoutPenaltiesInput;
    cancellations?: Prisma.CancellationRecordCreateNestedManyWithoutPenaltyInput;
};
export type ProviderPenaltyUncheckedCreateWithoutAppealsInput = {
    id?: string;
    providerId: string;
    penaltyType: $Enums.PenaltyType;
    reason: string;
    startDate?: Date | string;
    endDate?: Date | string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    cancellations?: Prisma.CancellationRecordUncheckedCreateNestedManyWithoutPenaltyInput;
};
export type ProviderPenaltyCreateOrConnectWithoutAppealsInput = {
    where: Prisma.ProviderPenaltyWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProviderPenaltyCreateWithoutAppealsInput, Prisma.ProviderPenaltyUncheckedCreateWithoutAppealsInput>;
};
export type ProviderPenaltyUpsertWithoutAppealsInput = {
    update: Prisma.XOR<Prisma.ProviderPenaltyUpdateWithoutAppealsInput, Prisma.ProviderPenaltyUncheckedUpdateWithoutAppealsInput>;
    create: Prisma.XOR<Prisma.ProviderPenaltyCreateWithoutAppealsInput, Prisma.ProviderPenaltyUncheckedCreateWithoutAppealsInput>;
    where?: Prisma.ProviderPenaltyWhereInput;
};
export type ProviderPenaltyUpdateToOneWithWhereWithoutAppealsInput = {
    where?: Prisma.ProviderPenaltyWhereInput;
    data: Prisma.XOR<Prisma.ProviderPenaltyUpdateWithoutAppealsInput, Prisma.ProviderPenaltyUncheckedUpdateWithoutAppealsInput>;
};
export type ProviderPenaltyUpdateWithoutAppealsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    penaltyType?: Prisma.EnumPenaltyTypeFieldUpdateOperationsInput | $Enums.PenaltyType;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    provider?: Prisma.UserUpdateOneRequiredWithoutPenaltiesNestedInput;
    cancellations?: Prisma.CancellationRecordUpdateManyWithoutPenaltyNestedInput;
};
export type ProviderPenaltyUncheckedUpdateWithoutAppealsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    penaltyType?: Prisma.EnumPenaltyTypeFieldUpdateOperationsInput | $Enums.PenaltyType;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cancellations?: Prisma.CancellationRecordUncheckedUpdateManyWithoutPenaltyNestedInput;
};
export type ProviderPenaltyCreateManyProviderInput = {
    id?: string;
    penaltyType: $Enums.PenaltyType;
    reason: string;
    startDate?: Date | string;
    endDate?: Date | string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProviderPenaltyUpdateWithoutProviderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    penaltyType?: Prisma.EnumPenaltyTypeFieldUpdateOperationsInput | $Enums.PenaltyType;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cancellations?: Prisma.CancellationRecordUpdateManyWithoutPenaltyNestedInput;
    appeals?: Prisma.AppealUpdateManyWithoutPenaltyNestedInput;
};
export type ProviderPenaltyUncheckedUpdateWithoutProviderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    penaltyType?: Prisma.EnumPenaltyTypeFieldUpdateOperationsInput | $Enums.PenaltyType;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cancellations?: Prisma.CancellationRecordUncheckedUpdateManyWithoutPenaltyNestedInput;
    appeals?: Prisma.AppealUncheckedUpdateManyWithoutPenaltyNestedInput;
};
export type ProviderPenaltyUncheckedUpdateManyWithoutProviderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    penaltyType?: Prisma.EnumPenaltyTypeFieldUpdateOperationsInput | $Enums.PenaltyType;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProviderPenaltyCountOutputType = {
    cancellations: number;
    appeals: number;
};
export type ProviderPenaltyCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    cancellations?: boolean | ProviderPenaltyCountOutputTypeCountCancellationsArgs;
    appeals?: boolean | ProviderPenaltyCountOutputTypeCountAppealsArgs;
};
export type ProviderPenaltyCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderPenaltyCountOutputTypeSelect<ExtArgs> | null;
};
export type ProviderPenaltyCountOutputTypeCountCancellationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CancellationRecordWhereInput;
};
export type ProviderPenaltyCountOutputTypeCountAppealsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AppealWhereInput;
};
export type ProviderPenaltySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    providerId?: boolean;
    penaltyType?: boolean;
    reason?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    active?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    cancellations?: boolean | Prisma.ProviderPenalty$cancellationsArgs<ExtArgs>;
    appeals?: boolean | Prisma.ProviderPenalty$appealsArgs<ExtArgs>;
    _count?: boolean | Prisma.ProviderPenaltyCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["providerPenalty"]>;
export type ProviderPenaltySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    providerId?: boolean;
    penaltyType?: boolean;
    reason?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    active?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["providerPenalty"]>;
export type ProviderPenaltySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    providerId?: boolean;
    penaltyType?: boolean;
    reason?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    active?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["providerPenalty"]>;
export type ProviderPenaltySelectScalar = {
    id?: boolean;
    providerId?: boolean;
    penaltyType?: boolean;
    reason?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    active?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ProviderPenaltyOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "providerId" | "penaltyType" | "reason" | "startDate" | "endDate" | "active" | "createdAt" | "updatedAt", ExtArgs["result"]["providerPenalty"]>;
export type ProviderPenaltyInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    cancellations?: boolean | Prisma.ProviderPenalty$cancellationsArgs<ExtArgs>;
    appeals?: boolean | Prisma.ProviderPenalty$appealsArgs<ExtArgs>;
    _count?: boolean | Prisma.ProviderPenaltyCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ProviderPenaltyIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ProviderPenaltyIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $ProviderPenaltyPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProviderPenalty";
    objects: {
        provider: Prisma.$UserPayload<ExtArgs>;
        cancellations: Prisma.$CancellationRecordPayload<ExtArgs>[];
        appeals: Prisma.$AppealPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        providerId: string;
        penaltyType: $Enums.PenaltyType;
        reason: string;
        startDate: Date;
        endDate: Date | null;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["providerPenalty"]>;
    composites: {};
};
export type ProviderPenaltyGetPayload<S extends boolean | null | undefined | ProviderPenaltyDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProviderPenaltyPayload, S>;
export type ProviderPenaltyCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProviderPenaltyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProviderPenaltyCountAggregateInputType | true;
};
export interface ProviderPenaltyDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProviderPenalty'];
        meta: {
            name: 'ProviderPenalty';
        };
    };
    findUnique<T extends ProviderPenaltyFindUniqueArgs>(args: Prisma.SelectSubset<T, ProviderPenaltyFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProviderPenaltyClient<runtime.Types.Result.GetResult<Prisma.$ProviderPenaltyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProviderPenaltyFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProviderPenaltyFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProviderPenaltyClient<runtime.Types.Result.GetResult<Prisma.$ProviderPenaltyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProviderPenaltyFindFirstArgs>(args?: Prisma.SelectSubset<T, ProviderPenaltyFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProviderPenaltyClient<runtime.Types.Result.GetResult<Prisma.$ProviderPenaltyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProviderPenaltyFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProviderPenaltyFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProviderPenaltyClient<runtime.Types.Result.GetResult<Prisma.$ProviderPenaltyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProviderPenaltyFindManyArgs>(args?: Prisma.SelectSubset<T, ProviderPenaltyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProviderPenaltyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProviderPenaltyCreateArgs>(args: Prisma.SelectSubset<T, ProviderPenaltyCreateArgs<ExtArgs>>): Prisma.Prisma__ProviderPenaltyClient<runtime.Types.Result.GetResult<Prisma.$ProviderPenaltyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProviderPenaltyCreateManyArgs>(args?: Prisma.SelectSubset<T, ProviderPenaltyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProviderPenaltyCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProviderPenaltyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProviderPenaltyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProviderPenaltyDeleteArgs>(args: Prisma.SelectSubset<T, ProviderPenaltyDeleteArgs<ExtArgs>>): Prisma.Prisma__ProviderPenaltyClient<runtime.Types.Result.GetResult<Prisma.$ProviderPenaltyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProviderPenaltyUpdateArgs>(args: Prisma.SelectSubset<T, ProviderPenaltyUpdateArgs<ExtArgs>>): Prisma.Prisma__ProviderPenaltyClient<runtime.Types.Result.GetResult<Prisma.$ProviderPenaltyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProviderPenaltyDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProviderPenaltyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProviderPenaltyUpdateManyArgs>(args: Prisma.SelectSubset<T, ProviderPenaltyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProviderPenaltyUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProviderPenaltyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProviderPenaltyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProviderPenaltyUpsertArgs>(args: Prisma.SelectSubset<T, ProviderPenaltyUpsertArgs<ExtArgs>>): Prisma.Prisma__ProviderPenaltyClient<runtime.Types.Result.GetResult<Prisma.$ProviderPenaltyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProviderPenaltyCountArgs>(args?: Prisma.Subset<T, ProviderPenaltyCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProviderPenaltyCountAggregateOutputType> : number>;
    aggregate<T extends ProviderPenaltyAggregateArgs>(args: Prisma.Subset<T, ProviderPenaltyAggregateArgs>): Prisma.PrismaPromise<GetProviderPenaltyAggregateType<T>>;
    groupBy<T extends ProviderPenaltyGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProviderPenaltyGroupByArgs['orderBy'];
    } : {
        orderBy?: ProviderPenaltyGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProviderPenaltyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProviderPenaltyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProviderPenaltyFieldRefs;
}
export interface Prisma__ProviderPenaltyClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    provider<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    cancellations<T extends Prisma.ProviderPenalty$cancellationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProviderPenalty$cancellationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CancellationRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    appeals<T extends Prisma.ProviderPenalty$appealsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProviderPenalty$appealsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AppealPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProviderPenaltyFieldRefs {
    readonly id: Prisma.FieldRef<"ProviderPenalty", 'String'>;
    readonly providerId: Prisma.FieldRef<"ProviderPenalty", 'String'>;
    readonly penaltyType: Prisma.FieldRef<"ProviderPenalty", 'PenaltyType'>;
    readonly reason: Prisma.FieldRef<"ProviderPenalty", 'String'>;
    readonly startDate: Prisma.FieldRef<"ProviderPenalty", 'DateTime'>;
    readonly endDate: Prisma.FieldRef<"ProviderPenalty", 'DateTime'>;
    readonly active: Prisma.FieldRef<"ProviderPenalty", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"ProviderPenalty", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ProviderPenalty", 'DateTime'>;
}
export type ProviderPenaltyFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderPenaltySelect<ExtArgs> | null;
    omit?: Prisma.ProviderPenaltyOmit<ExtArgs> | null;
    include?: Prisma.ProviderPenaltyInclude<ExtArgs> | null;
    where: Prisma.ProviderPenaltyWhereUniqueInput;
};
export type ProviderPenaltyFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderPenaltySelect<ExtArgs> | null;
    omit?: Prisma.ProviderPenaltyOmit<ExtArgs> | null;
    include?: Prisma.ProviderPenaltyInclude<ExtArgs> | null;
    where: Prisma.ProviderPenaltyWhereUniqueInput;
};
export type ProviderPenaltyFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderPenaltySelect<ExtArgs> | null;
    omit?: Prisma.ProviderPenaltyOmit<ExtArgs> | null;
    include?: Prisma.ProviderPenaltyInclude<ExtArgs> | null;
    where?: Prisma.ProviderPenaltyWhereInput;
    orderBy?: Prisma.ProviderPenaltyOrderByWithRelationInput | Prisma.ProviderPenaltyOrderByWithRelationInput[];
    cursor?: Prisma.ProviderPenaltyWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProviderPenaltyScalarFieldEnum | Prisma.ProviderPenaltyScalarFieldEnum[];
};
export type ProviderPenaltyFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderPenaltySelect<ExtArgs> | null;
    omit?: Prisma.ProviderPenaltyOmit<ExtArgs> | null;
    include?: Prisma.ProviderPenaltyInclude<ExtArgs> | null;
    where?: Prisma.ProviderPenaltyWhereInput;
    orderBy?: Prisma.ProviderPenaltyOrderByWithRelationInput | Prisma.ProviderPenaltyOrderByWithRelationInput[];
    cursor?: Prisma.ProviderPenaltyWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProviderPenaltyScalarFieldEnum | Prisma.ProviderPenaltyScalarFieldEnum[];
};
export type ProviderPenaltyFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderPenaltySelect<ExtArgs> | null;
    omit?: Prisma.ProviderPenaltyOmit<ExtArgs> | null;
    include?: Prisma.ProviderPenaltyInclude<ExtArgs> | null;
    where?: Prisma.ProviderPenaltyWhereInput;
    orderBy?: Prisma.ProviderPenaltyOrderByWithRelationInput | Prisma.ProviderPenaltyOrderByWithRelationInput[];
    cursor?: Prisma.ProviderPenaltyWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProviderPenaltyScalarFieldEnum | Prisma.ProviderPenaltyScalarFieldEnum[];
};
export type ProviderPenaltyCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderPenaltySelect<ExtArgs> | null;
    omit?: Prisma.ProviderPenaltyOmit<ExtArgs> | null;
    include?: Prisma.ProviderPenaltyInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProviderPenaltyCreateInput, Prisma.ProviderPenaltyUncheckedCreateInput>;
};
export type ProviderPenaltyCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProviderPenaltyCreateManyInput | Prisma.ProviderPenaltyCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProviderPenaltyCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderPenaltySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProviderPenaltyOmit<ExtArgs> | null;
    data: Prisma.ProviderPenaltyCreateManyInput | Prisma.ProviderPenaltyCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProviderPenaltyIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProviderPenaltyUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderPenaltySelect<ExtArgs> | null;
    omit?: Prisma.ProviderPenaltyOmit<ExtArgs> | null;
    include?: Prisma.ProviderPenaltyInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProviderPenaltyUpdateInput, Prisma.ProviderPenaltyUncheckedUpdateInput>;
    where: Prisma.ProviderPenaltyWhereUniqueInput;
};
export type ProviderPenaltyUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProviderPenaltyUpdateManyMutationInput, Prisma.ProviderPenaltyUncheckedUpdateManyInput>;
    where?: Prisma.ProviderPenaltyWhereInput;
    limit?: number;
};
export type ProviderPenaltyUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderPenaltySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProviderPenaltyOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProviderPenaltyUpdateManyMutationInput, Prisma.ProviderPenaltyUncheckedUpdateManyInput>;
    where?: Prisma.ProviderPenaltyWhereInput;
    limit?: number;
    include?: Prisma.ProviderPenaltyIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProviderPenaltyUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderPenaltySelect<ExtArgs> | null;
    omit?: Prisma.ProviderPenaltyOmit<ExtArgs> | null;
    include?: Prisma.ProviderPenaltyInclude<ExtArgs> | null;
    where: Prisma.ProviderPenaltyWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProviderPenaltyCreateInput, Prisma.ProviderPenaltyUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProviderPenaltyUpdateInput, Prisma.ProviderPenaltyUncheckedUpdateInput>;
};
export type ProviderPenaltyDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderPenaltySelect<ExtArgs> | null;
    omit?: Prisma.ProviderPenaltyOmit<ExtArgs> | null;
    include?: Prisma.ProviderPenaltyInclude<ExtArgs> | null;
    where: Prisma.ProviderPenaltyWhereUniqueInput;
};
export type ProviderPenaltyDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProviderPenaltyWhereInput;
    limit?: number;
};
export type ProviderPenalty$cancellationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProviderPenalty$appealsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProviderPenaltyDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderPenaltySelect<ExtArgs> | null;
    omit?: Prisma.ProviderPenaltyOmit<ExtArgs> | null;
    include?: Prisma.ProviderPenaltyInclude<ExtArgs> | null;
};
export {};
