import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
export type RatingSummaryModel = runtime.Types.Result.DefaultSelection<Prisma.$RatingSummaryPayload>;
export type AggregateRatingSummary = {
    _count: RatingSummaryCountAggregateOutputType | null;
    _avg: RatingSummaryAvgAggregateOutputType | null;
    _sum: RatingSummarySumAggregateOutputType | null;
    _min: RatingSummaryMinAggregateOutputType | null;
    _max: RatingSummaryMaxAggregateOutputType | null;
};
export type RatingSummaryAvgAggregateOutputType = {
    averageRating: runtime.Decimal | null;
    totalReviews: number | null;
    fiveStarCount: number | null;
    fourStarCount: number | null;
    threeStarCount: number | null;
    twoStarCount: number | null;
    oneStarCount: number | null;
};
export type RatingSummarySumAggregateOutputType = {
    averageRating: runtime.Decimal | null;
    totalReviews: number | null;
    fiveStarCount: number | null;
    fourStarCount: number | null;
    threeStarCount: number | null;
    twoStarCount: number | null;
    oneStarCount: number | null;
};
export type RatingSummaryMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    averageRating: runtime.Decimal | null;
    totalReviews: number | null;
    fiveStarCount: number | null;
    fourStarCount: number | null;
    threeStarCount: number | null;
    twoStarCount: number | null;
    oneStarCount: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type RatingSummaryMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    averageRating: runtime.Decimal | null;
    totalReviews: number | null;
    fiveStarCount: number | null;
    fourStarCount: number | null;
    threeStarCount: number | null;
    twoStarCount: number | null;
    oneStarCount: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type RatingSummaryCountAggregateOutputType = {
    id: number;
    userId: number;
    averageRating: number;
    totalReviews: number;
    fiveStarCount: number;
    fourStarCount: number;
    threeStarCount: number;
    twoStarCount: number;
    oneStarCount: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type RatingSummaryAvgAggregateInputType = {
    averageRating?: true;
    totalReviews?: true;
    fiveStarCount?: true;
    fourStarCount?: true;
    threeStarCount?: true;
    twoStarCount?: true;
    oneStarCount?: true;
};
export type RatingSummarySumAggregateInputType = {
    averageRating?: true;
    totalReviews?: true;
    fiveStarCount?: true;
    fourStarCount?: true;
    threeStarCount?: true;
    twoStarCount?: true;
    oneStarCount?: true;
};
export type RatingSummaryMinAggregateInputType = {
    id?: true;
    userId?: true;
    averageRating?: true;
    totalReviews?: true;
    fiveStarCount?: true;
    fourStarCount?: true;
    threeStarCount?: true;
    twoStarCount?: true;
    oneStarCount?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type RatingSummaryMaxAggregateInputType = {
    id?: true;
    userId?: true;
    averageRating?: true;
    totalReviews?: true;
    fiveStarCount?: true;
    fourStarCount?: true;
    threeStarCount?: true;
    twoStarCount?: true;
    oneStarCount?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type RatingSummaryCountAggregateInputType = {
    id?: true;
    userId?: true;
    averageRating?: true;
    totalReviews?: true;
    fiveStarCount?: true;
    fourStarCount?: true;
    threeStarCount?: true;
    twoStarCount?: true;
    oneStarCount?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type RatingSummaryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RatingSummaryWhereInput;
    orderBy?: Prisma.RatingSummaryOrderByWithRelationInput | Prisma.RatingSummaryOrderByWithRelationInput[];
    cursor?: Prisma.RatingSummaryWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RatingSummaryCountAggregateInputType;
    _avg?: RatingSummaryAvgAggregateInputType;
    _sum?: RatingSummarySumAggregateInputType;
    _min?: RatingSummaryMinAggregateInputType;
    _max?: RatingSummaryMaxAggregateInputType;
};
export type GetRatingSummaryAggregateType<T extends RatingSummaryAggregateArgs> = {
    [P in keyof T & keyof AggregateRatingSummary]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRatingSummary[P]> : Prisma.GetScalarType<T[P], AggregateRatingSummary[P]>;
};
export type RatingSummaryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RatingSummaryWhereInput;
    orderBy?: Prisma.RatingSummaryOrderByWithAggregationInput | Prisma.RatingSummaryOrderByWithAggregationInput[];
    by: Prisma.RatingSummaryScalarFieldEnum[] | Prisma.RatingSummaryScalarFieldEnum;
    having?: Prisma.RatingSummaryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RatingSummaryCountAggregateInputType | true;
    _avg?: RatingSummaryAvgAggregateInputType;
    _sum?: RatingSummarySumAggregateInputType;
    _min?: RatingSummaryMinAggregateInputType;
    _max?: RatingSummaryMaxAggregateInputType;
};
export type RatingSummaryGroupByOutputType = {
    id: string;
    userId: string;
    averageRating: runtime.Decimal;
    totalReviews: number;
    fiveStarCount: number;
    fourStarCount: number;
    threeStarCount: number;
    twoStarCount: number;
    oneStarCount: number;
    createdAt: Date;
    updatedAt: Date;
    _count: RatingSummaryCountAggregateOutputType | null;
    _avg: RatingSummaryAvgAggregateOutputType | null;
    _sum: RatingSummarySumAggregateOutputType | null;
    _min: RatingSummaryMinAggregateOutputType | null;
    _max: RatingSummaryMaxAggregateOutputType | null;
};
type GetRatingSummaryGroupByPayload<T extends RatingSummaryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RatingSummaryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RatingSummaryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RatingSummaryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RatingSummaryGroupByOutputType[P]>;
}>>;
export type RatingSummaryWhereInput = {
    AND?: Prisma.RatingSummaryWhereInput | Prisma.RatingSummaryWhereInput[];
    OR?: Prisma.RatingSummaryWhereInput[];
    NOT?: Prisma.RatingSummaryWhereInput | Prisma.RatingSummaryWhereInput[];
    id?: Prisma.StringFilter<"RatingSummary"> | string;
    userId?: Prisma.StringFilter<"RatingSummary"> | string;
    averageRating?: Prisma.DecimalFilter<"RatingSummary"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalReviews?: Prisma.IntFilter<"RatingSummary"> | number;
    fiveStarCount?: Prisma.IntFilter<"RatingSummary"> | number;
    fourStarCount?: Prisma.IntFilter<"RatingSummary"> | number;
    threeStarCount?: Prisma.IntFilter<"RatingSummary"> | number;
    twoStarCount?: Prisma.IntFilter<"RatingSummary"> | number;
    oneStarCount?: Prisma.IntFilter<"RatingSummary"> | number;
    createdAt?: Prisma.DateTimeFilter<"RatingSummary"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"RatingSummary"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type RatingSummaryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    averageRating?: Prisma.SortOrder;
    totalReviews?: Prisma.SortOrder;
    fiveStarCount?: Prisma.SortOrder;
    fourStarCount?: Prisma.SortOrder;
    threeStarCount?: Prisma.SortOrder;
    twoStarCount?: Prisma.SortOrder;
    oneStarCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type RatingSummaryWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    AND?: Prisma.RatingSummaryWhereInput | Prisma.RatingSummaryWhereInput[];
    OR?: Prisma.RatingSummaryWhereInput[];
    NOT?: Prisma.RatingSummaryWhereInput | Prisma.RatingSummaryWhereInput[];
    averageRating?: Prisma.DecimalFilter<"RatingSummary"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalReviews?: Prisma.IntFilter<"RatingSummary"> | number;
    fiveStarCount?: Prisma.IntFilter<"RatingSummary"> | number;
    fourStarCount?: Prisma.IntFilter<"RatingSummary"> | number;
    threeStarCount?: Prisma.IntFilter<"RatingSummary"> | number;
    twoStarCount?: Prisma.IntFilter<"RatingSummary"> | number;
    oneStarCount?: Prisma.IntFilter<"RatingSummary"> | number;
    createdAt?: Prisma.DateTimeFilter<"RatingSummary"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"RatingSummary"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId">;
export type RatingSummaryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    averageRating?: Prisma.SortOrder;
    totalReviews?: Prisma.SortOrder;
    fiveStarCount?: Prisma.SortOrder;
    fourStarCount?: Prisma.SortOrder;
    threeStarCount?: Prisma.SortOrder;
    twoStarCount?: Prisma.SortOrder;
    oneStarCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.RatingSummaryCountOrderByAggregateInput;
    _avg?: Prisma.RatingSummaryAvgOrderByAggregateInput;
    _max?: Prisma.RatingSummaryMaxOrderByAggregateInput;
    _min?: Prisma.RatingSummaryMinOrderByAggregateInput;
    _sum?: Prisma.RatingSummarySumOrderByAggregateInput;
};
export type RatingSummaryScalarWhereWithAggregatesInput = {
    AND?: Prisma.RatingSummaryScalarWhereWithAggregatesInput | Prisma.RatingSummaryScalarWhereWithAggregatesInput[];
    OR?: Prisma.RatingSummaryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RatingSummaryScalarWhereWithAggregatesInput | Prisma.RatingSummaryScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"RatingSummary"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"RatingSummary"> | string;
    averageRating?: Prisma.DecimalWithAggregatesFilter<"RatingSummary"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalReviews?: Prisma.IntWithAggregatesFilter<"RatingSummary"> | number;
    fiveStarCount?: Prisma.IntWithAggregatesFilter<"RatingSummary"> | number;
    fourStarCount?: Prisma.IntWithAggregatesFilter<"RatingSummary"> | number;
    threeStarCount?: Prisma.IntWithAggregatesFilter<"RatingSummary"> | number;
    twoStarCount?: Prisma.IntWithAggregatesFilter<"RatingSummary"> | number;
    oneStarCount?: Prisma.IntWithAggregatesFilter<"RatingSummary"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"RatingSummary"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"RatingSummary"> | Date | string;
};
export type RatingSummaryCreateInput = {
    id?: string;
    averageRating?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalReviews?: number;
    fiveStarCount?: number;
    fourStarCount?: number;
    threeStarCount?: number;
    twoStarCount?: number;
    oneStarCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutRatingSummaryInput;
};
export type RatingSummaryUncheckedCreateInput = {
    id?: string;
    userId: string;
    averageRating?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalReviews?: number;
    fiveStarCount?: number;
    fourStarCount?: number;
    threeStarCount?: number;
    twoStarCount?: number;
    oneStarCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RatingSummaryUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    averageRating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalReviews?: Prisma.IntFieldUpdateOperationsInput | number;
    fiveStarCount?: Prisma.IntFieldUpdateOperationsInput | number;
    fourStarCount?: Prisma.IntFieldUpdateOperationsInput | number;
    threeStarCount?: Prisma.IntFieldUpdateOperationsInput | number;
    twoStarCount?: Prisma.IntFieldUpdateOperationsInput | number;
    oneStarCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutRatingSummaryNestedInput;
};
export type RatingSummaryUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    averageRating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalReviews?: Prisma.IntFieldUpdateOperationsInput | number;
    fiveStarCount?: Prisma.IntFieldUpdateOperationsInput | number;
    fourStarCount?: Prisma.IntFieldUpdateOperationsInput | number;
    threeStarCount?: Prisma.IntFieldUpdateOperationsInput | number;
    twoStarCount?: Prisma.IntFieldUpdateOperationsInput | number;
    oneStarCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RatingSummaryCreateManyInput = {
    id?: string;
    userId: string;
    averageRating?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalReviews?: number;
    fiveStarCount?: number;
    fourStarCount?: number;
    threeStarCount?: number;
    twoStarCount?: number;
    oneStarCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RatingSummaryUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    averageRating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalReviews?: Prisma.IntFieldUpdateOperationsInput | number;
    fiveStarCount?: Prisma.IntFieldUpdateOperationsInput | number;
    fourStarCount?: Prisma.IntFieldUpdateOperationsInput | number;
    threeStarCount?: Prisma.IntFieldUpdateOperationsInput | number;
    twoStarCount?: Prisma.IntFieldUpdateOperationsInput | number;
    oneStarCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RatingSummaryUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    averageRating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalReviews?: Prisma.IntFieldUpdateOperationsInput | number;
    fiveStarCount?: Prisma.IntFieldUpdateOperationsInput | number;
    fourStarCount?: Prisma.IntFieldUpdateOperationsInput | number;
    threeStarCount?: Prisma.IntFieldUpdateOperationsInput | number;
    twoStarCount?: Prisma.IntFieldUpdateOperationsInput | number;
    oneStarCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RatingSummaryNullableScalarRelationFilter = {
    is?: Prisma.RatingSummaryWhereInput | null;
    isNot?: Prisma.RatingSummaryWhereInput | null;
};
export type RatingSummaryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    averageRating?: Prisma.SortOrder;
    totalReviews?: Prisma.SortOrder;
    fiveStarCount?: Prisma.SortOrder;
    fourStarCount?: Prisma.SortOrder;
    threeStarCount?: Prisma.SortOrder;
    twoStarCount?: Prisma.SortOrder;
    oneStarCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RatingSummaryAvgOrderByAggregateInput = {
    averageRating?: Prisma.SortOrder;
    totalReviews?: Prisma.SortOrder;
    fiveStarCount?: Prisma.SortOrder;
    fourStarCount?: Prisma.SortOrder;
    threeStarCount?: Prisma.SortOrder;
    twoStarCount?: Prisma.SortOrder;
    oneStarCount?: Prisma.SortOrder;
};
export type RatingSummaryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    averageRating?: Prisma.SortOrder;
    totalReviews?: Prisma.SortOrder;
    fiveStarCount?: Prisma.SortOrder;
    fourStarCount?: Prisma.SortOrder;
    threeStarCount?: Prisma.SortOrder;
    twoStarCount?: Prisma.SortOrder;
    oneStarCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RatingSummaryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    averageRating?: Prisma.SortOrder;
    totalReviews?: Prisma.SortOrder;
    fiveStarCount?: Prisma.SortOrder;
    fourStarCount?: Prisma.SortOrder;
    threeStarCount?: Prisma.SortOrder;
    twoStarCount?: Prisma.SortOrder;
    oneStarCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RatingSummarySumOrderByAggregateInput = {
    averageRating?: Prisma.SortOrder;
    totalReviews?: Prisma.SortOrder;
    fiveStarCount?: Prisma.SortOrder;
    fourStarCount?: Prisma.SortOrder;
    threeStarCount?: Prisma.SortOrder;
    twoStarCount?: Prisma.SortOrder;
    oneStarCount?: Prisma.SortOrder;
};
export type RatingSummaryCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.RatingSummaryCreateWithoutUserInput, Prisma.RatingSummaryUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.RatingSummaryCreateOrConnectWithoutUserInput;
    connect?: Prisma.RatingSummaryWhereUniqueInput;
};
export type RatingSummaryUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.RatingSummaryCreateWithoutUserInput, Prisma.RatingSummaryUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.RatingSummaryCreateOrConnectWithoutUserInput;
    connect?: Prisma.RatingSummaryWhereUniqueInput;
};
export type RatingSummaryUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.RatingSummaryCreateWithoutUserInput, Prisma.RatingSummaryUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.RatingSummaryCreateOrConnectWithoutUserInput;
    upsert?: Prisma.RatingSummaryUpsertWithoutUserInput;
    disconnect?: Prisma.RatingSummaryWhereInput | boolean;
    delete?: Prisma.RatingSummaryWhereInput | boolean;
    connect?: Prisma.RatingSummaryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RatingSummaryUpdateToOneWithWhereWithoutUserInput, Prisma.RatingSummaryUpdateWithoutUserInput>, Prisma.RatingSummaryUncheckedUpdateWithoutUserInput>;
};
export type RatingSummaryUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.RatingSummaryCreateWithoutUserInput, Prisma.RatingSummaryUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.RatingSummaryCreateOrConnectWithoutUserInput;
    upsert?: Prisma.RatingSummaryUpsertWithoutUserInput;
    disconnect?: Prisma.RatingSummaryWhereInput | boolean;
    delete?: Prisma.RatingSummaryWhereInput | boolean;
    connect?: Prisma.RatingSummaryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RatingSummaryUpdateToOneWithWhereWithoutUserInput, Prisma.RatingSummaryUpdateWithoutUserInput>, Prisma.RatingSummaryUncheckedUpdateWithoutUserInput>;
};
export type RatingSummaryCreateWithoutUserInput = {
    id?: string;
    averageRating?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalReviews?: number;
    fiveStarCount?: number;
    fourStarCount?: number;
    threeStarCount?: number;
    twoStarCount?: number;
    oneStarCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RatingSummaryUncheckedCreateWithoutUserInput = {
    id?: string;
    averageRating?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalReviews?: number;
    fiveStarCount?: number;
    fourStarCount?: number;
    threeStarCount?: number;
    twoStarCount?: number;
    oneStarCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RatingSummaryCreateOrConnectWithoutUserInput = {
    where: Prisma.RatingSummaryWhereUniqueInput;
    create: Prisma.XOR<Prisma.RatingSummaryCreateWithoutUserInput, Prisma.RatingSummaryUncheckedCreateWithoutUserInput>;
};
export type RatingSummaryUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.RatingSummaryUpdateWithoutUserInput, Prisma.RatingSummaryUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.RatingSummaryCreateWithoutUserInput, Prisma.RatingSummaryUncheckedCreateWithoutUserInput>;
    where?: Prisma.RatingSummaryWhereInput;
};
export type RatingSummaryUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.RatingSummaryWhereInput;
    data: Prisma.XOR<Prisma.RatingSummaryUpdateWithoutUserInput, Prisma.RatingSummaryUncheckedUpdateWithoutUserInput>;
};
export type RatingSummaryUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    averageRating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalReviews?: Prisma.IntFieldUpdateOperationsInput | number;
    fiveStarCount?: Prisma.IntFieldUpdateOperationsInput | number;
    fourStarCount?: Prisma.IntFieldUpdateOperationsInput | number;
    threeStarCount?: Prisma.IntFieldUpdateOperationsInput | number;
    twoStarCount?: Prisma.IntFieldUpdateOperationsInput | number;
    oneStarCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RatingSummaryUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    averageRating?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalReviews?: Prisma.IntFieldUpdateOperationsInput | number;
    fiveStarCount?: Prisma.IntFieldUpdateOperationsInput | number;
    fourStarCount?: Prisma.IntFieldUpdateOperationsInput | number;
    threeStarCount?: Prisma.IntFieldUpdateOperationsInput | number;
    twoStarCount?: Prisma.IntFieldUpdateOperationsInput | number;
    oneStarCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RatingSummarySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    averageRating?: boolean;
    totalReviews?: boolean;
    fiveStarCount?: boolean;
    fourStarCount?: boolean;
    threeStarCount?: boolean;
    twoStarCount?: boolean;
    oneStarCount?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ratingSummary"]>;
