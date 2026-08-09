import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
export type DisputeTimelineModel = runtime.Types.Result.DefaultSelection<Prisma.$DisputeTimelinePayload>;
export type AggregateDisputeTimeline = {
    _count: DisputeTimelineCountAggregateOutputType | null;
    _min: DisputeTimelineMinAggregateOutputType | null;
    _max: DisputeTimelineMaxAggregateOutputType | null;
};
export type DisputeTimelineMinAggregateOutputType = {
    id: string | null;
    disputeId: string | null;
    actorId: string | null;
    action: string | null;
    description: string | null;
    createdAt: Date | null;
};
export type DisputeTimelineMaxAggregateOutputType = {
    id: string | null;
    disputeId: string | null;
    actorId: string | null;
    action: string | null;
    description: string | null;
    createdAt: Date | null;
};
export type DisputeTimelineCountAggregateOutputType = {
    id: number;
    disputeId: number;
    actorId: number;
    action: number;
    description: number;
    createdAt: number;
    _all: number;
};
export type DisputeTimelineMinAggregateInputType = {
    id?: true;
    disputeId?: true;
    actorId?: true;
    action?: true;
    description?: true;
    createdAt?: true;
};
export type DisputeTimelineMaxAggregateInputType = {
    id?: true;
    disputeId?: true;
    actorId?: true;
    action?: true;
    description?: true;
    createdAt?: true;
};
export type DisputeTimelineCountAggregateInputType = {
    id?: true;
    disputeId?: true;
    actorId?: true;
    action?: true;
    description?: true;
    createdAt?: true;
    _all?: true;
};
export type DisputeTimelineAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DisputeTimelineWhereInput;
    orderBy?: Prisma.DisputeTimelineOrderByWithRelationInput | Prisma.DisputeTimelineOrderByWithRelationInput[];
    cursor?: Prisma.DisputeTimelineWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | DisputeTimelineCountAggregateInputType;
    _min?: DisputeTimelineMinAggregateInputType;
    _max?: DisputeTimelineMaxAggregateInputType;
};
export type GetDisputeTimelineAggregateType<T extends DisputeTimelineAggregateArgs> = {
    [P in keyof T & keyof AggregateDisputeTimeline]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDisputeTimeline[P]> : Prisma.GetScalarType<T[P], AggregateDisputeTimeline[P]>;
};
export type DisputeTimelineGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DisputeTimelineWhereInput;
    orderBy?: Prisma.DisputeTimelineOrderByWithAggregationInput | Prisma.DisputeTimelineOrderByWithAggregationInput[];
    by: Prisma.DisputeTimelineScalarFieldEnum[] | Prisma.DisputeTimelineScalarFieldEnum;
    having?: Prisma.DisputeTimelineScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DisputeTimelineCountAggregateInputType | true;
    _min?: DisputeTimelineMinAggregateInputType;
    _max?: DisputeTimelineMaxAggregateInputType;
};
export type DisputeTimelineGroupByOutputType = {
    id: string;
    disputeId: string;
    actorId: string | null;
    action: string;
    description: string | null;
    createdAt: Date;
    _count: DisputeTimelineCountAggregateOutputType | null;
    _min: DisputeTimelineMinAggregateOutputType | null;
    _max: DisputeTimelineMaxAggregateOutputType | null;
};
type GetDisputeTimelineGroupByPayload<T extends DisputeTimelineGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DisputeTimelineGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DisputeTimelineGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DisputeTimelineGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DisputeTimelineGroupByOutputType[P]>;
}>>;
export type DisputeTimelineWhereInput = {
    AND?: Prisma.DisputeTimelineWhereInput | Prisma.DisputeTimelineWhereInput[];
    OR?: Prisma.DisputeTimelineWhereInput[];
    NOT?: Prisma.DisputeTimelineWhereInput | Prisma.DisputeTimelineWhereInput[];
    id?: Prisma.StringFilter<"DisputeTimeline"> | string;
    disputeId?: Prisma.StringFilter<"DisputeTimeline"> | string;
    actorId?: Prisma.StringNullableFilter<"DisputeTimeline"> | string | null;
    action?: Prisma.StringFilter<"DisputeTimeline"> | string;
    description?: Prisma.StringNullableFilter<"DisputeTimeline"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"DisputeTimeline"> | Date | string;
    dispute?: Prisma.XOR<Prisma.DisputeScalarRelationFilter, Prisma.DisputeWhereInput>;
    actor?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
};
export type DisputeTimelineOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    disputeId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    action?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    dispute?: Prisma.DisputeOrderByWithRelationInput;
    actor?: Prisma.UserOrderByWithRelationInput;
};
export type DisputeTimelineWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.DisputeTimelineWhereInput | Prisma.DisputeTimelineWhereInput[];
    OR?: Prisma.DisputeTimelineWhereInput[];
    NOT?: Prisma.DisputeTimelineWhereInput | Prisma.DisputeTimelineWhereInput[];
    disputeId?: Prisma.StringFilter<"DisputeTimeline"> | string;
    actorId?: Prisma.StringNullableFilter<"DisputeTimeline"> | string | null;
    action?: Prisma.StringFilter<"DisputeTimeline"> | string;
    description?: Prisma.StringNullableFilter<"DisputeTimeline"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"DisputeTimeline"> | Date | string;
    dispute?: Prisma.XOR<Prisma.DisputeScalarRelationFilter, Prisma.DisputeWhereInput>;
    actor?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
}, "id">;
export type DisputeTimelineOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    disputeId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    action?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.DisputeTimelineCountOrderByAggregateInput;
    _max?: Prisma.DisputeTimelineMaxOrderByAggregateInput;
    _min?: Prisma.DisputeTimelineMinOrderByAggregateInput;
};
export type DisputeTimelineScalarWhereWithAggregatesInput = {
    AND?: Prisma.DisputeTimelineScalarWhereWithAggregatesInput | Prisma.DisputeTimelineScalarWhereWithAggregatesInput[];
    OR?: Prisma.DisputeTimelineScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DisputeTimelineScalarWhereWithAggregatesInput | Prisma.DisputeTimelineScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"DisputeTimeline"> | string;
    disputeId?: Prisma.StringWithAggregatesFilter<"DisputeTimeline"> | string;
    actorId?: Prisma.StringNullableWithAggregatesFilter<"DisputeTimeline"> | string | null;
    action?: Prisma.StringWithAggregatesFilter<"DisputeTimeline"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"DisputeTimeline"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"DisputeTimeline"> | Date | string;
};
export type DisputeTimelineCreateInput = {
    id?: string;
    action: string;
    description?: string | null;
    createdAt?: Date | string;
    dispute: Prisma.DisputeCreateNestedOneWithoutTimelineInput;
    actor?: Prisma.UserCreateNestedOneWithoutDisputeTimelinesInput;
};
export type DisputeTimelineUncheckedCreateInput = {
    id?: string;
    disputeId: string;
    actorId?: string | null;
    action: string;
    description?: string | null;
    createdAt?: Date | string;
};
export type DisputeTimelineUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dispute?: Prisma.DisputeUpdateOneRequiredWithoutTimelineNestedInput;
    actor?: Prisma.UserUpdateOneWithoutDisputeTimelinesNestedInput;
};
export type DisputeTimelineUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    disputeId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DisputeTimelineCreateManyInput = {
    id?: string;
    disputeId: string;
    actorId?: string | null;
    action: string;
    description?: string | null;
    createdAt?: Date | string;
};
export type DisputeTimelineUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DisputeTimelineUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    disputeId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DisputeTimelineListRelationFilter = {
    every?: Prisma.DisputeTimelineWhereInput;
    some?: Prisma.DisputeTimelineWhereInput;
    none?: Prisma.DisputeTimelineWhereInput;
};
export type DisputeTimelineOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type DisputeTimelineCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    disputeId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DisputeTimelineMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    disputeId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DisputeTimelineMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    disputeId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DisputeTimelineCreateNestedManyWithoutActorInput = {
    create?: Prisma.XOR<Prisma.DisputeTimelineCreateWithoutActorInput, Prisma.DisputeTimelineUncheckedCreateWithoutActorInput> | Prisma.DisputeTimelineCreateWithoutActorInput[] | Prisma.DisputeTimelineUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.DisputeTimelineCreateOrConnectWithoutActorInput | Prisma.DisputeTimelineCreateOrConnectWithoutActorInput[];
    createMany?: Prisma.DisputeTimelineCreateManyActorInputEnvelope;
    connect?: Prisma.DisputeTimelineWhereUniqueInput | Prisma.DisputeTimelineWhereUniqueInput[];
};
export type DisputeTimelineUncheckedCreateNestedManyWithoutActorInput = {
    create?: Prisma.XOR<Prisma.DisputeTimelineCreateWithoutActorInput, Prisma.DisputeTimelineUncheckedCreateWithoutActorInput> | Prisma.DisputeTimelineCreateWithoutActorInput[] | Prisma.DisputeTimelineUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.DisputeTimelineCreateOrConnectWithoutActorInput | Prisma.DisputeTimelineCreateOrConnectWithoutActorInput[];
    createMany?: Prisma.DisputeTimelineCreateManyActorInputEnvelope;
    connect?: Prisma.DisputeTimelineWhereUniqueInput | Prisma.DisputeTimelineWhereUniqueInput[];
};
export type DisputeTimelineUpdateManyWithoutActorNestedInput = {
    create?: Prisma.XOR<Prisma.DisputeTimelineCreateWithoutActorInput, Prisma.DisputeTimelineUncheckedCreateWithoutActorInput> | Prisma.DisputeTimelineCreateWithoutActorInput[] | Prisma.DisputeTimelineUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.DisputeTimelineCreateOrConnectWithoutActorInput | Prisma.DisputeTimelineCreateOrConnectWithoutActorInput[];
    upsert?: Prisma.DisputeTimelineUpsertWithWhereUniqueWithoutActorInput | Prisma.DisputeTimelineUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: Prisma.DisputeTimelineCreateManyActorInputEnvelope;
    set?: Prisma.DisputeTimelineWhereUniqueInput | Prisma.DisputeTimelineWhereUniqueInput[];
    disconnect?: Prisma.DisputeTimelineWhereUniqueInput | Prisma.DisputeTimelineWhereUniqueInput[];
    delete?: Prisma.DisputeTimelineWhereUniqueInput | Prisma.DisputeTimelineWhereUniqueInput[];
    connect?: Prisma.DisputeTimelineWhereUniqueInput | Prisma.DisputeTimelineWhereUniqueInput[];
    update?: Prisma.DisputeTimelineUpdateWithWhereUniqueWithoutActorInput | Prisma.DisputeTimelineUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?: Prisma.DisputeTimelineUpdateManyWithWhereWithoutActorInput | Prisma.DisputeTimelineUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: Prisma.DisputeTimelineScalarWhereInput | Prisma.DisputeTimelineScalarWhereInput[];
};
export type DisputeTimelineUncheckedUpdateManyWithoutActorNestedInput = {
    create?: Prisma.XOR<Prisma.DisputeTimelineCreateWithoutActorInput, Prisma.DisputeTimelineUncheckedCreateWithoutActorInput> | Prisma.DisputeTimelineCreateWithoutActorInput[] | Prisma.DisputeTimelineUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.DisputeTimelineCreateOrConnectWithoutActorInput | Prisma.DisputeTimelineCreateOrConnectWithoutActorInput[];
    upsert?: Prisma.DisputeTimelineUpsertWithWhereUniqueWithoutActorInput | Prisma.DisputeTimelineUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: Prisma.DisputeTimelineCreateManyActorInputEnvelope;
    set?: Prisma.DisputeTimelineWhereUniqueInput | Prisma.DisputeTimelineWhereUniqueInput[];
    disconnect?: Prisma.DisputeTimelineWhereUniqueInput | Prisma.DisputeTimelineWhereUniqueInput[];
    delete?: Prisma.DisputeTimelineWhereUniqueInput | Prisma.DisputeTimelineWhereUniqueInput[];
    connect?: Prisma.DisputeTimelineWhereUniqueInput | Prisma.DisputeTimelineWhereUniqueInput[];
    update?: Prisma.DisputeTimelineUpdateWithWhereUniqueWithoutActorInput | Prisma.DisputeTimelineUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?: Prisma.DisputeTimelineUpdateManyWithWhereWithoutActorInput | Prisma.DisputeTimelineUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: Prisma.DisputeTimelineScalarWhereInput | Prisma.DisputeTimelineScalarWhereInput[];
};
export type DisputeTimelineCreateNestedManyWithoutDisputeInput = {
    create?: Prisma.XOR<Prisma.DisputeTimelineCreateWithoutDisputeInput, Prisma.DisputeTimelineUncheckedCreateWithoutDisputeInput> | Prisma.DisputeTimelineCreateWithoutDisputeInput[] | Prisma.DisputeTimelineUncheckedCreateWithoutDisputeInput[];
    connectOrCreate?: Prisma.DisputeTimelineCreateOrConnectWithoutDisputeInput | Prisma.DisputeTimelineCreateOrConnectWithoutDisputeInput[];
    createMany?: Prisma.DisputeTimelineCreateManyDisputeInputEnvelope;
    connect?: Prisma.DisputeTimelineWhereUniqueInput | Prisma.DisputeTimelineWhereUniqueInput[];
};
export type DisputeTimelineUncheckedCreateNestedManyWithoutDisputeInput = {
    create?: Prisma.XOR<Prisma.DisputeTimelineCreateWithoutDisputeInput, Prisma.DisputeTimelineUncheckedCreateWithoutDisputeInput> | Prisma.DisputeTimelineCreateWithoutDisputeInput[] | Prisma.DisputeTimelineUncheckedCreateWithoutDisputeInput[];
    connectOrCreate?: Prisma.DisputeTimelineCreateOrConnectWithoutDisputeInput | Prisma.DisputeTimelineCreateOrConnectWithoutDisputeInput[];
    createMany?: Prisma.DisputeTimelineCreateManyDisputeInputEnvelope;
    connect?: Prisma.DisputeTimelineWhereUniqueInput | Prisma.DisputeTimelineWhereUniqueInput[];
};
export type DisputeTimelineUpdateManyWithoutDisputeNestedInput = {
    create?: Prisma.XOR<Prisma.DisputeTimelineCreateWithoutDisputeInput, Prisma.DisputeTimelineUncheckedCreateWithoutDisputeInput> | Prisma.DisputeTimelineCreateWithoutDisputeInput[] | Prisma.DisputeTimelineUncheckedCreateWithoutDisputeInput[];
    connectOrCreate?: Prisma.DisputeTimelineCreateOrConnectWithoutDisputeInput | Prisma.DisputeTimelineCreateOrConnectWithoutDisputeInput[];
    upsert?: Prisma.DisputeTimelineUpsertWithWhereUniqueWithoutDisputeInput | Prisma.DisputeTimelineUpsertWithWhereUniqueWithoutDisputeInput[];
    createMany?: Prisma.DisputeTimelineCreateManyDisputeInputEnvelope;
    set?: Prisma.DisputeTimelineWhereUniqueInput | Prisma.DisputeTimelineWhereUniqueInput[];
    disconnect?: Prisma.DisputeTimelineWhereUniqueInput | Prisma.DisputeTimelineWhereUniqueInput[];
    delete?: Prisma.DisputeTimelineWhereUniqueInput | Prisma.DisputeTimelineWhereUniqueInput[];
    connect?: Prisma.DisputeTimelineWhereUniqueInput | Prisma.DisputeTimelineWhereUniqueInput[];
    update?: Prisma.DisputeTimelineUpdateWithWhereUniqueWithoutDisputeInput | Prisma.DisputeTimelineUpdateWithWhereUniqueWithoutDisputeInput[];
    updateMany?: Prisma.DisputeTimelineUpdateManyWithWhereWithoutDisputeInput | Prisma.DisputeTimelineUpdateManyWithWhereWithoutDisputeInput[];
    deleteMany?: Prisma.DisputeTimelineScalarWhereInput | Prisma.DisputeTimelineScalarWhereInput[];
};
export type DisputeTimelineUncheckedUpdateManyWithoutDisputeNestedInput = {
    create?: Prisma.XOR<Prisma.DisputeTimelineCreateWithoutDisputeInput, Prisma.DisputeTimelineUncheckedCreateWithoutDisputeInput> | Prisma.DisputeTimelineCreateWithoutDisputeInput[] | Prisma.DisputeTimelineUncheckedCreateWithoutDisputeInput[];
    connectOrCreate?: Prisma.DisputeTimelineCreateOrConnectWithoutDisputeInput | Prisma.DisputeTimelineCreateOrConnectWithoutDisputeInput[];
    upsert?: Prisma.DisputeTimelineUpsertWithWhereUniqueWithoutDisputeInput | Prisma.DisputeTimelineUpsertWithWhereUniqueWithoutDisputeInput[];
    createMany?: Prisma.DisputeTimelineCreateManyDisputeInputEnvelope;
    set?: Prisma.DisputeTimelineWhereUniqueInput | Prisma.DisputeTimelineWhereUniqueInput[];
    disconnect?: Prisma.DisputeTimelineWhereUniqueInput | Prisma.DisputeTimelineWhereUniqueInput[];
    delete?: Prisma.DisputeTimelineWhereUniqueInput | Prisma.DisputeTimelineWhereUniqueInput[];
    connect?: Prisma.DisputeTimelineWhereUniqueInput | Prisma.DisputeTimelineWhereUniqueInput[];
    update?: Prisma.DisputeTimelineUpdateWithWhereUniqueWithoutDisputeInput | Prisma.DisputeTimelineUpdateWithWhereUniqueWithoutDisputeInput[];
    updateMany?: Prisma.DisputeTimelineUpdateManyWithWhereWithoutDisputeInput | Prisma.DisputeTimelineUpdateManyWithWhereWithoutDisputeInput[];
    deleteMany?: Prisma.DisputeTimelineScalarWhereInput | Prisma.DisputeTimelineScalarWhereInput[];
};
export type DisputeTimelineCreateWithoutActorInput = {
    id?: string;
    action: string;
    description?: string | null;
    createdAt?: Date | string;
    dispute: Prisma.DisputeCreateNestedOneWithoutTimelineInput;
};
export type DisputeTimelineUncheckedCreateWithoutActorInput = {
    id?: string;
    disputeId: string;
    action: string;
    description?: string | null;
    createdAt?: Date | string;
};
export type DisputeTimelineCreateOrConnectWithoutActorInput = {
    where: Prisma.DisputeTimelineWhereUniqueInput;
    create: Prisma.XOR<Prisma.DisputeTimelineCreateWithoutActorInput, Prisma.DisputeTimelineUncheckedCreateWithoutActorInput>;
};
export type DisputeTimelineCreateManyActorInputEnvelope = {
    data: Prisma.DisputeTimelineCreateManyActorInput | Prisma.DisputeTimelineCreateManyActorInput[];
    skipDuplicates?: boolean;
};
export type DisputeTimelineUpsertWithWhereUniqueWithoutActorInput = {
    where: Prisma.DisputeTimelineWhereUniqueInput;
    update: Prisma.XOR<Prisma.DisputeTimelineUpdateWithoutActorInput, Prisma.DisputeTimelineUncheckedUpdateWithoutActorInput>;
    create: Prisma.XOR<Prisma.DisputeTimelineCreateWithoutActorInput, Prisma.DisputeTimelineUncheckedCreateWithoutActorInput>;
};
export type DisputeTimelineUpdateWithWhereUniqueWithoutActorInput = {
    where: Prisma.DisputeTimelineWhereUniqueInput;
    data: Prisma.XOR<Prisma.DisputeTimelineUpdateWithoutActorInput, Prisma.DisputeTimelineUncheckedUpdateWithoutActorInput>;
};
export type DisputeTimelineUpdateManyWithWhereWithoutActorInput = {
    where: Prisma.DisputeTimelineScalarWhereInput;
    data: Prisma.XOR<Prisma.DisputeTimelineUpdateManyMutationInput, Prisma.DisputeTimelineUncheckedUpdateManyWithoutActorInput>;
};
export type DisputeTimelineScalarWhereInput = {
    AND?: Prisma.DisputeTimelineScalarWhereInput | Prisma.DisputeTimelineScalarWhereInput[];
    OR?: Prisma.DisputeTimelineScalarWhereInput[];
    NOT?: Prisma.DisputeTimelineScalarWhereInput | Prisma.DisputeTimelineScalarWhereInput[];
    id?: Prisma.StringFilter<"DisputeTimeline"> | string;
    disputeId?: Prisma.StringFilter<"DisputeTimeline"> | string;
    actorId?: Prisma.StringNullableFilter<"DisputeTimeline"> | string | null;
    action?: Prisma.StringFilter<"DisputeTimeline"> | string;
    description?: Prisma.StringNullableFilter<"DisputeTimeline"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"DisputeTimeline"> | Date | string;
};
export type DisputeTimelineCreateWithoutDisputeInput = {
    id?: string;
    action: string;
    description?: string | null;
    createdAt?: Date | string;
    actor?: Prisma.UserCreateNestedOneWithoutDisputeTimelinesInput;
};
export type DisputeTimelineUncheckedCreateWithoutDisputeInput = {
    id?: string;
    actorId?: string | null;
    action: string;
    description?: string | null;
    createdAt?: Date | string;
};
export type DisputeTimelineCreateOrConnectWithoutDisputeInput = {
    where: Prisma.DisputeTimelineWhereUniqueInput;
    create: Prisma.XOR<Prisma.DisputeTimelineCreateWithoutDisputeInput, Prisma.DisputeTimelineUncheckedCreateWithoutDisputeInput>;
};
export type DisputeTimelineCreateManyDisputeInputEnvelope = {
    data: Prisma.DisputeTimelineCreateManyDisputeInput | Prisma.DisputeTimelineCreateManyDisputeInput[];
    skipDuplicates?: boolean;
};
export type DisputeTimelineUpsertWithWhereUniqueWithoutDisputeInput = {
    where: Prisma.DisputeTimelineWhereUniqueInput;
    update: Prisma.XOR<Prisma.DisputeTimelineUpdateWithoutDisputeInput, Prisma.DisputeTimelineUncheckedUpdateWithoutDisputeInput>;
    create: Prisma.XOR<Prisma.DisputeTimelineCreateWithoutDisputeInput, Prisma.DisputeTimelineUncheckedCreateWithoutDisputeInput>;
};
export type DisputeTimelineUpdateWithWhereUniqueWithoutDisputeInput = {
    where: Prisma.DisputeTimelineWhereUniqueInput;
    data: Prisma.XOR<Prisma.DisputeTimelineUpdateWithoutDisputeInput, Prisma.DisputeTimelineUncheckedUpdateWithoutDisputeInput>;
};
export type DisputeTimelineUpdateManyWithWhereWithoutDisputeInput = {
    where: Prisma.DisputeTimelineScalarWhereInput;
    data: Prisma.XOR<Prisma.DisputeTimelineUpdateManyMutationInput, Prisma.DisputeTimelineUncheckedUpdateManyWithoutDisputeInput>;
};
export type DisputeTimelineCreateManyActorInput = {
    id?: string;
    disputeId: string;
    action: string;
    description?: string | null;
    createdAt?: Date | string;
};
export type DisputeTimelineUpdateWithoutActorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dispute?: Prisma.DisputeUpdateOneRequiredWithoutTimelineNestedInput;
};
export type DisputeTimelineUncheckedUpdateWithoutActorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    disputeId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DisputeTimelineUncheckedUpdateManyWithoutActorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    disputeId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DisputeTimelineCreateManyDisputeInput = {
    id?: string;
    actorId?: string | null;
    action: string;
    description?: string | null;
    createdAt?: Date | string;
};
export type DisputeTimelineUpdateWithoutDisputeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    actor?: Prisma.UserUpdateOneWithoutDisputeTimelinesNestedInput;
};
export type DisputeTimelineUncheckedUpdateWithoutDisputeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DisputeTimelineUncheckedUpdateManyWithoutDisputeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DisputeTimelineSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    disputeId?: boolean;
    actorId?: boolean;
    action?: boolean;
    description?: boolean;
    createdAt?: boolean;
    dispute?: boolean | Prisma.DisputeDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.DisputeTimeline$actorArgs<ExtArgs>;
}, ExtArgs["result"]["disputeTimeline"]>;
export type DisputeTimelineSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    disputeId?: boolean;
    actorId?: boolean;
    action?: boolean;
    description?: boolean;
    createdAt?: boolean;
    dispute?: boolean | Prisma.DisputeDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.DisputeTimeline$actorArgs<ExtArgs>;
}, ExtArgs["result"]["disputeTimeline"]>;
export type DisputeTimelineSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    disputeId?: boolean;
    actorId?: boolean;
    action?: boolean;
    description?: boolean;
    createdAt?: boolean;
    dispute?: boolean | Prisma.DisputeDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.DisputeTimeline$actorArgs<ExtArgs>;
}, ExtArgs["result"]["disputeTimeline"]>;
export type DisputeTimelineSelectScalar = {
    id?: boolean;
    disputeId?: boolean;
    actorId?: boolean;
    action?: boolean;
    description?: boolean;
    createdAt?: boolean;
};
export type DisputeTimelineOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "disputeId" | "actorId" | "action" | "description" | "createdAt", ExtArgs["result"]["disputeTimeline"]>;
export type DisputeTimelineInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    dispute?: boolean | Prisma.DisputeDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.DisputeTimeline$actorArgs<ExtArgs>;
};
export type DisputeTimelineIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    dispute?: boolean | Prisma.DisputeDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.DisputeTimeline$actorArgs<ExtArgs>;
};
export type DisputeTimelineIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    dispute?: boolean | Prisma.DisputeDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.DisputeTimeline$actorArgs<ExtArgs>;
};
export type $DisputeTimelinePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DisputeTimeline";
    objects: {
        dispute: Prisma.$DisputePayload<ExtArgs>;
        actor: Prisma.$UserPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        disputeId: string;
        actorId: string | null;
        action: string;
        description: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["disputeTimeline"]>;
    composites: {};
};
export type DisputeTimelineGetPayload<S extends boolean | null | undefined | DisputeTimelineDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DisputeTimelinePayload, S>;
export type DisputeTimelineCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DisputeTimelineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DisputeTimelineCountAggregateInputType | true;
};
export interface DisputeTimelineDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DisputeTimeline'];
        meta: {
            name: 'DisputeTimeline';
        };
    };
    findUnique<T extends DisputeTimelineFindUniqueArgs>(args: Prisma.SelectSubset<T, DisputeTimelineFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DisputeTimelineClient<runtime.Types.Result.GetResult<Prisma.$DisputeTimelinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends DisputeTimelineFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DisputeTimelineFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DisputeTimelineClient<runtime.Types.Result.GetResult<Prisma.$DisputeTimelinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends DisputeTimelineFindFirstArgs>(args?: Prisma.SelectSubset<T, DisputeTimelineFindFirstArgs<ExtArgs>>): Prisma.Prisma__DisputeTimelineClient<runtime.Types.Result.GetResult<Prisma.$DisputeTimelinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends DisputeTimelineFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DisputeTimelineFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DisputeTimelineClient<runtime.Types.Result.GetResult<Prisma.$DisputeTimelinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends DisputeTimelineFindManyArgs>(args?: Prisma.SelectSubset<T, DisputeTimelineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DisputeTimelinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends DisputeTimelineCreateArgs>(args: Prisma.SelectSubset<T, DisputeTimelineCreateArgs<ExtArgs>>): Prisma.Prisma__DisputeTimelineClient<runtime.Types.Result.GetResult<Prisma.$DisputeTimelinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends DisputeTimelineCreateManyArgs>(args?: Prisma.SelectSubset<T, DisputeTimelineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends DisputeTimelineCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DisputeTimelineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DisputeTimelinePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends DisputeTimelineDeleteArgs>(args: Prisma.SelectSubset<T, DisputeTimelineDeleteArgs<ExtArgs>>): Prisma.Prisma__DisputeTimelineClient<runtime.Types.Result.GetResult<Prisma.$DisputeTimelinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends DisputeTimelineUpdateArgs>(args: Prisma.SelectSubset<T, DisputeTimelineUpdateArgs<ExtArgs>>): Prisma.Prisma__DisputeTimelineClient<runtime.Types.Result.GetResult<Prisma.$DisputeTimelinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends DisputeTimelineDeleteManyArgs>(args?: Prisma.SelectSubset<T, DisputeTimelineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends DisputeTimelineUpdateManyArgs>(args: Prisma.SelectSubset<T, DisputeTimelineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends DisputeTimelineUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DisputeTimelineUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DisputeTimelinePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends DisputeTimelineUpsertArgs>(args: Prisma.SelectSubset<T, DisputeTimelineUpsertArgs<ExtArgs>>): Prisma.Prisma__DisputeTimelineClient<runtime.Types.Result.GetResult<Prisma.$DisputeTimelinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends DisputeTimelineCountArgs>(args?: Prisma.Subset<T, DisputeTimelineCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DisputeTimelineCountAggregateOutputType> : number>;
    aggregate<T extends DisputeTimelineAggregateArgs>(args: Prisma.Subset<T, DisputeTimelineAggregateArgs>): Prisma.PrismaPromise<GetDisputeTimelineAggregateType<T>>;
    groupBy<T extends DisputeTimelineGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DisputeTimelineGroupByArgs['orderBy'];
    } : {
        orderBy?: DisputeTimelineGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DisputeTimelineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDisputeTimelineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: DisputeTimelineFieldRefs;
}
export interface Prisma__DisputeTimelineClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    dispute<T extends Prisma.DisputeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DisputeDefaultArgs<ExtArgs>>): Prisma.Prisma__DisputeClient<runtime.Types.Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    actor<T extends Prisma.DisputeTimeline$actorArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DisputeTimeline$actorArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface DisputeTimelineFieldRefs {
    readonly id: Prisma.FieldRef<"DisputeTimeline", 'String'>;
    readonly disputeId: Prisma.FieldRef<"DisputeTimeline", 'String'>;
    readonly actorId: Prisma.FieldRef<"DisputeTimeline", 'String'>;
    readonly action: Prisma.FieldRef<"DisputeTimeline", 'String'>;
    readonly description: Prisma.FieldRef<"DisputeTimeline", 'String'>;
    readonly createdAt: Prisma.FieldRef<"DisputeTimeline", 'DateTime'>;
}
export type DisputeTimelineFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeTimelineSelect<ExtArgs> | null;
    omit?: Prisma.DisputeTimelineOmit<ExtArgs> | null;
    include?: Prisma.DisputeTimelineInclude<ExtArgs> | null;
    where: Prisma.DisputeTimelineWhereUniqueInput;
};
export type DisputeTimelineFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeTimelineSelect<ExtArgs> | null;
    omit?: Prisma.DisputeTimelineOmit<ExtArgs> | null;
    include?: Prisma.DisputeTimelineInclude<ExtArgs> | null;
    where: Prisma.DisputeTimelineWhereUniqueInput;
};
export type DisputeTimelineFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeTimelineSelect<ExtArgs> | null;
    omit?: Prisma.DisputeTimelineOmit<ExtArgs> | null;
    include?: Prisma.DisputeTimelineInclude<ExtArgs> | null;
    where?: Prisma.DisputeTimelineWhereInput;
    orderBy?: Prisma.DisputeTimelineOrderByWithRelationInput | Prisma.DisputeTimelineOrderByWithRelationInput[];
    cursor?: Prisma.DisputeTimelineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DisputeTimelineScalarFieldEnum | Prisma.DisputeTimelineScalarFieldEnum[];
};
export type DisputeTimelineFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeTimelineSelect<ExtArgs> | null;
    omit?: Prisma.DisputeTimelineOmit<ExtArgs> | null;
    include?: Prisma.DisputeTimelineInclude<ExtArgs> | null;
    where?: Prisma.DisputeTimelineWhereInput;
    orderBy?: Prisma.DisputeTimelineOrderByWithRelationInput | Prisma.DisputeTimelineOrderByWithRelationInput[];
    cursor?: Prisma.DisputeTimelineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DisputeTimelineScalarFieldEnum | Prisma.DisputeTimelineScalarFieldEnum[];
};
export type DisputeTimelineFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeTimelineSelect<ExtArgs> | null;
    omit?: Prisma.DisputeTimelineOmit<ExtArgs> | null;
    include?: Prisma.DisputeTimelineInclude<ExtArgs> | null;
    where?: Prisma.DisputeTimelineWhereInput;
    orderBy?: Prisma.DisputeTimelineOrderByWithRelationInput | Prisma.DisputeTimelineOrderByWithRelationInput[];
    cursor?: Prisma.DisputeTimelineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DisputeTimelineScalarFieldEnum | Prisma.DisputeTimelineScalarFieldEnum[];
};
export type DisputeTimelineCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeTimelineSelect<ExtArgs> | null;
    omit?: Prisma.DisputeTimelineOmit<ExtArgs> | null;
    include?: Prisma.DisputeTimelineInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DisputeTimelineCreateInput, Prisma.DisputeTimelineUncheckedCreateInput>;
};
export type DisputeTimelineCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.DisputeTimelineCreateManyInput | Prisma.DisputeTimelineCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DisputeTimelineCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeTimelineSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DisputeTimelineOmit<ExtArgs> | null;
    data: Prisma.DisputeTimelineCreateManyInput | Prisma.DisputeTimelineCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.DisputeTimelineIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type DisputeTimelineUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeTimelineSelect<ExtArgs> | null;
    omit?: Prisma.DisputeTimelineOmit<ExtArgs> | null;
    include?: Prisma.DisputeTimelineInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DisputeTimelineUpdateInput, Prisma.DisputeTimelineUncheckedUpdateInput>;
    where: Prisma.DisputeTimelineWhereUniqueInput;
};
export type DisputeTimelineUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.DisputeTimelineUpdateManyMutationInput, Prisma.DisputeTimelineUncheckedUpdateManyInput>;
    where?: Prisma.DisputeTimelineWhereInput;
    limit?: number;
};
export type DisputeTimelineUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeTimelineSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DisputeTimelineOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DisputeTimelineUpdateManyMutationInput, Prisma.DisputeTimelineUncheckedUpdateManyInput>;
    where?: Prisma.DisputeTimelineWhereInput;
    limit?: number;
    include?: Prisma.DisputeTimelineIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type DisputeTimelineUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeTimelineSelect<ExtArgs> | null;
    omit?: Prisma.DisputeTimelineOmit<ExtArgs> | null;
    include?: Prisma.DisputeTimelineInclude<ExtArgs> | null;
    where: Prisma.DisputeTimelineWhereUniqueInput;
    create: Prisma.XOR<Prisma.DisputeTimelineCreateInput, Prisma.DisputeTimelineUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.DisputeTimelineUpdateInput, Prisma.DisputeTimelineUncheckedUpdateInput>;
};
export type DisputeTimelineDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeTimelineSelect<ExtArgs> | null;
    omit?: Prisma.DisputeTimelineOmit<ExtArgs> | null;
    include?: Prisma.DisputeTimelineInclude<ExtArgs> | null;
    where: Prisma.DisputeTimelineWhereUniqueInput;
};
export type DisputeTimelineDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DisputeTimelineWhereInput;
    limit?: number;
};
export type DisputeTimeline$actorArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type DisputeTimelineDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeTimelineSelect<ExtArgs> | null;
    omit?: Prisma.DisputeTimelineOmit<ExtArgs> | null;
    include?: Prisma.DisputeTimelineInclude<ExtArgs> | null;
};
export {};
