import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type DisputeEvidenceModel = runtime.Types.Result.DefaultSelection<Prisma.$DisputeEvidencePayload>;
export type AggregateDisputeEvidence = {
    _count: DisputeEvidenceCountAggregateOutputType | null;
    _avg: DisputeEvidenceAvgAggregateOutputType | null;
    _sum: DisputeEvidenceSumAggregateOutputType | null;
    _min: DisputeEvidenceMinAggregateOutputType | null;
    _max: DisputeEvidenceMaxAggregateOutputType | null;
};
export type DisputeEvidenceAvgAggregateOutputType = {
    size: number | null;
};
export type DisputeEvidenceSumAggregateOutputType = {
    size: number | null;
};
export type DisputeEvidenceMinAggregateOutputType = {
    id: string | null;
    disputeId: string | null;
    uploaderId: string | null;
    type: $Enums.DisputeEvidenceType | null;
    fileUrl: string | null;
    mimeType: string | null;
    size: number | null;
    createdAt: Date | null;
};
export type DisputeEvidenceMaxAggregateOutputType = {
    id: string | null;
    disputeId: string | null;
    uploaderId: string | null;
    type: $Enums.DisputeEvidenceType | null;
    fileUrl: string | null;
    mimeType: string | null;
    size: number | null;
    createdAt: Date | null;
};
export type DisputeEvidenceCountAggregateOutputType = {
    id: number;
    disputeId: number;
    uploaderId: number;
    type: number;
    fileUrl: number;
    mimeType: number;
    size: number;
    createdAt: number;
    _all: number;
};
export type DisputeEvidenceAvgAggregateInputType = {
    size?: true;
};
export type DisputeEvidenceSumAggregateInputType = {
    size?: true;
};
export type DisputeEvidenceMinAggregateInputType = {
    id?: true;
    disputeId?: true;
    uploaderId?: true;
    type?: true;
    fileUrl?: true;
    mimeType?: true;
    size?: true;
    createdAt?: true;
};
export type DisputeEvidenceMaxAggregateInputType = {
    id?: true;
    disputeId?: true;
    uploaderId?: true;
    type?: true;
    fileUrl?: true;
    mimeType?: true;
    size?: true;
    createdAt?: true;
};
export type DisputeEvidenceCountAggregateInputType = {
    id?: true;
    disputeId?: true;
    uploaderId?: true;
    type?: true;
    fileUrl?: true;
    mimeType?: true;
    size?: true;
    createdAt?: true;
    _all?: true;
};
export type DisputeEvidenceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DisputeEvidenceWhereInput;
    orderBy?: Prisma.DisputeEvidenceOrderByWithRelationInput | Prisma.DisputeEvidenceOrderByWithRelationInput[];
    cursor?: Prisma.DisputeEvidenceWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | DisputeEvidenceCountAggregateInputType;
    _avg?: DisputeEvidenceAvgAggregateInputType;
    _sum?: DisputeEvidenceSumAggregateInputType;
    _min?: DisputeEvidenceMinAggregateInputType;
    _max?: DisputeEvidenceMaxAggregateInputType;
};
export type GetDisputeEvidenceAggregateType<T extends DisputeEvidenceAggregateArgs> = {
    [P in keyof T & keyof AggregateDisputeEvidence]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDisputeEvidence[P]> : Prisma.GetScalarType<T[P], AggregateDisputeEvidence[P]>;
};
export type DisputeEvidenceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DisputeEvidenceWhereInput;
    orderBy?: Prisma.DisputeEvidenceOrderByWithAggregationInput | Prisma.DisputeEvidenceOrderByWithAggregationInput[];
    by: Prisma.DisputeEvidenceScalarFieldEnum[] | Prisma.DisputeEvidenceScalarFieldEnum;
    having?: Prisma.DisputeEvidenceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DisputeEvidenceCountAggregateInputType | true;
    _avg?: DisputeEvidenceAvgAggregateInputType;
    _sum?: DisputeEvidenceSumAggregateInputType;
    _min?: DisputeEvidenceMinAggregateInputType;
    _max?: DisputeEvidenceMaxAggregateInputType;
};
export type DisputeEvidenceGroupByOutputType = {
    id: string;
    disputeId: string;
    uploaderId: string;
    type: $Enums.DisputeEvidenceType;
    fileUrl: string;
    mimeType: string;
    size: number;
    createdAt: Date;
    _count: DisputeEvidenceCountAggregateOutputType | null;
    _avg: DisputeEvidenceAvgAggregateOutputType | null;
    _sum: DisputeEvidenceSumAggregateOutputType | null;
    _min: DisputeEvidenceMinAggregateOutputType | null;
    _max: DisputeEvidenceMaxAggregateOutputType | null;
};
type GetDisputeEvidenceGroupByPayload<T extends DisputeEvidenceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DisputeEvidenceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DisputeEvidenceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DisputeEvidenceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DisputeEvidenceGroupByOutputType[P]>;
}>>;
export type DisputeEvidenceWhereInput = {
    AND?: Prisma.DisputeEvidenceWhereInput | Prisma.DisputeEvidenceWhereInput[];
    OR?: Prisma.DisputeEvidenceWhereInput[];
    NOT?: Prisma.DisputeEvidenceWhereInput | Prisma.DisputeEvidenceWhereInput[];
    id?: Prisma.StringFilter<"DisputeEvidence"> | string;
    disputeId?: Prisma.StringFilter<"DisputeEvidence"> | string;
    uploaderId?: Prisma.StringFilter<"DisputeEvidence"> | string;
    type?: Prisma.EnumDisputeEvidenceTypeFilter<"DisputeEvidence"> | $Enums.DisputeEvidenceType;
    fileUrl?: Prisma.StringFilter<"DisputeEvidence"> | string;
    mimeType?: Prisma.StringFilter<"DisputeEvidence"> | string;
    size?: Prisma.IntFilter<"DisputeEvidence"> | number;
    createdAt?: Prisma.DateTimeFilter<"DisputeEvidence"> | Date | string;
    dispute?: Prisma.XOR<Prisma.DisputeScalarRelationFilter, Prisma.DisputeWhereInput>;
    uploader?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type DisputeEvidenceOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    disputeId?: Prisma.SortOrder;
    uploaderId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    fileUrl?: Prisma.SortOrder;
    mimeType?: Prisma.SortOrder;
    size?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    dispute?: Prisma.DisputeOrderByWithRelationInput;
    uploader?: Prisma.UserOrderByWithRelationInput;
};
export type DisputeEvidenceWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.DisputeEvidenceWhereInput | Prisma.DisputeEvidenceWhereInput[];
    OR?: Prisma.DisputeEvidenceWhereInput[];
    NOT?: Prisma.DisputeEvidenceWhereInput | Prisma.DisputeEvidenceWhereInput[];
    disputeId?: Prisma.StringFilter<"DisputeEvidence"> | string;
    uploaderId?: Prisma.StringFilter<"DisputeEvidence"> | string;
    type?: Prisma.EnumDisputeEvidenceTypeFilter<"DisputeEvidence"> | $Enums.DisputeEvidenceType;
    fileUrl?: Prisma.StringFilter<"DisputeEvidence"> | string;
    mimeType?: Prisma.StringFilter<"DisputeEvidence"> | string;
    size?: Prisma.IntFilter<"DisputeEvidence"> | number;
    createdAt?: Prisma.DateTimeFilter<"DisputeEvidence"> | Date | string;
    dispute?: Prisma.XOR<Prisma.DisputeScalarRelationFilter, Prisma.DisputeWhereInput>;
    uploader?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type DisputeEvidenceOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    disputeId?: Prisma.SortOrder;
    uploaderId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    fileUrl?: Prisma.SortOrder;
    mimeType?: Prisma.SortOrder;
    size?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.DisputeEvidenceCountOrderByAggregateInput;
    _avg?: Prisma.DisputeEvidenceAvgOrderByAggregateInput;
    _max?: Prisma.DisputeEvidenceMaxOrderByAggregateInput;
    _min?: Prisma.DisputeEvidenceMinOrderByAggregateInput;
    _sum?: Prisma.DisputeEvidenceSumOrderByAggregateInput;
};
export type DisputeEvidenceScalarWhereWithAggregatesInput = {
    AND?: Prisma.DisputeEvidenceScalarWhereWithAggregatesInput | Prisma.DisputeEvidenceScalarWhereWithAggregatesInput[];
    OR?: Prisma.DisputeEvidenceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DisputeEvidenceScalarWhereWithAggregatesInput | Prisma.DisputeEvidenceScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"DisputeEvidence"> | string;
    disputeId?: Prisma.StringWithAggregatesFilter<"DisputeEvidence"> | string;
    uploaderId?: Prisma.StringWithAggregatesFilter<"DisputeEvidence"> | string;
    type?: Prisma.EnumDisputeEvidenceTypeWithAggregatesFilter<"DisputeEvidence"> | $Enums.DisputeEvidenceType;
    fileUrl?: Prisma.StringWithAggregatesFilter<"DisputeEvidence"> | string;
    mimeType?: Prisma.StringWithAggregatesFilter<"DisputeEvidence"> | string;
    size?: Prisma.IntWithAggregatesFilter<"DisputeEvidence"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"DisputeEvidence"> | Date | string;
};
export type DisputeEvidenceCreateInput = {
    id?: string;
    type: $Enums.DisputeEvidenceType;
    fileUrl: string;
    mimeType: string;
    size: number;
    createdAt?: Date | string;
    dispute: Prisma.DisputeCreateNestedOneWithoutEvidencesInput;
    uploader: Prisma.UserCreateNestedOneWithoutDisputeEvidencesInput;
};
export type DisputeEvidenceUncheckedCreateInput = {
    id?: string;
    disputeId: string;
    uploaderId: string;
    type: $Enums.DisputeEvidenceType;
    fileUrl: string;
    mimeType: string;
    size: number;
    createdAt?: Date | string;
};
export type DisputeEvidenceUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumDisputeEvidenceTypeFieldUpdateOperationsInput | $Enums.DisputeEvidenceType;
    fileUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    size?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dispute?: Prisma.DisputeUpdateOneRequiredWithoutEvidencesNestedInput;
    uploader?: Prisma.UserUpdateOneRequiredWithoutDisputeEvidencesNestedInput;
};
export type DisputeEvidenceUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    disputeId?: Prisma.StringFieldUpdateOperationsInput | string;
    uploaderId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumDisputeEvidenceTypeFieldUpdateOperationsInput | $Enums.DisputeEvidenceType;
    fileUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    size?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DisputeEvidenceCreateManyInput = {
    id?: string;
    disputeId: string;
    uploaderId: string;
    type: $Enums.DisputeEvidenceType;
    fileUrl: string;
    mimeType: string;
    size: number;
    createdAt?: Date | string;
};
export type DisputeEvidenceUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumDisputeEvidenceTypeFieldUpdateOperationsInput | $Enums.DisputeEvidenceType;
    fileUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    size?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DisputeEvidenceUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    disputeId?: Prisma.StringFieldUpdateOperationsInput | string;
    uploaderId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumDisputeEvidenceTypeFieldUpdateOperationsInput | $Enums.DisputeEvidenceType;
    fileUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    size?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DisputeEvidenceListRelationFilter = {
    every?: Prisma.DisputeEvidenceWhereInput;
    some?: Prisma.DisputeEvidenceWhereInput;
    none?: Prisma.DisputeEvidenceWhereInput;
};
export type DisputeEvidenceOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type DisputeEvidenceCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    disputeId?: Prisma.SortOrder;
    uploaderId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    fileUrl?: Prisma.SortOrder;
    mimeType?: Prisma.SortOrder;
    size?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DisputeEvidenceAvgOrderByAggregateInput = {
    size?: Prisma.SortOrder;
};
export type DisputeEvidenceMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    disputeId?: Prisma.SortOrder;
    uploaderId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    fileUrl?: Prisma.SortOrder;
    mimeType?: Prisma.SortOrder;
    size?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DisputeEvidenceMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    disputeId?: Prisma.SortOrder;
    uploaderId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    fileUrl?: Prisma.SortOrder;
    mimeType?: Prisma.SortOrder;
    size?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DisputeEvidenceSumOrderByAggregateInput = {
    size?: Prisma.SortOrder;
};
export type DisputeEvidenceCreateNestedManyWithoutUploaderInput = {
    create?: Prisma.XOR<Prisma.DisputeEvidenceCreateWithoutUploaderInput, Prisma.DisputeEvidenceUncheckedCreateWithoutUploaderInput> | Prisma.DisputeEvidenceCreateWithoutUploaderInput[] | Prisma.DisputeEvidenceUncheckedCreateWithoutUploaderInput[];
    connectOrCreate?: Prisma.DisputeEvidenceCreateOrConnectWithoutUploaderInput | Prisma.DisputeEvidenceCreateOrConnectWithoutUploaderInput[];
    createMany?: Prisma.DisputeEvidenceCreateManyUploaderInputEnvelope;
    connect?: Prisma.DisputeEvidenceWhereUniqueInput | Prisma.DisputeEvidenceWhereUniqueInput[];
};
export type DisputeEvidenceUncheckedCreateNestedManyWithoutUploaderInput = {
    create?: Prisma.XOR<Prisma.DisputeEvidenceCreateWithoutUploaderInput, Prisma.DisputeEvidenceUncheckedCreateWithoutUploaderInput> | Prisma.DisputeEvidenceCreateWithoutUploaderInput[] | Prisma.DisputeEvidenceUncheckedCreateWithoutUploaderInput[];
    connectOrCreate?: Prisma.DisputeEvidenceCreateOrConnectWithoutUploaderInput | Prisma.DisputeEvidenceCreateOrConnectWithoutUploaderInput[];
    createMany?: Prisma.DisputeEvidenceCreateManyUploaderInputEnvelope;
    connect?: Prisma.DisputeEvidenceWhereUniqueInput | Prisma.DisputeEvidenceWhereUniqueInput[];
};
export type DisputeEvidenceUpdateManyWithoutUploaderNestedInput = {
    create?: Prisma.XOR<Prisma.DisputeEvidenceCreateWithoutUploaderInput, Prisma.DisputeEvidenceUncheckedCreateWithoutUploaderInput> | Prisma.DisputeEvidenceCreateWithoutUploaderInput[] | Prisma.DisputeEvidenceUncheckedCreateWithoutUploaderInput[];
    connectOrCreate?: Prisma.DisputeEvidenceCreateOrConnectWithoutUploaderInput | Prisma.DisputeEvidenceCreateOrConnectWithoutUploaderInput[];
    upsert?: Prisma.DisputeEvidenceUpsertWithWhereUniqueWithoutUploaderInput | Prisma.DisputeEvidenceUpsertWithWhereUniqueWithoutUploaderInput[];
    createMany?: Prisma.DisputeEvidenceCreateManyUploaderInputEnvelope;
    set?: Prisma.DisputeEvidenceWhereUniqueInput | Prisma.DisputeEvidenceWhereUniqueInput[];
    disconnect?: Prisma.DisputeEvidenceWhereUniqueInput | Prisma.DisputeEvidenceWhereUniqueInput[];
    delete?: Prisma.DisputeEvidenceWhereUniqueInput | Prisma.DisputeEvidenceWhereUniqueInput[];
    connect?: Prisma.DisputeEvidenceWhereUniqueInput | Prisma.DisputeEvidenceWhereUniqueInput[];
    update?: Prisma.DisputeEvidenceUpdateWithWhereUniqueWithoutUploaderInput | Prisma.DisputeEvidenceUpdateWithWhereUniqueWithoutUploaderInput[];
    updateMany?: Prisma.DisputeEvidenceUpdateManyWithWhereWithoutUploaderInput | Prisma.DisputeEvidenceUpdateManyWithWhereWithoutUploaderInput[];
    deleteMany?: Prisma.DisputeEvidenceScalarWhereInput | Prisma.DisputeEvidenceScalarWhereInput[];
};
export type DisputeEvidenceUncheckedUpdateManyWithoutUploaderNestedInput = {
    create?: Prisma.XOR<Prisma.DisputeEvidenceCreateWithoutUploaderInput, Prisma.DisputeEvidenceUncheckedCreateWithoutUploaderInput> | Prisma.DisputeEvidenceCreateWithoutUploaderInput[] | Prisma.DisputeEvidenceUncheckedCreateWithoutUploaderInput[];
    connectOrCreate?: Prisma.DisputeEvidenceCreateOrConnectWithoutUploaderInput | Prisma.DisputeEvidenceCreateOrConnectWithoutUploaderInput[];
    upsert?: Prisma.DisputeEvidenceUpsertWithWhereUniqueWithoutUploaderInput | Prisma.DisputeEvidenceUpsertWithWhereUniqueWithoutUploaderInput[];
    createMany?: Prisma.DisputeEvidenceCreateManyUploaderInputEnvelope;
    set?: Prisma.DisputeEvidenceWhereUniqueInput | Prisma.DisputeEvidenceWhereUniqueInput[];
    disconnect?: Prisma.DisputeEvidenceWhereUniqueInput | Prisma.DisputeEvidenceWhereUniqueInput[];
    delete?: Prisma.DisputeEvidenceWhereUniqueInput | Prisma.DisputeEvidenceWhereUniqueInput[];
    connect?: Prisma.DisputeEvidenceWhereUniqueInput | Prisma.DisputeEvidenceWhereUniqueInput[];
    update?: Prisma.DisputeEvidenceUpdateWithWhereUniqueWithoutUploaderInput | Prisma.DisputeEvidenceUpdateWithWhereUniqueWithoutUploaderInput[];
    updateMany?: Prisma.DisputeEvidenceUpdateManyWithWhereWithoutUploaderInput | Prisma.DisputeEvidenceUpdateManyWithWhereWithoutUploaderInput[];
    deleteMany?: Prisma.DisputeEvidenceScalarWhereInput | Prisma.DisputeEvidenceScalarWhereInput[];
};
export type DisputeEvidenceCreateNestedManyWithoutDisputeInput = {
    create?: Prisma.XOR<Prisma.DisputeEvidenceCreateWithoutDisputeInput, Prisma.DisputeEvidenceUncheckedCreateWithoutDisputeInput> | Prisma.DisputeEvidenceCreateWithoutDisputeInput[] | Prisma.DisputeEvidenceUncheckedCreateWithoutDisputeInput[];
    connectOrCreate?: Prisma.DisputeEvidenceCreateOrConnectWithoutDisputeInput | Prisma.DisputeEvidenceCreateOrConnectWithoutDisputeInput[];
    createMany?: Prisma.DisputeEvidenceCreateManyDisputeInputEnvelope;
    connect?: Prisma.DisputeEvidenceWhereUniqueInput | Prisma.DisputeEvidenceWhereUniqueInput[];
};
export type DisputeEvidenceUncheckedCreateNestedManyWithoutDisputeInput = {
    create?: Prisma.XOR<Prisma.DisputeEvidenceCreateWithoutDisputeInput, Prisma.DisputeEvidenceUncheckedCreateWithoutDisputeInput> | Prisma.DisputeEvidenceCreateWithoutDisputeInput[] | Prisma.DisputeEvidenceUncheckedCreateWithoutDisputeInput[];
    connectOrCreate?: Prisma.DisputeEvidenceCreateOrConnectWithoutDisputeInput | Prisma.DisputeEvidenceCreateOrConnectWithoutDisputeInput[];
    createMany?: Prisma.DisputeEvidenceCreateManyDisputeInputEnvelope;
    connect?: Prisma.DisputeEvidenceWhereUniqueInput | Prisma.DisputeEvidenceWhereUniqueInput[];
};
export type DisputeEvidenceUpdateManyWithoutDisputeNestedInput = {
    create?: Prisma.XOR<Prisma.DisputeEvidenceCreateWithoutDisputeInput, Prisma.DisputeEvidenceUncheckedCreateWithoutDisputeInput> | Prisma.DisputeEvidenceCreateWithoutDisputeInput[] | Prisma.DisputeEvidenceUncheckedCreateWithoutDisputeInput[];
    connectOrCreate?: Prisma.DisputeEvidenceCreateOrConnectWithoutDisputeInput | Prisma.DisputeEvidenceCreateOrConnectWithoutDisputeInput[];
    upsert?: Prisma.DisputeEvidenceUpsertWithWhereUniqueWithoutDisputeInput | Prisma.DisputeEvidenceUpsertWithWhereUniqueWithoutDisputeInput[];
    createMany?: Prisma.DisputeEvidenceCreateManyDisputeInputEnvelope;
    set?: Prisma.DisputeEvidenceWhereUniqueInput | Prisma.DisputeEvidenceWhereUniqueInput[];
    disconnect?: Prisma.DisputeEvidenceWhereUniqueInput | Prisma.DisputeEvidenceWhereUniqueInput[];
    delete?: Prisma.DisputeEvidenceWhereUniqueInput | Prisma.DisputeEvidenceWhereUniqueInput[];
    connect?: Prisma.DisputeEvidenceWhereUniqueInput | Prisma.DisputeEvidenceWhereUniqueInput[];
    update?: Prisma.DisputeEvidenceUpdateWithWhereUniqueWithoutDisputeInput | Prisma.DisputeEvidenceUpdateWithWhereUniqueWithoutDisputeInput[];
    updateMany?: Prisma.DisputeEvidenceUpdateManyWithWhereWithoutDisputeInput | Prisma.DisputeEvidenceUpdateManyWithWhereWithoutDisputeInput[];
    deleteMany?: Prisma.DisputeEvidenceScalarWhereInput | Prisma.DisputeEvidenceScalarWhereInput[];
};
export type DisputeEvidenceUncheckedUpdateManyWithoutDisputeNestedInput = {
    create?: Prisma.XOR<Prisma.DisputeEvidenceCreateWithoutDisputeInput, Prisma.DisputeEvidenceUncheckedCreateWithoutDisputeInput> | Prisma.DisputeEvidenceCreateWithoutDisputeInput[] | Prisma.DisputeEvidenceUncheckedCreateWithoutDisputeInput[];
    connectOrCreate?: Prisma.DisputeEvidenceCreateOrConnectWithoutDisputeInput | Prisma.DisputeEvidenceCreateOrConnectWithoutDisputeInput[];
    upsert?: Prisma.DisputeEvidenceUpsertWithWhereUniqueWithoutDisputeInput | Prisma.DisputeEvidenceUpsertWithWhereUniqueWithoutDisputeInput[];
    createMany?: Prisma.DisputeEvidenceCreateManyDisputeInputEnvelope;
    set?: Prisma.DisputeEvidenceWhereUniqueInput | Prisma.DisputeEvidenceWhereUniqueInput[];
    disconnect?: Prisma.DisputeEvidenceWhereUniqueInput | Prisma.DisputeEvidenceWhereUniqueInput[];
    delete?: Prisma.DisputeEvidenceWhereUniqueInput | Prisma.DisputeEvidenceWhereUniqueInput[];
    connect?: Prisma.DisputeEvidenceWhereUniqueInput | Prisma.DisputeEvidenceWhereUniqueInput[];
    update?: Prisma.DisputeEvidenceUpdateWithWhereUniqueWithoutDisputeInput | Prisma.DisputeEvidenceUpdateWithWhereUniqueWithoutDisputeInput[];
    updateMany?: Prisma.DisputeEvidenceUpdateManyWithWhereWithoutDisputeInput | Prisma.DisputeEvidenceUpdateManyWithWhereWithoutDisputeInput[];
    deleteMany?: Prisma.DisputeEvidenceScalarWhereInput | Prisma.DisputeEvidenceScalarWhereInput[];
};
export type EnumDisputeEvidenceTypeFieldUpdateOperationsInput = {
    set?: $Enums.DisputeEvidenceType;
};
export type DisputeEvidenceCreateWithoutUploaderInput = {
    id?: string;
    type: $Enums.DisputeEvidenceType;
    fileUrl: string;
    mimeType: string;
    size: number;
    createdAt?: Date | string;
    dispute: Prisma.DisputeCreateNestedOneWithoutEvidencesInput;
};
export type DisputeEvidenceUncheckedCreateWithoutUploaderInput = {
    id?: string;
    disputeId: string;
    type: $Enums.DisputeEvidenceType;
    fileUrl: string;
    mimeType: string;
    size: number;
    createdAt?: Date | string;
};
export type DisputeEvidenceCreateOrConnectWithoutUploaderInput = {
    where: Prisma.DisputeEvidenceWhereUniqueInput;
    create: Prisma.XOR<Prisma.DisputeEvidenceCreateWithoutUploaderInput, Prisma.DisputeEvidenceUncheckedCreateWithoutUploaderInput>;
};
export type DisputeEvidenceCreateManyUploaderInputEnvelope = {
    data: Prisma.DisputeEvidenceCreateManyUploaderInput | Prisma.DisputeEvidenceCreateManyUploaderInput[];
    skipDuplicates?: boolean;
};
export type DisputeEvidenceUpsertWithWhereUniqueWithoutUploaderInput = {
    where: Prisma.DisputeEvidenceWhereUniqueInput;
    update: Prisma.XOR<Prisma.DisputeEvidenceUpdateWithoutUploaderInput, Prisma.DisputeEvidenceUncheckedUpdateWithoutUploaderInput>;
    create: Prisma.XOR<Prisma.DisputeEvidenceCreateWithoutUploaderInput, Prisma.DisputeEvidenceUncheckedCreateWithoutUploaderInput>;
};
export type DisputeEvidenceUpdateWithWhereUniqueWithoutUploaderInput = {
    where: Prisma.DisputeEvidenceWhereUniqueInput;
    data: Prisma.XOR<Prisma.DisputeEvidenceUpdateWithoutUploaderInput, Prisma.DisputeEvidenceUncheckedUpdateWithoutUploaderInput>;
};
export type DisputeEvidenceUpdateManyWithWhereWithoutUploaderInput = {
    where: Prisma.DisputeEvidenceScalarWhereInput;
    data: Prisma.XOR<Prisma.DisputeEvidenceUpdateManyMutationInput, Prisma.DisputeEvidenceUncheckedUpdateManyWithoutUploaderInput>;
};
export type DisputeEvidenceScalarWhereInput = {
    AND?: Prisma.DisputeEvidenceScalarWhereInput | Prisma.DisputeEvidenceScalarWhereInput[];
    OR?: Prisma.DisputeEvidenceScalarWhereInput[];
    NOT?: Prisma.DisputeEvidenceScalarWhereInput | Prisma.DisputeEvidenceScalarWhereInput[];
    id?: Prisma.StringFilter<"DisputeEvidence"> | string;
    disputeId?: Prisma.StringFilter<"DisputeEvidence"> | string;
    uploaderId?: Prisma.StringFilter<"DisputeEvidence"> | string;
    type?: Prisma.EnumDisputeEvidenceTypeFilter<"DisputeEvidence"> | $Enums.DisputeEvidenceType;
    fileUrl?: Prisma.StringFilter<"DisputeEvidence"> | string;
    mimeType?: Prisma.StringFilter<"DisputeEvidence"> | string;
    size?: Prisma.IntFilter<"DisputeEvidence"> | number;
    createdAt?: Prisma.DateTimeFilter<"DisputeEvidence"> | Date | string;
};
export type DisputeEvidenceCreateWithoutDisputeInput = {
    id?: string;
    type: $Enums.DisputeEvidenceType;
    fileUrl: string;
    mimeType: string;
    size: number;
    createdAt?: Date | string;
    uploader: Prisma.UserCreateNestedOneWithoutDisputeEvidencesInput;
};
export type DisputeEvidenceUncheckedCreateWithoutDisputeInput = {
    id?: string;
    uploaderId: string;
    type: $Enums.DisputeEvidenceType;
    fileUrl: string;
    mimeType: string;
    size: number;
    createdAt?: Date | string;
};
export type DisputeEvidenceCreateOrConnectWithoutDisputeInput = {
    where: Prisma.DisputeEvidenceWhereUniqueInput;
    create: Prisma.XOR<Prisma.DisputeEvidenceCreateWithoutDisputeInput, Prisma.DisputeEvidenceUncheckedCreateWithoutDisputeInput>;
};
export type DisputeEvidenceCreateManyDisputeInputEnvelope = {
    data: Prisma.DisputeEvidenceCreateManyDisputeInput | Prisma.DisputeEvidenceCreateManyDisputeInput[];
    skipDuplicates?: boolean;
};
export type DisputeEvidenceUpsertWithWhereUniqueWithoutDisputeInput = {
    where: Prisma.DisputeEvidenceWhereUniqueInput;
    update: Prisma.XOR<Prisma.DisputeEvidenceUpdateWithoutDisputeInput, Prisma.DisputeEvidenceUncheckedUpdateWithoutDisputeInput>;
    create: Prisma.XOR<Prisma.DisputeEvidenceCreateWithoutDisputeInput, Prisma.DisputeEvidenceUncheckedCreateWithoutDisputeInput>;
};
export type DisputeEvidenceUpdateWithWhereUniqueWithoutDisputeInput = {
    where: Prisma.DisputeEvidenceWhereUniqueInput;
    data: Prisma.XOR<Prisma.DisputeEvidenceUpdateWithoutDisputeInput, Prisma.DisputeEvidenceUncheckedUpdateWithoutDisputeInput>;
};
export type DisputeEvidenceUpdateManyWithWhereWithoutDisputeInput = {
    where: Prisma.DisputeEvidenceScalarWhereInput;
    data: Prisma.XOR<Prisma.DisputeEvidenceUpdateManyMutationInput, Prisma.DisputeEvidenceUncheckedUpdateManyWithoutDisputeInput>;
};
export type DisputeEvidenceCreateManyUploaderInput = {
    id?: string;
    disputeId: string;
    type: $Enums.DisputeEvidenceType;
    fileUrl: string;
    mimeType: string;
    size: number;
    createdAt?: Date | string;
};
export type DisputeEvidenceUpdateWithoutUploaderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumDisputeEvidenceTypeFieldUpdateOperationsInput | $Enums.DisputeEvidenceType;
    fileUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    size?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dispute?: Prisma.DisputeUpdateOneRequiredWithoutEvidencesNestedInput;
};
export type DisputeEvidenceUncheckedUpdateWithoutUploaderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    disputeId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumDisputeEvidenceTypeFieldUpdateOperationsInput | $Enums.DisputeEvidenceType;
    fileUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    size?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DisputeEvidenceUncheckedUpdateManyWithoutUploaderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    disputeId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumDisputeEvidenceTypeFieldUpdateOperationsInput | $Enums.DisputeEvidenceType;
    fileUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    size?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DisputeEvidenceCreateManyDisputeInput = {
    id?: string;
    uploaderId: string;
    type: $Enums.DisputeEvidenceType;
    fileUrl: string;
    mimeType: string;
    size: number;
    createdAt?: Date | string;
};
export type DisputeEvidenceUpdateWithoutDisputeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumDisputeEvidenceTypeFieldUpdateOperationsInput | $Enums.DisputeEvidenceType;
    fileUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    size?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    uploader?: Prisma.UserUpdateOneRequiredWithoutDisputeEvidencesNestedInput;
};
export type DisputeEvidenceUncheckedUpdateWithoutDisputeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    uploaderId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumDisputeEvidenceTypeFieldUpdateOperationsInput | $Enums.DisputeEvidenceType;
    fileUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    size?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DisputeEvidenceUncheckedUpdateManyWithoutDisputeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    uploaderId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumDisputeEvidenceTypeFieldUpdateOperationsInput | $Enums.DisputeEvidenceType;
    fileUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    size?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DisputeEvidenceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    disputeId?: boolean;
    uploaderId?: boolean;
    type?: boolean;
    fileUrl?: boolean;
    mimeType?: boolean;
    size?: boolean;
    createdAt?: boolean;
    dispute?: boolean | Prisma.DisputeDefaultArgs<ExtArgs>;
    uploader?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["disputeEvidence"]>;
