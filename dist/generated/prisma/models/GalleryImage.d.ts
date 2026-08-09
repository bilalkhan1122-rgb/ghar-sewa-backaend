import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
export type GalleryImageModel = runtime.Types.Result.DefaultSelection<Prisma.$GalleryImagePayload>;
export type AggregateGalleryImage = {
    _count: GalleryImageCountAggregateOutputType | null;
    _min: GalleryImageMinAggregateOutputType | null;
    _max: GalleryImageMaxAggregateOutputType | null;
};
export type GalleryImageMinAggregateOutputType = {
    id: string | null;
    providerId: string | null;
    imageUrl: string | null;
    createdAt: Date | null;
};
export type GalleryImageMaxAggregateOutputType = {
    id: string | null;
    providerId: string | null;
    imageUrl: string | null;
    createdAt: Date | null;
};
export type GalleryImageCountAggregateOutputType = {
    id: number;
    providerId: number;
    imageUrl: number;
    createdAt: number;
    _all: number;
};
export type GalleryImageMinAggregateInputType = {
    id?: true;
    providerId?: true;
    imageUrl?: true;
    createdAt?: true;
};
export type GalleryImageMaxAggregateInputType = {
    id?: true;
    providerId?: true;
    imageUrl?: true;
    createdAt?: true;
};
export type GalleryImageCountAggregateInputType = {
    id?: true;
    providerId?: true;
    imageUrl?: true;
    createdAt?: true;
    _all?: true;
};
export type GalleryImageAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GalleryImageWhereInput;
    orderBy?: Prisma.GalleryImageOrderByWithRelationInput | Prisma.GalleryImageOrderByWithRelationInput[];
    cursor?: Prisma.GalleryImageWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | GalleryImageCountAggregateInputType;
    _min?: GalleryImageMinAggregateInputType;
    _max?: GalleryImageMaxAggregateInputType;
};
export type GetGalleryImageAggregateType<T extends GalleryImageAggregateArgs> = {
    [P in keyof T & keyof AggregateGalleryImage]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateGalleryImage[P]> : Prisma.GetScalarType<T[P], AggregateGalleryImage[P]>;
};
export type GalleryImageGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GalleryImageWhereInput;
    orderBy?: Prisma.GalleryImageOrderByWithAggregationInput | Prisma.GalleryImageOrderByWithAggregationInput[];
    by: Prisma.GalleryImageScalarFieldEnum[] | Prisma.GalleryImageScalarFieldEnum;
    having?: Prisma.GalleryImageScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: GalleryImageCountAggregateInputType | true;
    _min?: GalleryImageMinAggregateInputType;
    _max?: GalleryImageMaxAggregateInputType;
};
export type GalleryImageGroupByOutputType = {
    id: string;
    providerId: string;
    imageUrl: string;
    createdAt: Date;
    _count: GalleryImageCountAggregateOutputType | null;
    _min: GalleryImageMinAggregateOutputType | null;
    _max: GalleryImageMaxAggregateOutputType | null;
};
type GetGalleryImageGroupByPayload<T extends GalleryImageGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<GalleryImageGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof GalleryImageGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], GalleryImageGroupByOutputType[P]> : Prisma.GetScalarType<T[P], GalleryImageGroupByOutputType[P]>;
}>>;
export type GalleryImageWhereInput = {
    AND?: Prisma.GalleryImageWhereInput | Prisma.GalleryImageWhereInput[];
    OR?: Prisma.GalleryImageWhereInput[];
    NOT?: Prisma.GalleryImageWhereInput | Prisma.GalleryImageWhereInput[];
    id?: Prisma.StringFilter<"GalleryImage"> | string;
    providerId?: Prisma.StringFilter<"GalleryImage"> | string;
    imageUrl?: Prisma.StringFilter<"GalleryImage"> | string;
    createdAt?: Prisma.DateTimeFilter<"GalleryImage"> | Date | string;
    provider?: Prisma.XOR<Prisma.ProviderProfileScalarRelationFilter, Prisma.ProviderProfileWhereInput>;
};
export type GalleryImageOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    provider?: Prisma.ProviderProfileOrderByWithRelationInput;
};
export type GalleryImageWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.GalleryImageWhereInput | Prisma.GalleryImageWhereInput[];
    OR?: Prisma.GalleryImageWhereInput[];
    NOT?: Prisma.GalleryImageWhereInput | Prisma.GalleryImageWhereInput[];
    providerId?: Prisma.StringFilter<"GalleryImage"> | string;
    imageUrl?: Prisma.StringFilter<"GalleryImage"> | string;
    createdAt?: Prisma.DateTimeFilter<"GalleryImage"> | Date | string;
    provider?: Prisma.XOR<Prisma.ProviderProfileScalarRelationFilter, Prisma.ProviderProfileWhereInput>;
}, "id">;
export type GalleryImageOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.GalleryImageCountOrderByAggregateInput;
    _max?: Prisma.GalleryImageMaxOrderByAggregateInput;
    _min?: Prisma.GalleryImageMinOrderByAggregateInput;
};
export type GalleryImageScalarWhereWithAggregatesInput = {
    AND?: Prisma.GalleryImageScalarWhereWithAggregatesInput | Prisma.GalleryImageScalarWhereWithAggregatesInput[];
    OR?: Prisma.GalleryImageScalarWhereWithAggregatesInput[];
    NOT?: Prisma.GalleryImageScalarWhereWithAggregatesInput | Prisma.GalleryImageScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"GalleryImage"> | string;
    providerId?: Prisma.StringWithAggregatesFilter<"GalleryImage"> | string;
    imageUrl?: Prisma.StringWithAggregatesFilter<"GalleryImage"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"GalleryImage"> | Date | string;
};
export type GalleryImageCreateInput = {
    id?: string;
    imageUrl: string;
    createdAt?: Date | string;
    provider: Prisma.ProviderProfileCreateNestedOneWithoutGalleryImagesInput;
};
export type GalleryImageUncheckedCreateInput = {
    id?: string;
    providerId: string;
    imageUrl: string;
    createdAt?: Date | string;
};
export type GalleryImageUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    provider?: Prisma.ProviderProfileUpdateOneRequiredWithoutGalleryImagesNestedInput;
};
export type GalleryImageUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GalleryImageCreateManyInput = {
    id?: string;
    providerId: string;
    imageUrl: string;
    createdAt?: Date | string;
};
export type GalleryImageUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GalleryImageUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GalleryImageListRelationFilter = {
    every?: Prisma.GalleryImageWhereInput;
    some?: Prisma.GalleryImageWhereInput;
    none?: Prisma.GalleryImageWhereInput;
};
export type GalleryImageOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type GalleryImageCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type GalleryImageMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type GalleryImageMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type GalleryImageCreateNestedManyWithoutProviderInput = {
    create?: Prisma.XOR<Prisma.GalleryImageCreateWithoutProviderInput, Prisma.GalleryImageUncheckedCreateWithoutProviderInput> | Prisma.GalleryImageCreateWithoutProviderInput[] | Prisma.GalleryImageUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.GalleryImageCreateOrConnectWithoutProviderInput | Prisma.GalleryImageCreateOrConnectWithoutProviderInput[];
    createMany?: Prisma.GalleryImageCreateManyProviderInputEnvelope;
    connect?: Prisma.GalleryImageWhereUniqueInput | Prisma.GalleryImageWhereUniqueInput[];
};
export type GalleryImageUncheckedCreateNestedManyWithoutProviderInput = {
    create?: Prisma.XOR<Prisma.GalleryImageCreateWithoutProviderInput, Prisma.GalleryImageUncheckedCreateWithoutProviderInput> | Prisma.GalleryImageCreateWithoutProviderInput[] | Prisma.GalleryImageUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.GalleryImageCreateOrConnectWithoutProviderInput | Prisma.GalleryImageCreateOrConnectWithoutProviderInput[];
    createMany?: Prisma.GalleryImageCreateManyProviderInputEnvelope;
    connect?: Prisma.GalleryImageWhereUniqueInput | Prisma.GalleryImageWhereUniqueInput[];
};
export type GalleryImageUpdateManyWithoutProviderNestedInput = {
    create?: Prisma.XOR<Prisma.GalleryImageCreateWithoutProviderInput, Prisma.GalleryImageUncheckedCreateWithoutProviderInput> | Prisma.GalleryImageCreateWithoutProviderInput[] | Prisma.GalleryImageUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.GalleryImageCreateOrConnectWithoutProviderInput | Prisma.GalleryImageCreateOrConnectWithoutProviderInput[];
    upsert?: Prisma.GalleryImageUpsertWithWhereUniqueWithoutProviderInput | Prisma.GalleryImageUpsertWithWhereUniqueWithoutProviderInput[];
    createMany?: Prisma.GalleryImageCreateManyProviderInputEnvelope;
    set?: Prisma.GalleryImageWhereUniqueInput | Prisma.GalleryImageWhereUniqueInput[];
    disconnect?: Prisma.GalleryImageWhereUniqueInput | Prisma.GalleryImageWhereUniqueInput[];
    delete?: Prisma.GalleryImageWhereUniqueInput | Prisma.GalleryImageWhereUniqueInput[];
    connect?: Prisma.GalleryImageWhereUniqueInput | Prisma.GalleryImageWhereUniqueInput[];
    update?: Prisma.GalleryImageUpdateWithWhereUniqueWithoutProviderInput | Prisma.GalleryImageUpdateWithWhereUniqueWithoutProviderInput[];
    updateMany?: Prisma.GalleryImageUpdateManyWithWhereWithoutProviderInput | Prisma.GalleryImageUpdateManyWithWhereWithoutProviderInput[];
    deleteMany?: Prisma.GalleryImageScalarWhereInput | Prisma.GalleryImageScalarWhereInput[];
};
export type GalleryImageUncheckedUpdateManyWithoutProviderNestedInput = {
    create?: Prisma.XOR<Prisma.GalleryImageCreateWithoutProviderInput, Prisma.GalleryImageUncheckedCreateWithoutProviderInput> | Prisma.GalleryImageCreateWithoutProviderInput[] | Prisma.GalleryImageUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.GalleryImageCreateOrConnectWithoutProviderInput | Prisma.GalleryImageCreateOrConnectWithoutProviderInput[];
    upsert?: Prisma.GalleryImageUpsertWithWhereUniqueWithoutProviderInput | Prisma.GalleryImageUpsertWithWhereUniqueWithoutProviderInput[];
    createMany?: Prisma.GalleryImageCreateManyProviderInputEnvelope;
    set?: Prisma.GalleryImageWhereUniqueInput | Prisma.GalleryImageWhereUniqueInput[];
    disconnect?: Prisma.GalleryImageWhereUniqueInput | Prisma.GalleryImageWhereUniqueInput[];
    delete?: Prisma.GalleryImageWhereUniqueInput | Prisma.GalleryImageWhereUniqueInput[];
    connect?: Prisma.GalleryImageWhereUniqueInput | Prisma.GalleryImageWhereUniqueInput[];
    update?: Prisma.GalleryImageUpdateWithWhereUniqueWithoutProviderInput | Prisma.GalleryImageUpdateWithWhereUniqueWithoutProviderInput[];
    updateMany?: Prisma.GalleryImageUpdateManyWithWhereWithoutProviderInput | Prisma.GalleryImageUpdateManyWithWhereWithoutProviderInput[];
    deleteMany?: Prisma.GalleryImageScalarWhereInput | Prisma.GalleryImageScalarWhereInput[];
};
export type GalleryImageCreateWithoutProviderInput = {
    id?: string;
    imageUrl: string;
    createdAt?: Date | string;
};
export type GalleryImageUncheckedCreateWithoutProviderInput = {
    id?: string;
    imageUrl: string;
    createdAt?: Date | string;
};
export type GalleryImageCreateOrConnectWithoutProviderInput = {
    where: Prisma.GalleryImageWhereUniqueInput;
    create: Prisma.XOR<Prisma.GalleryImageCreateWithoutProviderInput, Prisma.GalleryImageUncheckedCreateWithoutProviderInput>;
};
export type GalleryImageCreateManyProviderInputEnvelope = {
    data: Prisma.GalleryImageCreateManyProviderInput | Prisma.GalleryImageCreateManyProviderInput[];
    skipDuplicates?: boolean;
};
export type GalleryImageUpsertWithWhereUniqueWithoutProviderInput = {
    where: Prisma.GalleryImageWhereUniqueInput;
    update: Prisma.XOR<Prisma.GalleryImageUpdateWithoutProviderInput, Prisma.GalleryImageUncheckedUpdateWithoutProviderInput>;
    create: Prisma.XOR<Prisma.GalleryImageCreateWithoutProviderInput, Prisma.GalleryImageUncheckedCreateWithoutProviderInput>;
};
export type GalleryImageUpdateWithWhereUniqueWithoutProviderInput = {
    where: Prisma.GalleryImageWhereUniqueInput;
    data: Prisma.XOR<Prisma.GalleryImageUpdateWithoutProviderInput, Prisma.GalleryImageUncheckedUpdateWithoutProviderInput>;
};
export type GalleryImageUpdateManyWithWhereWithoutProviderInput = {
    where: Prisma.GalleryImageScalarWhereInput;
    data: Prisma.XOR<Prisma.GalleryImageUpdateManyMutationInput, Prisma.GalleryImageUncheckedUpdateManyWithoutProviderInput>;
};
export type GalleryImageScalarWhereInput = {
    AND?: Prisma.GalleryImageScalarWhereInput | Prisma.GalleryImageScalarWhereInput[];
    OR?: Prisma.GalleryImageScalarWhereInput[];
    NOT?: Prisma.GalleryImageScalarWhereInput | Prisma.GalleryImageScalarWhereInput[];
    id?: Prisma.StringFilter<"GalleryImage"> | string;
    providerId?: Prisma.StringFilter<"GalleryImage"> | string;
    imageUrl?: Prisma.StringFilter<"GalleryImage"> | string;
    createdAt?: Prisma.DateTimeFilter<"GalleryImage"> | Date | string;
};
export type GalleryImageCreateManyProviderInput = {
    id?: string;
    imageUrl: string;
    createdAt?: Date | string;
};
export type GalleryImageUpdateWithoutProviderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GalleryImageUncheckedUpdateWithoutProviderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GalleryImageUncheckedUpdateManyWithoutProviderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GalleryImageSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    providerId?: boolean;
    imageUrl?: boolean;
    createdAt?: boolean;
    provider?: boolean | Prisma.ProviderProfileDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["galleryImage"]>;
