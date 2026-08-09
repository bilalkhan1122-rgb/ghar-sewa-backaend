import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
export type ProviderProfileModel = runtime.Types.Result.DefaultSelection<Prisma.$ProviderProfilePayload>;
export type AggregateProviderProfile = {
    _count: ProviderProfileCountAggregateOutputType | null;
    _avg: ProviderProfileAvgAggregateOutputType | null;
    _sum: ProviderProfileSumAggregateOutputType | null;
    _min: ProviderProfileMinAggregateOutputType | null;
    _max: ProviderProfileMaxAggregateOutputType | null;
};
export type ProviderProfileAvgAggregateOutputType = {
    hourlyRate: runtime.Decimal | null;
    serviceRadius: number | null;
};
export type ProviderProfileSumAggregateOutputType = {
    hourlyRate: runtime.Decimal | null;
    serviceRadius: number | null;
};
export type ProviderProfileMinAggregateOutputType = {
    userId: string | null;
    bio: string | null;
    hourlyRate: runtime.Decimal | null;
    serviceRadius: number | null;
    serviceLocation: string | null;
    facePhoto: string | null;
    cnicNumber: string | null;
    cnicFrontImage: string | null;
    cnicBackImage: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProviderProfileMaxAggregateOutputType = {
    userId: string | null;
    bio: string | null;
    hourlyRate: runtime.Decimal | null;
    serviceRadius: number | null;
    serviceLocation: string | null;
    facePhoto: string | null;
    cnicNumber: string | null;
    cnicFrontImage: string | null;
    cnicBackImage: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProviderProfileCountAggregateOutputType = {
    userId: number;
    bio: number;
    hourlyRate: number;
    serviceRadius: number;
    serviceLocation: number;
    facePhoto: number;
    cnicNumber: number;
    cnicFrontImage: number;
    cnicBackImage: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ProviderProfileAvgAggregateInputType = {
    hourlyRate?: true;
    serviceRadius?: true;
};
export type ProviderProfileSumAggregateInputType = {
    hourlyRate?: true;
    serviceRadius?: true;
};
export type ProviderProfileMinAggregateInputType = {
    userId?: true;
    bio?: true;
    hourlyRate?: true;
    serviceRadius?: true;
    serviceLocation?: true;
    facePhoto?: true;
    cnicNumber?: true;
    cnicFrontImage?: true;
    cnicBackImage?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProviderProfileMaxAggregateInputType = {
    userId?: true;
    bio?: true;
    hourlyRate?: true;
    serviceRadius?: true;
    serviceLocation?: true;
    facePhoto?: true;
    cnicNumber?: true;
    cnicFrontImage?: true;
    cnicBackImage?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProviderProfileCountAggregateInputType = {
    userId?: true;
    bio?: true;
    hourlyRate?: true;
    serviceRadius?: true;
    serviceLocation?: true;
    facePhoto?: true;
    cnicNumber?: true;
    cnicFrontImage?: true;
    cnicBackImage?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ProviderProfileAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProviderProfileWhereInput;
    orderBy?: Prisma.ProviderProfileOrderByWithRelationInput | Prisma.ProviderProfileOrderByWithRelationInput[];
    cursor?: Prisma.ProviderProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProviderProfileCountAggregateInputType;
    _avg?: ProviderProfileAvgAggregateInputType;
    _sum?: ProviderProfileSumAggregateInputType;
    _min?: ProviderProfileMinAggregateInputType;
    _max?: ProviderProfileMaxAggregateInputType;
};
export type GetProviderProfileAggregateType<T extends ProviderProfileAggregateArgs> = {
    [P in keyof T & keyof AggregateProviderProfile]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProviderProfile[P]> : Prisma.GetScalarType<T[P], AggregateProviderProfile[P]>;
};
export type ProviderProfileGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProviderProfileWhereInput;
    orderBy?: Prisma.ProviderProfileOrderByWithAggregationInput | Prisma.ProviderProfileOrderByWithAggregationInput[];
    by: Prisma.ProviderProfileScalarFieldEnum[] | Prisma.ProviderProfileScalarFieldEnum;
    having?: Prisma.ProviderProfileScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProviderProfileCountAggregateInputType | true;
    _avg?: ProviderProfileAvgAggregateInputType;
    _sum?: ProviderProfileSumAggregateInputType;
    _min?: ProviderProfileMinAggregateInputType;
    _max?: ProviderProfileMaxAggregateInputType;
};
export type ProviderProfileGroupByOutputType = {
    userId: string;
    bio: string | null;
    hourlyRate: runtime.Decimal | null;
    serviceRadius: number | null;
    serviceLocation: string | null;
    facePhoto: string | null;
    cnicNumber: string | null;
    cnicFrontImage: string | null;
    cnicBackImage: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: ProviderProfileCountAggregateOutputType | null;
    _avg: ProviderProfileAvgAggregateOutputType | null;
    _sum: ProviderProfileSumAggregateOutputType | null;
    _min: ProviderProfileMinAggregateOutputType | null;
    _max: ProviderProfileMaxAggregateOutputType | null;
};
type GetProviderProfileGroupByPayload<T extends ProviderProfileGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProviderProfileGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProviderProfileGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProviderProfileGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProviderProfileGroupByOutputType[P]>;
}>>;
export type ProviderProfileWhereInput = {
    AND?: Prisma.ProviderProfileWhereInput | Prisma.ProviderProfileWhereInput[];
    OR?: Prisma.ProviderProfileWhereInput[];
    NOT?: Prisma.ProviderProfileWhereInput | Prisma.ProviderProfileWhereInput[];
    userId?: Prisma.StringFilter<"ProviderProfile"> | string;
    bio?: Prisma.StringNullableFilter<"ProviderProfile"> | string | null;
    hourlyRate?: Prisma.DecimalNullableFilter<"ProviderProfile"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceRadius?: Prisma.IntNullableFilter<"ProviderProfile"> | number | null;
    serviceLocation?: Prisma.StringNullableFilter<"ProviderProfile"> | string | null;
    facePhoto?: Prisma.StringNullableFilter<"ProviderProfile"> | string | null;
    cnicNumber?: Prisma.StringNullableFilter<"ProviderProfile"> | string | null;
    cnicFrontImage?: Prisma.StringNullableFilter<"ProviderProfile"> | string | null;
    cnicBackImage?: Prisma.StringNullableFilter<"ProviderProfile"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ProviderProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ProviderProfile"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    categories?: Prisma.ProviderServiceCategoryListRelationFilter;
    galleryImages?: Prisma.GalleryImageListRelationFilter;
};
export type ProviderProfileOrderByWithRelationInput = {
    userId?: Prisma.SortOrder;
    bio?: Prisma.SortOrderInput | Prisma.SortOrder;
    hourlyRate?: Prisma.SortOrderInput | Prisma.SortOrder;
    serviceRadius?: Prisma.SortOrderInput | Prisma.SortOrder;
    serviceLocation?: Prisma.SortOrderInput | Prisma.SortOrder;
    facePhoto?: Prisma.SortOrderInput | Prisma.SortOrder;
    cnicNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    cnicFrontImage?: Prisma.SortOrderInput | Prisma.SortOrder;
    cnicBackImage?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    categories?: Prisma.ProviderServiceCategoryOrderByRelationAggregateInput;
    galleryImages?: Prisma.GalleryImageOrderByRelationAggregateInput;
};
export type ProviderProfileWhereUniqueInput = Prisma.AtLeast<{
    userId?: string;
    cnicNumber?: string;
    AND?: Prisma.ProviderProfileWhereInput | Prisma.ProviderProfileWhereInput[];
    OR?: Prisma.ProviderProfileWhereInput[];
    NOT?: Prisma.ProviderProfileWhereInput | Prisma.ProviderProfileWhereInput[];
    bio?: Prisma.StringNullableFilter<"ProviderProfile"> | string | null;
    hourlyRate?: Prisma.DecimalNullableFilter<"ProviderProfile"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceRadius?: Prisma.IntNullableFilter<"ProviderProfile"> | number | null;
    serviceLocation?: Prisma.StringNullableFilter<"ProviderProfile"> | string | null;
    facePhoto?: Prisma.StringNullableFilter<"ProviderProfile"> | string | null;
    cnicFrontImage?: Prisma.StringNullableFilter<"ProviderProfile"> | string | null;
    cnicBackImage?: Prisma.StringNullableFilter<"ProviderProfile"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ProviderProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ProviderProfile"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    categories?: Prisma.ProviderServiceCategoryListRelationFilter;
    galleryImages?: Prisma.GalleryImageListRelationFilter;
}, "userId" | "cnicNumber">;
export type ProviderProfileOrderByWithAggregationInput = {
    userId?: Prisma.SortOrder;
    bio?: Prisma.SortOrderInput | Prisma.SortOrder;
    hourlyRate?: Prisma.SortOrderInput | Prisma.SortOrder;
    serviceRadius?: Prisma.SortOrderInput | Prisma.SortOrder;
    serviceLocation?: Prisma.SortOrderInput | Prisma.SortOrder;
    facePhoto?: Prisma.SortOrderInput | Prisma.SortOrder;
    cnicNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    cnicFrontImage?: Prisma.SortOrderInput | Prisma.SortOrder;
    cnicBackImage?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ProviderProfileCountOrderByAggregateInput;
    _avg?: Prisma.ProviderProfileAvgOrderByAggregateInput;
    _max?: Prisma.ProviderProfileMaxOrderByAggregateInput;
    _min?: Prisma.ProviderProfileMinOrderByAggregateInput;
    _sum?: Prisma.ProviderProfileSumOrderByAggregateInput;
};
export type ProviderProfileScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProviderProfileScalarWhereWithAggregatesInput | Prisma.ProviderProfileScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProviderProfileScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProviderProfileScalarWhereWithAggregatesInput | Prisma.ProviderProfileScalarWhereWithAggregatesInput[];
    userId?: Prisma.StringWithAggregatesFilter<"ProviderProfile"> | string;
    bio?: Prisma.StringNullableWithAggregatesFilter<"ProviderProfile"> | string | null;
    hourlyRate?: Prisma.DecimalNullableWithAggregatesFilter<"ProviderProfile"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceRadius?: Prisma.IntNullableWithAggregatesFilter<"ProviderProfile"> | number | null;
    serviceLocation?: Prisma.StringNullableWithAggregatesFilter<"ProviderProfile"> | string | null;
    facePhoto?: Prisma.StringNullableWithAggregatesFilter<"ProviderProfile"> | string | null;
    cnicNumber?: Prisma.StringNullableWithAggregatesFilter<"ProviderProfile"> | string | null;
    cnicFrontImage?: Prisma.StringNullableWithAggregatesFilter<"ProviderProfile"> | string | null;
    cnicBackImage?: Prisma.StringNullableWithAggregatesFilter<"ProviderProfile"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ProviderProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ProviderProfile"> | Date | string;
};
export type ProviderProfileCreateInput = {
    bio?: string | null;
    hourlyRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceRadius?: number | null;
    serviceLocation?: string | null;
    facePhoto?: string | null;
    cnicNumber?: string | null;
    cnicFrontImage?: string | null;
    cnicBackImage?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutProviderProfileInput;
    categories?: Prisma.ProviderServiceCategoryCreateNestedManyWithoutProviderInput;
    galleryImages?: Prisma.GalleryImageCreateNestedManyWithoutProviderInput;
};
export type ProviderProfileUncheckedCreateInput = {
    userId: string;
    bio?: string | null;
    hourlyRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceRadius?: number | null;
    serviceLocation?: string | null;
    facePhoto?: string | null;
    cnicNumber?: string | null;
    cnicFrontImage?: string | null;
    cnicBackImage?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    categories?: Prisma.ProviderServiceCategoryUncheckedCreateNestedManyWithoutProviderInput;
    galleryImages?: Prisma.GalleryImageUncheckedCreateNestedManyWithoutProviderInput;
};
export type ProviderProfileUpdateInput = {
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hourlyRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceRadius?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    serviceLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    facePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cnicNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cnicFrontImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cnicBackImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutProviderProfileNestedInput;
    categories?: Prisma.ProviderServiceCategoryUpdateManyWithoutProviderNestedInput;
    galleryImages?: Prisma.GalleryImageUpdateManyWithoutProviderNestedInput;
};
export type ProviderProfileUncheckedUpdateInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hourlyRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceRadius?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    serviceLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    facePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cnicNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cnicFrontImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cnicBackImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    categories?: Prisma.ProviderServiceCategoryUncheckedUpdateManyWithoutProviderNestedInput;
    galleryImages?: Prisma.GalleryImageUncheckedUpdateManyWithoutProviderNestedInput;
};
export type ProviderProfileCreateManyInput = {
    userId: string;
    bio?: string | null;
    hourlyRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceRadius?: number | null;
    serviceLocation?: string | null;
    facePhoto?: string | null;
    cnicNumber?: string | null;
    cnicFrontImage?: string | null;
    cnicBackImage?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProviderProfileUpdateManyMutationInput = {
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hourlyRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceRadius?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    serviceLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    facePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cnicNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cnicFrontImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cnicBackImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProviderProfileUncheckedUpdateManyInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hourlyRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceRadius?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    serviceLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    facePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cnicNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cnicFrontImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cnicBackImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProviderProfileNullableScalarRelationFilter = {
    is?: Prisma.ProviderProfileWhereInput | null;
    isNot?: Prisma.ProviderProfileWhereInput | null;
};
export type ProviderProfileCountOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    bio?: Prisma.SortOrder;
    hourlyRate?: Prisma.SortOrder;
    serviceRadius?: Prisma.SortOrder;
    serviceLocation?: Prisma.SortOrder;
    facePhoto?: Prisma.SortOrder;
    cnicNumber?: Prisma.SortOrder;
    cnicFrontImage?: Prisma.SortOrder;
    cnicBackImage?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProviderProfileAvgOrderByAggregateInput = {
    hourlyRate?: Prisma.SortOrder;
    serviceRadius?: Prisma.SortOrder;
};
export type ProviderProfileMaxOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    bio?: Prisma.SortOrder;
    hourlyRate?: Prisma.SortOrder;
    serviceRadius?: Prisma.SortOrder;
    serviceLocation?: Prisma.SortOrder;
    facePhoto?: Prisma.SortOrder;
    cnicNumber?: Prisma.SortOrder;
    cnicFrontImage?: Prisma.SortOrder;
    cnicBackImage?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProviderProfileMinOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    bio?: Prisma.SortOrder;
    hourlyRate?: Prisma.SortOrder;
    serviceRadius?: Prisma.SortOrder;
    serviceLocation?: Prisma.SortOrder;
    facePhoto?: Prisma.SortOrder;
    cnicNumber?: Prisma.SortOrder;
    cnicFrontImage?: Prisma.SortOrder;
    cnicBackImage?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProviderProfileSumOrderByAggregateInput = {
    hourlyRate?: Prisma.SortOrder;
    serviceRadius?: Prisma.SortOrder;
};
export type ProviderProfileScalarRelationFilter = {
    is?: Prisma.ProviderProfileWhereInput;
    isNot?: Prisma.ProviderProfileWhereInput;
};
export type ProviderProfileCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ProviderProfileCreateWithoutUserInput, Prisma.ProviderProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.ProviderProfileCreateOrConnectWithoutUserInput;
    connect?: Prisma.ProviderProfileWhereUniqueInput;
};
export type ProviderProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ProviderProfileCreateWithoutUserInput, Prisma.ProviderProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.ProviderProfileCreateOrConnectWithoutUserInput;
    connect?: Prisma.ProviderProfileWhereUniqueInput;
};
export type ProviderProfileUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ProviderProfileCreateWithoutUserInput, Prisma.ProviderProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.ProviderProfileCreateOrConnectWithoutUserInput;
    upsert?: Prisma.ProviderProfileUpsertWithoutUserInput;
    disconnect?: Prisma.ProviderProfileWhereInput | boolean;
    delete?: Prisma.ProviderProfileWhereInput | boolean;
    connect?: Prisma.ProviderProfileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProviderProfileUpdateToOneWithWhereWithoutUserInput, Prisma.ProviderProfileUpdateWithoutUserInput>, Prisma.ProviderProfileUncheckedUpdateWithoutUserInput>;
};
export type ProviderProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ProviderProfileCreateWithoutUserInput, Prisma.ProviderProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.ProviderProfileCreateOrConnectWithoutUserInput;
    upsert?: Prisma.ProviderProfileUpsertWithoutUserInput;
    disconnect?: Prisma.ProviderProfileWhereInput | boolean;
    delete?: Prisma.ProviderProfileWhereInput | boolean;
    connect?: Prisma.ProviderProfileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProviderProfileUpdateToOneWithWhereWithoutUserInput, Prisma.ProviderProfileUpdateWithoutUserInput>, Prisma.ProviderProfileUncheckedUpdateWithoutUserInput>;
};
export type NullableDecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type ProviderProfileCreateNestedOneWithoutCategoriesInput = {
    create?: Prisma.XOR<Prisma.ProviderProfileCreateWithoutCategoriesInput, Prisma.ProviderProfileUncheckedCreateWithoutCategoriesInput>;
    connectOrCreate?: Prisma.ProviderProfileCreateOrConnectWithoutCategoriesInput;
    connect?: Prisma.ProviderProfileWhereUniqueInput;
};
export type ProviderProfileUpdateOneRequiredWithoutCategoriesNestedInput = {
    create?: Prisma.XOR<Prisma.ProviderProfileCreateWithoutCategoriesInput, Prisma.ProviderProfileUncheckedCreateWithoutCategoriesInput>;
    connectOrCreate?: Prisma.ProviderProfileCreateOrConnectWithoutCategoriesInput;
    upsert?: Prisma.ProviderProfileUpsertWithoutCategoriesInput;
    connect?: Prisma.ProviderProfileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProviderProfileUpdateToOneWithWhereWithoutCategoriesInput, Prisma.ProviderProfileUpdateWithoutCategoriesInput>, Prisma.ProviderProfileUncheckedUpdateWithoutCategoriesInput>;
};
export type ProviderProfileCreateNestedOneWithoutGalleryImagesInput = {
    create?: Prisma.XOR<Prisma.ProviderProfileCreateWithoutGalleryImagesInput, Prisma.ProviderProfileUncheckedCreateWithoutGalleryImagesInput>;
    connectOrCreate?: Prisma.ProviderProfileCreateOrConnectWithoutGalleryImagesInput;
    connect?: Prisma.ProviderProfileWhereUniqueInput;
};
export type ProviderProfileUpdateOneRequiredWithoutGalleryImagesNestedInput = {
    create?: Prisma.XOR<Prisma.ProviderProfileCreateWithoutGalleryImagesInput, Prisma.ProviderProfileUncheckedCreateWithoutGalleryImagesInput>;
    connectOrCreate?: Prisma.ProviderProfileCreateOrConnectWithoutGalleryImagesInput;
    upsert?: Prisma.ProviderProfileUpsertWithoutGalleryImagesInput;
    connect?: Prisma.ProviderProfileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProviderProfileUpdateToOneWithWhereWithoutGalleryImagesInput, Prisma.ProviderProfileUpdateWithoutGalleryImagesInput>, Prisma.ProviderProfileUncheckedUpdateWithoutGalleryImagesInput>;
};
export type ProviderProfileCreateWithoutUserInput = {
    bio?: string | null;
    hourlyRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceRadius?: number | null;
    serviceLocation?: string | null;
    facePhoto?: string | null;
    cnicNumber?: string | null;
    cnicFrontImage?: string | null;
    cnicBackImage?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    categories?: Prisma.ProviderServiceCategoryCreateNestedManyWithoutProviderInput;
    galleryImages?: Prisma.GalleryImageCreateNestedManyWithoutProviderInput;
};
export type ProviderProfileUncheckedCreateWithoutUserInput = {
    bio?: string | null;
    hourlyRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceRadius?: number | null;
    serviceLocation?: string | null;
    facePhoto?: string | null;
    cnicNumber?: string | null;
    cnicFrontImage?: string | null;
    cnicBackImage?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    categories?: Prisma.ProviderServiceCategoryUncheckedCreateNestedManyWithoutProviderInput;
    galleryImages?: Prisma.GalleryImageUncheckedCreateNestedManyWithoutProviderInput;
};
export type ProviderProfileCreateOrConnectWithoutUserInput = {
    where: Prisma.ProviderProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProviderProfileCreateWithoutUserInput, Prisma.ProviderProfileUncheckedCreateWithoutUserInput>;
};
export type ProviderProfileUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.ProviderProfileUpdateWithoutUserInput, Prisma.ProviderProfileUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.ProviderProfileCreateWithoutUserInput, Prisma.ProviderProfileUncheckedCreateWithoutUserInput>;
    where?: Prisma.ProviderProfileWhereInput;
};
export type ProviderProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.ProviderProfileWhereInput;
    data: Prisma.XOR<Prisma.ProviderProfileUpdateWithoutUserInput, Prisma.ProviderProfileUncheckedUpdateWithoutUserInput>;
};
export type ProviderProfileUpdateWithoutUserInput = {
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hourlyRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceRadius?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    serviceLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    facePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cnicNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cnicFrontImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cnicBackImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    categories?: Prisma.ProviderServiceCategoryUpdateManyWithoutProviderNestedInput;
    galleryImages?: Prisma.GalleryImageUpdateManyWithoutProviderNestedInput;
};
export type ProviderProfileUncheckedUpdateWithoutUserInput = {
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hourlyRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceRadius?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    serviceLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    facePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cnicNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cnicFrontImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cnicBackImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    categories?: Prisma.ProviderServiceCategoryUncheckedUpdateManyWithoutProviderNestedInput;
    galleryImages?: Prisma.GalleryImageUncheckedUpdateManyWithoutProviderNestedInput;
};
export type ProviderProfileCreateWithoutCategoriesInput = {
    bio?: string | null;
    hourlyRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceRadius?: number | null;
    serviceLocation?: string | null;
    facePhoto?: string | null;
    cnicNumber?: string | null;
    cnicFrontImage?: string | null;
    cnicBackImage?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutProviderProfileInput;
    galleryImages?: Prisma.GalleryImageCreateNestedManyWithoutProviderInput;
};
export type ProviderProfileUncheckedCreateWithoutCategoriesInput = {
    userId: string;
    bio?: string | null;
    hourlyRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceRadius?: number | null;
    serviceLocation?: string | null;
    facePhoto?: string | null;
    cnicNumber?: string | null;
    cnicFrontImage?: string | null;
    cnicBackImage?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    galleryImages?: Prisma.GalleryImageUncheckedCreateNestedManyWithoutProviderInput;
};
export type ProviderProfileCreateOrConnectWithoutCategoriesInput = {
    where: Prisma.ProviderProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProviderProfileCreateWithoutCategoriesInput, Prisma.ProviderProfileUncheckedCreateWithoutCategoriesInput>;
};
export type ProviderProfileUpsertWithoutCategoriesInput = {
    update: Prisma.XOR<Prisma.ProviderProfileUpdateWithoutCategoriesInput, Prisma.ProviderProfileUncheckedUpdateWithoutCategoriesInput>;
    create: Prisma.XOR<Prisma.ProviderProfileCreateWithoutCategoriesInput, Prisma.ProviderProfileUncheckedCreateWithoutCategoriesInput>;
    where?: Prisma.ProviderProfileWhereInput;
};
export type ProviderProfileUpdateToOneWithWhereWithoutCategoriesInput = {
    where?: Prisma.ProviderProfileWhereInput;
    data: Prisma.XOR<Prisma.ProviderProfileUpdateWithoutCategoriesInput, Prisma.ProviderProfileUncheckedUpdateWithoutCategoriesInput>;
};
export type ProviderProfileUpdateWithoutCategoriesInput = {
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hourlyRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceRadius?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    serviceLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    facePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cnicNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cnicFrontImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cnicBackImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutProviderProfileNestedInput;
    galleryImages?: Prisma.GalleryImageUpdateManyWithoutProviderNestedInput;
};
export type ProviderProfileUncheckedUpdateWithoutCategoriesInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hourlyRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceRadius?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    serviceLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    facePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cnicNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cnicFrontImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cnicBackImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    galleryImages?: Prisma.GalleryImageUncheckedUpdateManyWithoutProviderNestedInput;
};
export type ProviderProfileCreateWithoutGalleryImagesInput = {
    bio?: string | null;
    hourlyRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceRadius?: number | null;
    serviceLocation?: string | null;
    facePhoto?: string | null;
    cnicNumber?: string | null;
    cnicFrontImage?: string | null;
    cnicBackImage?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutProviderProfileInput;
    categories?: Prisma.ProviderServiceCategoryCreateNestedManyWithoutProviderInput;
};
export type ProviderProfileUncheckedCreateWithoutGalleryImagesInput = {
    userId: string;
    bio?: string | null;
    hourlyRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceRadius?: number | null;
    serviceLocation?: string | null;
    facePhoto?: string | null;
    cnicNumber?: string | null;
    cnicFrontImage?: string | null;
    cnicBackImage?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    categories?: Prisma.ProviderServiceCategoryUncheckedCreateNestedManyWithoutProviderInput;
};
export type ProviderProfileCreateOrConnectWithoutGalleryImagesInput = {
    where: Prisma.ProviderProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProviderProfileCreateWithoutGalleryImagesInput, Prisma.ProviderProfileUncheckedCreateWithoutGalleryImagesInput>;
};
export type ProviderProfileUpsertWithoutGalleryImagesInput = {
    update: Prisma.XOR<Prisma.ProviderProfileUpdateWithoutGalleryImagesInput, Prisma.ProviderProfileUncheckedUpdateWithoutGalleryImagesInput>;
    create: Prisma.XOR<Prisma.ProviderProfileCreateWithoutGalleryImagesInput, Prisma.ProviderProfileUncheckedCreateWithoutGalleryImagesInput>;
    where?: Prisma.ProviderProfileWhereInput;
};
export type ProviderProfileUpdateToOneWithWhereWithoutGalleryImagesInput = {
    where?: Prisma.ProviderProfileWhereInput;
    data: Prisma.XOR<Prisma.ProviderProfileUpdateWithoutGalleryImagesInput, Prisma.ProviderProfileUncheckedUpdateWithoutGalleryImagesInput>;
};
export type ProviderProfileUpdateWithoutGalleryImagesInput = {
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hourlyRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceRadius?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    serviceLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    facePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cnicNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cnicFrontImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cnicBackImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutProviderProfileNestedInput;
    categories?: Prisma.ProviderServiceCategoryUpdateManyWithoutProviderNestedInput;
};
export type ProviderProfileUncheckedUpdateWithoutGalleryImagesInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hourlyRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceRadius?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    serviceLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    facePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cnicNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cnicFrontImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cnicBackImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    categories?: Prisma.ProviderServiceCategoryUncheckedUpdateManyWithoutProviderNestedInput;
};
export type ProviderProfileCountOutputType = {
    categories: number;
    galleryImages: number;
};
export type ProviderProfileCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    categories?: boolean | ProviderProfileCountOutputTypeCountCategoriesArgs;
    galleryImages?: boolean | ProviderProfileCountOutputTypeCountGalleryImagesArgs;
};
export type ProviderProfileCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderProfileCountOutputTypeSelect<ExtArgs> | null;
};
export type ProviderProfileCountOutputTypeCountCategoriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProviderServiceCategoryWhereInput;
};
export type ProviderProfileCountOutputTypeCountGalleryImagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GalleryImageWhereInput;
};
export type ProviderProfileSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    bio?: boolean;
    hourlyRate?: boolean;
    serviceRadius?: boolean;
    serviceLocation?: boolean;
    facePhoto?: boolean;
    cnicNumber?: boolean;
    cnicFrontImage?: boolean;
    cnicBackImage?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    categories?: boolean | Prisma.ProviderProfile$categoriesArgs<ExtArgs>;
    galleryImages?: boolean | Prisma.ProviderProfile$galleryImagesArgs<ExtArgs>;
    _count?: boolean | Prisma.ProviderProfileCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["providerProfile"]>;
