import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
export type ProviderServiceCategoryModel = runtime.Types.Result.DefaultSelection<Prisma.$ProviderServiceCategoryPayload>;
export type AggregateProviderServiceCategory = {
    _count: ProviderServiceCategoryCountAggregateOutputType | null;
    _min: ProviderServiceCategoryMinAggregateOutputType | null;
    _max: ProviderServiceCategoryMaxAggregateOutputType | null;
};
export type ProviderServiceCategoryMinAggregateOutputType = {
    providerId: string | null;
    categoryId: string | null;
};
export type ProviderServiceCategoryMaxAggregateOutputType = {
    providerId: string | null;
    categoryId: string | null;
};
export type ProviderServiceCategoryCountAggregateOutputType = {
    providerId: number;
    categoryId: number;
    _all: number;
};
export type ProviderServiceCategoryMinAggregateInputType = {
    providerId?: true;
    categoryId?: true;
};
export type ProviderServiceCategoryMaxAggregateInputType = {
    providerId?: true;
    categoryId?: true;
};
export type ProviderServiceCategoryCountAggregateInputType = {
    providerId?: true;
    categoryId?: true;
    _all?: true;
};
export type ProviderServiceCategoryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProviderServiceCategoryWhereInput;
    orderBy?: Prisma.ProviderServiceCategoryOrderByWithRelationInput | Prisma.ProviderServiceCategoryOrderByWithRelationInput[];
    cursor?: Prisma.ProviderServiceCategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProviderServiceCategoryCountAggregateInputType;
    _min?: ProviderServiceCategoryMinAggregateInputType;
    _max?: ProviderServiceCategoryMaxAggregateInputType;
};
export type GetProviderServiceCategoryAggregateType<T extends ProviderServiceCategoryAggregateArgs> = {
    [P in keyof T & keyof AggregateProviderServiceCategory]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProviderServiceCategory[P]> : Prisma.GetScalarType<T[P], AggregateProviderServiceCategory[P]>;
};
export type ProviderServiceCategoryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProviderServiceCategoryWhereInput;
    orderBy?: Prisma.ProviderServiceCategoryOrderByWithAggregationInput | Prisma.ProviderServiceCategoryOrderByWithAggregationInput[];
    by: Prisma.ProviderServiceCategoryScalarFieldEnum[] | Prisma.ProviderServiceCategoryScalarFieldEnum;
    having?: Prisma.ProviderServiceCategoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProviderServiceCategoryCountAggregateInputType | true;
    _min?: ProviderServiceCategoryMinAggregateInputType;
    _max?: ProviderServiceCategoryMaxAggregateInputType;
};
export type ProviderServiceCategoryGroupByOutputType = {
    providerId: string;
    categoryId: string;
    _count: ProviderServiceCategoryCountAggregateOutputType | null;
    _min: ProviderServiceCategoryMinAggregateOutputType | null;
    _max: ProviderServiceCategoryMaxAggregateOutputType | null;
};
type GetProviderServiceCategoryGroupByPayload<T extends ProviderServiceCategoryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProviderServiceCategoryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProviderServiceCategoryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProviderServiceCategoryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProviderServiceCategoryGroupByOutputType[P]>;
}>>;
export type ProviderServiceCategoryWhereInput = {
    AND?: Prisma.ProviderServiceCategoryWhereInput | Prisma.ProviderServiceCategoryWhereInput[];
    OR?: Prisma.ProviderServiceCategoryWhereInput[];
    NOT?: Prisma.ProviderServiceCategoryWhereInput | Prisma.ProviderServiceCategoryWhereInput[];
    providerId?: Prisma.StringFilter<"ProviderServiceCategory"> | string;
    categoryId?: Prisma.StringFilter<"ProviderServiceCategory"> | string;
    provider?: Prisma.XOR<Prisma.ProviderProfileScalarRelationFilter, Prisma.ProviderProfileWhereInput>;
    category?: Prisma.XOR<Prisma.ServiceCategoryScalarRelationFilter, Prisma.ServiceCategoryWhereInput>;
};
export type ProviderServiceCategoryOrderByWithRelationInput = {
    providerId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    provider?: Prisma.ProviderProfileOrderByWithRelationInput;
    category?: Prisma.ServiceCategoryOrderByWithRelationInput;
};
export type ProviderServiceCategoryWhereUniqueInput = Prisma.AtLeast<{
    providerId_categoryId?: Prisma.ProviderServiceCategoryProviderIdCategoryIdCompoundUniqueInput;
    AND?: Prisma.ProviderServiceCategoryWhereInput | Prisma.ProviderServiceCategoryWhereInput[];
    OR?: Prisma.ProviderServiceCategoryWhereInput[];
    NOT?: Prisma.ProviderServiceCategoryWhereInput | Prisma.ProviderServiceCategoryWhereInput[];
    providerId?: Prisma.StringFilter<"ProviderServiceCategory"> | string;
    categoryId?: Prisma.StringFilter<"ProviderServiceCategory"> | string;
    provider?: Prisma.XOR<Prisma.ProviderProfileScalarRelationFilter, Prisma.ProviderProfileWhereInput>;
    category?: Prisma.XOR<Prisma.ServiceCategoryScalarRelationFilter, Prisma.ServiceCategoryWhereInput>;
}, "providerId_categoryId">;
export type ProviderServiceCategoryOrderByWithAggregationInput = {
    providerId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    _count?: Prisma.ProviderServiceCategoryCountOrderByAggregateInput;
    _max?: Prisma.ProviderServiceCategoryMaxOrderByAggregateInput;
    _min?: Prisma.ProviderServiceCategoryMinOrderByAggregateInput;
};
export type ProviderServiceCategoryScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProviderServiceCategoryScalarWhereWithAggregatesInput | Prisma.ProviderServiceCategoryScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProviderServiceCategoryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProviderServiceCategoryScalarWhereWithAggregatesInput | Prisma.ProviderServiceCategoryScalarWhereWithAggregatesInput[];
    providerId?: Prisma.StringWithAggregatesFilter<"ProviderServiceCategory"> | string;
    categoryId?: Prisma.StringWithAggregatesFilter<"ProviderServiceCategory"> | string;
};
export type ProviderServiceCategoryCreateInput = {
    provider: Prisma.ProviderProfileCreateNestedOneWithoutCategoriesInput;
    category: Prisma.ServiceCategoryCreateNestedOneWithoutProvidersInput;
};
export type ProviderServiceCategoryUncheckedCreateInput = {
    providerId: string;
    categoryId: string;
};
export type ProviderServiceCategoryUpdateInput = {
    provider?: Prisma.ProviderProfileUpdateOneRequiredWithoutCategoriesNestedInput;
    category?: Prisma.ServiceCategoryUpdateOneRequiredWithoutProvidersNestedInput;
};
export type ProviderServiceCategoryUncheckedUpdateInput = {
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProviderServiceCategoryCreateManyInput = {
    providerId: string;
    categoryId: string;
};
export type ProviderServiceCategoryUpdateManyMutationInput = {};
export type ProviderServiceCategoryUncheckedUpdateManyInput = {
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProviderServiceCategoryListRelationFilter = {
    every?: Prisma.ProviderServiceCategoryWhereInput;
    some?: Prisma.ProviderServiceCategoryWhereInput;
    none?: Prisma.ProviderServiceCategoryWhereInput;
};
export type ProviderServiceCategoryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProviderServiceCategoryProviderIdCategoryIdCompoundUniqueInput = {
    providerId: string;
    categoryId: string;
};
export type ProviderServiceCategoryCountOrderByAggregateInput = {
    providerId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
};
export type ProviderServiceCategoryMaxOrderByAggregateInput = {
    providerId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
};
export type ProviderServiceCategoryMinOrderByAggregateInput = {
    providerId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
};
export type ProviderServiceCategoryCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.ProviderServiceCategoryCreateWithoutCategoryInput, Prisma.ProviderServiceCategoryUncheckedCreateWithoutCategoryInput> | Prisma.ProviderServiceCategoryCreateWithoutCategoryInput[] | Prisma.ProviderServiceCategoryUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.ProviderServiceCategoryCreateOrConnectWithoutCategoryInput | Prisma.ProviderServiceCategoryCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.ProviderServiceCategoryCreateManyCategoryInputEnvelope;
    connect?: Prisma.ProviderServiceCategoryWhereUniqueInput | Prisma.ProviderServiceCategoryWhereUniqueInput[];
};
export type ProviderServiceCategoryUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.ProviderServiceCategoryCreateWithoutCategoryInput, Prisma.ProviderServiceCategoryUncheckedCreateWithoutCategoryInput> | Prisma.ProviderServiceCategoryCreateWithoutCategoryInput[] | Prisma.ProviderServiceCategoryUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.ProviderServiceCategoryCreateOrConnectWithoutCategoryInput | Prisma.ProviderServiceCategoryCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.ProviderServiceCategoryCreateManyCategoryInputEnvelope;
    connect?: Prisma.ProviderServiceCategoryWhereUniqueInput | Prisma.ProviderServiceCategoryWhereUniqueInput[];
};
export type ProviderServiceCategoryUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.ProviderServiceCategoryCreateWithoutCategoryInput, Prisma.ProviderServiceCategoryUncheckedCreateWithoutCategoryInput> | Prisma.ProviderServiceCategoryCreateWithoutCategoryInput[] | Prisma.ProviderServiceCategoryUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.ProviderServiceCategoryCreateOrConnectWithoutCategoryInput | Prisma.ProviderServiceCategoryCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.ProviderServiceCategoryUpsertWithWhereUniqueWithoutCategoryInput | Prisma.ProviderServiceCategoryUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.ProviderServiceCategoryCreateManyCategoryInputEnvelope;
    set?: Prisma.ProviderServiceCategoryWhereUniqueInput | Prisma.ProviderServiceCategoryWhereUniqueInput[];
    disconnect?: Prisma.ProviderServiceCategoryWhereUniqueInput | Prisma.ProviderServiceCategoryWhereUniqueInput[];
    delete?: Prisma.ProviderServiceCategoryWhereUniqueInput | Prisma.ProviderServiceCategoryWhereUniqueInput[];
    connect?: Prisma.ProviderServiceCategoryWhereUniqueInput | Prisma.ProviderServiceCategoryWhereUniqueInput[];
    update?: Prisma.ProviderServiceCategoryUpdateWithWhereUniqueWithoutCategoryInput | Prisma.ProviderServiceCategoryUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.ProviderServiceCategoryUpdateManyWithWhereWithoutCategoryInput | Prisma.ProviderServiceCategoryUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.ProviderServiceCategoryScalarWhereInput | Prisma.ProviderServiceCategoryScalarWhereInput[];
};
export type ProviderServiceCategoryUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.ProviderServiceCategoryCreateWithoutCategoryInput, Prisma.ProviderServiceCategoryUncheckedCreateWithoutCategoryInput> | Prisma.ProviderServiceCategoryCreateWithoutCategoryInput[] | Prisma.ProviderServiceCategoryUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.ProviderServiceCategoryCreateOrConnectWithoutCategoryInput | Prisma.ProviderServiceCategoryCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.ProviderServiceCategoryUpsertWithWhereUniqueWithoutCategoryInput | Prisma.ProviderServiceCategoryUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.ProviderServiceCategoryCreateManyCategoryInputEnvelope;
    set?: Prisma.ProviderServiceCategoryWhereUniqueInput | Prisma.ProviderServiceCategoryWhereUniqueInput[];
    disconnect?: Prisma.ProviderServiceCategoryWhereUniqueInput | Prisma.ProviderServiceCategoryWhereUniqueInput[];
    delete?: Prisma.ProviderServiceCategoryWhereUniqueInput | Prisma.ProviderServiceCategoryWhereUniqueInput[];
    connect?: Prisma.ProviderServiceCategoryWhereUniqueInput | Prisma.ProviderServiceCategoryWhereUniqueInput[];
    update?: Prisma.ProviderServiceCategoryUpdateWithWhereUniqueWithoutCategoryInput | Prisma.ProviderServiceCategoryUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.ProviderServiceCategoryUpdateManyWithWhereWithoutCategoryInput | Prisma.ProviderServiceCategoryUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.ProviderServiceCategoryScalarWhereInput | Prisma.ProviderServiceCategoryScalarWhereInput[];
};
export type ProviderServiceCategoryCreateNestedManyWithoutProviderInput = {
    create?: Prisma.XOR<Prisma.ProviderServiceCategoryCreateWithoutProviderInput, Prisma.ProviderServiceCategoryUncheckedCreateWithoutProviderInput> | Prisma.ProviderServiceCategoryCreateWithoutProviderInput[] | Prisma.ProviderServiceCategoryUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.ProviderServiceCategoryCreateOrConnectWithoutProviderInput | Prisma.ProviderServiceCategoryCreateOrConnectWithoutProviderInput[];
    createMany?: Prisma.ProviderServiceCategoryCreateManyProviderInputEnvelope;
    connect?: Prisma.ProviderServiceCategoryWhereUniqueInput | Prisma.ProviderServiceCategoryWhereUniqueInput[];
};
export type ProviderServiceCategoryUncheckedCreateNestedManyWithoutProviderInput = {
    create?: Prisma.XOR<Prisma.ProviderServiceCategoryCreateWithoutProviderInput, Prisma.ProviderServiceCategoryUncheckedCreateWithoutProviderInput> | Prisma.ProviderServiceCategoryCreateWithoutProviderInput[] | Prisma.ProviderServiceCategoryUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.ProviderServiceCategoryCreateOrConnectWithoutProviderInput | Prisma.ProviderServiceCategoryCreateOrConnectWithoutProviderInput[];
    createMany?: Prisma.ProviderServiceCategoryCreateManyProviderInputEnvelope;
    connect?: Prisma.ProviderServiceCategoryWhereUniqueInput | Prisma.ProviderServiceCategoryWhereUniqueInput[];
};
export type ProviderServiceCategoryUpdateManyWithoutProviderNestedInput = {
    create?: Prisma.XOR<Prisma.ProviderServiceCategoryCreateWithoutProviderInput, Prisma.ProviderServiceCategoryUncheckedCreateWithoutProviderInput> | Prisma.ProviderServiceCategoryCreateWithoutProviderInput[] | Prisma.ProviderServiceCategoryUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.ProviderServiceCategoryCreateOrConnectWithoutProviderInput | Prisma.ProviderServiceCategoryCreateOrConnectWithoutProviderInput[];
    upsert?: Prisma.ProviderServiceCategoryUpsertWithWhereUniqueWithoutProviderInput | Prisma.ProviderServiceCategoryUpsertWithWhereUniqueWithoutProviderInput[];
    createMany?: Prisma.ProviderServiceCategoryCreateManyProviderInputEnvelope;
    set?: Prisma.ProviderServiceCategoryWhereUniqueInput | Prisma.ProviderServiceCategoryWhereUniqueInput[];
    disconnect?: Prisma.ProviderServiceCategoryWhereUniqueInput | Prisma.ProviderServiceCategoryWhereUniqueInput[];
    delete?: Prisma.ProviderServiceCategoryWhereUniqueInput | Prisma.ProviderServiceCategoryWhereUniqueInput[];
    connect?: Prisma.ProviderServiceCategoryWhereUniqueInput | Prisma.ProviderServiceCategoryWhereUniqueInput[];
    update?: Prisma.ProviderServiceCategoryUpdateWithWhereUniqueWithoutProviderInput | Prisma.ProviderServiceCategoryUpdateWithWhereUniqueWithoutProviderInput[];
    updateMany?: Prisma.ProviderServiceCategoryUpdateManyWithWhereWithoutProviderInput | Prisma.ProviderServiceCategoryUpdateManyWithWhereWithoutProviderInput[];
    deleteMany?: Prisma.ProviderServiceCategoryScalarWhereInput | Prisma.ProviderServiceCategoryScalarWhereInput[];
};
export type ProviderServiceCategoryUncheckedUpdateManyWithoutProviderNestedInput = {
    create?: Prisma.XOR<Prisma.ProviderServiceCategoryCreateWithoutProviderInput, Prisma.ProviderServiceCategoryUncheckedCreateWithoutProviderInput> | Prisma.ProviderServiceCategoryCreateWithoutProviderInput[] | Prisma.ProviderServiceCategoryUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.ProviderServiceCategoryCreateOrConnectWithoutProviderInput | Prisma.ProviderServiceCategoryCreateOrConnectWithoutProviderInput[];
    upsert?: Prisma.ProviderServiceCategoryUpsertWithWhereUniqueWithoutProviderInput | Prisma.ProviderServiceCategoryUpsertWithWhereUniqueWithoutProviderInput[];
    createMany?: Prisma.ProviderServiceCategoryCreateManyProviderInputEnvelope;
    set?: Prisma.ProviderServiceCategoryWhereUniqueInput | Prisma.ProviderServiceCategoryWhereUniqueInput[];
    disconnect?: Prisma.ProviderServiceCategoryWhereUniqueInput | Prisma.ProviderServiceCategoryWhereUniqueInput[];
    delete?: Prisma.ProviderServiceCategoryWhereUniqueInput | Prisma.ProviderServiceCategoryWhereUniqueInput[];
    connect?: Prisma.ProviderServiceCategoryWhereUniqueInput | Prisma.ProviderServiceCategoryWhereUniqueInput[];
    update?: Prisma.ProviderServiceCategoryUpdateWithWhereUniqueWithoutProviderInput | Prisma.ProviderServiceCategoryUpdateWithWhereUniqueWithoutProviderInput[];
    updateMany?: Prisma.ProviderServiceCategoryUpdateManyWithWhereWithoutProviderInput | Prisma.ProviderServiceCategoryUpdateManyWithWhereWithoutProviderInput[];
    deleteMany?: Prisma.ProviderServiceCategoryScalarWhereInput | Prisma.ProviderServiceCategoryScalarWhereInput[];
};
export type ProviderServiceCategoryCreateWithoutCategoryInput = {
    provider: Prisma.ProviderProfileCreateNestedOneWithoutCategoriesInput;
};
export type ProviderServiceCategoryUncheckedCreateWithoutCategoryInput = {
    providerId: string;
};
export type ProviderServiceCategoryCreateOrConnectWithoutCategoryInput = {
    where: Prisma.ProviderServiceCategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProviderServiceCategoryCreateWithoutCategoryInput, Prisma.ProviderServiceCategoryUncheckedCreateWithoutCategoryInput>;
};
export type ProviderServiceCategoryCreateManyCategoryInputEnvelope = {
    data: Prisma.ProviderServiceCategoryCreateManyCategoryInput | Prisma.ProviderServiceCategoryCreateManyCategoryInput[];
    skipDuplicates?: boolean;
};
export type ProviderServiceCategoryUpsertWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.ProviderServiceCategoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProviderServiceCategoryUpdateWithoutCategoryInput, Prisma.ProviderServiceCategoryUncheckedUpdateWithoutCategoryInput>;
    create: Prisma.XOR<Prisma.ProviderServiceCategoryCreateWithoutCategoryInput, Prisma.ProviderServiceCategoryUncheckedCreateWithoutCategoryInput>;
};
export type ProviderServiceCategoryUpdateWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.ProviderServiceCategoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProviderServiceCategoryUpdateWithoutCategoryInput, Prisma.ProviderServiceCategoryUncheckedUpdateWithoutCategoryInput>;
};
export type ProviderServiceCategoryUpdateManyWithWhereWithoutCategoryInput = {
    where: Prisma.ProviderServiceCategoryScalarWhereInput;
    data: Prisma.XOR<Prisma.ProviderServiceCategoryUpdateManyMutationInput, Prisma.ProviderServiceCategoryUncheckedUpdateManyWithoutCategoryInput>;
};
export type ProviderServiceCategoryScalarWhereInput = {
    AND?: Prisma.ProviderServiceCategoryScalarWhereInput | Prisma.ProviderServiceCategoryScalarWhereInput[];
    OR?: Prisma.ProviderServiceCategoryScalarWhereInput[];
    NOT?: Prisma.ProviderServiceCategoryScalarWhereInput | Prisma.ProviderServiceCategoryScalarWhereInput[];
    providerId?: Prisma.StringFilter<"ProviderServiceCategory"> | string;
    categoryId?: Prisma.StringFilter<"ProviderServiceCategory"> | string;
};
export type ProviderServiceCategoryCreateWithoutProviderInput = {
    category: Prisma.ServiceCategoryCreateNestedOneWithoutProvidersInput;
};
export type ProviderServiceCategoryUncheckedCreateWithoutProviderInput = {
    categoryId: string;
};
export type ProviderServiceCategoryCreateOrConnectWithoutProviderInput = {
    where: Prisma.ProviderServiceCategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProviderServiceCategoryCreateWithoutProviderInput, Prisma.ProviderServiceCategoryUncheckedCreateWithoutProviderInput>;
};
export type ProviderServiceCategoryCreateManyProviderInputEnvelope = {
    data: Prisma.ProviderServiceCategoryCreateManyProviderInput | Prisma.ProviderServiceCategoryCreateManyProviderInput[];
    skipDuplicates?: boolean;
};
export type ProviderServiceCategoryUpsertWithWhereUniqueWithoutProviderInput = {
    where: Prisma.ProviderServiceCategoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProviderServiceCategoryUpdateWithoutProviderInput, Prisma.ProviderServiceCategoryUncheckedUpdateWithoutProviderInput>;
    create: Prisma.XOR<Prisma.ProviderServiceCategoryCreateWithoutProviderInput, Prisma.ProviderServiceCategoryUncheckedCreateWithoutProviderInput>;
};
export type ProviderServiceCategoryUpdateWithWhereUniqueWithoutProviderInput = {
    where: Prisma.ProviderServiceCategoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProviderServiceCategoryUpdateWithoutProviderInput, Prisma.ProviderServiceCategoryUncheckedUpdateWithoutProviderInput>;
};
export type ProviderServiceCategoryUpdateManyWithWhereWithoutProviderInput = {
    where: Prisma.ProviderServiceCategoryScalarWhereInput;
    data: Prisma.XOR<Prisma.ProviderServiceCategoryUpdateManyMutationInput, Prisma.ProviderServiceCategoryUncheckedUpdateManyWithoutProviderInput>;
};
export type ProviderServiceCategoryCreateManyCategoryInput = {
    providerId: string;
};
export type ProviderServiceCategoryUpdateWithoutCategoryInput = {
    provider?: Prisma.ProviderProfileUpdateOneRequiredWithoutCategoriesNestedInput;
};
export type ProviderServiceCategoryUncheckedUpdateWithoutCategoryInput = {
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProviderServiceCategoryUncheckedUpdateManyWithoutCategoryInput = {
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProviderServiceCategoryCreateManyProviderInput = {
    categoryId: string;
};
export type ProviderServiceCategoryUpdateWithoutProviderInput = {
    category?: Prisma.ServiceCategoryUpdateOneRequiredWithoutProvidersNestedInput;
};
export type ProviderServiceCategoryUncheckedUpdateWithoutProviderInput = {
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProviderServiceCategoryUncheckedUpdateManyWithoutProviderInput = {
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProviderServiceCategorySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    providerId?: boolean;
    categoryId?: boolean;
    provider?: boolean | Prisma.ProviderProfileDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.ServiceCategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["providerServiceCategory"]>;
export type ProviderServiceCategorySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    providerId?: boolean;
    categoryId?: boolean;
    provider?: boolean | Prisma.ProviderProfileDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.ServiceCategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["providerServiceCategory"]>;
export type ProviderServiceCategorySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    providerId?: boolean;
    categoryId?: boolean;
    provider?: boolean | Prisma.ProviderProfileDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.ServiceCategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["providerServiceCategory"]>;
export type ProviderServiceCategorySelectScalar = {
    providerId?: boolean;
    categoryId?: boolean;
};
export type ProviderServiceCategoryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"providerId" | "categoryId", ExtArgs["result"]["providerServiceCategory"]>;
export type ProviderServiceCategoryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    provider?: boolean | Prisma.ProviderProfileDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.ServiceCategoryDefaultArgs<ExtArgs>;
};
export type ProviderServiceCategoryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    provider?: boolean | Prisma.ProviderProfileDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.ServiceCategoryDefaultArgs<ExtArgs>;
};
export type ProviderServiceCategoryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    provider?: boolean | Prisma.ProviderProfileDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.ServiceCategoryDefaultArgs<ExtArgs>;
};
export type $ProviderServiceCategoryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProviderServiceCategory";
    objects: {
        provider: Prisma.$ProviderProfilePayload<ExtArgs>;
        category: Prisma.$ServiceCategoryPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        providerId: string;
        categoryId: string;
    }, ExtArgs["result"]["providerServiceCategory"]>;
    composites: {};
};
export type ProviderServiceCategoryGetPayload<S extends boolean | null | undefined | ProviderServiceCategoryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProviderServiceCategoryPayload, S>;
export type ProviderServiceCategoryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProviderServiceCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProviderServiceCategoryCountAggregateInputType | true;
};
export interface ProviderServiceCategoryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProviderServiceCategory'];
        meta: {
            name: 'ProviderServiceCategory';
        };
    };
    findUnique<T extends ProviderServiceCategoryFindUniqueArgs>(args: Prisma.SelectSubset<T, ProviderServiceCategoryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProviderServiceCategoryClient<runtime.Types.Result.GetResult<Prisma.$ProviderServiceCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProviderServiceCategoryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProviderServiceCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProviderServiceCategoryClient<runtime.Types.Result.GetResult<Prisma.$ProviderServiceCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProviderServiceCategoryFindFirstArgs>(args?: Prisma.SelectSubset<T, ProviderServiceCategoryFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProviderServiceCategoryClient<runtime.Types.Result.GetResult<Prisma.$ProviderServiceCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProviderServiceCategoryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProviderServiceCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProviderServiceCategoryClient<runtime.Types.Result.GetResult<Prisma.$ProviderServiceCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProviderServiceCategoryFindManyArgs>(args?: Prisma.SelectSubset<T, ProviderServiceCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProviderServiceCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProviderServiceCategoryCreateArgs>(args: Prisma.SelectSubset<T, ProviderServiceCategoryCreateArgs<ExtArgs>>): Prisma.Prisma__ProviderServiceCategoryClient<runtime.Types.Result.GetResult<Prisma.$ProviderServiceCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProviderServiceCategoryCreateManyArgs>(args?: Prisma.SelectSubset<T, ProviderServiceCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProviderServiceCategoryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProviderServiceCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProviderServiceCategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProviderServiceCategoryDeleteArgs>(args: Prisma.SelectSubset<T, ProviderServiceCategoryDeleteArgs<ExtArgs>>): Prisma.Prisma__ProviderServiceCategoryClient<runtime.Types.Result.GetResult<Prisma.$ProviderServiceCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProviderServiceCategoryUpdateArgs>(args: Prisma.SelectSubset<T, ProviderServiceCategoryUpdateArgs<ExtArgs>>): Prisma.Prisma__ProviderServiceCategoryClient<runtime.Types.Result.GetResult<Prisma.$ProviderServiceCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProviderServiceCategoryDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProviderServiceCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProviderServiceCategoryUpdateManyArgs>(args: Prisma.SelectSubset<T, ProviderServiceCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProviderServiceCategoryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProviderServiceCategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProviderServiceCategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProviderServiceCategoryUpsertArgs>(args: Prisma.SelectSubset<T, ProviderServiceCategoryUpsertArgs<ExtArgs>>): Prisma.Prisma__ProviderServiceCategoryClient<runtime.Types.Result.GetResult<Prisma.$ProviderServiceCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProviderServiceCategoryCountArgs>(args?: Prisma.Subset<T, ProviderServiceCategoryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProviderServiceCategoryCountAggregateOutputType> : number>;
    aggregate<T extends ProviderServiceCategoryAggregateArgs>(args: Prisma.Subset<T, ProviderServiceCategoryAggregateArgs>): Prisma.PrismaPromise<GetProviderServiceCategoryAggregateType<T>>;
    groupBy<T extends ProviderServiceCategoryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProviderServiceCategoryGroupByArgs['orderBy'];
    } : {
        orderBy?: ProviderServiceCategoryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProviderServiceCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProviderServiceCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProviderServiceCategoryFieldRefs;
}
export interface Prisma__ProviderServiceCategoryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    provider<T extends Prisma.ProviderProfileDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProviderProfileDefaultArgs<ExtArgs>>): Prisma.Prisma__ProviderProfileClient<runtime.Types.Result.GetResult<Prisma.$ProviderProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    category<T extends Prisma.ServiceCategoryDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ServiceCategoryDefaultArgs<ExtArgs>>): Prisma.Prisma__ServiceCategoryClient<runtime.Types.Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProviderServiceCategoryFieldRefs {
    readonly providerId: Prisma.FieldRef<"ProviderServiceCategory", 'String'>;
    readonly categoryId: Prisma.FieldRef<"ProviderServiceCategory", 'String'>;
}
export type ProviderServiceCategoryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderServiceCategorySelect<ExtArgs> | null;
    omit?: Prisma.ProviderServiceCategoryOmit<ExtArgs> | null;
    include?: Prisma.ProviderServiceCategoryInclude<ExtArgs> | null;
    where: Prisma.ProviderServiceCategoryWhereUniqueInput;
};
export type ProviderServiceCategoryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderServiceCategorySelect<ExtArgs> | null;
    omit?: Prisma.ProviderServiceCategoryOmit<ExtArgs> | null;
    include?: Prisma.ProviderServiceCategoryInclude<ExtArgs> | null;
    where: Prisma.ProviderServiceCategoryWhereUniqueInput;
};
export type ProviderServiceCategoryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderServiceCategorySelect<ExtArgs> | null;
    omit?: Prisma.ProviderServiceCategoryOmit<ExtArgs> | null;
    include?: Prisma.ProviderServiceCategoryInclude<ExtArgs> | null;
    where?: Prisma.ProviderServiceCategoryWhereInput;
    orderBy?: Prisma.ProviderServiceCategoryOrderByWithRelationInput | Prisma.ProviderServiceCategoryOrderByWithRelationInput[];
    cursor?: Prisma.ProviderServiceCategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProviderServiceCategoryScalarFieldEnum | Prisma.ProviderServiceCategoryScalarFieldEnum[];
};
export type ProviderServiceCategoryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderServiceCategorySelect<ExtArgs> | null;
    omit?: Prisma.ProviderServiceCategoryOmit<ExtArgs> | null;
    include?: Prisma.ProviderServiceCategoryInclude<ExtArgs> | null;
    where?: Prisma.ProviderServiceCategoryWhereInput;
    orderBy?: Prisma.ProviderServiceCategoryOrderByWithRelationInput | Prisma.ProviderServiceCategoryOrderByWithRelationInput[];
    cursor?: Prisma.ProviderServiceCategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProviderServiceCategoryScalarFieldEnum | Prisma.ProviderServiceCategoryScalarFieldEnum[];
};
export type ProviderServiceCategoryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderServiceCategorySelect<ExtArgs> | null;
    omit?: Prisma.ProviderServiceCategoryOmit<ExtArgs> | null;
    include?: Prisma.ProviderServiceCategoryInclude<ExtArgs> | null;
    where?: Prisma.ProviderServiceCategoryWhereInput;
    orderBy?: Prisma.ProviderServiceCategoryOrderByWithRelationInput | Prisma.ProviderServiceCategoryOrderByWithRelationInput[];
    cursor?: Prisma.ProviderServiceCategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProviderServiceCategoryScalarFieldEnum | Prisma.ProviderServiceCategoryScalarFieldEnum[];
};
export type ProviderServiceCategoryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderServiceCategorySelect<ExtArgs> | null;
    omit?: Prisma.ProviderServiceCategoryOmit<ExtArgs> | null;
    include?: Prisma.ProviderServiceCategoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProviderServiceCategoryCreateInput, Prisma.ProviderServiceCategoryUncheckedCreateInput>;
};
export type ProviderServiceCategoryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProviderServiceCategoryCreateManyInput | Prisma.ProviderServiceCategoryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProviderServiceCategoryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderServiceCategorySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProviderServiceCategoryOmit<ExtArgs> | null;
    data: Prisma.ProviderServiceCategoryCreateManyInput | Prisma.ProviderServiceCategoryCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProviderServiceCategoryIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProviderServiceCategoryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderServiceCategorySelect<ExtArgs> | null;
    omit?: Prisma.ProviderServiceCategoryOmit<ExtArgs> | null;
    include?: Prisma.ProviderServiceCategoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProviderServiceCategoryUpdateInput, Prisma.ProviderServiceCategoryUncheckedUpdateInput>;
    where: Prisma.ProviderServiceCategoryWhereUniqueInput;
};
export type ProviderServiceCategoryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProviderServiceCategoryUpdateManyMutationInput, Prisma.ProviderServiceCategoryUncheckedUpdateManyInput>;
    where?: Prisma.ProviderServiceCategoryWhereInput;
    limit?: number;
};
export type ProviderServiceCategoryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderServiceCategorySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProviderServiceCategoryOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProviderServiceCategoryUpdateManyMutationInput, Prisma.ProviderServiceCategoryUncheckedUpdateManyInput>;
    where?: Prisma.ProviderServiceCategoryWhereInput;
    limit?: number;
    include?: Prisma.ProviderServiceCategoryIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProviderServiceCategoryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderServiceCategorySelect<ExtArgs> | null;
    omit?: Prisma.ProviderServiceCategoryOmit<ExtArgs> | null;
    include?: Prisma.ProviderServiceCategoryInclude<ExtArgs> | null;
    where: Prisma.ProviderServiceCategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProviderServiceCategoryCreateInput, Prisma.ProviderServiceCategoryUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProviderServiceCategoryUpdateInput, Prisma.ProviderServiceCategoryUncheckedUpdateInput>;
};
export type ProviderServiceCategoryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderServiceCategorySelect<ExtArgs> | null;
    omit?: Prisma.ProviderServiceCategoryOmit<ExtArgs> | null;
    include?: Prisma.ProviderServiceCategoryInclude<ExtArgs> | null;
    where: Prisma.ProviderServiceCategoryWhereUniqueInput;
};
export type ProviderServiceCategoryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProviderServiceCategoryWhereInput;
    limit?: number;
};
export type ProviderServiceCategoryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderServiceCategorySelect<ExtArgs> | null;
    omit?: Prisma.ProviderServiceCategoryOmit<ExtArgs> | null;
    include?: Prisma.ProviderServiceCategoryInclude<ExtArgs> | null;
};
export {};
