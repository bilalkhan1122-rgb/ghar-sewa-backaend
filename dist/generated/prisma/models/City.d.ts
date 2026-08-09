import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
export type CityModel = runtime.Types.Result.DefaultSelection<Prisma.$CityPayload>;
export type AggregateCity = {
    _count: CityCountAggregateOutputType | null;
    _min: CityMinAggregateOutputType | null;
    _max: CityMaxAggregateOutputType | null;
};
export type CityMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CityMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CityCountAggregateOutputType = {
    id: number;
    name: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CityMinAggregateInputType = {
    id?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CityMaxAggregateInputType = {
    id?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CityCountAggregateInputType = {
    id?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CityAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CityWhereInput;
    orderBy?: Prisma.CityOrderByWithRelationInput | Prisma.CityOrderByWithRelationInput[];
    cursor?: Prisma.CityWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CityCountAggregateInputType;
    _min?: CityMinAggregateInputType;
    _max?: CityMaxAggregateInputType;
};
export type GetCityAggregateType<T extends CityAggregateArgs> = {
    [P in keyof T & keyof AggregateCity]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCity[P]> : Prisma.GetScalarType<T[P], AggregateCity[P]>;
};
export type CityGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CityWhereInput;
    orderBy?: Prisma.CityOrderByWithAggregationInput | Prisma.CityOrderByWithAggregationInput[];
    by: Prisma.CityScalarFieldEnum[] | Prisma.CityScalarFieldEnum;
    having?: Prisma.CityScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CityCountAggregateInputType | true;
    _min?: CityMinAggregateInputType;
    _max?: CityMaxAggregateInputType;
};
export type CityGroupByOutputType = {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    _count: CityCountAggregateOutputType | null;
    _min: CityMinAggregateOutputType | null;
    _max: CityMaxAggregateOutputType | null;
};
type GetCityGroupByPayload<T extends CityGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CityGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CityGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CityGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CityGroupByOutputType[P]>;
}>>;
export type CityWhereInput = {
    AND?: Prisma.CityWhereInput | Prisma.CityWhereInput[];
    OR?: Prisma.CityWhereInput[];
    NOT?: Prisma.CityWhereInput | Prisma.CityWhereInput[];
    id?: Prisma.StringFilter<"City"> | string;
    name?: Prisma.StringFilter<"City"> | string;
    createdAt?: Prisma.DateTimeFilter<"City"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"City"> | Date | string;
    users?: Prisma.UserListRelationFilter;
};
export type CityOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    users?: Prisma.UserOrderByRelationAggregateInput;
};
export type CityWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CityWhereInput | Prisma.CityWhereInput[];
    OR?: Prisma.CityWhereInput[];
    NOT?: Prisma.CityWhereInput | Prisma.CityWhereInput[];
    name?: Prisma.StringFilter<"City"> | string;
    createdAt?: Prisma.DateTimeFilter<"City"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"City"> | Date | string;
    users?: Prisma.UserListRelationFilter;
}, "id">;
export type CityOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CityCountOrderByAggregateInput;
    _max?: Prisma.CityMaxOrderByAggregateInput;
    _min?: Prisma.CityMinOrderByAggregateInput;
};
export type CityScalarWhereWithAggregatesInput = {
    AND?: Prisma.CityScalarWhereWithAggregatesInput | Prisma.CityScalarWhereWithAggregatesInput[];
    OR?: Prisma.CityScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CityScalarWhereWithAggregatesInput | Prisma.CityScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"City"> | string;
    name?: Prisma.StringWithAggregatesFilter<"City"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"City"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"City"> | Date | string;
};
export type CityCreateInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserCreateNestedManyWithoutCityInput;
};
export type CityUncheckedCreateInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutCityInput;
};
export type CityUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUpdateManyWithoutCityNestedInput;
};
export type CityUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUncheckedUpdateManyWithoutCityNestedInput;
};
export type CityCreateManyInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CityUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CityUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CityCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CityMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CityMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CityScalarRelationFilter = {
    is?: Prisma.CityWhereInput;
    isNot?: Prisma.CityWhereInput;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type CityCreateNestedOneWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.CityCreateWithoutUsersInput, Prisma.CityUncheckedCreateWithoutUsersInput>;
    connectOrCreate?: Prisma.CityCreateOrConnectWithoutUsersInput;
    connect?: Prisma.CityWhereUniqueInput;
};
export type CityUpdateOneRequiredWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.CityCreateWithoutUsersInput, Prisma.CityUncheckedCreateWithoutUsersInput>;
    connectOrCreate?: Prisma.CityCreateOrConnectWithoutUsersInput;
    upsert?: Prisma.CityUpsertWithoutUsersInput;
    connect?: Prisma.CityWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CityUpdateToOneWithWhereWithoutUsersInput, Prisma.CityUpdateWithoutUsersInput>, Prisma.CityUncheckedUpdateWithoutUsersInput>;
};
export type CityCreateWithoutUsersInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CityUncheckedCreateWithoutUsersInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CityCreateOrConnectWithoutUsersInput = {
    where: Prisma.CityWhereUniqueInput;
    create: Prisma.XOR<Prisma.CityCreateWithoutUsersInput, Prisma.CityUncheckedCreateWithoutUsersInput>;
};
export type CityUpsertWithoutUsersInput = {
    update: Prisma.XOR<Prisma.CityUpdateWithoutUsersInput, Prisma.CityUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.CityCreateWithoutUsersInput, Prisma.CityUncheckedCreateWithoutUsersInput>;
    where?: Prisma.CityWhereInput;
};
export type CityUpdateToOneWithWhereWithoutUsersInput = {
    where?: Prisma.CityWhereInput;
    data: Prisma.XOR<Prisma.CityUpdateWithoutUsersInput, Prisma.CityUncheckedUpdateWithoutUsersInput>;
};
export type CityUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CityUncheckedUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CityCountOutputType = {
    users: number;
};
export type CityCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | CityCountOutputTypeCountUsersArgs;
};
export type CityCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CityCountOutputTypeSelect<ExtArgs> | null;
};
export type CityCountOutputTypeCountUsersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
};
export type CitySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    users?: boolean | Prisma.City$usersArgs<ExtArgs>;
    _count?: boolean | Prisma.CityCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["city"]>;
