import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
export type JobTimelineModel = runtime.Types.Result.DefaultSelection<Prisma.$JobTimelinePayload>;
export type AggregateJobTimeline = {
    _count: JobTimelineCountAggregateOutputType | null;
    _min: JobTimelineMinAggregateOutputType | null;
    _max: JobTimelineMaxAggregateOutputType | null;
};
export type JobTimelineMinAggregateOutputType = {
    id: string | null;
    jobId: string | null;
    event: string | null;
    description: string | null;
    createdAt: Date | null;
};
export type JobTimelineMaxAggregateOutputType = {
    id: string | null;
    jobId: string | null;
    event: string | null;
    description: string | null;
    createdAt: Date | null;
};
export type JobTimelineCountAggregateOutputType = {
    id: number;
    jobId: number;
    event: number;
    description: number;
    createdAt: number;
    _all: number;
};
export type JobTimelineMinAggregateInputType = {
    id?: true;
    jobId?: true;
    event?: true;
    description?: true;
    createdAt?: true;
};
export type JobTimelineMaxAggregateInputType = {
    id?: true;
    jobId?: true;
    event?: true;
    description?: true;
    createdAt?: true;
};
export type JobTimelineCountAggregateInputType = {
    id?: true;
    jobId?: true;
    event?: true;
    description?: true;
    createdAt?: true;
    _all?: true;
};
export type JobTimelineAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobTimelineWhereInput;
    orderBy?: Prisma.JobTimelineOrderByWithRelationInput | Prisma.JobTimelineOrderByWithRelationInput[];
    cursor?: Prisma.JobTimelineWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | JobTimelineCountAggregateInputType;
    _min?: JobTimelineMinAggregateInputType;
    _max?: JobTimelineMaxAggregateInputType;
};
export type GetJobTimelineAggregateType<T extends JobTimelineAggregateArgs> = {
    [P in keyof T & keyof AggregateJobTimeline]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateJobTimeline[P]> : Prisma.GetScalarType<T[P], AggregateJobTimeline[P]>;
};
export type JobTimelineGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobTimelineWhereInput;
    orderBy?: Prisma.JobTimelineOrderByWithAggregationInput | Prisma.JobTimelineOrderByWithAggregationInput[];
    by: Prisma.JobTimelineScalarFieldEnum[] | Prisma.JobTimelineScalarFieldEnum;
    having?: Prisma.JobTimelineScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: JobTimelineCountAggregateInputType | true;
    _min?: JobTimelineMinAggregateInputType;
    _max?: JobTimelineMaxAggregateInputType;
};
export type JobTimelineGroupByOutputType = {
    id: string;
    jobId: string;
    event: string;
    description: string | null;
    createdAt: Date;
    _count: JobTimelineCountAggregateOutputType | null;
    _min: JobTimelineMinAggregateOutputType | null;
    _max: JobTimelineMaxAggregateOutputType | null;
};
type GetJobTimelineGroupByPayload<T extends JobTimelineGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<JobTimelineGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof JobTimelineGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], JobTimelineGroupByOutputType[P]> : Prisma.GetScalarType<T[P], JobTimelineGroupByOutputType[P]>;
}>>;
export type JobTimelineWhereInput = {
    AND?: Prisma.JobTimelineWhereInput | Prisma.JobTimelineWhereInput[];
    OR?: Prisma.JobTimelineWhereInput[];
    NOT?: Prisma.JobTimelineWhereInput | Prisma.JobTimelineWhereInput[];
    id?: Prisma.StringFilter<"JobTimeline"> | string;
    jobId?: Prisma.StringFilter<"JobTimeline"> | string;
    event?: Prisma.StringFilter<"JobTimeline"> | string;
    description?: Prisma.StringNullableFilter<"JobTimeline"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"JobTimeline"> | Date | string;
    job?: Prisma.XOR<Prisma.JobScalarRelationFilter, Prisma.JobWhereInput>;
};
export type JobTimelineOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    event?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    job?: Prisma.JobOrderByWithRelationInput;
};
export type JobTimelineWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.JobTimelineWhereInput | Prisma.JobTimelineWhereInput[];
    OR?: Prisma.JobTimelineWhereInput[];
    NOT?: Prisma.JobTimelineWhereInput | Prisma.JobTimelineWhereInput[];
    jobId?: Prisma.StringFilter<"JobTimeline"> | string;
    event?: Prisma.StringFilter<"JobTimeline"> | string;
    description?: Prisma.StringNullableFilter<"JobTimeline"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"JobTimeline"> | Date | string;
    job?: Prisma.XOR<Prisma.JobScalarRelationFilter, Prisma.JobWhereInput>;
}, "id">;
export type JobTimelineOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    event?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.JobTimelineCountOrderByAggregateInput;
    _max?: Prisma.JobTimelineMaxOrderByAggregateInput;
    _min?: Prisma.JobTimelineMinOrderByAggregateInput;
};
export type JobTimelineScalarWhereWithAggregatesInput = {
    AND?: Prisma.JobTimelineScalarWhereWithAggregatesInput | Prisma.JobTimelineScalarWhereWithAggregatesInput[];
    OR?: Prisma.JobTimelineScalarWhereWithAggregatesInput[];
    NOT?: Prisma.JobTimelineScalarWhereWithAggregatesInput | Prisma.JobTimelineScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"JobTimeline"> | string;
    jobId?: Prisma.StringWithAggregatesFilter<"JobTimeline"> | string;
    event?: Prisma.StringWithAggregatesFilter<"JobTimeline"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"JobTimeline"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"JobTimeline"> | Date | string;
};
export type JobTimelineCreateInput = {
    id?: string;
    event: string;
    description?: string | null;
    createdAt?: Date | string;
    job: Prisma.JobCreateNestedOneWithoutTimelineInput;
};
export type JobTimelineUncheckedCreateInput = {
    id?: string;
    jobId: string;
    event: string;
    description?: string | null;
    createdAt?: Date | string;
};
export type JobTimelineUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    event?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    job?: Prisma.JobUpdateOneRequiredWithoutTimelineNestedInput;
};
export type JobTimelineUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.StringFieldUpdateOperationsInput | string;
    event?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JobTimelineCreateManyInput = {
    id?: string;
    jobId: string;
    event: string;
    description?: string | null;
    createdAt?: Date | string;
};
export type JobTimelineUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    event?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JobTimelineUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    jobId?: Prisma.StringFieldUpdateOperationsInput | string;
    event?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JobTimelineListRelationFilter = {
    every?: Prisma.JobTimelineWhereInput;
    some?: Prisma.JobTimelineWhereInput;
    none?: Prisma.JobTimelineWhereInput;
};
export type JobTimelineOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type JobTimelineCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    event?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type JobTimelineMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    event?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type JobTimelineMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobId?: Prisma.SortOrder;
    event?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type JobTimelineCreateNestedManyWithoutJobInput = {
    create?: Prisma.XOR<Prisma.JobTimelineCreateWithoutJobInput, Prisma.JobTimelineUncheckedCreateWithoutJobInput> | Prisma.JobTimelineCreateWithoutJobInput[] | Prisma.JobTimelineUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.JobTimelineCreateOrConnectWithoutJobInput | Prisma.JobTimelineCreateOrConnectWithoutJobInput[];
    createMany?: Prisma.JobTimelineCreateManyJobInputEnvelope;
    connect?: Prisma.JobTimelineWhereUniqueInput | Prisma.JobTimelineWhereUniqueInput[];
};
export type JobTimelineUncheckedCreateNestedManyWithoutJobInput = {
    create?: Prisma.XOR<Prisma.JobTimelineCreateWithoutJobInput, Prisma.JobTimelineUncheckedCreateWithoutJobInput> | Prisma.JobTimelineCreateWithoutJobInput[] | Prisma.JobTimelineUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.JobTimelineCreateOrConnectWithoutJobInput | Prisma.JobTimelineCreateOrConnectWithoutJobInput[];
    createMany?: Prisma.JobTimelineCreateManyJobInputEnvelope;
    connect?: Prisma.JobTimelineWhereUniqueInput | Prisma.JobTimelineWhereUniqueInput[];
};
export type JobTimelineUpdateManyWithoutJobNestedInput = {
    create?: Prisma.XOR<Prisma.JobTimelineCreateWithoutJobInput, Prisma.JobTimelineUncheckedCreateWithoutJobInput> | Prisma.JobTimelineCreateWithoutJobInput[] | Prisma.JobTimelineUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.JobTimelineCreateOrConnectWithoutJobInput | Prisma.JobTimelineCreateOrConnectWithoutJobInput[];
    upsert?: Prisma.JobTimelineUpsertWithWhereUniqueWithoutJobInput | Prisma.JobTimelineUpsertWithWhereUniqueWithoutJobInput[];
    createMany?: Prisma.JobTimelineCreateManyJobInputEnvelope;
    set?: Prisma.JobTimelineWhereUniqueInput | Prisma.JobTimelineWhereUniqueInput[];
    disconnect?: Prisma.JobTimelineWhereUniqueInput | Prisma.JobTimelineWhereUniqueInput[];
    delete?: Prisma.JobTimelineWhereUniqueInput | Prisma.JobTimelineWhereUniqueInput[];
    connect?: Prisma.JobTimelineWhereUniqueInput | Prisma.JobTimelineWhereUniqueInput[];
    update?: Prisma.JobTimelineUpdateWithWhereUniqueWithoutJobInput | Prisma.JobTimelineUpdateWithWhereUniqueWithoutJobInput[];
    updateMany?: Prisma.JobTimelineUpdateManyWithWhereWithoutJobInput | Prisma.JobTimelineUpdateManyWithWhereWithoutJobInput[];
    deleteMany?: Prisma.JobTimelineScalarWhereInput | Prisma.JobTimelineScalarWhereInput[];
};
export type JobTimelineUncheckedUpdateManyWithoutJobNestedInput = {
    create?: Prisma.XOR<Prisma.JobTimelineCreateWithoutJobInput, Prisma.JobTimelineUncheckedCreateWithoutJobInput> | Prisma.JobTimelineCreateWithoutJobInput[] | Prisma.JobTimelineUncheckedCreateWithoutJobInput[];
    connectOrCreate?: Prisma.JobTimelineCreateOrConnectWithoutJobInput | Prisma.JobTimelineCreateOrConnectWithoutJobInput[];
    upsert?: Prisma.JobTimelineUpsertWithWhereUniqueWithoutJobInput | Prisma.JobTimelineUpsertWithWhereUniqueWithoutJobInput[];
    createMany?: Prisma.JobTimelineCreateManyJobInputEnvelope;
    set?: Prisma.JobTimelineWhereUniqueInput | Prisma.JobTimelineWhereUniqueInput[];
    disconnect?: Prisma.JobTimelineWhereUniqueInput | Prisma.JobTimelineWhereUniqueInput[];
    delete?: Prisma.JobTimelineWhereUniqueInput | Prisma.JobTimelineWhereUniqueInput[];
    connect?: Prisma.JobTimelineWhereUniqueInput | Prisma.JobTimelineWhereUniqueInput[];
    update?: Prisma.JobTimelineUpdateWithWhereUniqueWithoutJobInput | Prisma.JobTimelineUpdateWithWhereUniqueWithoutJobInput[];
    updateMany?: Prisma.JobTimelineUpdateManyWithWhereWithoutJobInput | Prisma.JobTimelineUpdateManyWithWhereWithoutJobInput[];
    deleteMany?: Prisma.JobTimelineScalarWhereInput | Prisma.JobTimelineScalarWhereInput[];
};
export type JobTimelineCreateWithoutJobInput = {
    id?: string;
    event: string;
    description?: string | null;
    createdAt?: Date | string;
};
export type JobTimelineUncheckedCreateWithoutJobInput = {
    id?: string;
    event: string;
    description?: string | null;
    createdAt?: Date | string;
};
export type JobTimelineCreateOrConnectWithoutJobInput = {
    where: Prisma.JobTimelineWhereUniqueInput;
    create: Prisma.XOR<Prisma.JobTimelineCreateWithoutJobInput, Prisma.JobTimelineUncheckedCreateWithoutJobInput>;
};
export type JobTimelineCreateManyJobInputEnvelope = {
    data: Prisma.JobTimelineCreateManyJobInput | Prisma.JobTimelineCreateManyJobInput[];
    skipDuplicates?: boolean;
};
export type JobTimelineUpsertWithWhereUniqueWithoutJobInput = {
    where: Prisma.JobTimelineWhereUniqueInput;
    update: Prisma.XOR<Prisma.JobTimelineUpdateWithoutJobInput, Prisma.JobTimelineUncheckedUpdateWithoutJobInput>;
    create: Prisma.XOR<Prisma.JobTimelineCreateWithoutJobInput, Prisma.JobTimelineUncheckedCreateWithoutJobInput>;
};
export type JobTimelineUpdateWithWhereUniqueWithoutJobInput = {
    where: Prisma.JobTimelineWhereUniqueInput;
    data: Prisma.XOR<Prisma.JobTimelineUpdateWithoutJobInput, Prisma.JobTimelineUncheckedUpdateWithoutJobInput>;
};
export type JobTimelineUpdateManyWithWhereWithoutJobInput = {
    where: Prisma.JobTimelineScalarWhereInput;
    data: Prisma.XOR<Prisma.JobTimelineUpdateManyMutationInput, Prisma.JobTimelineUncheckedUpdateManyWithoutJobInput>;
};
export type JobTimelineScalarWhereInput = {
    AND?: Prisma.JobTimelineScalarWhereInput | Prisma.JobTimelineScalarWhereInput[];
    OR?: Prisma.JobTimelineScalarWhereInput[];
    NOT?: Prisma.JobTimelineScalarWhereInput | Prisma.JobTimelineScalarWhereInput[];
    id?: Prisma.StringFilter<"JobTimeline"> | string;
    jobId?: Prisma.StringFilter<"JobTimeline"> | string;
    event?: Prisma.StringFilter<"JobTimeline"> | string;
    description?: Prisma.StringNullableFilter<"JobTimeline"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"JobTimeline"> | Date | string;
};
export type JobTimelineCreateManyJobInput = {
    id?: string;
    event: string;
    description?: string | null;
    createdAt?: Date | string;
};
export type JobTimelineUpdateWithoutJobInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    event?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JobTimelineUncheckedUpdateWithoutJobInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    event?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JobTimelineUncheckedUpdateManyWithoutJobInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    event?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JobTimelineSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    jobId?: boolean;
    event?: boolean;
    description?: boolean;
    createdAt?: boolean;
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["jobTimeline"]>;
export type JobTimelineSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    jobId?: boolean;
    event?: boolean;
    description?: boolean;
    createdAt?: boolean;
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["jobTimeline"]>;
export type JobTimelineSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    jobId?: boolean;
    event?: boolean;
    description?: boolean;
    createdAt?: boolean;
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["jobTimeline"]>;
export type JobTimelineSelectScalar = {
    id?: boolean;
    jobId?: boolean;
    event?: boolean;
    description?: boolean;
    createdAt?: boolean;
};
export type JobTimelineOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "jobId" | "event" | "description" | "createdAt", ExtArgs["result"]["jobTimeline"]>;
export type JobTimelineInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
};
export type JobTimelineIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
};
export type JobTimelineIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    job?: boolean | Prisma.JobDefaultArgs<ExtArgs>;
};
export type $JobTimelinePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "JobTimeline";
    objects: {
        job: Prisma.$JobPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        jobId: string;
        event: string;
        description: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["jobTimeline"]>;
    composites: {};
};
export type JobTimelineGetPayload<S extends boolean | null | undefined | JobTimelineDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$JobTimelinePayload, S>;
export type JobTimelineCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<JobTimelineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: JobTimelineCountAggregateInputType | true;
};
export interface JobTimelineDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['JobTimeline'];
        meta: {
            name: 'JobTimeline';
        };
    };
    findUnique<T extends JobTimelineFindUniqueArgs>(args: Prisma.SelectSubset<T, JobTimelineFindUniqueArgs<ExtArgs>>): Prisma.Prisma__JobTimelineClient<runtime.Types.Result.GetResult<Prisma.$JobTimelinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends JobTimelineFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, JobTimelineFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__JobTimelineClient<runtime.Types.Result.GetResult<Prisma.$JobTimelinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends JobTimelineFindFirstArgs>(args?: Prisma.SelectSubset<T, JobTimelineFindFirstArgs<ExtArgs>>): Prisma.Prisma__JobTimelineClient<runtime.Types.Result.GetResult<Prisma.$JobTimelinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends JobTimelineFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, JobTimelineFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__JobTimelineClient<runtime.Types.Result.GetResult<Prisma.$JobTimelinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends JobTimelineFindManyArgs>(args?: Prisma.SelectSubset<T, JobTimelineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JobTimelinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends JobTimelineCreateArgs>(args: Prisma.SelectSubset<T, JobTimelineCreateArgs<ExtArgs>>): Prisma.Prisma__JobTimelineClient<runtime.Types.Result.GetResult<Prisma.$JobTimelinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends JobTimelineCreateManyArgs>(args?: Prisma.SelectSubset<T, JobTimelineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends JobTimelineCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, JobTimelineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JobTimelinePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends JobTimelineDeleteArgs>(args: Prisma.SelectSubset<T, JobTimelineDeleteArgs<ExtArgs>>): Prisma.Prisma__JobTimelineClient<runtime.Types.Result.GetResult<Prisma.$JobTimelinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends JobTimelineUpdateArgs>(args: Prisma.SelectSubset<T, JobTimelineUpdateArgs<ExtArgs>>): Prisma.Prisma__JobTimelineClient<runtime.Types.Result.GetResult<Prisma.$JobTimelinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends JobTimelineDeleteManyArgs>(args?: Prisma.SelectSubset<T, JobTimelineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends JobTimelineUpdateManyArgs>(args: Prisma.SelectSubset<T, JobTimelineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends JobTimelineUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, JobTimelineUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JobTimelinePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends JobTimelineUpsertArgs>(args: Prisma.SelectSubset<T, JobTimelineUpsertArgs<ExtArgs>>): Prisma.Prisma__JobTimelineClient<runtime.Types.Result.GetResult<Prisma.$JobTimelinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends JobTimelineCountArgs>(args?: Prisma.Subset<T, JobTimelineCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], JobTimelineCountAggregateOutputType> : number>;
    aggregate<T extends JobTimelineAggregateArgs>(args: Prisma.Subset<T, JobTimelineAggregateArgs>): Prisma.PrismaPromise<GetJobTimelineAggregateType<T>>;
    groupBy<T extends JobTimelineGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: JobTimelineGroupByArgs['orderBy'];
    } : {
        orderBy?: JobTimelineGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, JobTimelineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobTimelineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: JobTimelineFieldRefs;
}
export interface Prisma__JobTimelineClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    job<T extends Prisma.JobDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.JobDefaultArgs<ExtArgs>>): Prisma.Prisma__JobClient<runtime.Types.Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface JobTimelineFieldRefs {
    readonly id: Prisma.FieldRef<"JobTimeline", 'String'>;
    readonly jobId: Prisma.FieldRef<"JobTimeline", 'String'>;
    readonly event: Prisma.FieldRef<"JobTimeline", 'String'>;
    readonly description: Prisma.FieldRef<"JobTimeline", 'String'>;
    readonly createdAt: Prisma.FieldRef<"JobTimeline", 'DateTime'>;
}
export type JobTimelineFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobTimelineSelect<ExtArgs> | null;
    omit?: Prisma.JobTimelineOmit<ExtArgs> | null;
    include?: Prisma.JobTimelineInclude<ExtArgs> | null;
    where: Prisma.JobTimelineWhereUniqueInput;
};
export type JobTimelineFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobTimelineSelect<ExtArgs> | null;
    omit?: Prisma.JobTimelineOmit<ExtArgs> | null;
    include?: Prisma.JobTimelineInclude<ExtArgs> | null;
    where: Prisma.JobTimelineWhereUniqueInput;
};
export type JobTimelineFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobTimelineSelect<ExtArgs> | null;
    omit?: Prisma.JobTimelineOmit<ExtArgs> | null;
    include?: Prisma.JobTimelineInclude<ExtArgs> | null;
    where?: Prisma.JobTimelineWhereInput;
    orderBy?: Prisma.JobTimelineOrderByWithRelationInput | Prisma.JobTimelineOrderByWithRelationInput[];
    cursor?: Prisma.JobTimelineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobTimelineScalarFieldEnum | Prisma.JobTimelineScalarFieldEnum[];
};
export type JobTimelineFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobTimelineSelect<ExtArgs> | null;
    omit?: Prisma.JobTimelineOmit<ExtArgs> | null;
    include?: Prisma.JobTimelineInclude<ExtArgs> | null;
    where?: Prisma.JobTimelineWhereInput;
    orderBy?: Prisma.JobTimelineOrderByWithRelationInput | Prisma.JobTimelineOrderByWithRelationInput[];
    cursor?: Prisma.JobTimelineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobTimelineScalarFieldEnum | Prisma.JobTimelineScalarFieldEnum[];
};
export type JobTimelineFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobTimelineSelect<ExtArgs> | null;
    omit?: Prisma.JobTimelineOmit<ExtArgs> | null;
    include?: Prisma.JobTimelineInclude<ExtArgs> | null;
    where?: Prisma.JobTimelineWhereInput;
    orderBy?: Prisma.JobTimelineOrderByWithRelationInput | Prisma.JobTimelineOrderByWithRelationInput[];
    cursor?: Prisma.JobTimelineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobTimelineScalarFieldEnum | Prisma.JobTimelineScalarFieldEnum[];
};
export type JobTimelineCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobTimelineSelect<ExtArgs> | null;
    omit?: Prisma.JobTimelineOmit<ExtArgs> | null;
    include?: Prisma.JobTimelineInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.JobTimelineCreateInput, Prisma.JobTimelineUncheckedCreateInput>;
};
export type JobTimelineCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.JobTimelineCreateManyInput | Prisma.JobTimelineCreateManyInput[];
    skipDuplicates?: boolean;
};
export type JobTimelineCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobTimelineSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.JobTimelineOmit<ExtArgs> | null;
    data: Prisma.JobTimelineCreateManyInput | Prisma.JobTimelineCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.JobTimelineIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type JobTimelineUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobTimelineSelect<ExtArgs> | null;
    omit?: Prisma.JobTimelineOmit<ExtArgs> | null;
    include?: Prisma.JobTimelineInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.JobTimelineUpdateInput, Prisma.JobTimelineUncheckedUpdateInput>;
    where: Prisma.JobTimelineWhereUniqueInput;
};
export type JobTimelineUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.JobTimelineUpdateManyMutationInput, Prisma.JobTimelineUncheckedUpdateManyInput>;
    where?: Prisma.JobTimelineWhereInput;
    limit?: number;
};
export type JobTimelineUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobTimelineSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.JobTimelineOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.JobTimelineUpdateManyMutationInput, Prisma.JobTimelineUncheckedUpdateManyInput>;
    where?: Prisma.JobTimelineWhereInput;
    limit?: number;
    include?: Prisma.JobTimelineIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type JobTimelineUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobTimelineSelect<ExtArgs> | null;
    omit?: Prisma.JobTimelineOmit<ExtArgs> | null;
    include?: Prisma.JobTimelineInclude<ExtArgs> | null;
    where: Prisma.JobTimelineWhereUniqueInput;
    create: Prisma.XOR<Prisma.JobTimelineCreateInput, Prisma.JobTimelineUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.JobTimelineUpdateInput, Prisma.JobTimelineUncheckedUpdateInput>;
};
export type JobTimelineDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobTimelineSelect<ExtArgs> | null;
    omit?: Prisma.JobTimelineOmit<ExtArgs> | null;
    include?: Prisma.JobTimelineInclude<ExtArgs> | null;
    where: Prisma.JobTimelineWhereUniqueInput;
};
export type JobTimelineDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobTimelineWhereInput;
    limit?: number;
};
export type JobTimelineDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobTimelineSelect<ExtArgs> | null;
    omit?: Prisma.JobTimelineOmit<ExtArgs> | null;
    include?: Prisma.JobTimelineInclude<ExtArgs> | null;
};
export {};
