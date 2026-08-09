import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type RatingFlagModel = runtime.Types.Result.DefaultSelection<Prisma.$RatingFlagPayload>;
export type AggregateRatingFlag = {
    _count: RatingFlagCountAggregateOutputType | null;
    _avg: RatingFlagAvgAggregateOutputType | null;
    _sum: RatingFlagSumAggregateOutputType | null;
    _min: RatingFlagMinAggregateOutputType | null;
    _max: RatingFlagMaxAggregateOutputType | null;
};
export type RatingFlagAvgAggregateOutputType = {
    averageRating: runtime.Decimal | null;
};
export type RatingFlagSumAggregateOutputType = {
    averageRating: runtime.Decimal | null;
};
export type RatingFlagMinAggregateOutputType = {
    id: string | null;
    providerId: string | null;
    reason: string | null;
    averageRating: runtime.Decimal | null;
    status: $Enums.RatingFlagStatus | null;
    createdAt: Date | null;
};
export type RatingFlagMaxAggregateOutputType = {
    id: string | null;
    providerId: string | null;
    reason: string | null;
    averageRating: runtime.Decimal | null;
    status: $Enums.RatingFlagStatus | null;
    createdAt: Date | null;
};
export type RatingFlagCountAggregateOutputType = {
    id: number;
    providerId: number;
    reason: number;
    averageRating: number;
    status: number;
    createdAt: number;
    _all: number;
};
export type RatingFlagAvgAggregateInputType = {
    averageRating?: true;
};
export type RatingFlagSumAggregateInputType = {
    averageRating?: true;
};
export type RatingFlagMinAggregateInputType = {
    id?: true;
    providerId?: true;
    reason?: true;
    averageRating?: true;
    status?: true;
    createdAt?: true;
};
export type RatingFlagMaxAggregateInputType = {
    id?: true;
    providerId?: true;
    reason?: true;
    averageRating?: true;
    status?: true;
    createdAt?: true;
};
export type RatingFlagCountAggregateInputType = {
    id?: true;
    providerId?: true;
    reason?: true;
    averageRating?: true;
    status?: true;
    createdAt?: true;
    _all?: true;
};
export type RatingFlagAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RatingFlagWhereInput;
    orderBy?: Prisma.RatingFlagOrderByWithRelationInput | Prisma.RatingFlagOrderByWithRelationInput[];
    cursor?: Prisma.RatingFlagWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RatingFlagCountAggregateInputType;
    _avg?: RatingFlagAvgAggregateInputType;
    _sum?: RatingFlagSumAggregateInputType;
    _min?: RatingFlagMinAggregateInputType;
    _max?: RatingFlagMaxAggregateInputType;
};
export type GetRatingFlagAggregateType<T extends RatingFlagAggregateArgs> = {
    [P in keyof T & keyof AggregateRatingFlag]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRatingFlag[P]> : Prisma.GetScalarType<T[P], AggregateRatingFlag[P]>;
};
export type RatingFlagGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RatingFlagWhereInput;
    orderBy?: Prisma.RatingFlagOrderByWithAggregationInput | Prisma.RatingFlagOrderByWithAggregationInput[];
    by: Prisma.RatingFlagScalarFieldEnum[] | Prisma.RatingFlagScalarFieldEnum;
    having?: Prisma.RatingFlagScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RatingFlagCountAggregateInputType | true;
    _avg?: RatingFlagAvgAggregateInputType;
    _sum?: RatingFlagSumAggregateInputType;
    _min?: RatingFlagMinAggregateInputType;
    _max?: RatingFlagMaxAggregateInputType;
};
export type RatingFlagGroupByOutputType = {
    id: string;
    providerId: string;
    reason: string;
    averageRating: runtime.Decimal;
    status: $Enums.RatingFlagStatus;
    createdAt: Date;
    _count: RatingFlagCountAggregateOutputType | null;
    _avg: RatingFlagAvgAggregateOutputType | null;
    _sum: RatingFlagSumAggregateOutputType | null;
    _min: RatingFlagMinAggregateOutputType | null;
    _max: RatingFlagMaxAggregateOutputType | null;
};
type GetRatingFlagGroupByPayload<T extends RatingFlagGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RatingFlagGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RatingFlagGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RatingFlagGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RatingFlagGroupByOutputType[P]>;
}>>;
export type RatingFlagWhereInput = {
    AND?: Prisma.RatingFlagWhereInput | Prisma.RatingFlagWhereInput[];
    OR?: Prisma.RatingFlagWhereInput[];
    NOT?: Prisma.RatingFlagWhereInput | Prisma.RatingFlagWhereInput[];
    id?: Prisma.StringFilter<"RatingFlag"> | string;
    providerId?: Prisma.StringFilter<"RatingFlag"> | string;
    reason?: Prisma.StringFilter<"RatingFlag"> | string;
    averageRating?: Prisma.DecimalFilter<"RatingFlag"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumRatingFlagStatusFilter<"RatingFlag"> | $Enums.RatingFlagStatus;
    createdAt?: Prisma.DateTimeFilter<"RatingFlag"> | Date | string;
    provider?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type RatingFlagOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    averageRating?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    provider?: Prisma.UserOrderByWithRelationInput;
};
export type RatingFlagWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.RatingFlagWhereInput | Prisma.RatingFlagWhereInput[];
    OR?: Prisma.RatingFlagWhereInput[];
    NOT?: Prisma.RatingFlagWhereInput | Prisma.RatingFlagWhereInput[];
    providerId?: Prisma.StringFilter<"RatingFlag"> | string;
    reason?: Prisma.StringFilter<"RatingFlag"> | string;
    averageRating?: Prisma.DecimalFilter<"RatingFlag"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumRatingFlagStatusFilter<"RatingFlag"> | $Enums.RatingFlagStatus;
    createdAt?: Prisma.DateTimeFilter<"RatingFlag"> | Date | string;
    provider?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type RatingFlagOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    averageRating?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.RatingFlagCountOrderByAggregateInput;
    _avg?: Prisma.RatingFlagAvgOrderByAggregateInput;
    _max?: Prisma.RatingFlagMaxOrderByAggregateInput;
    _min?: Prisma.RatingFlagMinOrderByAggregateInput;
    _sum?: Prisma.RatingFlagSumOrderByAggregateInput;
};
export type RatingFlagScalarWhereWithAggregatesInput = {
    AND?: Prisma.RatingFlagScalarWhereWithAggregatesInput | Prisma.RatingFlagScalarWhereWithAggregatesInput[];
    OR?: Prisma.RatingFlagScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RatingFlagScalarWhereWithAggregatesInput | Prisma.RatingFlagScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"RatingFlag"> | string;
    providerId?: Prisma.StringWithAggregatesFilter<"RatingFlag"> | string;
    reason?: Prisma.StringWithAggregatesFilter<"RatingFlag"> | string;
    averageRating?: Prisma.DecimalWithAggregatesFilter<"RatingFlag"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumRatingFlagStatusWithAggregatesFilter<"RatingFlag"> | $Enums.RatingFlagStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"RatingFlag"> | Date | string;
};
export type RatingFlagCreateInput = {
    id?: string;
    reason: string;
    averageRating: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.RatingFlagStatus;
    createdAt?: Date | string;
    provider: Prisma.UserCreateNestedOneWithoutRatingFlagsInput;
};
export type RatingFlagUncheckedCreateInput = {
    id?: string;
    providerId: string;
    reason: string;
    averageRating: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.RatingFlagStatus;
    createdAt?: Date | string;
};
export type RatingFlagUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    averageRating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumRatingFlagStatusFieldUpdateOperationsInput | $Enums.RatingFlagStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    provider?: Prisma.UserUpdateOneRequiredWithoutRatingFlagsNestedInput;
};
export type RatingFlagUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    averageRating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumRatingFlagStatusFieldUpdateOperationsInput | $Enums.RatingFlagStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RatingFlagCreateManyInput = {
    id?: string;
    providerId: string;
    reason: string;
    averageRating: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.RatingFlagStatus;
    createdAt?: Date | string;
};
export type RatingFlagUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    averageRating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumRatingFlagStatusFieldUpdateOperationsInput | $Enums.RatingFlagStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RatingFlagUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    averageRating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumRatingFlagStatusFieldUpdateOperationsInput | $Enums.RatingFlagStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RatingFlagListRelationFilter = {
    every?: Prisma.RatingFlagWhereInput;
    some?: Prisma.RatingFlagWhereInput;
    none?: Prisma.RatingFlagWhereInput;
};
export type RatingFlagOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RatingFlagCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    averageRating?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RatingFlagAvgOrderByAggregateInput = {
    averageRating?: Prisma.SortOrder;
};
export type RatingFlagMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    averageRating?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RatingFlagMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    averageRating?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RatingFlagSumOrderByAggregateInput = {
    averageRating?: Prisma.SortOrder;
};
export type RatingFlagCreateNestedManyWithoutProviderInput = {
    create?: Prisma.XOR<Prisma.RatingFlagCreateWithoutProviderInput, Prisma.RatingFlagUncheckedCreateWithoutProviderInput> | Prisma.RatingFlagCreateWithoutProviderInput[] | Prisma.RatingFlagUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.RatingFlagCreateOrConnectWithoutProviderInput | Prisma.RatingFlagCreateOrConnectWithoutProviderInput[];
    createMany?: Prisma.RatingFlagCreateManyProviderInputEnvelope;
    connect?: Prisma.RatingFlagWhereUniqueInput | Prisma.RatingFlagWhereUniqueInput[];
};
export type RatingFlagUncheckedCreateNestedManyWithoutProviderInput = {
    create?: Prisma.XOR<Prisma.RatingFlagCreateWithoutProviderInput, Prisma.RatingFlagUncheckedCreateWithoutProviderInput> | Prisma.RatingFlagCreateWithoutProviderInput[] | Prisma.RatingFlagUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.RatingFlagCreateOrConnectWithoutProviderInput | Prisma.RatingFlagCreateOrConnectWithoutProviderInput[];
    createMany?: Prisma.RatingFlagCreateManyProviderInputEnvelope;
    connect?: Prisma.RatingFlagWhereUniqueInput | Prisma.RatingFlagWhereUniqueInput[];
};
export type RatingFlagUpdateManyWithoutProviderNestedInput = {
    create?: Prisma.XOR<Prisma.RatingFlagCreateWithoutProviderInput, Prisma.RatingFlagUncheckedCreateWithoutProviderInput> | Prisma.RatingFlagCreateWithoutProviderInput[] | Prisma.RatingFlagUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.RatingFlagCreateOrConnectWithoutProviderInput | Prisma.RatingFlagCreateOrConnectWithoutProviderInput[];
    upsert?: Prisma.RatingFlagUpsertWithWhereUniqueWithoutProviderInput | Prisma.RatingFlagUpsertWithWhereUniqueWithoutProviderInput[];
    createMany?: Prisma.RatingFlagCreateManyProviderInputEnvelope;
    set?: Prisma.RatingFlagWhereUniqueInput | Prisma.RatingFlagWhereUniqueInput[];
    disconnect?: Prisma.RatingFlagWhereUniqueInput | Prisma.RatingFlagWhereUniqueInput[];
    delete?: Prisma.RatingFlagWhereUniqueInput | Prisma.RatingFlagWhereUniqueInput[];
    connect?: Prisma.RatingFlagWhereUniqueInput | Prisma.RatingFlagWhereUniqueInput[];
    update?: Prisma.RatingFlagUpdateWithWhereUniqueWithoutProviderInput | Prisma.RatingFlagUpdateWithWhereUniqueWithoutProviderInput[];
    updateMany?: Prisma.RatingFlagUpdateManyWithWhereWithoutProviderInput | Prisma.RatingFlagUpdateManyWithWhereWithoutProviderInput[];
    deleteMany?: Prisma.RatingFlagScalarWhereInput | Prisma.RatingFlagScalarWhereInput[];
};
export type RatingFlagUncheckedUpdateManyWithoutProviderNestedInput = {
    create?: Prisma.XOR<Prisma.RatingFlagCreateWithoutProviderInput, Prisma.RatingFlagUncheckedCreateWithoutProviderInput> | Prisma.RatingFlagCreateWithoutProviderInput[] | Prisma.RatingFlagUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.RatingFlagCreateOrConnectWithoutProviderInput | Prisma.RatingFlagCreateOrConnectWithoutProviderInput[];
    upsert?: Prisma.RatingFlagUpsertWithWhereUniqueWithoutProviderInput | Prisma.RatingFlagUpsertWithWhereUniqueWithoutProviderInput[];
    createMany?: Prisma.RatingFlagCreateManyProviderInputEnvelope;
    set?: Prisma.RatingFlagWhereUniqueInput | Prisma.RatingFlagWhereUniqueInput[];
    disconnect?: Prisma.RatingFlagWhereUniqueInput | Prisma.RatingFlagWhereUniqueInput[];
    delete?: Prisma.RatingFlagWhereUniqueInput | Prisma.RatingFlagWhereUniqueInput[];
    connect?: Prisma.RatingFlagWhereUniqueInput | Prisma.RatingFlagWhereUniqueInput[];
    update?: Prisma.RatingFlagUpdateWithWhereUniqueWithoutProviderInput | Prisma.RatingFlagUpdateWithWhereUniqueWithoutProviderInput[];
    updateMany?: Prisma.RatingFlagUpdateManyWithWhereWithoutProviderInput | Prisma.RatingFlagUpdateManyWithWhereWithoutProviderInput[];
    deleteMany?: Prisma.RatingFlagScalarWhereInput | Prisma.RatingFlagScalarWhereInput[];
};
export type EnumRatingFlagStatusFieldUpdateOperationsInput = {
    set?: $Enums.RatingFlagStatus;
};
export type RatingFlagCreateWithoutProviderInput = {
    id?: string;
    reason: string;
    averageRating: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.RatingFlagStatus;
    createdAt?: Date | string;
};
export type RatingFlagUncheckedCreateWithoutProviderInput = {
    id?: string;
    reason: string;
    averageRating: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.RatingFlagStatus;
    createdAt?: Date | string;
};
export type RatingFlagCreateOrConnectWithoutProviderInput = {
    where: Prisma.RatingFlagWhereUniqueInput;
    create: Prisma.XOR<Prisma.RatingFlagCreateWithoutProviderInput, Prisma.RatingFlagUncheckedCreateWithoutProviderInput>;
};
export type RatingFlagCreateManyProviderInputEnvelope = {
    data: Prisma.RatingFlagCreateManyProviderInput | Prisma.RatingFlagCreateManyProviderInput[];
    skipDuplicates?: boolean;
};
export type RatingFlagUpsertWithWhereUniqueWithoutProviderInput = {
    where: Prisma.RatingFlagWhereUniqueInput;
    update: Prisma.XOR<Prisma.RatingFlagUpdateWithoutProviderInput, Prisma.RatingFlagUncheckedUpdateWithoutProviderInput>;
    create: Prisma.XOR<Prisma.RatingFlagCreateWithoutProviderInput, Prisma.RatingFlagUncheckedCreateWithoutProviderInput>;
};
export type RatingFlagUpdateWithWhereUniqueWithoutProviderInput = {
    where: Prisma.RatingFlagWhereUniqueInput;
    data: Prisma.XOR<Prisma.RatingFlagUpdateWithoutProviderInput, Prisma.RatingFlagUncheckedUpdateWithoutProviderInput>;
};
export type RatingFlagUpdateManyWithWhereWithoutProviderInput = {
    where: Prisma.RatingFlagScalarWhereInput;
    data: Prisma.XOR<Prisma.RatingFlagUpdateManyMutationInput, Prisma.RatingFlagUncheckedUpdateManyWithoutProviderInput>;
};
export type RatingFlagScalarWhereInput = {
    AND?: Prisma.RatingFlagScalarWhereInput | Prisma.RatingFlagScalarWhereInput[];
    OR?: Prisma.RatingFlagScalarWhereInput[];
    NOT?: Prisma.RatingFlagScalarWhereInput | Prisma.RatingFlagScalarWhereInput[];
    id?: Prisma.StringFilter<"RatingFlag"> | string;
    providerId?: Prisma.StringFilter<"RatingFlag"> | string;
    reason?: Prisma.StringFilter<"RatingFlag"> | string;
    averageRating?: Prisma.DecimalFilter<"RatingFlag"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumRatingFlagStatusFilter<"RatingFlag"> | $Enums.RatingFlagStatus;
    createdAt?: Prisma.DateTimeFilter<"RatingFlag"> | Date | string;
};
export type RatingFlagCreateManyProviderInput = {
    id?: string;
    reason: string;
    averageRating: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.RatingFlagStatus;
    createdAt?: Date | string;
};
export type RatingFlagUpdateWithoutProviderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    averageRating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumRatingFlagStatusFieldUpdateOperationsInput | $Enums.RatingFlagStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RatingFlagUncheckedUpdateWithoutProviderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    averageRating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumRatingFlagStatusFieldUpdateOperationsInput | $Enums.RatingFlagStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RatingFlagUncheckedUpdateManyWithoutProviderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    averageRating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumRatingFlagStatusFieldUpdateOperationsInput | $Enums.RatingFlagStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RatingFlagSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    providerId?: boolean;
    reason?: boolean;
    averageRating?: boolean;
    status?: boolean;
    createdAt?: boolean;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ratingFlag"]>;
