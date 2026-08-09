import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
export type DeviceRegistrationModel = runtime.Types.Result.DefaultSelection<Prisma.$DeviceRegistrationPayload>;
export type AggregateDeviceRegistration = {
    _count: DeviceRegistrationCountAggregateOutputType | null;
    _min: DeviceRegistrationMinAggregateOutputType | null;
    _max: DeviceRegistrationMaxAggregateOutputType | null;
};
export type DeviceRegistrationMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    deviceToken: string | null;
    platform: string | null;
    lastActiveAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DeviceRegistrationMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    deviceToken: string | null;
    platform: string | null;
    lastActiveAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DeviceRegistrationCountAggregateOutputType = {
    id: number;
    userId: number;
    deviceToken: number;
    platform: number;
    lastActiveAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type DeviceRegistrationMinAggregateInputType = {
    id?: true;
    userId?: true;
    deviceToken?: true;
    platform?: true;
    lastActiveAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DeviceRegistrationMaxAggregateInputType = {
    id?: true;
    userId?: true;
    deviceToken?: true;
    platform?: true;
    lastActiveAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DeviceRegistrationCountAggregateInputType = {
    id?: true;
    userId?: true;
    deviceToken?: true;
    platform?: true;
    lastActiveAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type DeviceRegistrationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DeviceRegistrationWhereInput;
    orderBy?: Prisma.DeviceRegistrationOrderByWithRelationInput | Prisma.DeviceRegistrationOrderByWithRelationInput[];
    cursor?: Prisma.DeviceRegistrationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | DeviceRegistrationCountAggregateInputType;
    _min?: DeviceRegistrationMinAggregateInputType;
    _max?: DeviceRegistrationMaxAggregateInputType;
};
export type GetDeviceRegistrationAggregateType<T extends DeviceRegistrationAggregateArgs> = {
    [P in keyof T & keyof AggregateDeviceRegistration]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDeviceRegistration[P]> : Prisma.GetScalarType<T[P], AggregateDeviceRegistration[P]>;
};
export type DeviceRegistrationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DeviceRegistrationWhereInput;
    orderBy?: Prisma.DeviceRegistrationOrderByWithAggregationInput | Prisma.DeviceRegistrationOrderByWithAggregationInput[];
    by: Prisma.DeviceRegistrationScalarFieldEnum[] | Prisma.DeviceRegistrationScalarFieldEnum;
    having?: Prisma.DeviceRegistrationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DeviceRegistrationCountAggregateInputType | true;
    _min?: DeviceRegistrationMinAggregateInputType;
    _max?: DeviceRegistrationMaxAggregateInputType;
};
export type DeviceRegistrationGroupByOutputType = {
    id: string;
    userId: string;
    deviceToken: string;
    platform: string;
    lastActiveAt: Date;
    createdAt: Date;
    updatedAt: Date;
    _count: DeviceRegistrationCountAggregateOutputType | null;
    _min: DeviceRegistrationMinAggregateOutputType | null;
    _max: DeviceRegistrationMaxAggregateOutputType | null;
};
type GetDeviceRegistrationGroupByPayload<T extends DeviceRegistrationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DeviceRegistrationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DeviceRegistrationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DeviceRegistrationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DeviceRegistrationGroupByOutputType[P]>;
}>>;
export type DeviceRegistrationWhereInput = {
    AND?: Prisma.DeviceRegistrationWhereInput | Prisma.DeviceRegistrationWhereInput[];
    OR?: Prisma.DeviceRegistrationWhereInput[];
    NOT?: Prisma.DeviceRegistrationWhereInput | Prisma.DeviceRegistrationWhereInput[];
    id?: Prisma.StringFilter<"DeviceRegistration"> | string;
    userId?: Prisma.StringFilter<"DeviceRegistration"> | string;
    deviceToken?: Prisma.StringFilter<"DeviceRegistration"> | string;
    platform?: Prisma.StringFilter<"DeviceRegistration"> | string;
    lastActiveAt?: Prisma.DateTimeFilter<"DeviceRegistration"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"DeviceRegistration"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"DeviceRegistration"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type DeviceRegistrationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    deviceToken?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    lastActiveAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type DeviceRegistrationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_deviceToken?: Prisma.DeviceRegistrationUserIdDeviceTokenCompoundUniqueInput;
    AND?: Prisma.DeviceRegistrationWhereInput | Prisma.DeviceRegistrationWhereInput[];
    OR?: Prisma.DeviceRegistrationWhereInput[];
    NOT?: Prisma.DeviceRegistrationWhereInput | Prisma.DeviceRegistrationWhereInput[];
    userId?: Prisma.StringFilter<"DeviceRegistration"> | string;
    deviceToken?: Prisma.StringFilter<"DeviceRegistration"> | string;
    platform?: Prisma.StringFilter<"DeviceRegistration"> | string;
    lastActiveAt?: Prisma.DateTimeFilter<"DeviceRegistration"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"DeviceRegistration"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"DeviceRegistration"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId_deviceToken">;
export type DeviceRegistrationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    deviceToken?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    lastActiveAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.DeviceRegistrationCountOrderByAggregateInput;
    _max?: Prisma.DeviceRegistrationMaxOrderByAggregateInput;
    _min?: Prisma.DeviceRegistrationMinOrderByAggregateInput;
};
export type DeviceRegistrationScalarWhereWithAggregatesInput = {
    AND?: Prisma.DeviceRegistrationScalarWhereWithAggregatesInput | Prisma.DeviceRegistrationScalarWhereWithAggregatesInput[];
    OR?: Prisma.DeviceRegistrationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DeviceRegistrationScalarWhereWithAggregatesInput | Prisma.DeviceRegistrationScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"DeviceRegistration"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"DeviceRegistration"> | string;
    deviceToken?: Prisma.StringWithAggregatesFilter<"DeviceRegistration"> | string;
    platform?: Prisma.StringWithAggregatesFilter<"DeviceRegistration"> | string;
    lastActiveAt?: Prisma.DateTimeWithAggregatesFilter<"DeviceRegistration"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"DeviceRegistration"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"DeviceRegistration"> | Date | string;
};
export type DeviceRegistrationCreateInput = {
    id?: string;
    deviceToken: string;
    platform: string;
    lastActiveAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutDevicesInput;
};
export type DeviceRegistrationUncheckedCreateInput = {
    id?: string;
    userId: string;
    deviceToken: string;
    platform: string;
    lastActiveAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DeviceRegistrationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceToken?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.StringFieldUpdateOperationsInput | string;
    lastActiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutDevicesNestedInput;
};
export type DeviceRegistrationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceToken?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.StringFieldUpdateOperationsInput | string;
    lastActiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DeviceRegistrationCreateManyInput = {
    id?: string;
    userId: string;
    deviceToken: string;
    platform: string;
    lastActiveAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DeviceRegistrationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceToken?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.StringFieldUpdateOperationsInput | string;
    lastActiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DeviceRegistrationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceToken?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.StringFieldUpdateOperationsInput | string;
    lastActiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DeviceRegistrationListRelationFilter = {
    every?: Prisma.DeviceRegistrationWhereInput;
    some?: Prisma.DeviceRegistrationWhereInput;
    none?: Prisma.DeviceRegistrationWhereInput;
};
export type DeviceRegistrationOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type DeviceRegistrationUserIdDeviceTokenCompoundUniqueInput = {
    userId: string;
    deviceToken: string;
};
export type DeviceRegistrationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    deviceToken?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    lastActiveAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DeviceRegistrationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    deviceToken?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    lastActiveAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DeviceRegistrationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    deviceToken?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    lastActiveAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DeviceRegistrationCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.DeviceRegistrationCreateWithoutUserInput, Prisma.DeviceRegistrationUncheckedCreateWithoutUserInput> | Prisma.DeviceRegistrationCreateWithoutUserInput[] | Prisma.DeviceRegistrationUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DeviceRegistrationCreateOrConnectWithoutUserInput | Prisma.DeviceRegistrationCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.DeviceRegistrationCreateManyUserInputEnvelope;
    connect?: Prisma.DeviceRegistrationWhereUniqueInput | Prisma.DeviceRegistrationWhereUniqueInput[];
};
export type DeviceRegistrationUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.DeviceRegistrationCreateWithoutUserInput, Prisma.DeviceRegistrationUncheckedCreateWithoutUserInput> | Prisma.DeviceRegistrationCreateWithoutUserInput[] | Prisma.DeviceRegistrationUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DeviceRegistrationCreateOrConnectWithoutUserInput | Prisma.DeviceRegistrationCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.DeviceRegistrationCreateManyUserInputEnvelope;
    connect?: Prisma.DeviceRegistrationWhereUniqueInput | Prisma.DeviceRegistrationWhereUniqueInput[];
};
export type DeviceRegistrationUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.DeviceRegistrationCreateWithoutUserInput, Prisma.DeviceRegistrationUncheckedCreateWithoutUserInput> | Prisma.DeviceRegistrationCreateWithoutUserInput[] | Prisma.DeviceRegistrationUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DeviceRegistrationCreateOrConnectWithoutUserInput | Prisma.DeviceRegistrationCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.DeviceRegistrationUpsertWithWhereUniqueWithoutUserInput | Prisma.DeviceRegistrationUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.DeviceRegistrationCreateManyUserInputEnvelope;
    set?: Prisma.DeviceRegistrationWhereUniqueInput | Prisma.DeviceRegistrationWhereUniqueInput[];
    disconnect?: Prisma.DeviceRegistrationWhereUniqueInput | Prisma.DeviceRegistrationWhereUniqueInput[];
    delete?: Prisma.DeviceRegistrationWhereUniqueInput | Prisma.DeviceRegistrationWhereUniqueInput[];
    connect?: Prisma.DeviceRegistrationWhereUniqueInput | Prisma.DeviceRegistrationWhereUniqueInput[];
    update?: Prisma.DeviceRegistrationUpdateWithWhereUniqueWithoutUserInput | Prisma.DeviceRegistrationUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.DeviceRegistrationUpdateManyWithWhereWithoutUserInput | Prisma.DeviceRegistrationUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.DeviceRegistrationScalarWhereInput | Prisma.DeviceRegistrationScalarWhereInput[];
};
export type DeviceRegistrationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.DeviceRegistrationCreateWithoutUserInput, Prisma.DeviceRegistrationUncheckedCreateWithoutUserInput> | Prisma.DeviceRegistrationCreateWithoutUserInput[] | Prisma.DeviceRegistrationUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DeviceRegistrationCreateOrConnectWithoutUserInput | Prisma.DeviceRegistrationCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.DeviceRegistrationUpsertWithWhereUniqueWithoutUserInput | Prisma.DeviceRegistrationUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.DeviceRegistrationCreateManyUserInputEnvelope;
    set?: Prisma.DeviceRegistrationWhereUniqueInput | Prisma.DeviceRegistrationWhereUniqueInput[];
    disconnect?: Prisma.DeviceRegistrationWhereUniqueInput | Prisma.DeviceRegistrationWhereUniqueInput[];
    delete?: Prisma.DeviceRegistrationWhereUniqueInput | Prisma.DeviceRegistrationWhereUniqueInput[];
    connect?: Prisma.DeviceRegistrationWhereUniqueInput | Prisma.DeviceRegistrationWhereUniqueInput[];
    update?: Prisma.DeviceRegistrationUpdateWithWhereUniqueWithoutUserInput | Prisma.DeviceRegistrationUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.DeviceRegistrationUpdateManyWithWhereWithoutUserInput | Prisma.DeviceRegistrationUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.DeviceRegistrationScalarWhereInput | Prisma.DeviceRegistrationScalarWhereInput[];
};
export type DeviceRegistrationCreateWithoutUserInput = {
    id?: string;
    deviceToken: string;
    platform: string;
    lastActiveAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DeviceRegistrationUncheckedCreateWithoutUserInput = {
    id?: string;
    deviceToken: string;
    platform: string;
    lastActiveAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DeviceRegistrationCreateOrConnectWithoutUserInput = {
    where: Prisma.DeviceRegistrationWhereUniqueInput;
    create: Prisma.XOR<Prisma.DeviceRegistrationCreateWithoutUserInput, Prisma.DeviceRegistrationUncheckedCreateWithoutUserInput>;
};
export type DeviceRegistrationCreateManyUserInputEnvelope = {
    data: Prisma.DeviceRegistrationCreateManyUserInput | Prisma.DeviceRegistrationCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type DeviceRegistrationUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.DeviceRegistrationWhereUniqueInput;
    update: Prisma.XOR<Prisma.DeviceRegistrationUpdateWithoutUserInput, Prisma.DeviceRegistrationUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.DeviceRegistrationCreateWithoutUserInput, Prisma.DeviceRegistrationUncheckedCreateWithoutUserInput>;
};
export type DeviceRegistrationUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.DeviceRegistrationWhereUniqueInput;
    data: Prisma.XOR<Prisma.DeviceRegistrationUpdateWithoutUserInput, Prisma.DeviceRegistrationUncheckedUpdateWithoutUserInput>;
};
export type DeviceRegistrationUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.DeviceRegistrationScalarWhereInput;
    data: Prisma.XOR<Prisma.DeviceRegistrationUpdateManyMutationInput, Prisma.DeviceRegistrationUncheckedUpdateManyWithoutUserInput>;
};
export type DeviceRegistrationScalarWhereInput = {
    AND?: Prisma.DeviceRegistrationScalarWhereInput | Prisma.DeviceRegistrationScalarWhereInput[];
    OR?: Prisma.DeviceRegistrationScalarWhereInput[];
    NOT?: Prisma.DeviceRegistrationScalarWhereInput | Prisma.DeviceRegistrationScalarWhereInput[];
    id?: Prisma.StringFilter<"DeviceRegistration"> | string;
    userId?: Prisma.StringFilter<"DeviceRegistration"> | string;
    deviceToken?: Prisma.StringFilter<"DeviceRegistration"> | string;
    platform?: Prisma.StringFilter<"DeviceRegistration"> | string;
    lastActiveAt?: Prisma.DateTimeFilter<"DeviceRegistration"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"DeviceRegistration"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"DeviceRegistration"> | Date | string;
};
export type DeviceRegistrationCreateManyUserInput = {
    id?: string;
    deviceToken: string;
    platform: string;
    lastActiveAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DeviceRegistrationUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceToken?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.StringFieldUpdateOperationsInput | string;
    lastActiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DeviceRegistrationUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceToken?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.StringFieldUpdateOperationsInput | string;
    lastActiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DeviceRegistrationUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceToken?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.StringFieldUpdateOperationsInput | string;
    lastActiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DeviceRegistrationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    deviceToken?: boolean;
    platform?: boolean;
    lastActiveAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["deviceRegistration"]>;
export type DeviceRegistrationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    deviceToken?: boolean;
    platform?: boolean;
    lastActiveAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["deviceRegistration"]>;
export type DeviceRegistrationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    deviceToken?: boolean;
    platform?: boolean;
    lastActiveAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["deviceRegistration"]>;
export type DeviceRegistrationSelectScalar = {
    id?: boolean;
    userId?: boolean;
    deviceToken?: boolean;
    platform?: boolean;
    lastActiveAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type DeviceRegistrationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "deviceToken" | "platform" | "lastActiveAt" | "createdAt" | "updatedAt", ExtArgs["result"]["deviceRegistration"]>;
export type DeviceRegistrationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type DeviceRegistrationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type DeviceRegistrationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $DeviceRegistrationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DeviceRegistration";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        deviceToken: string;
        platform: string;
        lastActiveAt: Date;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["deviceRegistration"]>;
    composites: {};
};
export type DeviceRegistrationGetPayload<S extends boolean | null | undefined | DeviceRegistrationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DeviceRegistrationPayload, S>;
export type DeviceRegistrationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DeviceRegistrationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DeviceRegistrationCountAggregateInputType | true;
};
export interface DeviceRegistrationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DeviceRegistration'];
        meta: {
            name: 'DeviceRegistration';
        };
    };
    findUnique<T extends DeviceRegistrationFindUniqueArgs>(args: Prisma.SelectSubset<T, DeviceRegistrationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DeviceRegistrationClient<runtime.Types.Result.GetResult<Prisma.$DeviceRegistrationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends DeviceRegistrationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DeviceRegistrationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DeviceRegistrationClient<runtime.Types.Result.GetResult<Prisma.$DeviceRegistrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends DeviceRegistrationFindFirstArgs>(args?: Prisma.SelectSubset<T, DeviceRegistrationFindFirstArgs<ExtArgs>>): Prisma.Prisma__DeviceRegistrationClient<runtime.Types.Result.GetResult<Prisma.$DeviceRegistrationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends DeviceRegistrationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DeviceRegistrationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DeviceRegistrationClient<runtime.Types.Result.GetResult<Prisma.$DeviceRegistrationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends DeviceRegistrationFindManyArgs>(args?: Prisma.SelectSubset<T, DeviceRegistrationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DeviceRegistrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends DeviceRegistrationCreateArgs>(args: Prisma.SelectSubset<T, DeviceRegistrationCreateArgs<ExtArgs>>): Prisma.Prisma__DeviceRegistrationClient<runtime.Types.Result.GetResult<Prisma.$DeviceRegistrationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends DeviceRegistrationCreateManyArgs>(args?: Prisma.SelectSubset<T, DeviceRegistrationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends DeviceRegistrationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DeviceRegistrationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DeviceRegistrationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends DeviceRegistrationDeleteArgs>(args: Prisma.SelectSubset<T, DeviceRegistrationDeleteArgs<ExtArgs>>): Prisma.Prisma__DeviceRegistrationClient<runtime.Types.Result.GetResult<Prisma.$DeviceRegistrationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends DeviceRegistrationUpdateArgs>(args: Prisma.SelectSubset<T, DeviceRegistrationUpdateArgs<ExtArgs>>): Prisma.Prisma__DeviceRegistrationClient<runtime.Types.Result.GetResult<Prisma.$DeviceRegistrationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends DeviceRegistrationDeleteManyArgs>(args?: Prisma.SelectSubset<T, DeviceRegistrationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends DeviceRegistrationUpdateManyArgs>(args: Prisma.SelectSubset<T, DeviceRegistrationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends DeviceRegistrationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DeviceRegistrationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DeviceRegistrationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends DeviceRegistrationUpsertArgs>(args: Prisma.SelectSubset<T, DeviceRegistrationUpsertArgs<ExtArgs>>): Prisma.Prisma__DeviceRegistrationClient<runtime.Types.Result.GetResult<Prisma.$DeviceRegistrationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends DeviceRegistrationCountArgs>(args?: Prisma.Subset<T, DeviceRegistrationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DeviceRegistrationCountAggregateOutputType> : number>;
    aggregate<T extends DeviceRegistrationAggregateArgs>(args: Prisma.Subset<T, DeviceRegistrationAggregateArgs>): Prisma.PrismaPromise<GetDeviceRegistrationAggregateType<T>>;
    groupBy<T extends DeviceRegistrationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DeviceRegistrationGroupByArgs['orderBy'];
    } : {
        orderBy?: DeviceRegistrationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DeviceRegistrationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeviceRegistrationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: DeviceRegistrationFieldRefs;
}
export interface Prisma__DeviceRegistrationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface DeviceRegistrationFieldRefs {
    readonly id: Prisma.FieldRef<"DeviceRegistration", 'String'>;
    readonly userId: Prisma.FieldRef<"DeviceRegistration", 'String'>;
    readonly deviceToken: Prisma.FieldRef<"DeviceRegistration", 'String'>;
    readonly platform: Prisma.FieldRef<"DeviceRegistration", 'String'>;
    readonly lastActiveAt: Prisma.FieldRef<"DeviceRegistration", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"DeviceRegistration", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"DeviceRegistration", 'DateTime'>;
}
export type DeviceRegistrationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceRegistrationSelect<ExtArgs> | null;
    omit?: Prisma.DeviceRegistrationOmit<ExtArgs> | null;
    include?: Prisma.DeviceRegistrationInclude<ExtArgs> | null;
    where: Prisma.DeviceRegistrationWhereUniqueInput;
};
export type DeviceRegistrationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceRegistrationSelect<ExtArgs> | null;
    omit?: Prisma.DeviceRegistrationOmit<ExtArgs> | null;
    include?: Prisma.DeviceRegistrationInclude<ExtArgs> | null;
    where: Prisma.DeviceRegistrationWhereUniqueInput;
};
export type DeviceRegistrationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceRegistrationSelect<ExtArgs> | null;
    omit?: Prisma.DeviceRegistrationOmit<ExtArgs> | null;
    include?: Prisma.DeviceRegistrationInclude<ExtArgs> | null;
    where?: Prisma.DeviceRegistrationWhereInput;
    orderBy?: Prisma.DeviceRegistrationOrderByWithRelationInput | Prisma.DeviceRegistrationOrderByWithRelationInput[];
    cursor?: Prisma.DeviceRegistrationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DeviceRegistrationScalarFieldEnum | Prisma.DeviceRegistrationScalarFieldEnum[];
};
export type DeviceRegistrationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceRegistrationSelect<ExtArgs> | null;
    omit?: Prisma.DeviceRegistrationOmit<ExtArgs> | null;
    include?: Prisma.DeviceRegistrationInclude<ExtArgs> | null;
    where?: Prisma.DeviceRegistrationWhereInput;
    orderBy?: Prisma.DeviceRegistrationOrderByWithRelationInput | Prisma.DeviceRegistrationOrderByWithRelationInput[];
    cursor?: Prisma.DeviceRegistrationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DeviceRegistrationScalarFieldEnum | Prisma.DeviceRegistrationScalarFieldEnum[];
};
export type DeviceRegistrationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceRegistrationSelect<ExtArgs> | null;
    omit?: Prisma.DeviceRegistrationOmit<ExtArgs> | null;
    include?: Prisma.DeviceRegistrationInclude<ExtArgs> | null;
    where?: Prisma.DeviceRegistrationWhereInput;
    orderBy?: Prisma.DeviceRegistrationOrderByWithRelationInput | Prisma.DeviceRegistrationOrderByWithRelationInput[];
    cursor?: Prisma.DeviceRegistrationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DeviceRegistrationScalarFieldEnum | Prisma.DeviceRegistrationScalarFieldEnum[];
};
export type DeviceRegistrationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceRegistrationSelect<ExtArgs> | null;
    omit?: Prisma.DeviceRegistrationOmit<ExtArgs> | null;
    include?: Prisma.DeviceRegistrationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DeviceRegistrationCreateInput, Prisma.DeviceRegistrationUncheckedCreateInput>;
};
export type DeviceRegistrationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.DeviceRegistrationCreateManyInput | Prisma.DeviceRegistrationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DeviceRegistrationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceRegistrationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DeviceRegistrationOmit<ExtArgs> | null;
    data: Prisma.DeviceRegistrationCreateManyInput | Prisma.DeviceRegistrationCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.DeviceRegistrationIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type DeviceRegistrationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceRegistrationSelect<ExtArgs> | null;
    omit?: Prisma.DeviceRegistrationOmit<ExtArgs> | null;
    include?: Prisma.DeviceRegistrationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DeviceRegistrationUpdateInput, Prisma.DeviceRegistrationUncheckedUpdateInput>;
    where: Prisma.DeviceRegistrationWhereUniqueInput;
};
export type DeviceRegistrationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.DeviceRegistrationUpdateManyMutationInput, Prisma.DeviceRegistrationUncheckedUpdateManyInput>;
    where?: Prisma.DeviceRegistrationWhereInput;
    limit?: number;
};
export type DeviceRegistrationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceRegistrationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DeviceRegistrationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DeviceRegistrationUpdateManyMutationInput, Prisma.DeviceRegistrationUncheckedUpdateManyInput>;
    where?: Prisma.DeviceRegistrationWhereInput;
    limit?: number;
    include?: Prisma.DeviceRegistrationIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type DeviceRegistrationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceRegistrationSelect<ExtArgs> | null;
    omit?: Prisma.DeviceRegistrationOmit<ExtArgs> | null;
    include?: Prisma.DeviceRegistrationInclude<ExtArgs> | null;
    where: Prisma.DeviceRegistrationWhereUniqueInput;
    create: Prisma.XOR<Prisma.DeviceRegistrationCreateInput, Prisma.DeviceRegistrationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.DeviceRegistrationUpdateInput, Prisma.DeviceRegistrationUncheckedUpdateInput>;
};
export type DeviceRegistrationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceRegistrationSelect<ExtArgs> | null;
    omit?: Prisma.DeviceRegistrationOmit<ExtArgs> | null;
    include?: Prisma.DeviceRegistrationInclude<ExtArgs> | null;
    where: Prisma.DeviceRegistrationWhereUniqueInput;
};
export type DeviceRegistrationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DeviceRegistrationWhereInput;
    limit?: number;
};
export type DeviceRegistrationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceRegistrationSelect<ExtArgs> | null;
    omit?: Prisma.DeviceRegistrationOmit<ExtArgs> | null;
    include?: Prisma.DeviceRegistrationInclude<ExtArgs> | null;
};
export {};