export type ProviderProfileSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    bio?: boolean;
    hourlyRate?: boolean;
    serviceRadius?: boolean;
    serviceLocation?: boolean;
    facePhoto?: boolean;
    cnicNumber?: boolean;
    cnicFrontImage?: boolean;
    cnicBackImage?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["providerProfile"]>;
export type ProviderProfileSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    bio?: boolean;
    hourlyRate?: boolean;
    serviceRadius?: boolean;
    serviceLocation?: boolean;
    facePhoto?: boolean;
    cnicNumber?: boolean;
    cnicFrontImage?: boolean;
    cnicBackImage?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["providerProfile"]>;
export type ProviderProfileSelectScalar = {
    userId?: boolean;
    bio?: boolean;
    hourlyRate?: boolean;
    serviceRadius?: boolean;
    serviceLocation?: boolean;
    facePhoto?: boolean;
    cnicNumber?: boolean;
    cnicFrontImage?: boolean;
    cnicBackImage?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ProviderProfileOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"userId" | "bio" | "hourlyRate" | "serviceRadius" | "serviceLocation" | "facePhoto" | "cnicNumber" | "cnicFrontImage" | "cnicBackImage" | "createdAt" | "updatedAt", ExtArgs["result"]["providerProfile"]>;
export type ProviderProfileInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    categories?: boolean | Prisma.ProviderProfile$categoriesArgs<ExtArgs>;
    galleryImages?: boolean | Prisma.ProviderProfile$galleryImagesArgs<ExtArgs>;
    _count?: boolean | Prisma.ProviderProfileCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ProviderProfileIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ProviderProfileIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $ProviderProfilePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProviderProfile";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        categories: Prisma.$ProviderServiceCategoryPayload<ExtArgs>[];
        galleryImages: Prisma.$GalleryImagePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        userId: string;
        bio: string | null;
        hourlyRate: runtime.Decimal | null;
        serviceRadius: number | null;
        serviceLocation: string | null;
        facePhoto: string | null;
        cnicNumber: string | null;
        cnicFrontImage: string | null;
        cnicBackImage: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["providerProfile"]>;
    composites: {};
};
export type ProviderProfileGetPayload<S extends boolean | null | undefined | ProviderProfileDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProviderProfilePayload, S>;
export type ProviderProfileCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProviderProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProviderProfileCountAggregateInputType | true;
};
export interface ProviderProfileDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProviderProfile'];
        meta: {
            name: 'ProviderProfile';
        };
    };
    findUnique<T extends ProviderProfileFindUniqueArgs>(args: Prisma.SelectSubset<T, ProviderProfileFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProviderProfileClient<runtime.Types.Result.GetResult<Prisma.$ProviderProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProviderProfileFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProviderProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProviderProfileClient<runtime.Types.Result.GetResult<Prisma.$ProviderProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProviderProfileFindFirstArgs>(args?: Prisma.SelectSubset<T, ProviderProfileFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProviderProfileClient<runtime.Types.Result.GetResult<Prisma.$ProviderProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProviderProfileFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProviderProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProviderProfileClient<runtime.Types.Result.GetResult<Prisma.$ProviderProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProviderProfileFindManyArgs>(args?: Prisma.SelectSubset<T, ProviderProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProviderProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProviderProfileCreateArgs>(args: Prisma.SelectSubset<T, ProviderProfileCreateArgs<ExtArgs>>): Prisma.Prisma__ProviderProfileClient<runtime.Types.Result.GetResult<Prisma.$ProviderProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProviderProfileCreateManyArgs>(args?: Prisma.SelectSubset<T, ProviderProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProviderProfileCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProviderProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProviderProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProviderProfileDeleteArgs>(args: Prisma.SelectSubset<T, ProviderProfileDeleteArgs<ExtArgs>>): Prisma.Prisma__ProviderProfileClient<runtime.Types.Result.GetResult<Prisma.$ProviderProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProviderProfileUpdateArgs>(args: Prisma.SelectSubset<T, ProviderProfileUpdateArgs<ExtArgs>>): Prisma.Prisma__ProviderProfileClient<runtime.Types.Result.GetResult<Prisma.$ProviderProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProviderProfileDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProviderProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProviderProfileUpdateManyArgs>(args: Prisma.SelectSubset<T, ProviderProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProviderProfileUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProviderProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProviderProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProviderProfileUpsertArgs>(args: Prisma.SelectSubset<T, ProviderProfileUpsertArgs<ExtArgs>>): Prisma.Prisma__ProviderProfileClient<runtime.Types.Result.GetResult<Prisma.$ProviderProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProviderProfileCountArgs>(args?: Prisma.Subset<T, ProviderProfileCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProviderProfileCountAggregateOutputType> : number>;
    aggregate<T extends ProviderProfileAggregateArgs>(args: Prisma.Subset<T, ProviderProfileAggregateArgs>): Prisma.PrismaPromise<GetProviderProfileAggregateType<T>>;
    groupBy<T extends ProviderProfileGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProviderProfileGroupByArgs['orderBy'];
    } : {
        orderBy?: ProviderProfileGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProviderProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProviderProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProviderProfileFieldRefs;
}
export interface Prisma__ProviderProfileClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    categories<T extends Prisma.ProviderProfile$categoriesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProviderProfile$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProviderServiceCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    galleryImages<T extends Prisma.ProviderProfile$galleryImagesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProviderProfile$galleryImagesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GalleryImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProviderProfileFieldRefs {
    readonly userId: Prisma.FieldRef<"ProviderProfile", 'String'>;
    readonly bio: Prisma.FieldRef<"ProviderProfile", 'String'>;
    readonly hourlyRate: Prisma.FieldRef<"ProviderProfile", 'Decimal'>;
    readonly serviceRadius: Prisma.FieldRef<"ProviderProfile", 'Int'>;
    readonly serviceLocation: Prisma.FieldRef<"ProviderProfile", 'String'>;
    readonly facePhoto: Prisma.FieldRef<"ProviderProfile", 'String'>;
    readonly cnicNumber: Prisma.FieldRef<"ProviderProfile", 'String'>;
    readonly cnicFrontImage: Prisma.FieldRef<"ProviderProfile", 'String'>;
    readonly cnicBackImage: Prisma.FieldRef<"ProviderProfile", 'String'>;
    readonly createdAt: Prisma.FieldRef<"ProviderProfile", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ProviderProfile", 'DateTime'>;
}
export type ProviderProfileFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderProfileSelect<ExtArgs> | null;
    omit?: Prisma.ProviderProfileOmit<ExtArgs> | null;
    include?: Prisma.ProviderProfileInclude<ExtArgs> | null;
    where: Prisma.ProviderProfileWhereUniqueInput;
};
export type ProviderProfileFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderProfileSelect<ExtArgs> | null;
    omit?: Prisma.ProviderProfileOmit<ExtArgs> | null;
    include?: Prisma.ProviderProfileInclude<ExtArgs> | null;
    where: Prisma.ProviderProfileWhereUniqueInput;
};
export type ProviderProfileFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderProfileSelect<ExtArgs> | null;
    omit?: Prisma.ProviderProfileOmit<ExtArgs> | null;
    include?: Prisma.ProviderProfileInclude<ExtArgs> | null;
    where?: Prisma.ProviderProfileWhereInput;
    orderBy?: Prisma.ProviderProfileOrderByWithRelationInput | Prisma.ProviderProfileOrderByWithRelationInput[];
    cursor?: Prisma.ProviderProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProviderProfileScalarFieldEnum | Prisma.ProviderProfileScalarFieldEnum[];
};
export type ProviderProfileFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderProfileSelect<ExtArgs> | null;
    omit?: Prisma.ProviderProfileOmit<ExtArgs> | null;
    include?: Prisma.ProviderProfileInclude<ExtArgs> | null;
    where?: Prisma.ProviderProfileWhereInput;
    orderBy?: Prisma.ProviderProfileOrderByWithRelationInput | Prisma.ProviderProfileOrderByWithRelationInput[];
    cursor?: Prisma.ProviderProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProviderProfileScalarFieldEnum | Prisma.ProviderProfileScalarFieldEnum[];
};
export type ProviderProfileFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderProfileSelect<ExtArgs> | null;
    omit?: Prisma.ProviderProfileOmit<ExtArgs> | null;
    include?: Prisma.ProviderProfileInclude<ExtArgs> | null;
    where?: Prisma.ProviderProfileWhereInput;
    orderBy?: Prisma.ProviderProfileOrderByWithRelationInput | Prisma.ProviderProfileOrderByWithRelationInput[];
    cursor?: Prisma.ProviderProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProviderProfileScalarFieldEnum | Prisma.ProviderProfileScalarFieldEnum[];
};
export type ProviderProfileCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderProfileSelect<ExtArgs> | null;
    omit?: Prisma.ProviderProfileOmit<ExtArgs> | null;
    include?: Prisma.ProviderProfileInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProviderProfileCreateInput, Prisma.ProviderProfileUncheckedCreateInput>;
};
export type ProviderProfileCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProviderProfileCreateManyInput | Prisma.ProviderProfileCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProviderProfileCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderProfileSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProviderProfileOmit<ExtArgs> | null;
    data: Prisma.ProviderProfileCreateManyInput | Prisma.ProviderProfileCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProviderProfileIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProviderProfileUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderProfileSelect<ExtArgs> | null;
    omit?: Prisma.ProviderProfileOmit<ExtArgs> | null;
    include?: Prisma.ProviderProfileInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProviderProfileUpdateInput, Prisma.ProviderProfileUncheckedUpdateInput>;
    where: Prisma.ProviderProfileWhereUniqueInput;
};
export type ProviderProfileUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProviderProfileUpdateManyMutationInput, Prisma.ProviderProfileUncheckedUpdateManyInput>;
    where?: Prisma.ProviderProfileWhereInput;
    limit?: number;
};
export type ProviderProfileUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderProfileSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProviderProfileOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProviderProfileUpdateManyMutationInput, Prisma.ProviderProfileUncheckedUpdateManyInput>;
    where?: Prisma.ProviderProfileWhereInput;
    limit?: number;
    include?: Prisma.ProviderProfileIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProviderProfileUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderProfileSelect<ExtArgs> | null;
    omit?: Prisma.ProviderProfileOmit<ExtArgs> | null;
    include?: Prisma.ProviderProfileInclude<ExtArgs> | null;
    where: Prisma.ProviderProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProviderProfileCreateInput, Prisma.ProviderProfileUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProviderProfileUpdateInput, Prisma.ProviderProfileUncheckedUpdateInput>;
};
export type ProviderProfileDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderProfileSelect<ExtArgs> | null;
    omit?: Prisma.ProviderProfileOmit<ExtArgs> | null;
    include?: Prisma.ProviderProfileInclude<ExtArgs> | null;
    where: Prisma.ProviderProfileWhereUniqueInput;
};
export type ProviderProfileDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProviderProfileWhereInput;
    limit?: number;
};
export type ProviderProfile$categoriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProviderProfile$galleryImagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProviderProfileDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderProfileSelect<ExtArgs> | null;
    omit?: Prisma.ProviderProfileOmit<ExtArgs> | null;
    include?: Prisma.ProviderProfileInclude<ExtArgs> | null;
};
export {};