export type GalleryImageSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    providerId?: boolean;
    imageUrl?: boolean;
    createdAt?: boolean;
    provider?: boolean | Prisma.ProviderProfileDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["galleryImage"]>;
export type GalleryImageSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    providerId?: boolean;
    imageUrl?: boolean;
    createdAt?: boolean;
    provider?: boolean | Prisma.ProviderProfileDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["galleryImage"]>;
export type GalleryImageSelectScalar = {
    id?: boolean;
    providerId?: boolean;
    imageUrl?: boolean;
    createdAt?: boolean;
};
export type GalleryImageOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "providerId" | "imageUrl" | "createdAt", ExtArgs["result"]["galleryImage"]>;
export type GalleryImageInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    provider?: boolean | Prisma.ProviderProfileDefaultArgs<ExtArgs>;
};
export type GalleryImageIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    provider?: boolean | Prisma.ProviderProfileDefaultArgs<ExtArgs>;
};
export type GalleryImageIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    provider?: boolean | Prisma.ProviderProfileDefaultArgs<ExtArgs>;
};
export type $GalleryImagePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "GalleryImage";
    objects: {
        provider: Prisma.$ProviderProfilePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        providerId: string;
        imageUrl: string;
        createdAt: Date;
    }, ExtArgs["result"]["galleryImage"]>;
    composites: {};
};
export type GalleryImageGetPayload<S extends boolean | null | undefined | GalleryImageDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$GalleryImagePayload, S>;
export type GalleryImageCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<GalleryImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: GalleryImageCountAggregateInputType | true;
};
export interface GalleryImageDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['GalleryImage'];
        meta: {
            name: 'GalleryImage';
        };
    };
    findUnique<T extends GalleryImageFindUniqueArgs>(args: Prisma.SelectSubset<T, GalleryImageFindUniqueArgs<ExtArgs>>): Prisma.Prisma__GalleryImageClient<runtime.Types.Result.GetResult<Prisma.$GalleryImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends GalleryImageFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, GalleryImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__GalleryImageClient<runtime.Types.Result.GetResult<Prisma.$GalleryImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends GalleryImageFindFirstArgs>(args?: Prisma.SelectSubset<T, GalleryImageFindFirstArgs<ExtArgs>>): Prisma.Prisma__GalleryImageClient<runtime.Types.Result.GetResult<Prisma.$GalleryImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends GalleryImageFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, GalleryImageFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__GalleryImageClient<runtime.Types.Result.GetResult<Prisma.$GalleryImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends GalleryImageFindManyArgs>(args?: Prisma.SelectSubset<T, GalleryImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GalleryImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends GalleryImageCreateArgs>(args: Prisma.SelectSubset<T, GalleryImageCreateArgs<ExtArgs>>): Prisma.Prisma__GalleryImageClient<runtime.Types.Result.GetResult<Prisma.$GalleryImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends GalleryImageCreateManyArgs>(args?: Prisma.SelectSubset<T, GalleryImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends GalleryImageCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, GalleryImageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GalleryImagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends GalleryImageDeleteArgs>(args: Prisma.SelectSubset<T, GalleryImageDeleteArgs<ExtArgs>>): Prisma.Prisma__GalleryImageClient<runtime.Types.Result.GetResult<Prisma.$GalleryImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends GalleryImageUpdateArgs>(args: Prisma.SelectSubset<T, GalleryImageUpdateArgs<ExtArgs>>): Prisma.Prisma__GalleryImageClient<runtime.Types.Result.GetResult<Prisma.$GalleryImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends GalleryImageDeleteManyArgs>(args?: Prisma.SelectSubset<T, GalleryImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends GalleryImageUpdateManyArgs>(args: Prisma.SelectSubset<T, GalleryImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends GalleryImageUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, GalleryImageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GalleryImagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends GalleryImageUpsertArgs>(args: Prisma.SelectSubset<T, GalleryImageUpsertArgs<ExtArgs>>): Prisma.Prisma__GalleryImageClient<runtime.Types.Result.GetResult<Prisma.$GalleryImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends GalleryImageCountArgs>(args?: Prisma.Subset<T, GalleryImageCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], GalleryImageCountAggregateOutputType> : number>;
    aggregate<T extends GalleryImageAggregateArgs>(args: Prisma.Subset<T, GalleryImageAggregateArgs>): Prisma.PrismaPromise<GetGalleryImageAggregateType<T>>;
    groupBy<T extends GalleryImageGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: GalleryImageGroupByArgs['orderBy'];
    } : {
        orderBy?: GalleryImageGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, GalleryImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGalleryImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: GalleryImageFieldRefs;
}
export interface Prisma__GalleryImageClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    provider<T extends Prisma.ProviderProfileDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProviderProfileDefaultArgs<ExtArgs>>): Prisma.Prisma__ProviderProfileClient<runtime.Types.Result.GetResult<Prisma.$ProviderProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface GalleryImageFieldRefs {
    readonly id: Prisma.FieldRef<"GalleryImage", 'String'>;
    readonly providerId: Prisma.FieldRef<"GalleryImage", 'String'>;
    readonly imageUrl: Prisma.FieldRef<"GalleryImage", 'String'>;
    readonly createdAt: Prisma.FieldRef<"GalleryImage", 'DateTime'>;
}
export type GalleryImageFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GalleryImageSelect<ExtArgs> | null;
    omit?: Prisma.GalleryImageOmit<ExtArgs> | null;
    include?: Prisma.GalleryImageInclude<ExtArgs> | null;
    where: Prisma.GalleryImageWhereUniqueInput;
};
export type GalleryImageFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GalleryImageSelect<ExtArgs> | null;
    omit?: Prisma.GalleryImageOmit<ExtArgs> | null;
    include?: Prisma.GalleryImageInclude<ExtArgs> | null;
    where: Prisma.GalleryImageWhereUniqueInput;
};
export type GalleryImageFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GalleryImageSelect<ExtArgs> | null;
    omit?: Prisma.GalleryImageOmit<ExtArgs> | null;
    include?: Prisma.GalleryImageInclude<ExtArgs> | null;
    where?: Prisma.GalleryImageWhereInput;
    orderBy?: Prisma.GalleryImageOrderByWithRelationInput | Prisma.GalleryImageOrderByWithRelationInput[];
    cursor?: Prisma.GalleryImageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GalleryImageScalarFieldEnum | Prisma.GalleryImageScalarFieldEnum[];
};
export type GalleryImageFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GalleryImageSelect<ExtArgs> | null;
    omit?: Prisma.GalleryImageOmit<ExtArgs> | null;
    include?: Prisma.GalleryImageInclude<ExtArgs> | null;
    where?: Prisma.GalleryImageWhereInput;
    orderBy?: Prisma.GalleryImageOrderByWithRelationInput | Prisma.GalleryImageOrderByWithRelationInput[];
    cursor?: Prisma.GalleryImageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GalleryImageScalarFieldEnum | Prisma.GalleryImageScalarFieldEnum[];
};
export type GalleryImageFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GalleryImageSelect<ExtArgs> | null;
    omit?: Prisma.GalleryImageOmit<ExtArgs> | null;
    include?: Prisma.GalleryImageInclude<ExtArgs> | null;
    where?: Prisma.GalleryImageWhereInput;
    orderBy?: Prisma.GalleryImageOrderByWithRelationInput | Prisma.GalleryImageOrderByWithRelationInput[];
    cursor?: Prisma.GalleryImageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GalleryImageScalarFieldEnum | Prisma.GalleryImageScalarFieldEnum[];
};
export type GalleryImageCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GalleryImageSelect<ExtArgs> | null;
    omit?: Prisma.GalleryImageOmit<ExtArgs> | null;
    include?: Prisma.GalleryImageInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GalleryImageCreateInput, Prisma.GalleryImageUncheckedCreateInput>;
};
export type GalleryImageCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.GalleryImageCreateManyInput | Prisma.GalleryImageCreateManyInput[];
    skipDuplicates?: boolean;
};
export type GalleryImageCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GalleryImageSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.GalleryImageOmit<ExtArgs> | null;
    data: Prisma.GalleryImageCreateManyInput | Prisma.GalleryImageCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.GalleryImageIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type GalleryImageUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GalleryImageSelect<ExtArgs> | null;
    omit?: Prisma.GalleryImageOmit<ExtArgs> | null;
    include?: Prisma.GalleryImageInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GalleryImageUpdateInput, Prisma.GalleryImageUncheckedUpdateInput>;
    where: Prisma.GalleryImageWhereUniqueInput;
};
export type GalleryImageUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.GalleryImageUpdateManyMutationInput, Prisma.GalleryImageUncheckedUpdateManyInput>;
    where?: Prisma.GalleryImageWhereInput;
    limit?: number;
};
export type GalleryImageUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GalleryImageSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.GalleryImageOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GalleryImageUpdateManyMutationInput, Prisma.GalleryImageUncheckedUpdateManyInput>;
    where?: Prisma.GalleryImageWhereInput;
    limit?: number;
    include?: Prisma.GalleryImageIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type GalleryImageUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GalleryImageSelect<ExtArgs> | null;
    omit?: Prisma.GalleryImageOmit<ExtArgs> | null;
    include?: Prisma.GalleryImageInclude<ExtArgs> | null;
    where: Prisma.GalleryImageWhereUniqueInput;
    create: Prisma.XOR<Prisma.GalleryImageCreateInput, Prisma.GalleryImageUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.GalleryImageUpdateInput, Prisma.GalleryImageUncheckedUpdateInput>;
};
export type GalleryImageDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GalleryImageSelect<ExtArgs> | null;
    omit?: Prisma.GalleryImageOmit<ExtArgs> | null;
    include?: Prisma.GalleryImageInclude<ExtArgs> | null;
    where: Prisma.GalleryImageWhereUniqueInput;
};
export type GalleryImageDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GalleryImageWhereInput;
    limit?: number;
};
export type GalleryImageDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GalleryImageSelect<ExtArgs> | null;
    omit?: Prisma.GalleryImageOmit<ExtArgs> | null;
    include?: Prisma.GalleryImageInclude<ExtArgs> | null;
};
export {};
