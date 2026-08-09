import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
export type ServiceCategoryModel = runtime.Types.Result.DefaultSelection<Prisma.$ServiceCategoryPayload>;
export type AggregateServiceCategory = {
    _count: ServiceCategoryCountAggregateOutputType | null;
    _avg: ServiceCategoryAvgAggregateOutputType | null;
    _sum: ServiceCategorySumAggregateOutputType | null;
    _min: ServiceCategoryMinAggregateOutputType | null;
    _max: ServiceCategoryMaxAggregateOutputType | null;
};
export type ServiceCategoryAvgAggregateOutputType = {
    displayOrder: number | null;
};
export type ServiceCategorySumAggregateOutputType = {
    displayOrder: number | null;
};
export type ServiceCategoryMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    slug: string | null;
    description: string | null;
    icon: string | null;
    isActive: boolean | null;
    displayOrder: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ServiceCategoryMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    slug: string | null;
    description: string | null;
    icon: string | null;
    isActive: boolean | null;
    displayOrder: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ServiceCategoryCountAggregateOutputType = {
    id: number;
    name: number;
    slug: number;
    description: number;
    icon: number;
    isActive: number;
    displayOrder: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ServiceCategoryAvgAggregateInputType = {
    displayOrder?: true;
};
export type ServiceCategorySumAggregateInputType = {
    displayOrder?: true;
};
export type ServiceCategoryMinAggregateInputType = {
    id?: true;
    name?: true;
    slug?: true;
    description?: true;
    icon?: true;
    isActive?: true;
    displayOrder?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ServiceCategoryMaxAggregateInputType = {
    id?: true;
    name?: true;
    slug?: true;
    description?: true;
    icon?: true;
    isActive?: true;
    displayOrder?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ServiceCategoryCountAggregateInputType = {
    id?: true;
    name?: true;
    slug?: true;
    description?: true;
    icon?: true;
    isActive?: true;
    displayOrder?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ServiceCategoryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ServiceCategoryWhereInput;
    orderBy?: Prisma.ServiceCategoryOrderByWithRelationInput | Prisma.ServiceCategoryOrderByWithRelationInput[];
    cursor?: Prisma.ServiceCategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ServiceCategoryCountAggregateInputType;
    _avg?: ServiceCategoryAvgAggregateInputType;
    _sum?: ServiceCategorySumAggregateInputType;
    _min?: ServiceCategoryMinAggregateInputType;
    _max?: ServiceCategoryMaxAggregateInputType;
};
export type GetServiceCategoryAggregateType<T extends ServiceCategoryAggregateArgs> = {
    [P in keyof T & keyof AggregateServiceCategory]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateServiceCategory[P]> : Prisma.GetScalarType<T[P], AggregateServiceCategory[P]>;
};
export type ServiceCategoryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ServiceCategoryWhereInput;
    orderBy?: Prisma.ServiceCategoryOrderByWithAggregationInput | Prisma.ServiceCategoryOrderByWithAggregationInput[];
    by: Prisma.ServiceCategoryScalarFieldEnum[] | Prisma.ServiceCategoryScalarFieldEnum;
    having?: Prisma.ServiceCategoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ServiceCategoryCountAggregateInputType | true;
    _avg?: ServiceCategoryAvgAggregateInputType;
    _sum?: ServiceCategorySumAggregateInputType;
    _min?: ServiceCategoryMinAggregateInputType;
    _max?: ServiceCategoryMaxAggregateInputType;
};
export type ServiceCategoryGroupByOutputType = {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    icon: string | null;
    isActive: boolean;
    displayOrder: number;
    createdAt: Date;
    updatedAt: Date;
    _count: ServiceCategoryCountAggregateOutputType | null;
    _avg: ServiceCategoryAvgAggregateOutputType | null;
    _sum: ServiceCategorySumAggregateOutputType | null;
    _min: ServiceCategoryMinAggregateOutputType | null;
    _max: ServiceCategoryMaxAggregateOutputType | null;
};
type GetServiceCategoryGroupByPayload<T extends ServiceCategoryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ServiceCategoryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ServiceCategoryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ServiceCategoryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ServiceCategoryGroupByOutputType[P]>;
}>>;
export type ServiceCategoryWhereInput = {
    AND?: Prisma.ServiceCategoryWhereInput | Prisma.ServiceCategoryWhereInput[];
    OR?: Prisma.ServiceCategoryWhereInput[];
    NOT?: Prisma.ServiceCategoryWhereInput | Prisma.ServiceCategoryWhereInput[];
    id?: Prisma.StringFilter<"ServiceCategory"> | string;
    name?: Prisma.StringFilter<"ServiceCategory"> | string;
    slug?: Prisma.StringFilter<"ServiceCategory"> | string;
    description?: Prisma.StringNullableFilter<"ServiceCategory"> | string | null;
    icon?: Prisma.StringNullableFilter<"ServiceCategory"> | string | null;
    isActive?: Prisma.BoolFilter<"ServiceCategory"> | boolean;
    displayOrder?: Prisma.IntFilter<"ServiceCategory"> | number;
    createdAt?: Prisma.DateTimeFilter<"ServiceCategory"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ServiceCategory"> | Date | string;
    providers?: Prisma.ProviderServiceCategoryListRelationFilter;
    jobs?: Prisma.JobListRelationFilter;
};
export type ServiceCategoryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    icon?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    displayOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    providers?: Prisma.ProviderServiceCategoryOrderByRelationAggregateInput;
    jobs?: Prisma.JobOrderByRelationAggregateInput;
};
export type ServiceCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    slug?: string;
    AND?: Prisma.ServiceCategoryWhereInput | Prisma.ServiceCategoryWhereInput[];
    OR?: Prisma.ServiceCategoryWhereInput[];
    NOT?: Prisma.ServiceCategoryWhereInput | Prisma.ServiceCategoryWhereInput[];
    name?: Prisma.StringFilter<"ServiceCategory"> | string;
    description?: Prisma.StringNullableFilter<"ServiceCategory"> | string | null;
    icon?: Prisma.StringNullableFilter<"ServiceCategory"> | string | null;
    isActive?: Prisma.BoolFilter<"ServiceCategory"> | boolean;
    displayOrder?: Prisma.IntFilter<"ServiceCategory"> | number;
    createdAt?: Prisma.DateTimeFilter<"ServiceCategory"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ServiceCategory"> | Date | string;
    providers?: Prisma.ProviderServiceCategoryListRelationFilter;
    jobs?: Prisma.JobListRelationFilter;
}, "id" | "slug">;
export type ServiceCategoryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    icon?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    displayOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ServiceCategoryCountOrderByAggregateInput;
    _avg?: Prisma.ServiceCategoryAvgOrderByAggregateInput;
    _max?: Prisma.ServiceCategoryMaxOrderByAggregateInput;
    _min?: Prisma.ServiceCategoryMinOrderByAggregateInput;
    _sum?: Prisma.ServiceCategorySumOrderByAggregateInput;
};
export type ServiceCategoryScalarWhereWithAggregatesInput = {
    AND?: Prisma.ServiceCategoryScalarWhereWithAggregatesInput | Prisma.ServiceCategoryScalarWhereWithAggregatesInput[];
    OR?: Prisma.ServiceCategoryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ServiceCategoryScalarWhereWithAggregatesInput | Prisma.ServiceCategoryScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ServiceCategory"> | string;
    name?: Prisma.StringWithAggregatesFilter<"ServiceCategory"> | string;
    slug?: Prisma.StringWithAggregatesFilter<"ServiceCategory"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"ServiceCategory"> | string | null;
    icon?: Prisma.StringNullableWithAggregatesFilter<"ServiceCategory"> | string | null;
    isActive?: Prisma.BoolWithAggregatesFilter<"ServiceCategory"> | boolean;
    displayOrder?: Prisma.IntWithAggregatesFilter<"ServiceCategory"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ServiceCategory"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ServiceCategory"> | Date | string;
};
export type ServiceCategoryCreateInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    icon?: string | null;
    isActive?: boolean;
    displayOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    providers?: Prisma.ProviderServiceCategoryCreateNestedManyWithoutCategoryInput;
    jobs?: Prisma.JobCreateNestedManyWithoutCategoryInput;
};
export type ServiceCategoryUncheckedCreateInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    icon?: string | null;
    isActive?: boolean;
    displayOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    providers?: Prisma.ProviderServiceCategoryUncheckedCreateNestedManyWithoutCategoryInput;
    jobs?: Prisma.JobUncheckedCreateNestedManyWithoutCategoryInput;
};
export type ServiceCategoryUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    providers?: Prisma.ProviderServiceCategoryUpdateManyWithoutCategoryNestedInput;
    jobs?: Prisma.JobUpdateManyWithoutCategoryNestedInput;
};
export type ServiceCategoryUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    providers?: Prisma.ProviderServiceCategoryUncheckedUpdateManyWithoutCategoryNestedInput;
    jobs?: Prisma.JobUncheckedUpdateManyWithoutCategoryNestedInput;
};
export type ServiceCategoryCreateManyInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    icon?: string | null;
    isActive?: boolean;
    displayOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ServiceCategoryUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ServiceCategoryUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ServiceCategoryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    displayOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ServiceCategoryAvgOrderByAggregateInput = {
    displayOrder?: Prisma.SortOrder;
};
export type ServiceCategoryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    displayOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ServiceCategoryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    displayOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ServiceCategorySumOrderByAggregateInput = {
    displayOrder?: Prisma.SortOrder;
};
export type ServiceCategoryScalarRelationFilter = {
    is?: Prisma.ServiceCategoryWhereInput;
    isNot?: Prisma.ServiceCategoryWhereInput;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type ServiceCategoryCreateNestedOneWithoutProvidersInput = {
    create?: Prisma.XOR<Prisma.ServiceCategoryCreateWithoutProvidersInput, Prisma.ServiceCategoryUncheckedCreateWithoutProvidersInput>;
    connectOrCreate?: Prisma.ServiceCategoryCreateOrConnectWithoutProvidersInput;
    connect?: Prisma.ServiceCategoryWhereUniqueInput;
};
export type ServiceCategoryUpdateOneRequiredWithoutProvidersNestedInput = {
    create?: Prisma.XOR<Prisma.ServiceCategoryCreateWithoutProvidersInput, Prisma.ServiceCategoryUncheckedCreateWithoutProvidersInput>;
    connectOrCreate?: Prisma.ServiceCategoryCreateOrConnectWithoutProvidersInput;
    upsert?: Prisma.ServiceCategoryUpsertWithoutProvidersInput;
    connect?: Prisma.ServiceCategoryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ServiceCategoryUpdateToOneWithWhereWithoutProvidersInput, Prisma.ServiceCategoryUpdateWithoutProvidersInput>, Prisma.ServiceCategoryUncheckedUpdateWithoutProvidersInput>;
};
export type ServiceCategoryCreateNestedOneWithoutJobsInput = {
    create?: Prisma.XOR<Prisma.ServiceCategoryCreateWithoutJobsInput, Prisma.ServiceCategoryUncheckedCreateWithoutJobsInput>;
    connectOrCreate?: Prisma.ServiceCategoryCreateOrConnectWithoutJobsInput;
    connect?: Prisma.ServiceCategoryWhereUniqueInput;
};
export type ServiceCategoryUpdateOneRequiredWithoutJobsNestedInput = {
    create?: Prisma.XOR<Prisma.ServiceCategoryCreateWithoutJobsInput, Prisma.ServiceCategoryUncheckedCreateWithoutJobsInput>;
    connectOrCreate?: Prisma.ServiceCategoryCreateOrConnectWithoutJobsInput;
    upsert?: Prisma.ServiceCategoryUpsertWithoutJobsInput;
    connect?: Prisma.ServiceCategoryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ServiceCategoryUpdateToOneWithWhereWithoutJobsInput, Prisma.ServiceCategoryUpdateWithoutJobsInput>, Prisma.ServiceCategoryUncheckedUpdateWithoutJobsInput>;
};
export type ServiceCategoryCreateWithoutProvidersInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    icon?: string | null;
    isActive?: boolean;
    displayOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    jobs?: Prisma.JobCreateNestedManyWithoutCategoryInput;
};
export type ServiceCategoryUncheckedCreateWithoutProvidersInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    icon?: string | null;
    isActive?: boolean;
    displayOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    jobs?: Prisma.JobUncheckedCreateNestedManyWithoutCategoryInput;
};
export type ServiceCategoryCreateOrConnectWithoutProvidersInput = {
    where: Prisma.ServiceCategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.ServiceCategoryCreateWithoutProvidersInput, Prisma.ServiceCategoryUncheckedCreateWithoutProvidersInput>;
};
export type ServiceCategoryUpsertWithoutProvidersInput = {
    update: Prisma.XOR<Prisma.ServiceCategoryUpdateWithoutProvidersInput, Prisma.ServiceCategoryUncheckedUpdateWithoutProvidersInput>;
    create: Prisma.XOR<Prisma.ServiceCategoryCreateWithoutProvidersInput, Prisma.ServiceCategoryUncheckedCreateWithoutProvidersInput>;
    where?: Prisma.ServiceCategoryWhereInput;
};
export type ServiceCategoryUpdateToOneWithWhereWithoutProvidersInput = {
    where?: Prisma.ServiceCategoryWhereInput;
    data: Prisma.XOR<Prisma.ServiceCategoryUpdateWithoutProvidersInput, Prisma.ServiceCategoryUncheckedUpdateWithoutProvidersInput>;
};
export type ServiceCategoryUpdateWithoutProvidersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    jobs?: Prisma.JobUpdateManyWithoutCategoryNestedInput;
};
export type ServiceCategoryUncheckedUpdateWithoutProvidersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    jobs?: Prisma.JobUncheckedUpdateManyWithoutCategoryNestedInput;
};
export type ServiceCategoryCreateWithoutJobsInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    icon?: string | null;
    isActive?: boolean;
    displayOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    providers?: Prisma.ProviderServiceCategoryCreateNestedManyWithoutCategoryInput;
};
export type ServiceCategoryUncheckedCreateWithoutJobsInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    icon?: string | null;
    isActive?: boolean;
    displayOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    providers?: Prisma.ProviderServiceCategoryUncheckedCreateNestedManyWithoutCategoryInput;
};
export type ServiceCategoryCreateOrConnectWithoutJobsInput = {
    where: Prisma.ServiceCategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.ServiceCategoryCreateWithoutJobsInput, Prisma.ServiceCategoryUncheckedCreateWithoutJobsInput>;
};
export type ServiceCategoryUpsertWithoutJobsInput = {
    update: Prisma.XOR<Prisma.ServiceCategoryUpdateWithoutJobsInput, Prisma.ServiceCategoryUncheckedUpdateWithoutJobsInput>;
    create: Prisma.XOR<Prisma.ServiceCategoryCreateWithoutJobsInput, Prisma.ServiceCategoryUncheckedCreateWithoutJobsInput>;
    where?: Prisma.ServiceCategoryWhereInput;
};
export type ServiceCategoryUpdateToOneWithWhereWithoutJobsInput = {
    where?: Prisma.ServiceCategoryWhereInput;
    data: Prisma.XOR<Prisma.ServiceCategoryUpdateWithoutJobsInput, Prisma.ServiceCategoryUncheckedUpdateWithoutJobsInput>;
};
export type ServiceCategoryUpdateWithoutJobsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    providers?: Prisma.ProviderServiceCategoryUpdateManyWithoutCategoryNestedInput;
};
export type ServiceCategoryUncheckedUpdateWithoutJobsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    providers?: Prisma.ProviderServiceCategoryUncheckedUpdateManyWithoutCategoryNestedInput;
};
export type ServiceCategoryCountOutputType = {
    providers: number;
    jobs: number;
};
export type ServiceCategoryCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    providers?: boolean | ServiceCategoryCountOutputTypeCountProvidersArgs;
    jobs?: boolean | ServiceCategoryCountOutputTypeCountJobsArgs;
};
export type ServiceCategoryCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceCategoryCountOutputTypeSelect<ExtArgs> | null;
};
export type ServiceCategoryCountOutputTypeCountProvidersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProviderServiceCategoryWhereInput;
};
export type ServiceCategoryCountOutputTypeCountJobsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobWhereInput;
};
export type ServiceCategorySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    slug?: boolean;
    description?: boolean;
    icon?: boolean;
    isActive?: boolean;
    displayOrder?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    providers?: boolean | Prisma.ServiceCategory$providersArgs<ExtArgs>;
    jobs?: boolean | Prisma.ServiceCategory$jobsArgs<ExtArgs>;
    _count?: boolean | Prisma.ServiceCategoryCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["serviceCategory"]>;
