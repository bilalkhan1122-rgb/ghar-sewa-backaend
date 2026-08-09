import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
export type ConversationModel = runtime.Types.Result.DefaultSelection<Prisma.$ConversationPayload>;
export type AggregateConversation = {
    _count: ConversationCountAggregateOutputType | null;
    _min: ConversationMinAggregateOutputType | null;
    _max: ConversationMaxAggregateOutputType | null;
};
export type ConversationMinAggregateOutputType = {
    id: string | null;
    jobId: string | null;
    bookingId: string | null;
    customerId: string | null;
    providerId: string | null;
    lastMessage: string | null;
    lastMessageAt: Date | null;
    lastActivity: Date | null;
    customerDeletedAt: Date | null;
    providerDeletedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ConversationMaxAggregateOutputType = {
    id: string | null;
    jobId: string | null;
    bookingId: string | null;
    customerId: string | null;
    providerId: string | null;
    lastMessage: string | null;
    lastMessageAt: Date | null;
    lastActivity: Date | null;
    customerDeletedAt: Date | null;
    providerDeletedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ConversationCountAggregateOutputType = {
    id: number;
    jobId: number;
    bookingId: number;
    customerId: number;
    providerId: number;
    lastMessage: number;
    lastMessageAt: number;
    lastActivity: number;
    customerDeletedAt: number;
    providerDeletedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ConversationMinAggregateInputType = {
    id?: true;
    jobId?: true;
    bookingId?: true;
    customerId?: true;
    providerId?: true;
    lastMessage?: true;
    lastMessageAt?: true;
    lastActivity?: true;
    customerDeletedAt?: true;
    providerDeletedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ConversationMaxAggregateInputType = {
    id?: true;
    jobId?: true;
    bookingId?: true;
    customerId?: true;
    providerId?: true;
    lastMessage?: true;
    lastMessageAt?: true;
    lastActivity?: true;
    customerDeletedAt?: true;
    providerDeletedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ConversationCountAggregateInputType = {
    id?: true;
    jobId?: true;
    bookingId?: true;
    customerId?: true;
    providerId?: true;
    lastMessage?: true;
    lastMessageAt?: true;
    lastActivity?: true;
    customerDeletedAt?: true;
    providerDeletedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ConversationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConversationWhereInput;
    orderBy?: Prisma.ConversationOrderByWithRelationInput | Prisma.ConversationOrderByWithRelationInput[];
    cursor?: Prisma.ConversationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ConversationCountAggregateInputType;
    _min?: ConversationMinAggregateInputType;
    _max?: ConversationMaxAggregateInputType;
};
export type GetConversationAggregateType<T extends ConversationAggregateArgs> = {
    [P in keyof T & keyof AggregateConversation]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateConversation[P]> : Prisma.GetScalarType<T[P], AggregateConversation[P]>;
};
export type ConversationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConversationWhereInput;
    orderBy?: Prisma.ConversationOrderByWithAggregationInput | Prisma.ConversationOrderByWithAggregationInput[];
    by: Prisma.ConversationScalarFieldEnum[] | Prisma.ConversationScalarFieldEnum;
    having?: Prisma.ConversationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ConversationCountAggregateInputType | true;
    _min?: ConversationMinAggregateInputType;
    _max?: ConversationMaxAggregateInputType;
};
export type ConversationGroupByOutputType = {
    id: string;
    jobId: string;
    bookingId: string | null;
    customerId: string;
    providerId: string;
    lastMessage: string | null;
    lastMessageAt: Date | null;
    lastActivity: Date;
    customerDeletedAt: Date | null;
    providerDeletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: ConversationCountAggregateOutputType | null;
    _min: ConversationMinAggregateOutputType | null;
    _max: ConversationMaxAggregateOutputType | null;
};
type GetConversationGroupByPayload<T extends ConversationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ConversationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ConversationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ConversationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ConversationGroupByOutputType[P]>;
}>>;
export type ConversationWhereInput = {
    AND?: Prisma.ConversationWhereInput | Prisma.ConversationWhereInput[];
    OR?: Prisma.ConversationWhereInput[];
    NOT?: Prisma.ConversationWhereInput | Prisma.ConversationWhereInput[];
    id?: Prisma.StringFilter<"Conversation"> | string;
    jobId?: Prisma.StringFilter<"Conversation"> | string;
    bookingId?: Prisma.StringNullableFilter<"Conversation"> | string | null;
    customerId?: Prisma.StringFilter<"Conversation"> | string;
    providerId?: Prisma.StringFilter<"Conversation"> | string;
    lastMessage?: Prisma.StringNullableFilter<"Conversation"> | string | null;
    lastMessageAt?: Prisma.DateTimeNullableFilter<"Conversation"> | Date | string | null;
    lastActivity?: Prisma.DateTimeFilter<"Conversation"> | Date | string;
    customerDeletedAt?: Prisma.DateTimeNullableFilter<"Conversation"> | Date | string | null;
    providerDeletedAt?: Prisma.DateTimeNullableFilter<"Conversation"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Conversation"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Conversation"> | Date | string;
    job?: Prisma.XOR<Prisma.JobScalarRelationFilter, Prisma.JobWhereInput>;
    booking?: Prisma.XOR<Prisma.BookingNullableScalarRelationFilter, Prisma.BookingWhereInput> | null;
    customer?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    provider?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    messages?: Prisma.MessageListRelationFilter;
};
export type ConversationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrderInput | Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    lastMessage?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastMessageAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastActivity?: Prisma.SortOrder;
    customerDeletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    providerDeletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    job?: Prisma.JobOrderByWithRelationInput;
    booking?: Prisma.BookingOrderByWithRelationInput;
    customer?: Prisma.UserOrderByWithRelationInput;
    provider?: Prisma.UserOrderByWithRelationInput;
    messages?: Prisma.MessageOrderByRelationAggregateInput;
};
export type ConversationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    jobId_customerId_providerId?: Prisma.ConversationJobIdCustomerIdProviderIdCompoundUniqueInput;
    AND?: Prisma.ConversationWhereInput | Prisma.ConversationWhereInput[];
    OR?: Prisma.ConversationWhereInput[];
    NOT?: Prisma.ConversationWhereInput | Prisma.ConversationWhereInput[];
    jobId?: Prisma.StringFilter<"Conversation"> | string;
    bookingId?: Prisma.StringNullableFilter<"Conversation"> | string | null;
    customerId?: Prisma.StringFilter<"Conversation"> | string;
    providerId?: Prisma.StringFilter<"Conversation"> | string;
    lastMessage?: Prisma.StringNullableFilter<"Conversation"> | string | null;
    lastMessageAt?: Prisma.DateTimeNullableFilter<"Conversation"> | Date | string | null;
    lastActivity?: Prisma.DateTimeFilter<"Conversation"> | Date | string;
    customerDeletedAt?: Prisma.DateTimeNullableFilter<"Conversation"> | Date | string | null;
    providerDeletedAt?: Prisma.DateTimeNullableFilter<"Conversation"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Conversation"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Conversation"> | Date | string;
    job?: Prisma.XOR<Prisma.JobScalarRelationFilter, Prisma.JobWhereInput>;
    booking?: Prisma.XOR<Prisma.BookingNullableScalarRelationFilter, Prisma.BookingWhereInput> | null;
    customer?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    provider?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    messages?: Prisma.MessageListRelationFilter;
}, "id" | "jobId_customerId_providerId">;
export type ConversationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrderInput | Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    lastMessage?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastMessageAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastActivity?: Prisma.SortOrder;
    customerDeletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    providerDeletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ConversationCountOrderByAggregateInput;
    _max?: Prisma.ConversationMaxOrderByAggregateInput;
    _min?: Prisma.ConversationMinOrderByAggregateInput;
};
export type ConversationScalarWhereWithAggregatesInput = {
    AND?: Prisma.ConversationScalarWhereWithAggregatesInput | Prisma.ConversationScalarWhereWithAggregatesInput[];
    OR?: Prisma.ConversationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ConversationScalarWhereWithAggregatesInput | Prisma.ConversationScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Conversation"> | string;
    jobId?: Prisma.StringWithAggregatesFilter<"Conversation"> | string;
    bookingId?: Prisma.StringNullableWithAggregatesFilter<"Conversation"> | string | null;
    customerId?: Prisma.StringWithAggregatesFilter<"Conversation"> | string;
    providerId?: Prisma.StringWithAggregatesFilter<"Conversation"> | string;
    lastMessage?: Prisma.StringNullableWithAggregatesFilter<"Conversation"> | string | null;
    lastMessageAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Conversation"> | Date | string | null;
    lastActivity?: Prisma.DateTimeWithAggregatesFilter<"Conversation"> | Date | string;
    customerDeletedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Conversation"> | Date | string | null;
    providerDeletedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Conversation"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Conversation"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Conversation"> | Date | string;
};
export type ConversationCreateInput = {
    id?: string;
    lastMessage?: string | null;
    lastMessageAt?: Date | string | null;
    lastActivity?: Date | string;
    customerDeletedAt?: Date | string | null;
    providerDeletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    job: Prisma.JobCreateNestedOneWithoutConversationsInput;
    booking?: Prisma.BookingCreateNestedOneWithoutConversationsInput;
    customer: Prisma.UserCreateNestedOneWithoutCustomerConversationsInput;
    provider: Prisma.UserCreateNestedOneWithoutProviderConversationsInput;
    messages?: Prisma.MessageCreateNestedManyWithoutConversationInput;
};
export type ConversationUncheckedCreateInput = {
    id?: string;
    jobId: string;
    bookingId?: string | null;
    customerId: string;
    providerId: string;
    lastMessage?: string | null;
    lastMessageAt?: Date | string | null;
    lastActivity?: Date | string;
    customerDeletedAt?: Date | string | null;
    providerDeletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    messages?: Prisma.MessageUncheckedCreateNestedManyWithoutConversationInput;
};
export type ConversationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastActivity?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    providerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneRequiredWithoutConversationsNestedInput;
    booking?: Prisma.BookingUpdateOneWithoutConversationsNestedInput;
    customer?: Prisma.UserUpdateOneRequiredWithoutCustomerConversationsNestedInput;
    provider?: Prisma.UserUpdateOneRequiredWithoutProviderConversationsNestedInput;
    messages?: Prisma.MessageUpdateManyWithoutConversationNestedInput;
};
export type ConversationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastActivity?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    providerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: Prisma.MessageUncheckedUpdateManyWithoutConversationNestedInput;
};
export type ConversationCreateManyInput = {
    id?: string;
    jobId: string;
    bookingId?: string | null;
    customerId: string;
    providerId: string;
    lastMessage?: string | null;
    lastMessageAt?: Date | string | null;
    lastActivity?: Date | string;
    customerDeletedAt?: Date | string | null;
    providerDeletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConversationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastActivity?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    providerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConversationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastActivity?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    providerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConversationListRelationFilter = {
    every?: Prisma.ConversationWhereInput;
    some?: Prisma.ConversationWhereInput;
    none?: Prisma.ConversationWhereInput;
};
export type ConversationOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ConversationJobIdCustomerIdProviderIdCompoundUniqueInput = {
    jobId: string;
    customerId: string;
    providerId: string;
};
export type ConversationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    lastMessage?: Prisma.SortOrder;
    lastMessageAt?: Prisma.SortOrder;
    lastActivity?: Prisma.SortOrder;
    customerDeletedAt?: Prisma.SortOrder;
    providerDeletedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ConversationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    lastMessage?: Prisma.SortOrder;
    lastMessageAt?: Prisma.SortOrder;
    lastActivity?: Prisma.SortOrder;
    customerDeletedAt?: Prisma.SortOrder;
    providerDeletedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ConversationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    lastMessage?: Prisma.SortOrder;
    lastMessageAt?: Prisma.SortOrder;
    lastActivity?: Prisma.SortOrder;
    customerDeletedAt?: Prisma.SortOrder;
    providerDeletedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ConversationScalarRelationFilter = {
    is?: Prisma.ConversationWhereInput;
    isNot?: Prisma.ConversationWhereInput;
};
export type ConversationCreateNestedManyWithoutCustomerInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutCustomerInput, Prisma.ConversationUncheckedCreateWithoutCustomerInput> | Prisma.ConversationCreateWithoutCustomerInput[] | Prisma.ConversationUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutCustomerInput | Prisma.ConversationCreateOrConnectWithoutCustomerInput[];
    createMany?: Prisma.ConversationCreateManyCustomerInputEnvelope;
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
};
export type ConversationCreateNestedManyWithoutProviderInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutProviderInput, Prisma.ConversationUncheckedCreateWithoutProviderInput> | Prisma.ConversationCreateWithoutProviderInput[] | Prisma.ConversationUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutProviderInput | Prisma.ConversationCreateOrConnectWithoutProviderInput[];
    createMany?: Prisma.ConversationCreateManyProviderInputEnvelope;
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
};
export type ConversationUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutCustomerInput, Prisma.ConversationUncheckedCreateWithoutCustomerInput> | Prisma.ConversationCreateWithoutCustomerInput[] | Prisma.ConversationUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutCustomerInput | Prisma.ConversationCreateOrConnectWithoutCustomerInput[];
    createMany?: Prisma.ConversationCreateManyCustomerInputEnvelope;
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
};
export type ConversationUncheckedCreateNestedManyWithoutProviderInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutProviderInput, Prisma.ConversationUncheckedCreateWithoutProviderInput> | Prisma.ConversationCreateWithoutProviderInput[] | Prisma.ConversationUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutProviderInput | Prisma.ConversationCreateOrConnectWithoutProviderInput[];
    createMany?: Prisma.ConversationCreateManyProviderInputEnvelope;
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
};
export type ConversationUpdateManyWithoutCustomerNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutCustomerInput, Prisma.ConversationUncheckedCreateWithoutCustomerInput> | Prisma.ConversationCreateWithoutCustomerInput[] | Prisma.ConversationUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutCustomerInput | Prisma.ConversationCreateOrConnectWithoutCustomerInput[];
    upsert?: Prisma.ConversationUpsertWithWhereUniqueWithoutCustomerInput | Prisma.ConversationUpsertWithWhereUniqueWithoutCustomerInput[];
    createMany?: Prisma.ConversationCreateManyCustomerInputEnvelope;
    set?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    disconnect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    delete?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    update?: Prisma.ConversationUpdateWithWhereUniqueWithoutCustomerInput | Prisma.ConversationUpdateWithWhereUniqueWithoutCustomerInput[];
    updateMany?: Prisma.ConversationUpdateManyWithWhereWithoutCustomerInput | Prisma.ConversationUpdateManyWithWhereWithoutCustomerInput[];
    deleteMany?: Prisma.ConversationScalarWhereInput | Prisma.ConversationScalarWhereInput[];
};
export type ConversationUpdateManyWithoutProviderNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutProviderInput, Prisma.ConversationUncheckedCreateWithoutProviderInput> | Prisma.ConversationCreateWithoutProviderInput[] | Prisma.ConversationUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutProviderInput | Prisma.ConversationCreateOrConnectWithoutProviderInput[];
    upsert?: Prisma.ConversationUpsertWithWhereUniqueWithoutProviderInput | Prisma.ConversationUpsertWithWhereUniqueWithoutProviderInput[];
    createMany?: Prisma.ConversationCreateManyProviderInputEnvelope;
    set?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    disconnect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    delete?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    update?: Prisma.ConversationUpdateWithWhereUniqueWithoutProviderInput | Prisma.ConversationUpdateWithWhereUniqueWithoutProviderInput[];
    updateMany?: Prisma.ConversationUpdateManyWithWhereWithoutProviderInput | Prisma.ConversationUpdateManyWithWhereWithoutProviderInput[];
    deleteMany?: Prisma.ConversationScalarWhereInput | Prisma.ConversationScalarWhereInput[];
};
export type ConversationUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutCustomerInput, Prisma.ConversationUncheckedCreateWithoutCustomerInput> | Prisma.ConversationCreateWithoutCustomerInput[] | Prisma.ConversationUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutCustomerInput | Prisma.ConversationCreateOrConnectWithoutCustomerInput[];
    upsert?: Prisma.ConversationUpsertWithWhereUniqueWithoutCustomerInput | Prisma.ConversationUpsertWithWhereUniqueWithoutCustomerInput[];
    createMany?: Prisma.ConversationCreateManyCustomerInputEnvelope;
    set?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    disconnect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    delete?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    update?: Prisma.ConversationUpdateWithWhereUniqueWithoutCustomerInput | Prisma.ConversationUpdateWithWhereUniqueWithoutCustomerInput[];
    updateMany?: Prisma.ConversationUpdateManyWithWhereWithoutCustomerInput | Prisma.ConversationUpdateManyWithWhereWithoutCustomerInput[];
    deleteMany?: Prisma.ConversationScalarWhereInput | Prisma.ConversationScalarWhereInput[];
};
export type ConversationUncheckedUpdateManyWithoutProviderNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutProviderInput, Prisma.ConversationUncheckedCreateWithoutProviderInput> | Prisma.ConversationCreateWithoutProviderInput[] | Prisma.ConversationUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutProviderInput | Prisma.ConversationCreateOrConnectWithoutProviderInput[];
    upsert?: Prisma.ConversationUpsertWithWhereUniqueWithoutProviderInput | Prisma.ConversationUpsertWithWhereUniqueWithoutProviderInput[];
    createMany?: Prisma.ConversationCreateManyProviderInputEnvelope;
    set?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    disconnect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    delete?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    update?: Prisma.ConversationUpdateWithWhereUniqueWithoutProviderInput | Prisma.ConversationUpdateWithWhereUniqueWithoutProviderInput[];
    updateMany?: Prisma.ConversationUpdateManyWithWhereWithoutProviderInput | Prisma.ConversationUpdateManyWithWhereWithoutProviderInput[];
    deleteMany?: Prisma.ConversationScalarWhereInput | Prisma.ConversationScalarWhereInput[];
};
export type ConversationCreateNestedManyWithoutBookingInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutBookingInput, Prisma.ConversationUncheckedCreateWithoutBookingInput> | Prisma.ConversationCreateWithoutBookingInput[] | Prisma.ConversationUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutBookingInput | Prisma.ConversationCreateOrConnectWithoutBookingInput[];
    createMany?: Prisma.ConversationCreateManyBookingInputEnvelope;
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
};
export type ConversationUncheckedCreateNestedManyWithoutBookingInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutBookingInput, Prisma.ConversationUncheckedCreateWithoutBookingInput> | Prisma.ConversationCreateWithoutBookingInput[] | Prisma.ConversationUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutBookingInput | Prisma.ConversationCreateOrConnectWithoutBookingInput[];
    createMany?: Prisma.ConversationCreateManyBookingInputEnvelope;
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
};
export type ConversationUpdateManyWithoutBookingNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutBookingInput, Prisma.ConversationUncheckedCreateWithoutBookingInput> | Prisma.ConversationCreateWithoutBookingInput[] | Prisma.ConversationUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutBookingInput | Prisma.ConversationCreateOrConnectWithoutBookingInput[];
    upsert?: Prisma.ConversationUpsertWithWhereUniqueWithoutBookingInput | Prisma.ConversationUpsertWithWhereUniqueWithoutBookingInput[];
    createMany?: Prisma.ConversationCreateManyBookingInputEnvelope;
    set?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    disconnect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    delete?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    update?: Prisma.ConversationUpdateWithWhereUniqueWithoutBookingInput | Prisma.ConversationUpdateWithWhereUniqueWithoutBookingInput[];
    updateMany?: Prisma.ConversationUpdateManyWithWhereWithoutBookingInput | Prisma.ConversationUpdateManyWithWhereWithoutBookingInput[];
    deleteMany?: Prisma.ConversationScalarWhereInput | Prisma.ConversationScalarWhereInput[];
};
export type ConversationUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutBookingInput, Prisma.ConversationUncheckedCreateWithoutBookingInput> | Prisma.ConversationCreateWithoutBookingInput[] | Prisma.ConversationUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutBookingInput | Prisma.ConversationCreateOrConnectWithoutBookingInput[];
    upsert?: Prisma.ConversationUpsertWithWhereUniqueWithoutBookingInput | Prisma.ConversationUpsertWithWhereUniqueWithoutBookingInput[];
    createMany?: Prisma.ConversationCreateManyBookingInputEnvelope;
    set?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    disconnect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    delete?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    update?: Prisma.ConversationUpdateWithWhereUniqueWithoutBookingInput | Prisma.ConversationUpdateWithWhereUniqueWithoutBookingInput[];
    updateMany?: Prisma.ConversationUpdateManyWithWhereWithoutBookingInput | Prisma.ConversationUpdateManyWithWhereWithoutBookingInput[];
    deleteMany?: Prisma.ConversationScalarWhereInput | Prisma.ConversationScalarWhereInput[];
};
export type ConversationCreateNestedManyWithoutJobInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutJobInput, Prisma.ConversationUncheckedCreateWithoutJobInput> | Prisma.ConversationCreateWithoutJobInput[] | Prisma.ConversationUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutJobInput | Prisma.ConversationCreateOrConnectWithoutJobInput[];
    createMany?: Prisma.ConversationCreateManyJobInputEnvelope;
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
};
export type ConversationUncheckedCreateNestedManyWithoutJobInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutJobInput, Prisma.ConversationUncheckedCreateWithoutJobInput> | Prisma.ConversationCreateWithoutJobInput[] | Prisma.ConversationUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutJobInput | Prisma.ConversationCreateOrConnectWithoutJobInput[];
    createMany?: Prisma.ConversationCreateManyJobInputEnvelope;
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
};
export type ConversationUpdateManyWithoutJobNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutJobInput, Prisma.ConversationUncheckedCreateWithoutJobInput> | Prisma.ConversationCreateWithoutJobInput[] | Prisma.ConversationUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutJobInput | Prisma.ConversationCreateOrConnectWithoutJobInput[];
    upsert?: Prisma.ConversationUpsertWithWhereUniqueWithoutJobInput | Prisma.ConversationUpsertWithWhereUniqueWithoutJobInput[];
    createMany?: Prisma.ConversationCreateManyJobInputEnvelope;
    set?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    disconnect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    delete?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    update?: Prisma.ConversationUpdateWithWhereUniqueWithoutJobInput | Prisma.ConversationUpdateWithWhereUniqueWithoutJobInput[];
    updateMany?: Prisma.ConversationUpdateManyWithWhereWithoutJobInput | Prisma.ConversationUpdateManyWithWhereWithoutJobInput[];
    deleteMany?: Prisma.ConversationScalarWhereInput | Prisma.ConversationScalarWhereInput[];
};
export type ConversationUncheckedUpdateManyWithoutJobNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutJobInput, Prisma.ConversationUncheckedCreateWithoutJobInput> | Prisma.ConversationCreateWithoutJobInput[] | Prisma.ConversationUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutJobInput | Prisma.ConversationCreateOrConnectWithoutJobInput[];
    upsert?: Prisma.ConversationUpsertWithWhereUniqueWithoutJobInput | Prisma.ConversationUpsertWithWhereUniqueWithoutJobInput[];
    createMany?: Prisma.ConversationCreateManyJobInputEnvelope;
    set?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    disconnect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    delete?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    update?: Prisma.ConversationUpdateWithWhereUniqueWithoutJobInput | Prisma.ConversationUpdateWithWhereUniqueWithoutJobInput[];
    updateMany?: Prisma.ConversationUpdateManyWithWhereWithoutJobInput | Prisma.ConversationUpdateManyWithWhereWithoutJobInput[];
    deleteMany?: Prisma.ConversationScalarWhereInput | Prisma.ConversationScalarWhereInput[];
};
export type ConversationCreateNestedOneWithoutMessagesInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutMessagesInput, Prisma.ConversationUncheckedCreateWithoutMessagesInput>;
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutMessagesInput;
    connect?: Prisma.ConversationWhereUniqueInput;
};
export type ConversationUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutMessagesInput, Prisma.ConversationUncheckedCreateWithoutMessagesInput>;
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutMessagesInput;
    upsert?: Prisma.ConversationUpsertWithoutMessagesInput;
    connect?: Prisma.ConversationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ConversationUpdateToOneWithWhereWithoutMessagesInput, Prisma.ConversationUpdateWithoutMessagesInput>, Prisma.ConversationUncheckedUpdateWithoutMessagesInput>;
};
export type ConversationCreateWithoutCustomerInput = {
    id?: string;
    lastMessage?: string | null;
    lastMessageAt?: Date | string | null;
    lastActivity?: Date | string;
    customerDeletedAt?: Date | string | null;
    providerDeletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    job: Prisma.JobCreateNestedOneWithoutConversationsInput;
    booking?: Prisma.BookingCreateNestedOneWithoutConversationsInput;
    provider: Prisma.UserCreateNestedOneWithoutProviderConversationsInput;
    messages?: Prisma.MessageCreateNestedManyWithoutConversationInput;
};
export type ConversationUncheckedCreateWithoutCustomerInput = {
    id?: string;
    jobId: string;
    bookingId?: string | null;
    providerId: string;
    lastMessage?: string | null;
    lastMessageAt?: Date | string | null;
    lastActivity?: Date | string;
    customerDeletedAt?: Date | string | null;
    providerDeletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    messages?: Prisma.MessageUncheckedCreateNestedManyWithoutConversationInput;
};
export type ConversationCreateOrConnectWithoutCustomerInput = {
    where: Prisma.ConversationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutCustomerInput, Prisma.ConversationUncheckedCreateWithoutCustomerInput>;
};
export type ConversationCreateManyCustomerInputEnvelope = {
    data: Prisma.ConversationCreateManyCustomerInput | Prisma.ConversationCreateManyCustomerInput[];
    skipDuplicates?: boolean;
};
export type ConversationCreateWithoutProviderInput = {
    id?: string;
    lastMessage?: string | null;
    lastMessageAt?: Date | string | null;
    lastActivity?: Date | string;
    customerDeletedAt?: Date | string | null;
    providerDeletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    job: Prisma.JobCreateNestedOneWithoutConversationsInput;
    booking?: Prisma.BookingCreateNestedOneWithoutConversationsInput;
    customer: Prisma.UserCreateNestedOneWithoutCustomerConversationsInput;
    messages?: Prisma.MessageCreateNestedManyWithoutConversationInput;
};
export type ConversationUncheckedCreateWithoutProviderInput = {
    id?: string;
    jobId: string;
    bookingId?: string | null;
    customerId: string;
    lastMessage?: string | null;
    lastMessageAt?: Date | string | null;
    lastActivity?: Date | string;
    customerDeletedAt?: Date | string | null;
    providerDeletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    messages?: Prisma.MessageUncheckedCreateNestedManyWithoutConversationInput;
};
export type ConversationCreateOrConnectWithoutProviderInput = {
    where: Prisma.ConversationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutProviderInput, Prisma.ConversationUncheckedCreateWithoutProviderInput>;
};
export type ConversationCreateManyProviderInputEnvelope = {
    data: Prisma.ConversationCreateManyProviderInput | Prisma.ConversationCreateManyProviderInput[];
    skipDuplicates?: boolean;
};
export type ConversationUpsertWithWhereUniqueWithoutCustomerInput = {
    where: Prisma.ConversationWhereUniqueInput;
    update: Prisma.XOR<Prisma.ConversationUpdateWithoutCustomerInput, Prisma.ConversationUncheckedUpdateWithoutCustomerInput>;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutCustomerInput, Prisma.ConversationUncheckedCreateWithoutCustomerInput>;
};
export type ConversationUpdateWithWhereUniqueWithoutCustomerInput = {
    where: Prisma.ConversationWhereUniqueInput;
    data: Prisma.XOR<Prisma.ConversationUpdateWithoutCustomerInput, Prisma.ConversationUncheckedUpdateWithoutCustomerInput>;
};
export type ConversationUpdateManyWithWhereWithoutCustomerInput = {
    where: Prisma.ConversationScalarWhereInput;
    data: Prisma.XOR<Prisma.ConversationUpdateManyMutationInput, Prisma.ConversationUncheckedUpdateManyWithoutCustomerInput>;
};
export type ConversationScalarWhereInput = {
    AND?: Prisma.ConversationScalarWhereInput | Prisma.ConversationScalarWhereInput[];
    OR?: Prisma.ConversationScalarWhereInput[];
    NOT?: Prisma.ConversationScalarWhereInput | Prisma.ConversationScalarWhereInput[];
    id?: Prisma.StringFilter<"Conversation"> | string;
    jobId?: Prisma.StringFilter<"Conversation"> | string;
    bookingId?: Prisma.StringNullableFilter<"Conversation"> | string | null;
    customerId?: Prisma.StringFilter<"Conversation"> | string;
    providerId?: Prisma.StringFilter<"Conversation"> | string;
    lastMessage?: Prisma.StringNullableFilter<"Conversation"> | string | null;
    lastMessageAt?: Prisma.DateTimeNullableFilter<"Conversation"> | Date | string | null;
    lastActivity?: Prisma.DateTimeFilter<"Conversation"> | Date | string;
    customerDeletedAt?: Prisma.DateTimeNullableFilter<"Conversation"> | Date | string | null;
    providerDeletedAt?: Prisma.DateTimeNullableFilter<"Conversation"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Conversation"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Conversation"> | Date | string;
};
export type ConversationUpsertWithWhereUniqueWithoutProviderInput = {
    where: Prisma.ConversationWhereUniqueInput;
    update: Prisma.XOR<Prisma.ConversationUpdateWithoutProviderInput, Prisma.ConversationUncheckedUpdateWithoutProviderInput>;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutProviderInput, Prisma.ConversationUncheckedCreateWithoutProviderInput>;
};
export type ConversationUpdateWithWhereUniqueWithoutProviderInput = {
    where: Prisma.ConversationWhereUniqueInput;
    data: Prisma.XOR<Prisma.ConversationUpdateWithoutProviderInput, Prisma.ConversationUncheckedUpdateWithoutProviderInput>;
};
export type ConversationUpdateManyWithWhereWithoutProviderInput = {
    where: Prisma.ConversationScalarWhereInput;
    data: Prisma.XOR<Prisma.ConversationUpdateManyMutationInput, Prisma.ConversationUncheckedUpdateManyWithoutProviderInput>;
};
export type ConversationCreateWithoutBookingInput = {
    id?: string;
    lastMessage?: string | null;
    lastMessageAt?: Date | string | null;
    lastActivity?: Date | string;
    customerDeletedAt?: Date | string | null;
    providerDeletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    job: Prisma.JobCreateNestedOneWithoutConversationsInput;
    customer: Prisma.UserCreateNestedOneWithoutCustomerConversationsInput;
    provider: Prisma.UserCreateNestedOneWithoutProviderConversationsInput;
    messages?: Prisma.MessageCreateNestedManyWithoutConversationInput;
};
export type ConversationUncheckedCreateWithoutBookingInput = {
    id?: string;
    jobId: string;
    customerId: string;
    providerId: string;
    lastMessage?: string | null;
    lastMessageAt?: Date | string | null;
    lastActivity?: Date | string;
    customerDeletedAt?: Date | string | null;
    providerDeletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    messages?: Prisma.MessageUncheckedCreateNestedManyWithoutConversationInput;
};
export type ConversationCreateOrConnectWithoutBookingInput = {
    where: Prisma.ConversationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutBookingInput, Prisma.ConversationUncheckedCreateWithoutBookingInput>;
};
export type ConversationCreateManyBookingInputEnvelope = {
    data: Prisma.ConversationCreateManyBookingInput | Prisma.ConversationCreateManyBookingInput[];
    skipDuplicates?: boolean;
};
export type ConversationUpsertWithWhereUniqueWithoutBookingInput = {
    where: Prisma.ConversationWhereUniqueInput;
    update: Prisma.XOR<Prisma.ConversationUpdateWithoutBookingInput, Prisma.ConversationUncheckedUpdateWithoutBookingInput>;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutBookingInput, Prisma.ConversationUncheckedCreateWithoutBookingInput>;
};
export type ConversationUpdateWithWhereUniqueWithoutBookingInput = {
    where: Prisma.ConversationWhereUniqueInput;
    data: Prisma.XOR<Prisma.ConversationUpdateWithoutBookingInput, Prisma.ConversationUncheckedUpdateWithoutBookingInput>;
};
export type ConversationUpdateManyWithWhereWithoutBookingInput = {
    where: Prisma.ConversationScalarWhereInput;
    data: Prisma.XOR<Prisma.ConversationUpdateManyMutationInput, Prisma.ConversationUncheckedUpdateManyWithoutBookingInput>;
};
export type ConversationCreateWithoutJobInput = {
    id?: string;
    lastMessage?: string | null;
    lastMessageAt?: Date | string | null;
    lastActivity?: Date | string;
    customerDeletedAt?: Date | string | null;
    providerDeletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    booking?: Prisma.BookingCreateNestedOneWithoutConversationsInput;
    customer: Prisma.UserCreateNestedOneWithoutCustomerConversationsInput;
    provider: Prisma.UserCreateNestedOneWithoutProviderConversationsInput;
    messages?: Prisma.MessageCreateNestedManyWithoutConversationInput;
};
export type ConversationUncheckedCreateWithoutJobInput = {
    id?: string;
    bookingId?: string | null;
    customerId: string;
    providerId: string;
    lastMessage?: string | null;
    lastMessageAt?: Date | string | null;
    lastActivity?: Date | string;
    customerDeletedAt?: Date | string | null;
    providerDeletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    messages?: Prisma.MessageUncheckedCreateNestedManyWithoutConversationInput;
};
export type ConversationCreateOrConnectWithoutJobInput = {
    where: Prisma.ConversationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutJobInput, Prisma.ConversationUncheckedCreateWithoutJobInput>;
};
export type ConversationCreateManyJobInputEnvelope = {
    data: Prisma.ConversationCreateManyJobInput | Prisma.ConversationCreateManyJobInput[];
    skipDuplicates?: boolean;
};
export type ConversationUpsertWithWhereUniqueWithoutJobInput = {
    where: Prisma.ConversationWhereUniqueInput;
    update: Prisma.XOR<Prisma.ConversationUpdateWithoutJobInput, Prisma.ConversationUncheckedUpdateWithoutJobInput>;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutJobInput, Prisma.ConversationUncheckedCreateWithoutJobInput>;
};
export type ConversationUpdateWithWhereUniqueWithoutJobInput = {
    where: Prisma.ConversationWhereUniqueInput;
    data: Prisma.XOR<Prisma.ConversationUpdateWithoutJobInput, Prisma.ConversationUncheckedUpdateWithoutJobInput>;
};
export type ConversationUpdateManyWithWhereWithoutJobInput = {
    where: Prisma.ConversationScalarWhereInput;
    data: Prisma.XOR<Prisma.ConversationUpdateManyMutationInput, Prisma.ConversationUncheckedUpdateManyWithoutJobInput>;
};
export type ConversationCreateWithoutMessagesInput = {
    id?: string;
    lastMessage?: string | null;
    lastMessageAt?: Date | string | null;
    lastActivity?: Date | string;
    customerDeletedAt?: Date | string | null;
    providerDeletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    job: Prisma.JobCreateNestedOneWithoutConversationsInput;
    booking?: Prisma.BookingCreateNestedOneWithoutConversationsInput;
    customer: Prisma.UserCreateNestedOneWithoutCustomerConversationsInput;
    provider: Prisma.UserCreateNestedOneWithoutProviderConversationsInput;
};
export type ConversationUncheckedCreateWithoutMessagesInput = {
    id?: string;
    jobId: string;
    bookingId?: string | null;
    customerId: string;
    providerId: string;
    lastMessage?: string | null;
    lastMessageAt?: Date | string | null;
    lastActivity?: Date | string;
    customerDeletedAt?: Date | string | null;
    providerDeletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConversationCreateOrConnectWithoutMessagesInput = {
    where: Prisma.ConversationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutMessagesInput, Prisma.ConversationUncheckedCreateWithoutMessagesInput>;
};
export type ConversationUpsertWithoutMessagesInput = {
    update: Prisma.XOR<Prisma.ConversationUpdateWithoutMessagesInput, Prisma.ConversationUncheckedUpdateWithoutMessagesInput>;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutMessagesInput, Prisma.ConversationUncheckedCreateWithoutMessagesInput>;
    where?: Prisma.ConversationWhereInput;
};
export type ConversationUpdateToOneWithWhereWithoutMessagesInput = {
    where?: Prisma.ConversationWhereInput;
    data: Prisma.XOR<Prisma.ConversationUpdateWithoutMessagesInput, Prisma.ConversationUncheckedUpdateWithoutMessagesInput>;
};
export type ConversationUpdateWithoutMessagesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastActivity?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    providerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneRequiredWithoutConversationsNestedInput;
    booking?: Prisma.BookingUpdateOneWithoutConversationsNestedInput;
    customer?: Prisma.UserUpdateOneRequiredWithoutCustomerConversationsNestedInput;
    provider?: Prisma.UserUpdateOneRequiredWithoutProviderConversationsNestedInput;
};
export type ConversationUncheckedUpdateWithoutMessagesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastActivity?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    providerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConversationCreateManyCustomerInput = {
    id?: string;
    jobId: string;
    bookingId?: string | null;
    providerId: string;
    lastMessage?: string | null;
    lastMessageAt?: Date | string | null;
    lastActivity?: Date | string;
    customerDeletedAt?: Date | string | null;
    providerDeletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConversationCreateManyProviderInput = {
    id?: string;
    jobId: string;
    bookingId?: string | null;
    customerId: string;
    lastMessage?: string | null;
    lastMessageAt?: Date | string | null;
    lastActivity?: Date | string;
    customerDeletedAt?: Date | string | null;
    providerDeletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConversationUpdateWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastActivity?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    providerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneRequiredWithoutConversationsNestedInput;
    booking?: Prisma.BookingUpdateOneWithoutConversationsNestedInput;
    provider?: Prisma.UserUpdateOneRequiredWithoutProviderConversationsNestedInput;
    messages?: Prisma.MessageUpdateManyWithoutConversationNestedInput;
};
export type ConversationUncheckedUpdateWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastActivity?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    providerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: Prisma.MessageUncheckedUpdateManyWithoutConversationNestedInput;
};
export type ConversationUncheckedUpdateManyWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastActivity?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    providerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConversationUpdateWithoutProviderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastActivity?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    providerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneRequiredWithoutConversationsNestedInput;
    booking?: Prisma.BookingUpdateOneWithoutConversationsNestedInput;
    customer?: Prisma.UserUpdateOneRequiredWithoutCustomerConversationsNestedInput;
    messages?: Prisma.MessageUpdateManyWithoutConversationNestedInput;
};
export type ConversationUncheckedUpdateWithoutProviderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastActivity?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    providerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: Prisma.MessageUncheckedUpdateManyWithoutConversationNestedInput;
};
export type ConversationUncheckedUpdateManyWithoutProviderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastActivity?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    providerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConversationCreateManyBookingInput = {
    id?: string;
    jobId: string;
    customerId: string;
    providerId: string;
    lastMessage?: string | null;
    lastMessageAt?: Date | string | null;
    lastActivity?: Date | string;
    customerDeletedAt?: Date | string | null;
    providerDeletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConversationUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastActivity?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    providerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneRequiredWithoutConversationsNestedInput;
    customer?: Prisma.UserUpdateOneRequiredWithoutCustomerConversationsNestedInput;
    provider?: Prisma.UserUpdateOneRequiredWithoutProviderConversationsNestedInput;
    messages?: Prisma.MessageUpdateManyWithoutConversationNestedInput;
};
export type ConversationUncheckedUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastActivity?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    providerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: Prisma.MessageUncheckedUpdateManyWithoutConversationNestedInput;
};
export type ConversationUncheckedUpdateManyWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastActivity?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    providerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConversationCreateManyJobInput = {
    id?: string;
    bookingId?: string | null;
    customerId: string;
    providerId: string;
    lastMessage?: string | null;
    lastMessageAt?: Date | string | null;
    lastActivity?: Date | string;
    customerDeletedAt?: Date | string | null;
    providerDeletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConversationUpdateWithoutJobInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastActivity?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    providerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    booking?: Prisma.BookingUpdateOneWithoutConversationsNestedInput;
    customer?: Prisma.UserUpdateOneRequiredWithoutCustomerConversationsNestedInput;
    provider?: Prisma.UserUpdateOneRequiredWithoutProviderConversationsNestedInput;
    messages?: Prisma.MessageUpdateManyWithoutConversationNestedInput;
};
export type ConversationUncheckedUpdateWithoutJobInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastActivity?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    providerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: Prisma.MessageUncheckedUpdateManyWithoutConversationNestedInput;
};
export type ConversationUncheckedUpdateManyWithoutJobInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastActivity?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    providerDeletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConversationCountOutputType = {
    messages: number;
};
export type ConversationCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    messages?: boolean | ConversationCountOutputTypeCountMessagesArgs;
};
export type ConversationCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationCountOutputTypeSelect<ExtArgs> | null;
};
export type ConversationCountOutputTypeCountMessagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MessageWhereInput;
};
export type ConversationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    jobId?: boolean;
    bookingId?: boolean;
    customerId?: boolean;
    providerId?: boolean;
    lastMessage?: boolean;
    lastMessageAt?: boolean;
    lastActivity?: boolean;
    customerDeletedAt?: boolean;
    providerDeletedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    booking?: boolean | Prisma.Conversation$bookingArgs<ExtArgs>;
    customer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    messages?: boolean | Prisma.Conversation$messagesArgs<ExtArgs>;
    _count?: boolean | Prisma.ConversationCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["conversation"]>;