export type RatingSummarySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    averageRating?: boolean;
    totalReviews?: boolean;
    fiveStarCount?: boolean;
    fourStarCount?: boolean;
    threeStarCount?: boolean;
    twoStarCount?: boolean;
    oneStarCount?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ratingSummary"]>;
export type RatingSummarySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    averageRating?: boolean;
    totalReviews?: boolean;
    fiveStarCount?: boolean;
    fourStarCount?: boolean;
    threeStarCount?: boolean;
    twoStarCount?: boolean;
    oneStarCount?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ratingSummary"]>;
export type RatingSummarySelectScalar = {
    id?: boolean;
    userId?: boolean;
    averageRating?: boolean;
    totalReviews?: boolean;
    fiveStarCount?: boolean;
    fourStarCount?: boolean;
    threeStarCount?: boolean;
    twoStarCount?: boolean;
    oneStarCount?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type RatingSummaryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "averageRating" | "totalReviews" | "fiveStarCount" | "fourStarCount" | "threeStarCount" | "twoStarCount" | "oneStarCount" | "createdAt" | "updatedAt", ExtArgs["result"]["ratingSummary"]>;
export type RatingSummaryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type RatingSummaryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type RatingSummaryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $RatingSummaryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RatingSummary";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        averageRating: runtime.Decimal;
        totalReviews: number;
        fiveStarCount: number;
        fourStarCount: number;
        threeStarCount: number;
        twoStarCount: number;
        oneStarCount: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["ratingSummary"]>;
    composites: {};
};
export type RatingSummaryGetPayload<S extends boolean | null | undefined | RatingSummaryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RatingSummaryPayload, S>;
export type RatingSummaryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RatingSummaryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RatingSummaryCountAggregateInputType | true;
};
export interface RatingSummaryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RatingSummary'];
        meta: {
            name: 'RatingSummary';
        };
    };
    findUnique<T extends RatingSummaryFindUniqueArgs>(args: Prisma.SelectSubset<T, RatingSummaryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RatingSummaryClient<runtime.Types.Result.GetResult<Prisma.$RatingSummaryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RatingSummaryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RatingSummaryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RatingSummaryClient<runtime.Types.Result.GetResult<Prisma.$RatingSummaryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RatingSummaryFindFirstArgs>(args?: Prisma.SelectSubset<T, RatingSummaryFindFirstArgs<ExtArgs>>): Prisma.Prisma__RatingSummaryClient<runtime.Types.Result.GetResult<Prisma.$RatingSummaryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RatingSummaryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RatingSummaryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RatingSummaryClient<runtime.Types.Result.GetResult<Prisma.$RatingSummaryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RatingSummaryFindManyArgs>(args?: Prisma.SelectSubset<T, RatingSummaryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RatingSummaryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RatingSummaryCreateArgs>(args: Prisma.SelectSubset<T, RatingSummaryCreateArgs<ExtArgs>>): Prisma.Prisma__RatingSummaryClient<runtime.Types.Result.GetResult<Prisma.$RatingSummaryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RatingSummaryCreateManyArgs>(args?: Prisma.SelectSubset<T, RatingSummaryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RatingSummaryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RatingSummaryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RatingSummaryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RatingSummaryDeleteArgs>(args: Prisma.SelectSubset<T, RatingSummaryDeleteArgs<ExtArgs>>): Prisma.Prisma__RatingSummaryClient<runtime.Types.Result.GetResult<Prisma.$RatingSummaryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RatingSummaryUpdateArgs>(args: Prisma.SelectSubset<T, RatingSummaryUpdateArgs<ExtArgs>>): Prisma.Prisma__RatingSummaryClient<runtime.Types.Result.GetResult<Prisma.$RatingSummaryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RatingSummaryDeleteManyArgs>(args?: Prisma.SelectSubset<T, RatingSummaryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RatingSummaryUpdateManyArgs>(args: Prisma.SelectSubset<T, RatingSummaryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RatingSummaryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RatingSummaryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RatingSummaryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RatingSummaryUpsertArgs>(args: Prisma.SelectSubset<T, RatingSummaryUpsertArgs<ExtArgs>>): Prisma.Prisma__RatingSummaryClient<runtime.Types.Result.GetResult<Prisma.$RatingSummaryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RatingSummaryCountArgs>(args?: Prisma.Subset<T, RatingSummaryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RatingSummaryCountAggregateOutputType> : number>;
    aggregate<T extends RatingSummaryAggregateArgs>(args: Prisma.Subset<T, RatingSummaryAggregateArgs>): Prisma.PrismaPromise<GetRatingSummaryAggregateType<T>>;
    groupBy<T extends RatingSummaryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RatingSummaryGroupByArgs['orderBy'];
    } : {
        orderBy?: RatingSummaryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RatingSummaryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRatingSummaryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RatingSummaryFieldRefs;
}
export interface Prisma__RatingSummaryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RatingSummaryFieldRefs {
    readonly id: Prisma.FieldRef<"RatingSummary", 'String'>;
    readonly userId: Prisma.FieldRef<"RatingSummary", 'String'>;
    readonly averageRating: Prisma.FieldRef<"RatingSummary", 'Decimal'>;
    readonly totalReviews: Prisma.FieldRef<"RatingSummary", 'Int'>;
    readonly fiveStarCount: Prisma.FieldRef<"RatingSummary", 'Int'>;
    readonly fourStarCount: Prisma.FieldRef<"RatingSummary", 'Int'>;
    readonly threeStarCount: Prisma.FieldRef<"RatingSummary", 'Int'>;
    readonly twoStarCount: Prisma.FieldRef<"RatingSummary", 'Int'>;
    readonly oneStarCount: Prisma.FieldRef<"RatingSummary", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"RatingSummary", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"RatingSummary", 'DateTime'>;
}
export type RatingSummaryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingSummarySelect<ExtArgs> | null;
    omit?: Prisma.RatingSummaryOmit<ExtArgs> | null;
    include?: Prisma.RatingSummaryInclude<ExtArgs> | null;
    where: Prisma.RatingSummaryWhereUniqueInput;
};
export type RatingSummaryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingSummarySelect<ExtArgs> | null;
    omit?: Prisma.RatingSummaryOmit<ExtArgs> | null;
    include?: Prisma.RatingSummaryInclude<ExtArgs> | null;
    where: Prisma.RatingSummaryWhereUniqueInput;
};
export type RatingSummaryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingSummarySelect<ExtArgs> | null;
    omit?: Prisma.RatingSummaryOmit<ExtArgs> | null;
    include?: Prisma.RatingSummaryInclude<ExtArgs> | null;
    where?: Prisma.RatingSummaryWhereInput;
    orderBy?: Prisma.RatingSummaryOrderByWithRelationInput | Prisma.RatingSummaryOrderByWithRelationInput[];
    cursor?: Prisma.RatingSummaryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RatingSummaryScalarFieldEnum | Prisma.RatingSummaryScalarFieldEnum[];
};
export type RatingSummaryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingSummarySelect<ExtArgs> | null;
    omit?: Prisma.RatingSummaryOmit<ExtArgs> | null;
    include?: Prisma.RatingSummaryInclude<ExtArgs> | null;
    where?: Prisma.RatingSummaryWhereInput;
    orderBy?: Prisma.RatingSummaryOrderByWithRelationInput | Prisma.RatingSummaryOrderByWithRelationInput[];
    cursor?: Prisma.RatingSummaryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RatingSummaryScalarFieldEnum | Prisma.RatingSummaryScalarFieldEnum[];
};
export type RatingSummaryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingSummarySelect<ExtArgs> | null;
    omit?: Prisma.RatingSummaryOmit<ExtArgs> | null;
    include?: Prisma.RatingSummaryInclude<ExtArgs> | null;
    where?: Prisma.RatingSummaryWhereInput;
    orderBy?: Prisma.RatingSummaryOrderByWithRelationInput | Prisma.RatingSummaryOrderByWithRelationInput[];
    cursor?: Prisma.RatingSummaryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RatingSummaryScalarFieldEnum | Prisma.RatingSummaryScalarFieldEnum[];
};
export type RatingSummaryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingSummarySelect<ExtArgs> | null;
    omit?: Prisma.RatingSummaryOmit<ExtArgs> | null;
    include?: Prisma.RatingSummaryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RatingSummaryCreateInput, Prisma.RatingSummaryUncheckedCreateInput>;
};
export type RatingSummaryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RatingSummaryCreateManyInput | Prisma.RatingSummaryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RatingSummaryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingSummarySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RatingSummaryOmit<ExtArgs> | null;
    data: Prisma.RatingSummaryCreateManyInput | Prisma.RatingSummaryCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.RatingSummaryIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type RatingSummaryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingSummarySelect<ExtArgs> | null;
    omit?: Prisma.RatingSummaryOmit<ExtArgs> | null;
    include?: Prisma.RatingSummaryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RatingSummaryUpdateInput, Prisma.RatingSummaryUncheckedUpdateInput>;
    where: Prisma.RatingSummaryWhereUniqueInput;
};
export type RatingSummaryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RatingSummaryUpdateManyMutationInput, Prisma.RatingSummaryUncheckedUpdateManyInput>;
    where?: Prisma.RatingSummaryWhereInput;
    limit?: number;
};
export type RatingSummaryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingSummarySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RatingSummaryOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RatingSummaryUpdateManyMutationInput, Prisma.RatingSummaryUncheckedUpdateManyInput>;
    where?: Prisma.RatingSummaryWhereInput;
    limit?: number;
    include?: Prisma.RatingSummaryIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type RatingSummaryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingSummarySelect<ExtArgs> | null;
    omit?: Prisma.RatingSummaryOmit<ExtArgs> | null;
    include?: Prisma.RatingSummaryInclude<ExtArgs> | null;
    where: Prisma.RatingSummaryWhereUniqueInput;
    create: Prisma.XOR<Prisma.RatingSummaryCreateInput, Prisma.RatingSummaryUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RatingSummaryUpdateInput, Prisma.RatingSummaryUncheckedUpdateInput>;
};
export type RatingSummaryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingSummarySelect<ExtArgs> | null;
    omit?: Prisma.RatingSummaryOmit<ExtArgs> | null;
    include?: Prisma.RatingSummaryInclude<ExtArgs> | null;
    where: Prisma.RatingSummaryWhereUniqueInput;
};
export type RatingSummaryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RatingSummaryWhereInput;
    limit?: number;
};
export type RatingSummaryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatingSummarySelect<ExtArgs> | null;
    omit?: Prisma.RatingSummaryOmit<ExtArgs> | null;
    include?: Prisma.RatingSummaryInclude<ExtArgs> | null;
};
export {};