export type DisputeEvidenceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    disputeId?: boolean;
    uploaderId?: boolean;
    type?: boolean;
    fileUrl?: boolean;
    mimeType?: boolean;
    size?: boolean;
    createdAt?: boolean;
    dispute?: boolean | Prisma.DisputeDefaultArgs<ExtArgs>;
    uploader?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["disputeEvidence"]>;
export type DisputeEvidenceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    disputeId?: boolean;
    uploaderId?: boolean;
    type?: boolean;
    fileUrl?: boolean;
    mimeType?: boolean;
    size?: boolean;
    createdAt?: boolean;
    dispute?: boolean | Prisma.DisputeDefaultArgs<ExtArgs>;
    uploader?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["disputeEvidence"]>;
export type DisputeEvidenceSelectScalar = {
    id?: boolean;
    disputeId?: boolean;
    uploaderId?: boolean;
    type?: boolean;
    fileUrl?: boolean;
    mimeType?: boolean;
    size?: boolean;
    createdAt?: boolean;
};
export type DisputeEvidenceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "disputeId" | "uploaderId" | "type" | "fileUrl" | "mimeType" | "size" | "createdAt", ExtArgs["result"]["disputeEvidence"]>;
export type DisputeEvidenceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    dispute?: boolean | Prisma.DisputeDefaultArgs<ExtArgs>;
    uploader?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type DisputeEvidenceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    dispute?: boolean | Prisma.DisputeDefaultArgs<ExtArgs>;
    uploader?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type DisputeEvidenceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    dispute?: boolean | Prisma.DisputeDefaultArgs<ExtArgs>;
    uploader?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $DisputeEvidencePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DisputeEvidence";
    objects: {
        dispute: Prisma.$DisputePayload<ExtArgs>;
        uploader: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        disputeId: string;
        uploaderId: string;
        type: $Enums.DisputeEvidenceType;
        fileUrl: string;
        mimeType: string;
        size: number;
        createdAt: Date;
    }, ExtArgs["result"]["disputeEvidence"]>;
    composites: {};
};
export type DisputeEvidenceGetPayload<S extends boolean | null | undefined | DisputeEvidenceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DisputeEvidencePayload, S>;
export type DisputeEvidenceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DisputeEvidenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DisputeEvidenceCountAggregateInputType | true;
};
export interface DisputeEvidenceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DisputeEvidence'];
        meta: {
            name: 'DisputeEvidence';
        };
    };
    findUnique<T extends DisputeEvidenceFindUniqueArgs>(args: Prisma.SelectSubset<T, DisputeEvidenceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DisputeEvidenceClient<runtime.Types.Result.GetResult<Prisma.$DisputeEvidencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends DisputeEvidenceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DisputeEvidenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DisputeEvidenceClient<runtime.Types.Result.GetResult<Prisma.$DisputeEvidencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends DisputeEvidenceFindFirstArgs>(args?: Prisma.SelectSubset<T, DisputeEvidenceFindFirstArgs<ExtArgs>>): Prisma.Prisma__DisputeEvidenceClient<runtime.Types.Result.GetResult<Prisma.$DisputeEvidencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends DisputeEvidenceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DisputeEvidenceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DisputeEvidenceClient<runtime.Types.Result.GetResult<Prisma.$DisputeEvidencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends DisputeEvidenceFindManyArgs>(args?: Prisma.SelectSubset<T, DisputeEvidenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DisputeEvidencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends DisputeEvidenceCreateArgs>(args: Prisma.SelectSubset<T, DisputeEvidenceCreateArgs<ExtArgs>>): Prisma.Prisma__DisputeEvidenceClient<runtime.Types.Result.GetResult<Prisma.$DisputeEvidencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends DisputeEvidenceCreateManyArgs>(args?: Prisma.SelectSubset<T, DisputeEvidenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends DisputeEvidenceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DisputeEvidenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DisputeEvidencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends DisputeEvidenceDeleteArgs>(args: Prisma.SelectSubset<T, DisputeEvidenceDeleteArgs<ExtArgs>>): Prisma.Prisma__DisputeEvidenceClient<runtime.Types.Result.GetResult<Prisma.$DisputeEvidencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends DisputeEvidenceUpdateArgs>(args: Prisma.SelectSubset<T, DisputeEvidenceUpdateArgs<ExtArgs>>): Prisma.Prisma__DisputeEvidenceClient<runtime.Types.Result.GetResult<Prisma.$DisputeEvidencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends DisputeEvidenceDeleteManyArgs>(args?: Prisma.SelectSubset<T, DisputeEvidenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends DisputeEvidenceUpdateManyArgs>(args: Prisma.SelectSubset<T, DisputeEvidenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends DisputeEvidenceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DisputeEvidenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DisputeEvidencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends DisputeEvidenceUpsertArgs>(args: Prisma.SelectSubset<T, DisputeEvidenceUpsertArgs<ExtArgs>>): Prisma.Prisma__DisputeEvidenceClient<runtime.Types.Result.GetResult<Prisma.$DisputeEvidencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends DisputeEvidenceCountArgs>(args?: Prisma.Subset<T, DisputeEvidenceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DisputeEvidenceCountAggregateOutputType> : number>;
    aggregate<T extends DisputeEvidenceAggregateArgs>(args: Prisma.Subset<T, DisputeEvidenceAggregateArgs>): Prisma.PrismaPromise<GetDisputeEvidenceAggregateType<T>>;
    groupBy<T extends DisputeEvidenceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DisputeEvidenceGroupByArgs['orderBy'];
    } : {
        orderBy?: DisputeEvidenceGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DisputeEvidenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDisputeEvidenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: DisputeEvidenceFieldRefs;
}
export interface Prisma__DisputeEvidenceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    dispute<T extends Prisma.DisputeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DisputeDefaultArgs<ExtArgs>>): Prisma.Prisma__DisputeClient<runtime.Types.Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    uploader<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface DisputeEvidenceFieldRefs {
    readonly id: Prisma.FieldRef<"DisputeEvidence", 'String'>;
    readonly disputeId: Prisma.FieldRef<"DisputeEvidence", 'String'>;
    readonly uploaderId: Prisma.FieldRef<"DisputeEvidence", 'String'>;
    readonly type: Prisma.FieldRef<"DisputeEvidence", 'DisputeEvidenceType'>;
    readonly fileUrl: Prisma.FieldRef<"DisputeEvidence", 'String'>;
    readonly mimeType: Prisma.FieldRef<"DisputeEvidence", 'String'>;
    readonly size: Prisma.FieldRef<"DisputeEvidence", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"DisputeEvidence", 'DateTime'>;
}
export type DisputeEvidenceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeEvidenceSelect<ExtArgs> | null;
    omit?: Prisma.DisputeEvidenceOmit<ExtArgs> | null;
    include?: Prisma.DisputeEvidenceInclude<ExtArgs> | null;
    where: Prisma.DisputeEvidenceWhereUniqueInput;
};
export type DisputeEvidenceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeEvidenceSelect<ExtArgs> | null;
    omit?: Prisma.DisputeEvidenceOmit<ExtArgs> | null;
    include?: Prisma.DisputeEvidenceInclude<ExtArgs> | null;
    where: Prisma.DisputeEvidenceWhereUniqueInput;
};
export type DisputeEvidenceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeEvidenceSelect<ExtArgs> | null;
    omit?: Prisma.DisputeEvidenceOmit<ExtArgs> | null;
    include?: Prisma.DisputeEvidenceInclude<ExtArgs> | null;
    where?: Prisma.DisputeEvidenceWhereInput;
    orderBy?: Prisma.DisputeEvidenceOrderByWithRelationInput | Prisma.DisputeEvidenceOrderByWithRelationInput[];
    cursor?: Prisma.DisputeEvidenceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DisputeEvidenceScalarFieldEnum | Prisma.DisputeEvidenceScalarFieldEnum[];
};
export type DisputeEvidenceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeEvidenceSelect<ExtArgs> | null;
    omit?: Prisma.DisputeEvidenceOmit<ExtArgs> | null;
    include?: Prisma.DisputeEvidenceInclude<ExtArgs> | null;
    where?: Prisma.DisputeEvidenceWhereInput;
    orderBy?: Prisma.DisputeEvidenceOrderByWithRelationInput | Prisma.DisputeEvidenceOrderByWithRelationInput[];
    cursor?: Prisma.DisputeEvidenceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DisputeEvidenceScalarFieldEnum | Prisma.DisputeEvidenceScalarFieldEnum[];
};
export type DisputeEvidenceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeEvidenceSelect<ExtArgs> | null;
    omit?: Prisma.DisputeEvidenceOmit<ExtArgs> | null;
    include?: Prisma.DisputeEvidenceInclude<ExtArgs> | null;
    where?: Prisma.DisputeEvidenceWhereInput;
    orderBy?: Prisma.DisputeEvidenceOrderByWithRelationInput | Prisma.DisputeEvidenceOrderByWithRelationInput[];
    cursor?: Prisma.DisputeEvidenceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DisputeEvidenceScalarFieldEnum | Prisma.DisputeEvidenceScalarFieldEnum[];
};
export type DisputeEvidenceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeEvidenceSelect<ExtArgs> | null;
    omit?: Prisma.DisputeEvidenceOmit<ExtArgs> | null;
    include?: Prisma.DisputeEvidenceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DisputeEvidenceCreateInput, Prisma.DisputeEvidenceUncheckedCreateInput>;
};
export type DisputeEvidenceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.DisputeEvidenceCreateManyInput | Prisma.DisputeEvidenceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DisputeEvidenceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeEvidenceSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DisputeEvidenceOmit<ExtArgs> | null;
    data: Prisma.DisputeEvidenceCreateManyInput | Prisma.DisputeEvidenceCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.DisputeEvidenceIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type DisputeEvidenceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeEvidenceSelect<ExtArgs> | null;
    omit?: Prisma.DisputeEvidenceOmit<ExtArgs> | null;
    include?: Prisma.DisputeEvidenceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DisputeEvidenceUpdateInput, Prisma.DisputeEvidenceUncheckedUpdateInput>;
    where: Prisma.DisputeEvidenceWhereUniqueInput;
};
export type DisputeEvidenceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.DisputeEvidenceUpdateManyMutationInput, Prisma.DisputeEvidenceUncheckedUpdateManyInput>;
    where?: Prisma.DisputeEvidenceWhereInput;
    limit?: number;
};
export type DisputeEvidenceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeEvidenceSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DisputeEvidenceOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DisputeEvidenceUpdateManyMutationInput, Prisma.DisputeEvidenceUncheckedUpdateManyInput>;
    where?: Prisma.DisputeEvidenceWhereInput;
    limit?: number;
    include?: Prisma.DisputeEvidenceIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type DisputeEvidenceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeEvidenceSelect<ExtArgs> | null;
    omit?: Prisma.DisputeEvidenceOmit<ExtArgs> | null;
    include?: Prisma.DisputeEvidenceInclude<ExtArgs> | null;
    where: Prisma.DisputeEvidenceWhereUniqueInput;
    create: Prisma.XOR<Prisma.DisputeEvidenceCreateInput, Prisma.DisputeEvidenceUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.DisputeEvidenceUpdateInput, Prisma.DisputeEvidenceUncheckedUpdateInput>;
};
export type DisputeEvidenceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeEvidenceSelect<ExtArgs> | null;
    omit?: Prisma.DisputeEvidenceOmit<ExtArgs> | null;
    include?: Prisma.DisputeEvidenceInclude<ExtArgs> | null;
    where: Prisma.DisputeEvidenceWhereUniqueInput;
};
export type DisputeEvidenceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DisputeEvidenceWhereInput;
    limit?: number;
};
export type DisputeEvidenceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeEvidenceSelect<ExtArgs> | null;
    omit?: Prisma.DisputeEvidenceOmit<ExtArgs> | null;
    include?: Prisma.DisputeEvidenceInclude<ExtArgs> | null;
};
export {};
