import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type VerificationRequestModel = runtime.Types.Result.DefaultSelection<Prisma.$VerificationRequestPayload>;
export type AggregateVerificationRequest = {
    _count: VerificationRequestCountAggregateOutputType | null;
    _min: VerificationRequestMinAggregateOutputType | null;
    _max: VerificationRequestMaxAggregateOutputType | null;
};
export type VerificationRequestMinAggregateOutputType = {
    id: string | null;
    providerId: string | null;
    cnicNumber: string | null;
    facePhoto: string | null;
    cnicFrontImage: string | null;
    cnicBackImage: string | null;
    status: $Enums.VerificationStatus | null;
    submittedAt: Date | null;
    reviewedAt: Date | null;
    reviewedBy: string | null;
    rejectionReason: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type VerificationRequestMaxAggregateOutputType = {
    id: string | null;
    providerId: string | null;
    cnicNumber: string | null;
    facePhoto: string | null;
    cnicFrontImage: string | null;
    cnicBackImage: string | null;
    status: $Enums.VerificationStatus | null;
    submittedAt: Date | null;
    reviewedAt: Date | null;
    reviewedBy: string | null;
    rejectionReason: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type VerificationRequestCountAggregateOutputType = {
    id: number;
    providerId: number;
    cnicNumber: number;
    facePhoto: number;
    cnicFrontImage: number;
    cnicBackImage: number;
    status: number;
    submittedAt: number;
    reviewedAt: number;
    reviewedBy: number;
    rejectionReason: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type VerificationRequestMinAggregateInputType = {
    id?: true;
    providerId?: true;
    cnicNumber?: true;
    facePhoto?: true;
    cnicFrontImage?: true;
    cnicBackImage?: true;
    status?: true;
    submittedAt?: true;
    reviewedAt?: true;
    reviewedBy?: true;
    rejectionReason?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type VerificationRequestMaxAggregateInputType = {
    id?: true;
    providerId?: true;
    cnicNumber?: true;
    facePhoto?: true;
    cnicFrontImage?: true;
    cnicBackImage?: true;
    status?: true;
    submittedAt?: true;
    reviewedAt?: true;
    reviewedBy?: true;
    rejectionReason?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type VerificationRequestCountAggregateInputType = {
    id?: true;
    providerId?: true;
    cnicNumber?: true;
    facePhoto?: true;
    cnicFrontImage?: true;
    cnicBackImage?: true;
    status?: true;
    submittedAt?: true;
    reviewedAt?: true;
    reviewedBy?: true;
    rejectionReason?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type VerificationRequestAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VerificationRequestWhereInput;
    orderBy?: Prisma.VerificationRequestOrderByWithRelationInput | Prisma.VerificationRequestOrderByWithRelationInput[];
    cursor?: Prisma.VerificationRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | VerificationRequestCountAggregateInputType;
    _min?: VerificationRequestMinAggregateInputType;
    _max?: VerificationRequestMaxAggregateInputType;
};
export type GetVerificationRequestAggregateType<T extends VerificationRequestAggregateArgs> = {
    [P in keyof T & keyof AggregateVerificationRequest]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateVerificationRequest[P]> : Prisma.GetScalarType<T[P], AggregateVerificationRequest[P]>;
};
export type VerificationRequestGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VerificationRequestWhereInput;
    orderBy?: Prisma.VerificationRequestOrderByWithAggregationInput | Prisma.VerificationRequestOrderByWithAggregationInput[];
    by: Prisma.VerificationRequestScalarFieldEnum[] | Prisma.VerificationRequestScalarFieldEnum;
    having?: Prisma.VerificationRequestScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: VerificationRequestCountAggregateInputType | true;
    _min?: VerificationRequestMinAggregateInputType;
    _max?: VerificationRequestMaxAggregateInputType;
};
export type VerificationRequestGroupByOutputType = {
    id: string;
    providerId: string;
    cnicNumber: string;
    facePhoto: string;
    cnicFrontImage: string;
    cnicBackImage: string;
    status: $Enums.VerificationStatus;
    submittedAt: Date;
    reviewedAt: Date | null;
    reviewedBy: string | null;
    rejectionReason: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: VerificationRequestCountAggregateOutputType | null;
    _min: VerificationRequestMinAggregateOutputType | null;
    _max: VerificationRequestMaxAggregateOutputType | null;
};
type GetVerificationRequestGroupByPayload<T extends VerificationRequestGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<VerificationRequestGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof VerificationRequestGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], VerificationRequestGroupByOutputType[P]> : Prisma.GetScalarType<T[P], VerificationRequestGroupByOutputType[P]>;
}>>;
export type VerificationRequestWhereInput = {
    AND?: Prisma.VerificationRequestWhereInput | Prisma.VerificationRequestWhereInput[];
    OR?: Prisma.VerificationRequestWhereInput[];
    NOT?: Prisma.VerificationRequestWhereInput | Prisma.VerificationRequestWhereInput[];
    id?: Prisma.StringFilter<"VerificationRequest"> | string;
    providerId?: Prisma.StringFilter<"VerificationRequest"> | string;
    cnicNumber?: Prisma.StringFilter<"VerificationRequest"> | string;
    facePhoto?: Prisma.StringFilter<"VerificationRequest"> | string;
    cnicFrontImage?: Prisma.StringFilter<"VerificationRequest"> | string;
    cnicBackImage?: Prisma.StringFilter<"VerificationRequest"> | string;
    status?: Prisma.EnumVerificationStatusFilter<"VerificationRequest"> | $Enums.VerificationStatus;
    submittedAt?: Prisma.DateTimeFilter<"VerificationRequest"> | Date | string;
    reviewedAt?: Prisma.DateTimeNullableFilter<"VerificationRequest"> | Date | string | null;
    reviewedBy?: Prisma.StringNullableFilter<"VerificationRequest"> | string | null;
    rejectionReason?: Prisma.StringNullableFilter<"VerificationRequest"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"VerificationRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"VerificationRequest"> | Date | string;
    provider?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type VerificationRequestOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    cnicNumber?: Prisma.SortOrder;
    facePhoto?: Prisma.SortOrder;
    cnicFrontImage?: Prisma.SortOrder;
    cnicBackImage?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    provider?: Prisma.UserOrderByWithRelationInput;
};
export type VerificationRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.VerificationRequestWhereInput | Prisma.VerificationRequestWhereInput[];
    OR?: Prisma.VerificationRequestWhereInput[];
    NOT?: Prisma.VerificationRequestWhereInput | Prisma.VerificationRequestWhereInput[];
    providerId?: Prisma.StringFilter<"VerificationRequest"> | string;
    cnicNumber?: Prisma.StringFilter<"VerificationRequest"> | string;
    facePhoto?: Prisma.StringFilter<"VerificationRequest"> | string;
    cnicFrontImage?: Prisma.StringFilter<"VerificationRequest"> | string;
    cnicBackImage?: Prisma.StringFilter<"VerificationRequest"> | string;
    status?: Prisma.EnumVerificationStatusFilter<"VerificationRequest"> | $Enums.VerificationStatus;
    submittedAt?: Prisma.DateTimeFilter<"VerificationRequest"> | Date | string;
    reviewedAt?: Prisma.DateTimeNullableFilter<"VerificationRequest"> | Date | string | null;
    reviewedBy?: Prisma.StringNullableFilter<"VerificationRequest"> | string | null;
    rejectionReason?: Prisma.StringNullableFilter<"VerificationRequest"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"VerificationRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"VerificationRequest"> | Date | string;
    provider?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type VerificationRequestOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    cnicNumber?: Prisma.SortOrder;
    facePhoto?: Prisma.SortOrder;
    cnicFrontImage?: Prisma.SortOrder;
    cnicBackImage?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.VerificationRequestCountOrderByAggregateInput;
    _max?: Prisma.VerificationRequestMaxOrderByAggregateInput;
    _min?: Prisma.VerificationRequestMinOrderByAggregateInput;
};
export type VerificationRequestScalarWhereWithAggregatesInput = {
    AND?: Prisma.VerificationRequestScalarWhereWithAggregatesInput | Prisma.VerificationRequestScalarWhereWithAggregatesInput[];
    OR?: Prisma.VerificationRequestScalarWhereWithAggregatesInput[];
    NOT?: Prisma.VerificationRequestScalarWhereWithAggregatesInput | Prisma.VerificationRequestScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"VerificationRequest"> | string;
    providerId?: Prisma.StringWithAggregatesFilter<"VerificationRequest"> | string;
    cnicNumber?: Prisma.StringWithAggregatesFilter<"VerificationRequest"> | string;
    facePhoto?: Prisma.StringWithAggregatesFilter<"VerificationRequest"> | string;
    cnicFrontImage?: Prisma.StringWithAggregatesFilter<"VerificationRequest"> | string;
    cnicBackImage?: Prisma.StringWithAggregatesFilter<"VerificationRequest"> | string;
    status?: Prisma.EnumVerificationStatusWithAggregatesFilter<"VerificationRequest"> | $Enums.VerificationStatus;
    submittedAt?: Prisma.DateTimeWithAggregatesFilter<"VerificationRequest"> | Date | string;
    reviewedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"VerificationRequest"> | Date | string | null;
    reviewedBy?: Prisma.StringNullableWithAggregatesFilter<"VerificationRequest"> | string | null;
    rejectionReason?: Prisma.StringNullableWithAggregatesFilter<"VerificationRequest"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"VerificationRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"VerificationRequest"> | Date | string;
};
export type VerificationRequestCreateInput = {
    id?: string;
    cnicNumber: string;
    facePhoto: string;
    cnicFrontImage: string;
    cnicBackImage: string;
    status?: $Enums.VerificationStatus;
    submittedAt?: Date | string;
    reviewedAt?: Date | string | null;
    reviewedBy?: string | null;
    rejectionReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    provider: Prisma.UserCreateNestedOneWithoutVerificationRequestsInput;
};
export type VerificationRequestUncheckedCreateInput = {
    id?: string;
    providerId: string;
    cnicNumber: string;
    facePhoto: string;
    cnicFrontImage: string;
    cnicBackImage: string;
    status?: $Enums.VerificationStatus;
    submittedAt?: Date | string;
    reviewedAt?: Date | string | null;
    reviewedBy?: string | null;
    rejectionReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type VerificationRequestUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cnicNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    facePhoto?: Prisma.StringFieldUpdateOperationsInput | string;
    cnicFrontImage?: Prisma.StringFieldUpdateOperationsInput | string;
    cnicBackImage?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    provider?: Prisma.UserUpdateOneRequiredWithoutVerificationRequestsNestedInput;
};
export type VerificationRequestUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    cnicNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    facePhoto?: Prisma.StringFieldUpdateOperationsInput | string;
    cnicFrontImage?: Prisma.StringFieldUpdateOperationsInput | string;
    cnicBackImage?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VerificationRequestCreateManyInput = {
    id?: string;
    providerId: string;
    cnicNumber: string;
    facePhoto: string;
    cnicFrontImage: string;
    cnicBackImage: string;
    status?: $Enums.VerificationStatus;
    submittedAt?: Date | string;
    reviewedAt?: Date | string | null;
    reviewedBy?: string | null;
    rejectionReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type VerificationRequestUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cnicNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    facePhoto?: Prisma.StringFieldUpdateOperationsInput | string;
    cnicFrontImage?: Prisma.StringFieldUpdateOperationsInput | string;
    cnicBackImage?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VerificationRequestUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    cnicNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    facePhoto?: Prisma.StringFieldUpdateOperationsInput | string;
    cnicFrontImage?: Prisma.StringFieldUpdateOperationsInput | string;
    cnicBackImage?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VerificationRequestListRelationFilter = {
    every?: Prisma.VerificationRequestWhereInput;
    some?: Prisma.VerificationRequestWhereInput;
    none?: Prisma.VerificationRequestWhereInput;
};
export type VerificationRequestOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type VerificationRequestCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    cnicNumber?: Prisma.SortOrder;
    facePhoto?: Prisma.SortOrder;
    cnicFrontImage?: Prisma.SortOrder;
    cnicBackImage?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    reviewedBy?: Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type VerificationRequestMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    cnicNumber?: Prisma.SortOrder;
    facePhoto?: Prisma.SortOrder;
    cnicFrontImage?: Prisma.SortOrder;
    cnicBackImage?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    reviewedBy?: Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type VerificationRequestMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    cnicNumber?: Prisma.SortOrder;
    facePhoto?: Prisma.SortOrder;
    cnicFrontImage?: Prisma.SortOrder;
    cnicBackImage?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    reviewedBy?: Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type VerificationRequestCreateNestedManyWithoutProviderInput = {
    create?: Prisma.XOR<Prisma.VerificationRequestCreateWithoutProviderInput, Prisma.VerificationRequestUncheckedCreateWithoutProviderInput> | Prisma.VerificationRequestCreateWithoutProviderInput[] | Prisma.VerificationRequestUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.VerificationRequestCreateOrConnectWithoutProviderInput | Prisma.VerificationRequestCreateOrConnectWithoutProviderInput[];
    createMany?: Prisma.VerificationRequestCreateManyProviderInputEnvelope;
    connect?: Prisma.VerificationRequestWhereUniqueInput | Prisma.VerificationRequestWhereUniqueInput[];
};
export type VerificationRequestUncheckedCreateNestedManyWithoutProviderInput = {
    create?: Prisma.XOR<Prisma.VerificationRequestCreateWithoutProviderInput, Prisma.VerificationRequestUncheckedCreateWithoutProviderInput> | Prisma.VerificationRequestCreateWithoutProviderInput[] | Prisma.VerificationRequestUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.VerificationRequestCreateOrConnectWithoutProviderInput | Prisma.VerificationRequestCreateOrConnectWithoutProviderInput[];
    createMany?: Prisma.VerificationRequestCreateManyProviderInputEnvelope;
    connect?: Prisma.VerificationRequestWhereUniqueInput | Prisma.VerificationRequestWhereUniqueInput[];
};
export type VerificationRequestUpdateManyWithoutProviderNestedInput = {
    create?: Prisma.XOR<Prisma.VerificationRequestCreateWithoutProviderInput, Prisma.VerificationRequestUncheckedCreateWithoutProviderInput> | Prisma.VerificationRequestCreateWithoutProviderInput[] | Prisma.VerificationRequestUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.VerificationRequestCreateOrConnectWithoutProviderInput | Prisma.VerificationRequestCreateOrConnectWithoutProviderInput[];
    upsert?: Prisma.VerificationRequestUpsertWithWhereUniqueWithoutProviderInput | Prisma.VerificationRequestUpsertWithWhereUniqueWithoutProviderInput[];
    createMany?: Prisma.VerificationRequestCreateManyProviderInputEnvelope;
    set?: Prisma.VerificationRequestWhereUniqueInput | Prisma.VerificationRequestWhereUniqueInput[];
    disconnect?: Prisma.VerificationRequestWhereUniqueInput | Prisma.VerificationRequestWhereUniqueInput[];
    delete?: Prisma.VerificationRequestWhereUniqueInput | Prisma.VerificationRequestWhereUniqueInput[];
    connect?: Prisma.VerificationRequestWhereUniqueInput | Prisma.VerificationRequestWhereUniqueInput[];
    update?: Prisma.VerificationRequestUpdateWithWhereUniqueWithoutProviderInput | Prisma.VerificationRequestUpdateWithWhereUniqueWithoutProviderInput[];
    updateMany?: Prisma.VerificationRequestUpdateManyWithWhereWithoutProviderInput | Prisma.VerificationRequestUpdateManyWithWhereWithoutProviderInput[];
    deleteMany?: Prisma.VerificationRequestScalarWhereInput | Prisma.VerificationRequestScalarWhereInput[];
};
export type VerificationRequestUncheckedUpdateManyWithoutProviderNestedInput = {
    create?: Prisma.XOR<Prisma.VerificationRequestCreateWithoutProviderInput, Prisma.VerificationRequestUncheckedCreateWithoutProviderInput> | Prisma.VerificationRequestCreateWithoutProviderInput[] | Prisma.VerificationRequestUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.VerificationRequestCreateOrConnectWithoutProviderInput | Prisma.VerificationRequestCreateOrConnectWithoutProviderInput[];
    upsert?: Prisma.VerificationRequestUpsertWithWhereUniqueWithoutProviderInput | Prisma.VerificationRequestUpsertWithWhereUniqueWithoutProviderInput[];
    createMany?: Prisma.VerificationRequestCreateManyProviderInputEnvelope;
    set?: Prisma.VerificationRequestWhereUniqueInput | Prisma.VerificationRequestWhereUniqueInput[];
    disconnect?: Prisma.VerificationRequestWhereUniqueInput | Prisma.VerificationRequestWhereUniqueInput[];
    delete?: Prisma.VerificationRequestWhereUniqueInput | Prisma.VerificationRequestWhereUniqueInput[];
    connect?: Prisma.VerificationRequestWhereUniqueInput | Prisma.VerificationRequestWhereUniqueInput[];
    update?: Prisma.VerificationRequestUpdateWithWhereUniqueWithoutProviderInput | Prisma.VerificationRequestUpdateWithWhereUniqueWithoutProviderInput[];
    updateMany?: Prisma.VerificationRequestUpdateManyWithWhereWithoutProviderInput | Prisma.VerificationRequestUpdateManyWithWhereWithoutProviderInput[];
    deleteMany?: Prisma.VerificationRequestScalarWhereInput | Prisma.VerificationRequestScalarWhereInput[];
};
export type VerificationRequestCreateWithoutProviderInput = {
    id?: string;
    cnicNumber: string;
    facePhoto: string;
    cnicFrontImage: string;
    cnicBackImage: string;
    status?: $Enums.VerificationStatus;
    submittedAt?: Date | string;
    reviewedAt?: Date | string | null;
    reviewedBy?: string | null;
    rejectionReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type VerificationRequestUncheckedCreateWithoutProviderInput = {
    id?: string;
    cnicNumber: string;
    facePhoto: string;
    cnicFrontImage: string;
    cnicBackImage: string;
    status?: $Enums.VerificationStatus;
    submittedAt?: Date | string;
    reviewedAt?: Date | string | null;
    reviewedBy?: string | null;
    rejectionReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type VerificationRequestCreateOrConnectWithoutProviderInput = {
    where: Prisma.VerificationRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.VerificationRequestCreateWithoutProviderInput, Prisma.VerificationRequestUncheckedCreateWithoutProviderInput>;
};
export type VerificationRequestCreateManyProviderInputEnvelope = {
    data: Prisma.VerificationRequestCreateManyProviderInput | Prisma.VerificationRequestCreateManyProviderInput[];
    skipDuplicates?: boolean;
};
export type VerificationRequestUpsertWithWhereUniqueWithoutProviderInput = {
    where: Prisma.VerificationRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.VerificationRequestUpdateWithoutProviderInput, Prisma.VerificationRequestUncheckedUpdateWithoutProviderInput>;
    create: Prisma.XOR<Prisma.VerificationRequestCreateWithoutProviderInput, Prisma.VerificationRequestUncheckedCreateWithoutProviderInput>;
};
export type VerificationRequestUpdateWithWhereUniqueWithoutProviderInput = {
    where: Prisma.VerificationRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.VerificationRequestUpdateWithoutProviderInput, Prisma.VerificationRequestUncheckedUpdateWithoutProviderInput>;
};
export type VerificationRequestUpdateManyWithWhereWithoutProviderInput = {
    where: Prisma.VerificationRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.VerificationRequestUpdateManyMutationInput, Prisma.VerificationRequestUncheckedUpdateManyWithoutProviderInput>;
};
export type VerificationRequestScalarWhereInput = {
    AND?: Prisma.VerificationRequestScalarWhereInput | Prisma.VerificationRequestScalarWhereInput[];
    OR?: Prisma.VerificationRequestScalarWhereInput[];
    NOT?: Prisma.VerificationRequestScalarWhereInput | Prisma.VerificationRequestScalarWhereInput[];
    id?: Prisma.StringFilter<"VerificationRequest"> | string;
    providerId?: Prisma.StringFilter<"VerificationRequest"> | string;
    cnicNumber?: Prisma.StringFilter<"VerificationRequest"> | string;
    facePhoto?: Prisma.StringFilter<"VerificationRequest"> | string;
    cnicFrontImage?: Prisma.StringFilter<"VerificationRequest"> | string;
    cnicBackImage?: Prisma.StringFilter<"VerificationRequest"> | string;
    status?: Prisma.EnumVerificationStatusFilter<"VerificationRequest"> | $Enums.VerificationStatus;
    submittedAt?: Prisma.DateTimeFilter<"VerificationRequest"> | Date | string;
    reviewedAt?: Prisma.DateTimeNullableFilter<"VerificationRequest"> | Date | string | null;
    reviewedBy?: Prisma.StringNullableFilter<"VerificationRequest"> | string | null;
    rejectionReason?: Prisma.StringNullableFilter<"VerificationRequest"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"VerificationRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"VerificationRequest"> | Date | string;
};
export type VerificationRequestCreateManyProviderInput = {
    id?: string;
    cnicNumber: string;
    facePhoto: string;
    cnicFrontImage: string;
    cnicBackImage: string;
    status?: $Enums.VerificationStatus;
    submittedAt?: Date | string;
    reviewedAt?: Date | string | null;
    reviewedBy?: string | null;
    rejectionReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type VerificationRequestUpdateWithoutProviderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cnicNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    facePhoto?: Prisma.StringFieldUpdateOperationsInput | string;
    cnicFrontImage?: Prisma.StringFieldUpdateOperationsInput | string;
    cnicBackImage?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VerificationRequestUncheckedUpdateWithoutProviderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cnicNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    facePhoto?: Prisma.StringFieldUpdateOperationsInput | string;
    cnicFrontImage?: Prisma.StringFieldUpdateOperationsInput | string;
    cnicBackImage?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VerificationRequestUncheckedUpdateManyWithoutProviderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cnicNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    facePhoto?: Prisma.StringFieldUpdateOperationsInput | string;
    cnicFrontImage?: Prisma.StringFieldUpdateOperationsInput | string;
    cnicBackImage?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VerificationRequestSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    providerId?: boolean;
    cnicNumber?: boolean;
    facePhoto?: boolean;
    cnicFrontImage?: boolean;
    cnicBackImage?: boolean;
    status?: boolean;
    submittedAt?: boolean;
    reviewedAt?: boolean;
    reviewedBy?: boolean;
    rejectionReason?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["verificationRequest"]>;
export type VerificationRequestSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    providerId?: boolean;
    cnicNumber?: boolean;
    facePhoto?: boolean;
    cnicFrontImage?: boolean;
    cnicBackImage?: boolean;
    status?: boolean;
    submittedAt?: boolean;
    reviewedAt?: boolean;
    reviewedBy?: boolean;
    rejectionReason?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["verificationRequest"]>;
export type VerificationRequestSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    providerId?: boolean;
    cnicNumber?: boolean;
    facePhoto?: boolean;
    cnicFrontImage?: boolean;
    cnicBackImage?: boolean;
    status?: boolean;
    submittedAt?: boolean;
    reviewedAt?: boolean;
    reviewedBy?: boolean;
    rejectionReason?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["verificationRequest"]>;
export type VerificationRequestSelectScalar = {
    id?: boolean;
    providerId?: boolean;
    cnicNumber?: boolean;
    facePhoto?: boolean;
    cnicFrontImage?: boolean;
    cnicBackImage?: boolean;
    status?: boolean;
    submittedAt?: boolean;
    reviewedAt?: boolean;
    reviewedBy?: boolean;
    rejectionReason?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type VerificationRequestOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "providerId" | "cnicNumber" | "facePhoto" | "cnicFrontImage" | "cnicBackImage" | "status" | "submittedAt" | "reviewedAt" | "reviewedBy" | "rejectionReason" | "createdAt" | "updatedAt", ExtArgs["result"]["verificationRequest"]>;
export type VerificationRequestInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type VerificationRequestIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type VerificationRequestIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $VerificationRequestPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "VerificationRequest";
    objects: {
        provider: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        providerId: string;
        cnicNumber: string;
        facePhoto: string;
        cnicFrontImage: string;
        cnicBackImage: string;
        status: $Enums.VerificationStatus;
        submittedAt: Date;
        reviewedAt: Date | null;
        reviewedBy: string | null;
        rejectionReason: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["verificationRequest"]>;
    composites: {};
};
export type VerificationRequestGetPayload<S extends boolean | null | undefined | VerificationRequestDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$VerificationRequestPayload, S>;
export type VerificationRequestCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<VerificationRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: VerificationRequestCountAggregateInputType | true;
};
export interface VerificationRequestDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['VerificationRequest'];
        meta: {
            name: 'VerificationRequest';
        };
    };
    findUnique<T extends VerificationRequestFindUniqueArgs>(args: Prisma.SelectSubset<T, VerificationRequestFindUniqueArgs<ExtArgs>>): Prisma.Prisma__VerificationRequestClient<runtime.Types.Result.GetResult<Prisma.$VerificationRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends VerificationRequestFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, VerificationRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__VerificationRequestClient<runtime.Types.Result.GetResult<Prisma.$VerificationRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends VerificationRequestFindFirstArgs>(args?: Prisma.SelectSubset<T, VerificationRequestFindFirstArgs<ExtArgs>>): Prisma.Prisma__VerificationRequestClient<runtime.Types.Result.GetResult<Prisma.$VerificationRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends VerificationRequestFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, VerificationRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__VerificationRequestClient<runtime.Types.Result.GetResult<Prisma.$VerificationRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends VerificationRequestFindManyArgs>(args?: Prisma.SelectSubset<T, VerificationRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VerificationRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends VerificationRequestCreateArgs>(args: Prisma.SelectSubset<T, VerificationRequestCreateArgs<ExtArgs>>): Prisma.Prisma__VerificationRequestClient<runtime.Types.Result.GetResult<Prisma.$VerificationRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends VerificationRequestCreateManyArgs>(args?: Prisma.SelectSubset<T, VerificationRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends VerificationRequestCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, VerificationRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VerificationRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends VerificationRequestDeleteArgs>(args: Prisma.SelectSubset<T, VerificationRequestDeleteArgs<ExtArgs>>): Prisma.Prisma__VerificationRequestClient<runtime.Types.Result.GetResult<Prisma.$VerificationRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends VerificationRequestUpdateArgs>(args: Prisma.SelectSubset<T, VerificationRequestUpdateArgs<ExtArgs>>): Prisma.Prisma__VerificationRequestClient<runtime.Types.Result.GetResult<Prisma.$VerificationRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends VerificationRequestDeleteManyArgs>(args?: Prisma.SelectSubset<T, VerificationRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends VerificationRequestUpdateManyArgs>(args: Prisma.SelectSubset<T, VerificationRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends VerificationRequestUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, VerificationRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VerificationRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends VerificationRequestUpsertArgs>(args: Prisma.SelectSubset<T, VerificationRequestUpsertArgs<ExtArgs>>): Prisma.Prisma__VerificationRequestClient<runtime.Types.Result.GetResult<Prisma.$VerificationRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends VerificationRequestCountArgs>(args?: Prisma.Subset<T, VerificationRequestCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], VerificationRequestCountAggregateOutputType> : number>;
    aggregate<T extends VerificationRequestAggregateArgs>(args: Prisma.Subset<T, VerificationRequestAggregateArgs>): Prisma.PrismaPromise<GetVerificationRequestAggregateType<T>>;
    groupBy<T extends VerificationRequestGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: VerificationRequestGroupByArgs['orderBy'];
    } : {
        orderBy?: VerificationRequestGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, VerificationRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: VerificationRequestFieldRefs;
}
export interface Prisma__VerificationRequestClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    provider<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface VerificationRequestFieldRefs {
    readonly id: Prisma.FieldRef<"VerificationRequest", 'String'>;
    readonly providerId: Prisma.FieldRef<"VerificationRequest", 'String'>;
    readonly cnicNumber: Prisma.FieldRef<"VerificationRequest", 'String'>;
    readonly facePhoto: Prisma.FieldRef<"VerificationRequest", 'String'>;
    readonly cnicFrontImage: Prisma.FieldRef<"VerificationRequest", 'String'>;
    readonly cnicBackImage: Prisma.FieldRef<"VerificationRequest", 'String'>;
    readonly status: Prisma.FieldRef<"VerificationRequest", 'VerificationStatus'>;
    readonly submittedAt: Prisma.FieldRef<"VerificationRequest", 'DateTime'>;
    readonly reviewedAt: Prisma.FieldRef<"VerificationRequest", 'DateTime'>;
    readonly reviewedBy: Prisma.FieldRef<"VerificationRequest", 'String'>;
    readonly rejectionReason: Prisma.FieldRef<"VerificationRequest", 'String'>;
    readonly createdAt: Prisma.FieldRef<"VerificationRequest", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"VerificationRequest", 'DateTime'>;
}
export type VerificationRequestFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationRequestSelect<ExtArgs> | null;
    omit?: Prisma.VerificationRequestOmit<ExtArgs> | null;
    include?: Prisma.VerificationRequestInclude<ExtArgs> | null;
    where: Prisma.VerificationRequestWhereUniqueInput;
};
export type VerificationRequestFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationRequestSelect<ExtArgs> | null;
    omit?: Prisma.VerificationRequestOmit<ExtArgs> | null;
    include?: Prisma.VerificationRequestInclude<ExtArgs> | null;
    where: Prisma.VerificationRequestWhereUniqueInput;
};
export type VerificationRequestFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationRequestSelect<ExtArgs> | null;
    omit?: Prisma.VerificationRequestOmit<ExtArgs> | null;
    include?: Prisma.VerificationRequestInclude<ExtArgs> | null;
    where?: Prisma.VerificationRequestWhereInput;
    orderBy?: Prisma.VerificationRequestOrderByWithRelationInput | Prisma.VerificationRequestOrderByWithRelationInput[];
    cursor?: Prisma.VerificationRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VerificationRequestScalarFieldEnum | Prisma.VerificationRequestScalarFieldEnum[];
};
export type VerificationRequestFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationRequestSelect<ExtArgs> | null;
    omit?: Prisma.VerificationRequestOmit<ExtArgs> | null;
    include?: Prisma.VerificationRequestInclude<ExtArgs> | null;
    where?: Prisma.VerificationRequestWhereInput;
    orderBy?: Prisma.VerificationRequestOrderByWithRelationInput | Prisma.VerificationRequestOrderByWithRelationInput[];
    cursor?: Prisma.VerificationRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VerificationRequestScalarFieldEnum | Prisma.VerificationRequestScalarFieldEnum[];
};
export type VerificationRequestFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationRequestSelect<ExtArgs> | null;
    omit?: Prisma.VerificationRequestOmit<ExtArgs> | null;
    include?: Prisma.VerificationRequestInclude<ExtArgs> | null;
    where?: Prisma.VerificationRequestWhereInput;
    orderBy?: Prisma.VerificationRequestOrderByWithRelationInput | Prisma.VerificationRequestOrderByWithRelationInput[];
    cursor?: Prisma.VerificationRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VerificationRequestScalarFieldEnum | Prisma.VerificationRequestScalarFieldEnum[];
};
export type VerificationRequestCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationRequestSelect<ExtArgs> | null;
    omit?: Prisma.VerificationRequestOmit<ExtArgs> | null;
    include?: Prisma.VerificationRequestInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VerificationRequestCreateInput, Prisma.VerificationRequestUncheckedCreateInput>;
};
export type VerificationRequestCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.VerificationRequestCreateManyInput | Prisma.VerificationRequestCreateManyInput[];
    skipDuplicates?: boolean;
};
export type VerificationRequestCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationRequestSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.VerificationRequestOmit<ExtArgs> | null;
    data: Prisma.VerificationRequestCreateManyInput | Prisma.VerificationRequestCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.VerificationRequestIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type VerificationRequestUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationRequestSelect<ExtArgs> | null;
    omit?: Prisma.VerificationRequestOmit<ExtArgs> | null;
    include?: Prisma.VerificationRequestInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VerificationRequestUpdateInput, Prisma.VerificationRequestUncheckedUpdateInput>;
    where: Prisma.VerificationRequestWhereUniqueInput;
};
export type VerificationRequestUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.VerificationRequestUpdateManyMutationInput, Prisma.VerificationRequestUncheckedUpdateManyInput>;
    where?: Prisma.VerificationRequestWhereInput;
    limit?: number;
};
export type VerificationRequestUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationRequestSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.VerificationRequestOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VerificationRequestUpdateManyMutationInput, Prisma.VerificationRequestUncheckedUpdateManyInput>;
    where?: Prisma.VerificationRequestWhereInput;
    limit?: number;
    include?: Prisma.VerificationRequestIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type VerificationRequestUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationRequestSelect<ExtArgs> | null;
    omit?: Prisma.VerificationRequestOmit<ExtArgs> | null;
    include?: Prisma.VerificationRequestInclude<ExtArgs> | null;
    where: Prisma.VerificationRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.VerificationRequestCreateInput, Prisma.VerificationRequestUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.VerificationRequestUpdateInput, Prisma.VerificationRequestUncheckedUpdateInput>;
};
export type VerificationRequestDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationRequestSelect<ExtArgs> | null;
    omit?: Prisma.VerificationRequestOmit<ExtArgs> | null;
    include?: Prisma.VerificationRequestInclude<ExtArgs> | null;
    where: Prisma.VerificationRequestWhereUniqueInput;
};
export type VerificationRequestDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VerificationRequestWhereInput;
    limit?: number;
};
export type VerificationRequestDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationRequestSelect<ExtArgs> | null;
    omit?: Prisma.VerificationRequestOmit<ExtArgs> | null;
    include?: Prisma.VerificationRequestInclude<ExtArgs> | null;
};
export {};