export type ConversationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    jobId?: boolean;
    bookingId?: boolean;
    customerId?: boolean;
    providerId?: boolean;
    lastMessage?: boolean;
    lastMessageAt?: boolean;
    lastActivity?: boolean;
    customerDeletedAt?: boolean;
    providerDeletedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    booking?: boolean | Prisma.Conversation$bookingArgs<ExtArgs>;
    customer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["conversation"]>;
export type ConversationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    jobId?: boolean;
    bookingId?: boolean;
    customerId?: boolean;
    providerId?: boolean;
    lastMessage?: boolean;
    lastMessageAt?: boolean;
    lastActivity?: boolean;
    customerDeletedAt?: boolean;
    providerDeletedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    booking?: boolean | Prisma.Conversation$bookingArgs<ExtArgs>;
    customer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["conversation"]>;
export type ConversationSelectScalar = {
    id?: boolean;
    jobId?: boolean;
    bookingId?: boolean;
    customerId?: boolean;
    providerId?: boolean;
    lastMessage?: boolean;
    lastMessageAt?: boolean;
    lastActivity?: boolean;
    customerDeletedAt?: boolean;
    providerDeletedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ConversationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "jobId" | "bookingId" | "customerId" | "providerId" | "lastMessage" | "lastMessageAt" | "lastActivity" | "customerDeletedAt" | "providerDeletedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["conversation"]>;
export type ConversationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    booking?: boolean | Prisma.Conversation$bookingArgs<ExtArgs>;
    customer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    messages?: boolean | Prisma.Conversation$messagesArgs<ExtArgs>;
    _count?: boolean | Prisma.ConversationCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ConversationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    booking?: boolean | Prisma.Conversation$bookingArgs<ExtArgs>;
    customer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ConversationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
    booking?: boolean | Prisma.Conversation$bookingArgs<ExtArgs>;
    customer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $ConversationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Conversation";
    objects: {
        job: Prisma.$JobPayload<ExtArgs>;
        booking: Prisma.$BookingPayload<ExtArgs> | null;
        customer: Prisma.$UserPayload<ExtArgs>;
        provider: Prisma.$UserPayload<ExtArgs>;
        messages: Prisma.$MessagePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        jobId: string;
        bookingId: string | null;
        customerId: string;
        providerId: string;
        lastMessage: string | null;
        lastMessageAt: Date | null;
        lastActivity: Date;
        customerDeletedAt: Date | null;
        providerDeletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["conversation"]>;
    composites: {};
};
export type ConversationGetPayload<S extends boolean | null | undefined | ConversationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ConversationPayload, S>;
export type ConversationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ConversationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ConversationCountAggregateInputType | true;
};
export interface ConversationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Conversation'];
        meta: {
            name: 'Conversation';
        };
    };
    findUnique<T extends ConversationFindUniqueArgs>(args: Prisma.SelectSubset<T, ConversationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ConversationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ConversationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ConversationFindFirstArgs>(args?: Prisma.SelectSubset<T, ConversationFindFirstArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ConversationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ConversationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ConversationFindManyArgs>(args?: Prisma.SelectSubset<T, ConversationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ConversationCreateArgs>(args: Prisma.SelectSubset<T, ConversationCreateArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ConversationCreateManyArgs>(args?: Prisma.SelectSubset<T, ConversationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ConversationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ConversationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ConversationDeleteArgs>(args: Prisma.SelectSubset<T, ConversationDeleteArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ConversationUpdateArgs>(args: Prisma.SelectSubset<T, ConversationUpdateArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ConversationDeleteManyArgs>(args?: Prisma.SelectSubset<T, ConversationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ConversationUpdateManyArgs>(args: Prisma.SelectSubset<T, ConversationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ConversationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ConversationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ConversationUpsertArgs>(args: Prisma.SelectSubset<T, ConversationUpsertArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ConversationCountArgs>(args?: Prisma.Subset<T, ConversationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ConversationCountAggregateOutputType> : number>;
    aggregate<T extends ConversationAggregateArgs>(args: Prisma.Subset<T, ConversationAggregateArgs>): Prisma.PrismaPromise<GetConversationAggregateType<T>>;
    groupBy<T extends ConversationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ConversationGroupByArgs['orderBy'];
    } : {
        orderBy?: ConversationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ConversationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConversationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ConversationFieldRefs;
}
export interface Prisma__ConversationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    job<T extends Prisma.JobDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.JobDefaultArgs<ExtArgs>>): Prisma.Prisma__JobClient<runtime.Types.Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    booking<T extends Prisma.Conversation$bookingArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Conversation$bookingArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    customer<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    provider<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    messages<T extends Prisma.Conversation$messagesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Conversation$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ConversationFieldRefs {
    readonly id: Prisma.FieldRef<"Conversation", 'String'>;
    readonly jobId: Prisma.FieldRef<"Conversation", 'String'>;
    readonly bookingId: Prisma.FieldRef<"Conversation", 'String'>;
    readonly customerId: Prisma.FieldRef<"Conversation", 'String'>;
    readonly providerId: Prisma.FieldRef<"Conversation", 'String'>;
    readonly lastMessage: Prisma.FieldRef<"Conversation", 'String'>;
    readonly lastMessageAt: Prisma.FieldRef<"Conversation", 'DateTime'>;
    readonly lastActivity: Prisma.FieldRef<"Conversation", 'DateTime'>;
    readonly customerDeletedAt: Prisma.FieldRef<"Conversation", 'DateTime'>;
    readonly providerDeletedAt: Prisma.FieldRef<"Conversation", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Conversation", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Conversation", 'DateTime'>;
}
export type ConversationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    where: Prisma.ConversationWhereUniqueInput;
};
export type ConversationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    where: Prisma.ConversationWhereUniqueInput;
};
export type ConversationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    where?: Prisma.ConversationWhereInput;
    orderBy?: Prisma.ConversationOrderByWithRelationInput | Prisma.ConversationOrderByWithRelationInput[];
    cursor?: Prisma.ConversationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConversationScalarFieldEnum | Prisma.ConversationScalarFieldEnum[];
};
export type ConversationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    where?: Prisma.ConversationWhereInput;
    orderBy?: Prisma.ConversationOrderByWithRelationInput | Prisma.ConversationOrderByWithRelationInput[];
    cursor?: Prisma.ConversationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConversationScalarFieldEnum | Prisma.ConversationScalarFieldEnum[];
};
export type ConversationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    where?: Prisma.ConversationWhereInput;
    orderBy?: Prisma.ConversationOrderByWithRelationInput | Prisma.ConversationOrderByWithRelationInput[];
    cursor?: Prisma.ConversationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConversationScalarFieldEnum | Prisma.ConversationScalarFieldEnum[];
};
export type ConversationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConversationCreateInput, Prisma.ConversationUncheckedCreateInput>;
};
export type ConversationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ConversationCreateManyInput | Prisma.ConversationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ConversationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    data: Prisma.ConversationCreateManyInput | Prisma.ConversationCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ConversationIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ConversationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConversationUpdateInput, Prisma.ConversationUncheckedUpdateInput>;
    where: Prisma.ConversationWhereUniqueInput;
};
export type ConversationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ConversationUpdateManyMutationInput, Prisma.ConversationUncheckedUpdateManyInput>;
    where?: Prisma.ConversationWhereInput;
    limit?: number;
};
export type ConversationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConversationUpdateManyMutationInput, Prisma.ConversationUncheckedUpdateManyInput>;
    where?: Prisma.ConversationWhereInput;
    limit?: number;
    include?: Prisma.ConversationIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ConversationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    where: Prisma.ConversationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConversationCreateInput, Prisma.ConversationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ConversationUpdateInput, Prisma.ConversationUncheckedUpdateInput>;
};
export type ConversationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    where: Prisma.ConversationWhereUniqueInput;
};
export type ConversationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConversationWhereInput;
    limit?: number;
};
export type Conversation$bookingArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    where?: Prisma.BookingWhereInput;
};
export type Conversation$messagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
    where?: Prisma.MessageWhereInput;
    orderBy?: Prisma.MessageOrderByWithRelationInput | Prisma.MessageOrderByWithRelationInput[];
    cursor?: Prisma.MessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MessageScalarFieldEnum | Prisma.MessageScalarFieldEnum[];
};
export type ConversationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
};
export {};