export type CitySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["city"]>;
export type CitySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["city"]>;
export type CitySelectScalar = {
    id?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CityOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["city"]>;
export type CityInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.City$usersArgs<ExtArgs>;
    _count?: boolean | Prisma.CityCountOutputTypeDefaultArgs<ExtArgs>;
};
export type CityIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type CityIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $CityPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "City";
    objects: {
        users: Prisma.$UserPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["city"]>;
    composites: {};
};
export type CityGetPayload<S extends boolean | null | undefined | CityDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CityPayload, S>;
export type CityCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CityCountAggregateInputType | true;
};
export interface CityDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['City'];
        meta: {
            name: 'City';
        };
    };
    findUnique<T extends CityFindUniqueArgs>(args: Prisma.SelectSubset<T, CityFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CityClient<runtime.Types.Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CityFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CityFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CityClient<runtime.Types.Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CityFindFirstArgs>(args?: Prisma.SelectSubset<T, CityFindFirstArgs<ExtArgs>>): Prisma.Prisma__CityClient<runtime.Types.Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CityFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CityFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CityClient<runtime.Types.Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CityFindManyArgs>(args?: Prisma.SelectSubset<T, CityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CityCreateArgs>(args: Prisma.SelectSubset<T, CityCreateArgs<ExtArgs>>): Prisma.Prisma__CityClient<runtime.Types.Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CityCreateManyArgs>(args?: Prisma.SelectSubset<T, CityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CityCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CityDeleteArgs>(args: Prisma.SelectSubset<T, CityDeleteArgs<ExtArgs>>): Prisma.Prisma__CityClient<runtime.Types.Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CityUpdateArgs>(args: Prisma.SelectSubset<T, CityUpdateArgs<ExtArgs>>): Prisma.Prisma__CityClient<runtime.Types.Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CityDeleteManyArgs>(args?: Prisma.SelectSubset<T, CityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CityUpdateManyArgs>(args: Prisma.SelectSubset<T, CityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CityUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CityUpsertArgs>(args: Prisma.SelectSubset<T, CityUpsertArgs<ExtArgs>>): Prisma.Prisma__CityClient<runtime.Types.Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CityCountArgs>(args?: Prisma.Subset<T, CityCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CityCountAggregateOutputType> : number>;
    aggregate<T extends CityAggregateArgs>(args: Prisma.Subset<T, CityAggregateArgs>): Prisma.PrismaPromise<GetCityAggregateType<T>>;
    groupBy<T extends CityGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CityGroupByArgs['orderBy'];
    } : {
        orderBy?: CityGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CityFieldRefs;
}
export interface Prisma__CityClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    users<T extends Prisma.City$usersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.City$usersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CityFieldRefs {
    readonly id: Prisma.FieldRef<"City", 'String'>;
    readonly name: Prisma.FieldRef<"City", 'String'>;
    readonly createdAt: Prisma.FieldRef<"City", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"City", 'DateTime'>;
}
export type CityFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CitySelect<ExtArgs> | null;
    omit?: Prisma.CityOmit<ExtArgs> | null;
    include?: Prisma.CityInclude<ExtArgs> | null;
    where: Prisma.CityWhereUniqueInput;
};
export type CityFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CitySelect<ExtArgs> | null;
    omit?: Prisma.CityOmit<ExtArgs> | null;
    include?: Prisma.CityInclude<ExtArgs> | null;
    where: Prisma.CityWhereUniqueInput;
};
export type CityFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CitySelect<ExtArgs> | null;
    omit?: Prisma.CityOmit<ExtArgs> | null;
    include?: Prisma.CityInclude<ExtArgs> | null;
    where?: Prisma.CityWhereInput;
    orderBy?: Prisma.CityOrderByWithRelationInput | Prisma.CityOrderByWithRelationInput[];
    cursor?: Prisma.CityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CityScalarFieldEnum | Prisma.CityScalarFieldEnum[];
};
export type CityFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CitySelect<ExtArgs> | null;
    omit?: Prisma.CityOmit<ExtArgs> | null;
    include?: Prisma.CityInclude<ExtArgs> | null;
    where?: Prisma.CityWhereInput;
    orderBy?: Prisma.CityOrderByWithRelationInput | Prisma.CityOrderByWithRelationInput[];
    cursor?: Prisma.CityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CityScalarFieldEnum | Prisma.CityScalarFieldEnum[];
};
export type CityFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CitySelect<ExtArgs> | null;
    omit?: Prisma.CityOmit<ExtArgs> | null;
    include?: Prisma.CityInclude<ExtArgs> | null;
    where?: Prisma.CityWhereInput;
    orderBy?: Prisma.CityOrderByWithRelationInput | Prisma.CityOrderByWithRelationInput[];
    cursor?: Prisma.CityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CityScalarFieldEnum | Prisma.CityScalarFieldEnum[];
};
export type CityCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CitySelect<ExtArgs> | null;
    omit?: Prisma.CityOmit<ExtArgs> | null;
    include?: Prisma.CityInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CityCreateInput, Prisma.CityUncheckedCreateInput>;
};
export type CityCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CityCreateManyInput | Prisma.CityCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CityCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CitySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CityOmit<ExtArgs> | null;
    data: Prisma.CityCreateManyInput | Prisma.CityCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CityUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CitySelect<ExtArgs> | null;
    omit?: Prisma.CityOmit<ExtArgs> | null;
    include?: Prisma.CityInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CityUpdateInput, Prisma.CityUncheckedUpdateInput>;
    where: Prisma.CityWhereUniqueInput;
};
export type CityUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CityUpdateManyMutationInput, Prisma.CityUncheckedUpdateManyInput>;
    where?: Prisma.CityWhereInput;
    limit?: number;
};
export type CityUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CitySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CityOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CityUpdateManyMutationInput, Prisma.CityUncheckedUpdateManyInput>;
    where?: Prisma.CityWhereInput;
    limit?: number;
};
export type CityUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CitySelect<ExtArgs> | null;
    omit?: Prisma.CityOmit<ExtArgs> | null;
    include?: Prisma.CityInclude<ExtArgs> | null;
    where: Prisma.CityWhereUniqueInput;
    create: Prisma.XOR<Prisma.CityCreateInput, Prisma.CityUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CityUpdateInput, Prisma.CityUncheckedUpdateInput>;
};
export type CityDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CitySelect<ExtArgs> | null;
    omit?: Prisma.CityOmit<ExtArgs> | null;
    include?: Prisma.CityInclude<ExtArgs> | null;
    where: Prisma.CityWhereUniqueInput;
};
export type CityDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CityWhereInput;
    limit?: number;
};
export type City$usersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type CityDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CitySelect<ExtArgs> | null;
    omit?: Prisma.CityOmit<ExtArgs> | null;
    include?: Prisma.CityInclude<ExtArgs> | null;
};
export {};