export type RatingFlagSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    providerId?: boolean;
    reason?: boolean;
    averageRating?: boolean;
    status?: boolean;
    createdAt?: boolean;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ratingFlag"]>;
export type RatingFlagSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    providerId?: boolean;
    reason?: boolean;
    averageRating?: boolean;
    status?: boolean;
    createdAt?: boolean;
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ratingFlag"]>;
export type RatingFlagSelectScalar = {
    id?: boolean;
    providerId?: boolean;
    reason?: boolean;
    averageRating?: boolean;
    status?: boolean;
    createdAt?: boolean;
};
export type RatingFlagOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "providerId" | "reason" | "averageRating" | "status" | "createdAt", ExtArgs["result"]["ratingFlag"]>;
export type RatingFlagInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type RatingFlagIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type RatingFlagIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    provider?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $RatingFlagPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RatingFlag";
    objects: {
        provider: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        providerId: string;
        reason: string;
        averageRating: runtime.Decimal;
        status: $Enums.RatingFlagStatus;
        createdAt: Date;
    }, ExtArgs["result"]["ratingFlag"]>;
    composites: {};
};
export type RatingFlagGetPayload<S extends boolean | null | undefined | RatingFlagDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RatingFlagPayload, S>;
export type RatingFlagCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RatingFlagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RatingFlagCountAggregateInputType | true;
};
export interface RatingFlagDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RatingFlag'];
        meta: {
            name: 'RatingFlag';
        };
    };
    findUnique<T extends RatingFlagFindUniqueArgs>(args: Prisma.SelectSubset<T, RatingFlagFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RatingFlagClient<runtime.Types.Result.GetResult<Prisma.$RatingFlagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RatingFlagFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RatingFlagFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RatingFlagClient<runtime.Types.Result.GetResult<Prisma.$RatingFlagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RatingFlagFindFirstArgs>(args?: Prisma.SelectSubset<T, RatingFlagFindFirstArgs<ExtArgs>>): Prisma.Prisma__RatingFlagClient<runtime.Types.Result.GetResult<Prisma.$RatingFlagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RatingFlagFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RatingFlagFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RatingFlagClient<runtime.Types.Result.GetResult<Prisma.$RatingFlagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RatingFlagFindManyArgs>(args?: Prisma.SelectSubset<T, RatingFlagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RatingFlagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RatingFlagCreateArgs>(args: Prisma.SelectSubset<T, RatingFlagCreateArgs<ExtArgs>>): Prisma.Prisma__RatingFlagClient<runtime.Types.Result.GetResult<Prisma.$RatingFlagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RatingFlagCreateManyArgs>(args?: Prisma.SelectSubset<T, RatingFlagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RatingFlagCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RatingFlagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RatingFlagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RatingFlagDeleteArgs>(args: Prisma.SelectSubset<T, RatingFlagDeleteArgs<ExtArgs>>): Prisma.Prisma__RatingFlagClient<runtime.Types.Result.GetResult<Prisma.$RatingFlagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RatingFlagUpdateArgs>(args: Prisma.SelectSubset<T, RatingFlagUpdateArgs<ExtArgs>>): Prisma.Prisma__RatingFlagClient<runtime.Types.Result.GetResult<Prisma.$RatingFlagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RatingFlagDeleteManyArgs>(args?: Prisma.SelectSubset<T, RatingFlagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RatingFlagUpdateManyArgs>(args: Prisma.SelectSubset<T, RatingFlagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RatingFlagUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RatingFlagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RatingFlagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RatingFlagUpsertArgs>(args: Prisma.SelectSubset<T, RatingFlagUpsertArgs<ExtArgs>>): Prisma.Prisma__RatingFlagClient<runtime.Types.Result.GetResult<Prisma.$RatingFlagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RatingFlagCountArgs>(args?: Prisma.Subset<T, RatingFlagCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RatingFlagCountAggregateOutputType> : number>;
    aggregate<T extends RatingFlagAggregateArgs>(args: Prisma.Subset<T, RatingFlagAggregateArgs>): Prisma.PrismaPromise<GetRatingFlagAggregateType<T>>;
    groupBy<T extends RatingFlagGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RatingFlagGroupByArgs['orderBy'];
    } : {
        orderBy?: RatingFlagGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RatingFlagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRatingFlagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RatingFlagFieldRefs;
}
export interface Prisma__RatingFlagClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    provider<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RatingFlagFieldRefs {
    readonly id: Prisma.FieldRef<"RatingFlag", 'String'>;
    readonly providerId: Prisma.FieldRef<"RatingFlag", 'String'>;
    readonly reason: Prisma.FieldRef<"RatingFlag", 'String'>;
    readonly averageRating: Prisma.FieldRef<"RatingFlag", 'Decimal'>;
    readonly status: Prisma.FieldRef<"RatingFlag", 'RatingFlagStatus'>;
    readonly createdAt: Prisma.FieldRef<"RatingFlag", 'DateTime'>;
}
export type RatingFlagFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingFlagSelect<ExtArgs> | null;
    omit?: Prisma.RatingFlagOmit<ExtArgs> | null;
    include?: Prisma.RatingFlagInclude<ExtArgs> | null;
    where: Prisma.RatingFlagWhereUniqueInput;
};
export type RatingFlagFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingFlagSelect<ExtArgs> | null;
    omit?: Prisma.RatingFlagOmit<ExtArgs> | null;
    include?: Prisma.RatingFlagInclude<ExtArgs> | null;
    where: Prisma.RatingFlagWhereUniqueInput;
};
export type RatingFlagFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingFlagSelect<ExtArgs> | null;
    omit?: Prisma.RatingFlagOmit<ExtArgs> | null;
    include?: Prisma.RatingFlagInclude<ExtArgs> | null;
    where?: Prisma.RatingFlagWhereInput;
    orderBy?: Prisma.RatingFlagOrderByWithRelationInput | Prisma.RatingFlagOrderByWithRelationInput[];
    cursor?: Prisma.RatingFlagWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RatingFlagScalarFieldEnum | Prisma.RatingFlagScalarFieldEnum[];
};
export type RatingFlagFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingFlagSelect<ExtArgs> | null;
    omit?: Prisma.RatingFlagOmit<ExtArgs> | null;
    include?: Prisma.RatingFlagInclude<ExtArgs> | null;
    where?: Prisma.RatingFlagWhereInput;
    orderBy?: Prisma.RatingFlagOrderByWithRelationInput | Prisma.RatingFlagOrderByWithRelationInput[];
    cursor?: Prisma.RatingFlagWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RatingFlagScalarFieldEnum | Prisma.RatingFlagScalarFieldEnum[];
};
export type RatingFlagFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingFlagSelect<ExtArgs> | null;
    omit?: Prisma.RatingFlagOmit<ExtArgs> | null;
    include?: Prisma.RatingFlagInclude<ExtArgs> | null;
    where?: Prisma.RatingFlagWhereInput;
    orderBy?: Prisma.RatingFlagOrderByWithRelationInput | Prisma.RatingFlagOrderByWithRelationInput[];
    cursor?: Prisma.RatingFlagWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RatingFlagScalarFieldEnum | Prisma.RatingFlagScalarFieldEnum[];
};
export type RatingFlagCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingFlagSelect<ExtArgs> | null;
    omit?: Prisma.RatingFlagOmit<ExtArgs> | null;
    include?: Prisma.RatingFlagInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RatingFlagCreateInput, Prisma.RatingFlagUncheckedCreateInput>;
};
export type RatingFlagCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RatingFlagCreateManyInput | Prisma.RatingFlagCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RatingFlagCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingFlagSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RatingFlagOmit<ExtArgs> | null;
    data: Prisma.RatingFlagCreateManyInput | Prisma.RatingFlagCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.RatingFlagIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type RatingFlagUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingFlagSelect<ExtArgs> | null;
    omit?: Prisma.RatingFlagOmit<ExtArgs> | null;
    include?: Prisma.RatingFlagInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RatingFlagUpdateInput, Prisma.RatingFlagUncheckedUpdateInput>;
    where: Prisma.RatingFlagWhereUniqueInput;
};
export type RatingFlagUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RatingFlagUpdateManyMutationInput, Prisma.RatingFlagUncheckedUpdateManyInput>;
    where?: Prisma.RatingFlagWhereInput;
    limit?: number;
};
export type RatingFlagUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingFlagSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RatingFlagOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RatingFlagUpdateManyMutationInput, Prisma.RatingFlagUncheckedUpdateManyInput>;
    where?: Prisma.RatingFlagWhereInput;
    limit?: number;
    include?: Prisma.RatingFlagIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type RatingFlagUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingFlagSelect<ExtArgs> | null;
    omit?: Prisma.RatingFlagOmit<ExtArgs> | null;
    include?: Prisma.RatingFlagInclude<ExtArgs> | null;
    where: Prisma.RatingFlagWhereUniqueInput;
    create: Prisma.XOR<Prisma.RatingFlagCreateInput, Prisma.RatingFlagUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RatingFlagUpdateInput, Prisma.RatingFlagUncheckedUpdateInput>;
};
export type RatingFlagDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingFlagSelect<ExtArgs> | null;
    omit?: Prisma.RatingFlagOmit<ExtArgs> | null;
    include?: Prisma.RatingFlagInclude<ExtArgs> | null;
    where: Prisma.RatingFlagWhereUniqueInput;
};
export type RatingFlagDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RatingFlagWhereInput;
    limit?: number;
};
export type RatingFlagDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingFlagSelect<ExtArgs> | null;
    omit?: Prisma.RatingFlagOmit<ExtArgs> | null;
    include?: Prisma.RatingFlagInclude<ExtArgs> | null;
};
export {};
