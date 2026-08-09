import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
export type JobImageModel = runtime.Types.Result.DefaultSelection<Prisma.$JobImagePayload>;
export type AggregateJobImage = {
    _count: JobImageCountAggregateOutputType | null;
    _min: JobImageMinAggregateOutputType | null;
    _max: JobImageMaxAggregateOutputType | null;
};
export type JobImageMinAggregateOutputType = {
    id: string | null;
    jobId: string | null;
    imageUrl: string | null;
    createdAt: Date | null;
};
export type JobImageMaxAggregateOutputType = {
    id: string | null;
    jobId: string | null;
    imageUrl: string | null;
    createdAt: Date | null;
};
export type JobImageCountAggregateOutputType = {
    id: number;
    jobId: number;
    imageUrl: number;
    createdAt: number;
    _all: number;
};
export type JobImageMinAggregateInputType = {
    id?: true;
    jobId?: true;
    imageUrl?: true;
    createdAt?: true;
};
export type JobImageMaxAggregateInputType = {
    id?: true;
    jobId?: true;
    imageUrl?: true;
    createdAt?: true;
};
export type JobImageCountAggregateInputType = {
    id?: true;
    jobId?: true;
    imageUrl?: true;
    createdAt?: true;
    _all?: true;
};
export type JobImageAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobImageWhereInput;
    orderBy?: Prisma.JobImageOrderByWithRelationInput | Prisma.JobImageOrderByWithRelationInput[];
    cursor?: Prisma.JobImageWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | JobImageCountAggregateInputType;
    _min?: JobImageMinAggregateInputType;
    _max?: JobImageMaxAggregateInputType;
};
export type GetJobImageAggregateType<T extends JobImageAggregateArgs> = {
    [P in keyof T & keyof AggregateJobImage]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateJobImage[P]> : Prisma.GetScalarType<T[P], AggregateJobImage[P]>;
};
export type JobImageGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobImageWhereInput;
    orderBy?: Prisma.JobImageOrderByWithAggregationInput | Prisma.JobImageOrderByWithAggregationInput[];
    by: Prisma.JobImageScalarFieldEnum[] | Prisma.JobImageScalarFieldEnum;
    having?: Prisma.JobImageScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: JobImageCountAggregateInputType | true;
    _min?: JobImageMinAggregateInputType;
    _max?: JobImageMaxAggregateInputType;
};
export type JobImageGroupByOutputType = {
    id: string;
    jobId: string;
    imageUrl: string;
    createdAt: Date;
    _count: JobImageCountAggregateOutputType | null;
    _min: JobImageMinAggregateOutputType | null;
    _max: JobImageMaxAggregateOutputType | null;
};
type GetJobImageGroupByPayload<T extends JobImageGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<JobImageGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof JobImageGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], JobImageGroupByOutputType[P]> : Prisma.GetScalarType<T[P], JobImageGroupByOutputType[P]>;
}>>;
export type JobImageWhereInput = {
    AND?: Prisma.JobImageWhereInput | Prisma.JobImageWhereInput[];
    OR?: Prisma.JobImageWhereInput[];
    NOT?: Prisma.JobImageWhereInput | Prisma.JobImageWhereInput[];
    id?: Prisma.StringFilter<"JobImage"> | string;
    jobId?: Prisma.StringFilter<"JobImage"> | string;
    imageUrl?: Prisma.StringFilter<"JobImage"> | string;
    createdAt?: Prisma.DateTimeFilter<"JobImage"> | Date | string;
    job?: Prisma.XOR<Prisma.JobScalarRelationFilter, Prisma.JobWhereInput>;
};
export type JobImageOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    job?: Prisma.JobOrderByWithRelationInput;
};
export type JobImageWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.JobImageWhereInput | Prisma.JobImageWhereInput[];
    OR?: Prisma.JobImageWhereInput[];
    NOT?: Prisma.JobImageWhereInput | Prisma.JobImageWhereInput[];
    jobId?: Prisma.StringFilter<"JobImage"> | string;
    imageUrl?: Prisma.StringFilter<"JobImage"> | string;
    createdAt?: Prisma.DateTimeFilter<"JobImage"> | Date | string;
    job?: Prisma.XOR<Prisma.JobScalarRelationFilter, Prisma.JobWhereInput>;
}, "id">;
export type JobImageOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.JobImageCountOrderByAggregateInput;
    _max?: Prisma.JobImageMaxOrderByAggregateInput;
    _min?: Prisma.JobImageMinOrderByAggregateInput;
};
export type JobImageScalarWhereWithAggregatesInput = {
    AND?: Prisma.JobImageScalarWhereWithAggregatesInput | Prisma.JobImageScalarWhereWithAggregatesInput[];
    OR?: Prisma.JobImageScalarWhereWithAggregatesInput[];
    NOT?: Prisma.JobImageScalarWhereWithAggregatesInput | Prisma.JobImageScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"JobImage"> | string;
    jobId?: Prisma.StringWithAggregatesFilter<"JobImage"> | string;
    imageUrl?: Prisma.StringWithAggregatesFilter<"JobImage"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"JobImage"> | Date | string;
};
export type JobImageCreateInput = {
    id?: string;
    imageUrl: string;
    createdAt?: Date | string;
    job: Prisma.JobCreateNestedOneWithoutImagesInput;
};
export type JobImageUncheckedCreateInput = {
    id?: string;
    jobId: string;
    imageUrl: string;
    createdAt?: Date | string;
};
export type JobImageUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneRequiredWithoutImagesNestedInput;
};
export type JobImageUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JobImageCreateManyInput = {
    id?: string;
    jobId: string;
    imageUrl: string;
    createdAt?: Date | string;
};
export type JobImageUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JobImageUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JobImageListRelationFilter = {
    every?: Prisma.JobImageWhereInput;
    some?: Prisma.JobImageWhereInput;
    none?: Prisma.JobImageWhereInput;
};
export type JobImageOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type JobImageCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type JobImageMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type JobImageMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type JobImageCreateNestedManyWithoutJobInput = {
    create?: Prisma.XOR<Prisma.JobImageCreateWithoutJobInput, Prisma.JobImageUncheckedCreateWithoutJobInput> | Prisma.JobImageCreateWithoutJobInput[] | Prisma.JobImageUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.JobImageCreateOrConnectWithoutJobInput | Prisma.JobImageCreateOrConnectWithoutJobInput[];
    createMany?: Prisma.JobImageCreateManyJobInputEnvelope;
    connect?: Prisma.JobImageWhereUniqueInput | Prisma.JobImageWhereUniqueInput[];
};
export type JobImageUncheckedCreateNestedManyWithoutJobInput = {
    create?: Prisma.XOR<Prisma.JobImageCreateWithoutJobInput, Prisma.JobImageUncheckedCreateWithoutJobInput> | Prisma.JobImageCreateWithoutJobInput[] | Prisma.JobImageUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.JobImageCreateOrConnectWithoutJobInput | Prisma.JobImageCreateOrConnectWithoutJobInput[];
    createMany?: Prisma.JobImageCreateManyJobInputEnvelope;
    connect?: Prisma.JobImageWhereUniqueInput | Prisma.JobImageWhereUniqueInput[];
};
export type JobImageUpdateManyWithoutJobNestedInput = {
    create?: Prisma.XOR<Prisma.JobImageCreateWithoutJobInput, Prisma.JobImageUncheckedCreateWithoutJobInput> | Prisma.JobImageCreateWithoutJobInput[] | Prisma.JobImageUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.JobImageCreateOrConnectWithoutJobInput | Prisma.JobImageCreateOrConnectWithoutJobInput[];
    upsert?: Prisma.JobImageUpsertWithWhereUniqueWithoutJobInput | Prisma.JobImageUpsertWithWhereUniqueWithoutJobInput[];
    createMany?: Prisma.JobImageCreateManyJobInputEnvelope;
    set?: Prisma.JobImageWhereUniqueInput | Prisma.JobImageWhereUniqueInput[];
    disconnect?: Prisma.JobImageWhereUniqueInput | Prisma.JobImageWhereUniqueInput[];
    delete?: Prisma.JobImageWhereUniqueInput | Prisma.JobImageWhereUniqueInput[];
    connect?: Prisma.JobImageWhereUniqueInput | Prisma.JobImageWhereUniqueInput[];
    update?: Prisma.JobImageUpdateWithWhereUniqueWithoutJobInput | Prisma.JobImageUpdateWithWhereUniqueWithoutJobInput[];
    updateMany?: Prisma.JobImageUpdateManyWithWhereWithoutJobInput | Prisma.JobImageUpdateManyWithWhereWithoutJobInput[];
    deleteMany?: Prisma.JobImageScalarWhereInput | Prisma.JobImageScalarWhereInput[];
};
export type JobImageUncheckedUpdateManyWithoutJobNestedInput = {
    create?: Prisma.XOR<Prisma.JobImageCreateWithoutJobInput, Prisma.JobImageUncheckedCreateWithoutJobInput> | Prisma.JobImageCreateWithoutJobInput[] | Prisma.JobImageUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.JobImageCreateOrConnectWithoutJobInput | Prisma.JobImageCreateOrConnectWithoutJobInput[];
    upsert?: Prisma.JobImageUpsertWithWhereUniqueWithoutJobInput | Prisma.JobImageUpsertWithWhereUniqueWithoutJobInput[];
    createMany?: Prisma.JobImageCreateManyJobInputEnvelope;
    set?: Prisma.JobImageWhereUniqueInput | Prisma.JobImageWhereUniqueInput[];
    disconnect?: Prisma.JobImageWhereUniqueInput | Prisma.JobImageWhereUniqueInput[];
    delete?: Prisma.JobImageWhereUniqueInput | Prisma.JobImageWhereUniqueInput[];
    connect?: Prisma.JobImageWhereUniqueInput | Prisma.JobImageWhereUniqueInput[];
    update?: Prisma.JobImageUpdateWithWhereUniqueWithoutJobInput | Prisma.JobImageUpdateWithWhereUniqueWithoutJobInput[];
    updateMany?: Prisma.JobImageUpdateManyWithWhereWithoutJobInput | Prisma.JobImageUpdateManyWithWhereWithoutJobInput[];
    deleteMany?: Prisma.JobImageScalarWhereInput | Prisma.JobImageScalarWhereInput[];
};
export type JobImageCreateWithoutJobInput = {
    id?: string;
    imageUrl: string;
    createdAt?: Date | string;
};
export type JobImageUncheckedCreateWithoutJobInput = {
    id?: string;
    imageUrl: string;
    createdAt?: Date | string;
};
export type JobImageCreateOrConnectWithoutJobInput = {
    where: Prisma.JobImageWhereUniqueInput;
    create: Prisma.XOR<Prisma.JobImageCreateWithoutJobInput, Prisma.JobImageUncheckedCreateWithoutJobInput>;
};
export type JobImageCreateManyJobInputEnvelope = {
    data: Prisma.JobImageCreateManyJobInput | Prisma.JobImageCreateManyJobInput[];
    skipDuplicates?: boolean;
};
export type JobImageUpsertWithWhereUniqueWithoutJobInput = {
    where: Prisma.JobImageWhereUniqueInput;
    update: Prisma.XOR<Prisma.JobImageUpdateWithoutJobInput, Prisma.JobImageUncheckedUpdateWithoutJobInput>;
    create: Prisma.XOR<Prisma.JobImageCreateWithoutJobInput, Prisma.JobImageUncheckedCreateWithoutJobInput>;
};
export type JobImageUpdateWithWhereUniqueWithoutJobInput = {
    where: Prisma.JobImageWhereUniqueInput;
    data: Prisma.XOR<Prisma.JobImageUpdateWithoutJobInput, Prisma.JobImageUncheckedUpdateWithoutJobInput>;
};
export type JobImageUpdateManyWithWhereWithoutJobInput = {
    where: Prisma.JobImageScalarWhereInput;
    data: Prisma.XOR<Prisma.JobImageUpdateManyMutationInput, Prisma.JobImageUncheckedUpdateManyWithoutJobInput>;
};
export type JobImageScalarWhereInput = {
    AND?: Prisma.JobImageScalarWhereInput | Prisma.JobImageScalarWhereInput[];
    OR?: Prisma.JobImageScalarWhereInput[];
    NOT?: Prisma.JobImageScalarWhereInput | Prisma.JobImageScalarWhereInput[];
    id?: Prisma.StringFilter<"JobImage"> | string;
    jobId?: Prisma.StringFilter<"JobImage"> | string;
    imageUrl?: Prisma.StringFilter<"JobImage"> | string;
    createdAt?: Prisma.DateTimeFilter<"JobImage"> | Date | string;
};
export type JobImageCreateManyJobInput = {
    id?: string;
    imageUrl: string;
    createdAt?: Date | string;
};
export type JobImageUpdateWithoutJobInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JobImageUncheckedUpdateWithoutJobInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JobImageUncheckedUpdateManyWithoutJobInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JobImageSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    jobId?: boolean;
    imageUrl?: boolean;
    createdAt?: boolean;
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["jobImage"]>;
export type JobImageSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    jobId?: boolean;
    imageUrl?: boolean;
    createdAt?: boolean;
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["jobImage"]>;
export type JobImageSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    jobId?: boolean;
    imageUrl?: boolean;
    createdAt?: boolean;
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["jobImage"]>;
export type JobImageSelectScalar = {
    id?: boolean;
    jobId?: boolean;
    imageUrl?: boolean;
    createdAt?: boolean;
};
export type JobImageOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "jobId" | "imageUrl" | "createdAt", ExtArgs["result"]["jobImage"]>;
export type JobImageInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
};
export type JobImageIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
};
export type JobImageIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
};
export type $JobImagePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "JobImage";
    objects: {
        job: Prisma.$JobPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        jobId: string;
        imageUrl: string;
        createdAt: Date;
    }, ExtArgs["result"]["jobImage"]>;
    composites: {};
};
export type JobImageGetPayload<S extends boolean | null | undefined | JobImageDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$JobImagePayload, S>;
export type JobImageCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<JobImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: JobImageCountAggregateInputType | true;
};
export interface JobImageDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['JobImage'];
        meta: {
            name: 'JobImage';
        };
    };
    findUnique<T extends JobImageFindUniqueArgs>(args: Prisma.SelectSubset<T, JobImageFindUniqueArgs<ExtArgs>>): Prisma.Prisma__JobImageClient<runtime.Types.Result.GetResult<Prisma.$JobImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends JobImageFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, JobImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__JobImageClient<runtime.Types.Result.GetResult<Prisma.$JobImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends JobImageFindFirstArgs>(args?: Prisma.SelectSubset<T, JobImageFindFirstArgs<ExtArgs>>): Prisma.Prisma__JobImageClient<runtime.Types.Result.GetResult<Prisma.$JobImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends JobImageFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, JobImageFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__JobImageClient<runtime.Types.Result.GetResult<Prisma.$JobImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends JobImageFindManyArgs>(args?: Prisma.SelectSubset<T, JobImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JobImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends JobImageCreateArgs>(args: Prisma.SelectSubset<T, JobImageCreateArgs<ExtArgs>>): Prisma.Prisma__JobImageClient<runtime.Types.Result.GetResult<Prisma.$JobImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends JobImageCreateManyArgs>(args?: Prisma.SelectSubset<T, JobImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends JobImageCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, JobImageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JobImagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends JobImageDeleteArgs>(args: Prisma.SelectSubset<T, JobImageDeleteArgs<ExtArgs>>): Prisma.Prisma__JobImageClient<runtime.Types.Result.GetResult<Prisma.$JobImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends JobImageUpdateArgs>(args: Prisma.SelectSubset<T, JobImageUpdateArgs<ExtArgs>>): Prisma.Prisma__JobImageClient<runtime.Types.Result.GetResult<Prisma.$JobImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends JobImageDeleteManyArgs>(args?: Prisma.SelectSubset<T, JobImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends JobImageUpdateManyArgs>(args: Prisma.SelectSubset<T, JobImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends JobImageUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, JobImageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JobImagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends JobImageUpsertArgs>(args: Prisma.SelectSubset<T, JobImageUpsertArgs<ExtArgs>>): Prisma.Prisma__JobImageClient<runtime.Types.Result.GetResult<Prisma.$JobImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends JobImageCountArgs>(args?: Prisma.Subset<T, JobImageCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], JobImageCountAggregateOutputType> : number>;
    aggregate<T extends JobImageAggregateArgs>(args: Prisma.Subset<T, JobImageAggregateArgs>): Prisma.PrismaPromise<GetJobImageAggregateType<T>>;
    groupBy<T extends JobImageGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: JobImageGroupByArgs['orderBy'];
    } : {
        orderBy?: JobImageGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, JobImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: JobImageFieldRefs;
}
export interface Prisma__JobImageClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    job<T extends Prisma.JobDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.JobDefaultArgs<ExtArgs>>): Prisma.Prisma__JobClient<runtime.Types.Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface JobImageFieldRefs {
    readonly id: Prisma.FieldRef<"JobImage", 'String'>;
    readonly jobId: Prisma.FieldRef<"JobImage", 'String'>;
    readonly imageUrl: Prisma.FieldRef<"JobImage", 'String'>;
    readonly createdAt: Prisma.FieldRef<"JobImage", 'DateTime'>;
}
export type JobImageFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobImageSelect<ExtArgs> | null;
    omit?: Prisma.JobImageOmit<ExtArgs> | null;
    include?: Prisma.JobImageInclude<ExtArgs> | null;
    where: Prisma.JobImageWhereUniqueInput;
};
export type JobImageFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobImageSelect<ExtArgs> | null;
    omit?: Prisma.JobImageOmit<ExtArgs> | null;
    include?: Prisma.JobImageInclude<ExtArgs> | null;
    where: Prisma.JobImageWhereUniqueInput;
};
export type JobImageFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobImageSelect<ExtArgs> | null;
    omit?: Prisma.JobImageOmit<ExtArgs> | null;
    include?: Prisma.JobImageInclude<ExtArgs> | null;
    where?: Prisma.JobImageWhereInput;
    orderBy?: Prisma.JobImageOrderByWithRelationInput | Prisma.JobImageOrderByWithRelationInput[];
    cursor?: Prisma.JobImageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobImageScalarFieldEnum | Prisma.JobImageScalarFieldEnum[];
};
export type JobImageFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobImageSelect<ExtArgs> | null;
    omit?: Prisma.JobImageOmit<ExtArgs> | null;
    include?: Prisma.JobImageInclude<ExtArgs> | null;
    where?: Prisma.JobImageWhereInput;
    orderBy?: Prisma.JobImageOrderByWithRelationInput | Prisma.JobImageOrderByWithRelationInput[];
    cursor?: Prisma.JobImageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobImageScalarFieldEnum | Prisma.JobImageScalarFieldEnum[];
};
export type JobImageFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobImageSelect<ExtArgs> | null;
    omit?: Prisma.JobImageOmit<ExtArgs> | null;
    include?: Prisma.JobImageInclude<ExtArgs> | null;
    where?: Prisma.JobImageWhereInput;
    orderBy?: Prisma.JobImageOrderByWithRelationInput | Prisma.JobImageOrderByWithRelationInput[];
    cursor?: Prisma.JobImageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobImageScalarFieldEnum | Prisma.JobImageScalarFieldEnum[];
};
export type JobImageCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobImageSelect<ExtArgs> | null;
    omit?: Prisma.JobImageOmit<ExtArgs> | null;
    include?: Prisma.JobImageInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.JobImageCreateInput, Prisma.JobImageUncheckedCreateInput>;
};
export type JobImageCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.JobImageCreateManyInput | Prisma.JobImageCreateManyInput[];
    skipDuplicates?: boolean;
};
export type JobImageCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobImageSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.JobImageOmit<ExtArgs> | null;
    data: Prisma.JobImageCreateManyInput | Prisma.JobImageCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.JobImageIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type JobImageUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobImageSelect<ExtArgs> | null;
    omit?: Prisma.JobImageOmit<ExtArgs> | null;
    include?: Prisma.JobImageInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.JobImageUpdateInput, Prisma.JobImageUncheckedUpdateInput>;
    where: Prisma.JobImageWhereUniqueInput;
};
export type JobImageUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.JobImageUpdateManyMutationInput, Prisma.JobImageUncheckedUpdateManyInput>;
    where?: Prisma.JobImageWhereInput;
    limit?: number;
};
export type JobImageUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobImageSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.JobImageOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.JobImageUpdateManyMutationInput, Prisma.JobImageUncheckedUpdateManyInput>;
    where?: Prisma.JobImageWhereInput;
    limit?: number;
    include?: Prisma.JobImageIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type JobImageUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobImageSelect<ExtArgs> | null;
    omit?: Prisma.JobImageOmit<ExtArgs> | null;
    include?: Prisma.JobImageInclude<ExtArgs> | null;
    where: Prisma.JobImageWhereUniqueInput;
    create: Prisma.XOR<Prisma.JobImageCreateInput, Prisma.JobImageUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.JobImageUpdateInput, Prisma.JobImageUncheckedUpdateInput>;
};
export type JobImageDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobImageSelect<ExtArgs> | null;
    omit?: Prisma.JobImageOmit<ExtArgs> | null;
    include?: Prisma.JobImageInclude<ExtArgs> | null;
    where: Prisma.JobImageWhereUniqueInput;
};
export type JobImageDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobImageWhereInput;
    limit?: number;
};
export type JobImageDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobImageSelect<ExtArgs> | null;
    omit?: Prisma.JobImageOmit<ExtArgs> | null;
    include?: Prisma.JobImageInclude<ExtArgs> | null;
};
export {};