export type ServiceCategorySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    slug?: boolean;
    description?: boolean;
    icon?: boolean;
    isActive?: boolean;
    displayOrder?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["serviceCategory"]>;
export type ServiceCategorySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    slug?: boolean;
    description?: boolean;
    icon?: boolean;
    isActive?: boolean;
    displayOrder?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["serviceCategory"]>;
export type ServiceCategorySelectScalar = {
    id?: boolean;
    name?: boolean;
    slug?: boolean;
    description?: boolean;
    icon?: boolean;
    isActive?: boolean;
    displayOrder?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ServiceCategoryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "slug" | "description" | "icon" | "isActive" | "displayOrder" | "createdAt" | "updatedAt", ExtArgs["result"]["serviceCategory"]>;
export type ServiceCategoryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    providers?: boolean | Prisma.ServiceCategory$providersArgs<ExtArgs>;
    jobs?: boolean | Prisma.ServiceCategory$jobsArgs<ExtArgs>;
    _count?: boolean | Prisma.ServiceCategoryCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ServiceCategoryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type ServiceCategoryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $ServiceCategoryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ServiceCategory";
    objects: {
        providers: Prisma.$ProviderServiceCategoryPayload<ExtArgs>[];
        jobs: Prisma.$JobPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        slug: string;
        description: string | null;
        icon: string | null;
        isActive: boolean;
        displayOrder: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["serviceCategory"]>;
    composites: {};
};
export type ServiceCategoryGetPayload<S extends boolean | null | undefined | ServiceCategoryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ServiceCategoryPayload, S>;
export type ServiceCategoryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ServiceCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ServiceCategoryCountAggregateInputType | true;
};
export interface ServiceCategoryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ServiceCategory'];
        meta: {
            name: 'ServiceCategory';
        };
    };
    findUnique<T extends ServiceCategoryFindUniqueArgs>(args: Prisma.SelectSubset<T, ServiceCategoryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ServiceCategoryClient<runtime.Types.Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ServiceCategoryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ServiceCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ServiceCategoryClient<runtime.Types.Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ServiceCategoryFindFirstArgs>(args?: Prisma.SelectSubset<T, ServiceCategoryFindFirstArgs<ExtArgs>>): Prisma.Prisma__ServiceCategoryClient<runtime.Types.Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ServiceCategoryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ServiceCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ServiceCategoryClient<runtime.Types.Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ServiceCategoryFindManyArgs>(args?: Prisma.SelectSubset<T, ServiceCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ServiceCategoryCreateArgs>(args: Prisma.SelectSubset<T, ServiceCategoryCreateArgs<ExtArgs>>): Prisma.Prisma__ServiceCategoryClient<runtime.Types.Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ServiceCategoryCreateManyArgs>(args?: Prisma.SelectSubset<T, ServiceCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ServiceCategoryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ServiceCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ServiceCategoryDeleteArgs>(args: Prisma.SelectSubset<T, ServiceCategoryDeleteArgs<ExtArgs>>): Prisma.Prisma__ServiceCategoryClient<runtime.Types.Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ServiceCategoryUpdateArgs>(args: Prisma.SelectSubset<T, ServiceCategoryUpdateArgs<ExtArgs>>): Prisma.Prisma__ServiceCategoryClient<runtime.Types.Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ServiceCategoryDeleteManyArgs>(args?: Prisma.SelectSubset<T, ServiceCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ServiceCategoryUpdateManyArgs>(args: Prisma.SelectSubset<T, ServiceCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ServiceCategoryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ServiceCategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ServiceCategoryUpsertArgs>(args: Prisma.SelectSubset<T, ServiceCategoryUpsertArgs<ExtArgs>>): Prisma.Prisma__ServiceCategoryClient<runtime.Types.Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ServiceCategoryCountArgs>(args?: Prisma.Subset<T, ServiceCategoryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ServiceCategoryCountAggregateOutputType> : number>;
    aggregate<T extends ServiceCategoryAggregateArgs>(args: Prisma.Subset<T, ServiceCategoryAggregateArgs>): Prisma.PrismaPromise<GetServiceCategoryAggregateType<T>>;
    groupBy<T extends ServiceCategoryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ServiceCategoryGroupByArgs['orderBy'];
    } : {
        orderBy?: ServiceCategoryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ServiceCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ServiceCategoryFieldRefs;
}
export interface Prisma__ServiceCategoryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    providers<T extends Prisma.ServiceCategory$providersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ServiceCategory$providersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProviderServiceCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    jobs<T extends Prisma.ServiceCategory$jobsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ServiceCategory$jobsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ServiceCategoryFieldRefs {
    readonly id: Prisma.FieldRef<"ServiceCategory", 'String'>;
    readonly name: Prisma.FieldRef<"ServiceCategory", 'String'>;
    readonly slug: Prisma.FieldRef<"ServiceCategory", 'String'>;
    readonly description: Prisma.FieldRef<"ServiceCategory", 'String'>;
    readonly icon: Prisma.FieldRef<"ServiceCategory", 'String'>;
    readonly isActive: Prisma.FieldRef<"ServiceCategory", 'Boolean'>;
    readonly displayOrder: Prisma.FieldRef<"ServiceCategory", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"ServiceCategory", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ServiceCategory", 'DateTime'>;
}
export type ServiceCategoryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceCategorySelect<ExtArgs> | null;
    omit?: Prisma.ServiceCategoryOmit<ExtArgs> | null;
    include?: Prisma.ServiceCategoryInclude<ExtArgs> | null;
    where: Prisma.ServiceCategoryWhereUniqueInput;
};
export type ServiceCategoryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceCategorySelect<ExtArgs> | null;
    omit?: Prisma.ServiceCategoryOmit<ExtArgs> | null;
    include?: Prisma.ServiceCategoryInclude<ExtArgs> | null;
    where: Prisma.ServiceCategoryWhereUniqueInput;
};
export type ServiceCategoryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceCategorySelect<ExtArgs> | null;
    omit?: Prisma.ServiceCategoryOmit<ExtArgs> | null;
    include?: Prisma.ServiceCategoryInclude<ExtArgs> | null;
    where?: Prisma.ServiceCategoryWhereInput;
    orderBy?: Prisma.ServiceCategoryOrderByWithRelationInput | Prisma.ServiceCategoryOrderByWithRelationInput[];
    cursor?: Prisma.ServiceCategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ServiceCategoryScalarFieldEnum | Prisma.ServiceCategoryScalarFieldEnum[];
};
export type ServiceCategoryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceCategorySelect<ExtArgs> | null;
    omit?: Prisma.ServiceCategoryOmit<ExtArgs> | null;
    include?: Prisma.ServiceCategoryInclude<ExtArgs> | null;
    where?: Prisma.ServiceCategoryWhereInput;
    orderBy?: Prisma.ServiceCategoryOrderByWithRelationInput | Prisma.ServiceCategoryOrderByWithRelationInput[];
    cursor?: Prisma.ServiceCategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ServiceCategoryScalarFieldEnum | Prisma.ServiceCategoryScalarFieldEnum[];
};
export type ServiceCategoryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceCategorySelect<ExtArgs> | null;
    omit?: Prisma.ServiceCategoryOmit<ExtArgs> | null;
    include?: Prisma.ServiceCategoryInclude<ExtArgs> | null;
    where?: Prisma.ServiceCategoryWhereInput;
    orderBy?: Prisma.ServiceCategoryOrderByWithRelationInput | Prisma.ServiceCategoryOrderByWithRelationInput[];
    cursor?: Prisma.ServiceCategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ServiceCategoryScalarFieldEnum | Prisma.ServiceCategoryScalarFieldEnum[];
};
export type ServiceCategoryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceCategorySelect<ExtArgs> | null;
    omit?: Prisma.ServiceCategoryOmit<ExtArgs> | null;
    include?: Prisma.ServiceCategoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ServiceCategoryCreateInput, Prisma.ServiceCategoryUncheckedCreateInput>;
};
export type ServiceCategoryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ServiceCategoryCreateManyInput | Prisma.ServiceCategoryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ServiceCategoryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceCategorySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ServiceCategoryOmit<ExtArgs> | null;
    data: Prisma.ServiceCategoryCreateManyInput | Prisma.ServiceCategoryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ServiceCategoryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceCategorySelect<ExtArgs> | null;
    omit?: Prisma.ServiceCategoryOmit<ExtArgs> | null;
    include?: Prisma.ServiceCategoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ServiceCategoryUpdateInput, Prisma.ServiceCategoryUncheckedUpdateInput>;
    where: Prisma.ServiceCategoryWhereUniqueInput;
};
export type ServiceCategoryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ServiceCategoryUpdateManyMutationInput, Prisma.ServiceCategoryUncheckedUpdateManyInput>;
    where?: Prisma.ServiceCategoryWhereInput;
    limit?: number;
};
export type ServiceCategoryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceCategorySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ServiceCategoryOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ServiceCategoryUpdateManyMutationInput, Prisma.ServiceCategoryUncheckedUpdateManyInput>;
    where?: Prisma.ServiceCategoryWhereInput;
    limit?: number;
};
export type ServiceCategoryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceCategorySelect<ExtArgs> | null;
    omit?: Prisma.ServiceCategoryOmit<ExtArgs> | null;
    include?: Prisma.ServiceCategoryInclude<ExtArgs> | null;
    where: Prisma.ServiceCategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.ServiceCategoryCreateInput, Prisma.ServiceCategoryUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ServiceCategoryUpdateInput, Prisma.ServiceCategoryUncheckedUpdateInput>;
};
export type ServiceCategoryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceCategorySelect<ExtArgs> | null;
    omit?: Prisma.ServiceCategoryOmit<ExtArgs> | null;
    include?: Prisma.ServiceCategoryInclude<ExtArgs> | null;
    where: Prisma.ServiceCategoryWhereUniqueInput;
};
export type ServiceCategoryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ServiceCategoryWhereInput;
    limit?: number;
};
export type ServiceCategory$providersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ServiceCategory$jobsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobSelect<ExtArgs> | null;
    omit?: Prisma.JobOmit<ExtArgs> | null;
    include?: Prisma.JobInclude<ExtArgs> | null;
    where?: Prisma.JobWhereInput;
    orderBy?: Prisma.JobOrderByWithRelationInput | Prisma.JobOrderByWithRelationInput[];
    cursor?: Prisma.JobWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobScalarFieldEnum | Prisma.JobScalarFieldEnum[];
};
export type ServiceCategoryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceCategorySelect<ExtArgs> | null;
    omit?: Prisma.ServiceCategoryOmit<ExtArgs> | null;
    include?: Prisma.ServiceCategoryInclude<ExtArgs> | null;
};
export {};
