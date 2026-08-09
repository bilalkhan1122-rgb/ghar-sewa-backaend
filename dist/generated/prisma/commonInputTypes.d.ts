import type * as runtime from "@prisma/client/runtime/library";
import * as $Enums from "./enums";
import type * as Prisma from "./internal/prismaNamespace";
export type StringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | Prisma.EnumUserRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole;
};
export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null;
};
export type EnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | Prisma.EnumUserStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus;
};
export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolFilter<$PrismaModel> | boolean;
};
export type EnumVerificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | Prisma.EnumVerificationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.VerificationStatus[] | Prisma.ListEnumVerificationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.VerificationStatus[] | Prisma.ListEnumVerificationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumVerificationStatusFilter<$PrismaModel> | $Enums.VerificationStatus;
};
export type DecimalFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
};
export type SortOrderInput = {
    sort: Prisma.SortOrder;
    nulls?: Prisma.NullsOrder;
};
export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | Prisma.EnumUserRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumUserRoleFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumUserRoleFilter<$PrismaModel>;
};
export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type EnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | Prisma.EnumUserStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumUserStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumUserStatusFilter<$PrismaModel>;
};
export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedBoolFilter<$PrismaModel>;
    _max?: Prisma.NestedBoolFilter<$PrismaModel>;
};
export type EnumVerificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | Prisma.EnumVerificationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.VerificationStatus[] | Prisma.ListEnumVerificationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.VerificationStatus[] | Prisma.ListEnumVerificationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumVerificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.VerificationStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumVerificationStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumVerificationStatusFilter<$PrismaModel>;
};
export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalWithAggregatesFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedDecimalFilter<$PrismaModel>;
    _sum?: Prisma.NestedDecimalFilter<$PrismaModel>;
    _min?: Prisma.NestedDecimalFilter<$PrismaModel>;
    _max?: Prisma.NestedDecimalFilter<$PrismaModel>;
};
export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
};
export type IntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedIntFilter<$PrismaModel>;
    _max?: Prisma.NestedIntFilter<$PrismaModel>;
};
export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel> | null;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalNullableFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableFilter<$PrismaModel> | number | null;
};
export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel> | null;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
};
export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedIntNullableFilter<$PrismaModel>;
};
export type EnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | Prisma.EnumBookingStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.BookingStatus[] | Prisma.ListEnumBookingStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BookingStatus[] | Prisma.ListEnumBookingStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus;
};
export type EnumBookingTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingType | Prisma.EnumBookingTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.BookingType[] | Prisma.ListEnumBookingTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BookingType[] | Prisma.ListEnumBookingTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBookingTypeFilter<$PrismaModel> | $Enums.BookingType;
};
export type EnumBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | Prisma.EnumBookingStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.BookingStatus[] | Prisma.ListEnumBookingStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BookingStatus[] | Prisma.ListEnumBookingStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumBookingStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumBookingStatusFilter<$PrismaModel>;
};
export type EnumBookingTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingType | Prisma.EnumBookingTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.BookingType[] | Prisma.ListEnumBookingTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BookingType[] | Prisma.ListEnumBookingTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBookingTypeWithAggregatesFilter<$PrismaModel> | $Enums.BookingType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumBookingTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumBookingTypeFilter<$PrismaModel>;
};
export type FloatFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatFilter<$PrismaModel> | number;
};
export type EnumJobStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | Prisma.EnumJobStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.JobStatus[] | Prisma.ListEnumJobStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.JobStatus[] | Prisma.ListEnumJobStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumJobStatusFilter<$PrismaModel> | $Enums.JobStatus;
};
export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedFloatFilter<$PrismaModel>;
    _min?: Prisma.NestedFloatFilter<$PrismaModel>;
    _max?: Prisma.NestedFloatFilter<$PrismaModel>;
};
export type EnumJobStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | Prisma.EnumJobStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.JobStatus[] | Prisma.ListEnumJobStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.JobStatus[] | Prisma.ListEnumJobStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumJobStatusWithAggregatesFilter<$PrismaModel> | $Enums.JobStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumJobStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumJobStatusFilter<$PrismaModel>;
};
export type EnumBidStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BidStatus | Prisma.EnumBidStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.BidStatus[] | Prisma.ListEnumBidStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BidStatus[] | Prisma.ListEnumBidStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBidStatusFilter<$PrismaModel> | $Enums.BidStatus;
};
export type EnumBidStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BidStatus | Prisma.EnumBidStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.BidStatus[] | Prisma.ListEnumBidStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BidStatus[] | Prisma.ListEnumBidStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBidStatusWithAggregatesFilter<$PrismaModel> | $Enums.BidStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumBidStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumBidStatusFilter<$PrismaModel>;
};
export type EnumCancellationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CancellationType | Prisma.EnumCancellationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CancellationType[] | Prisma.ListEnumCancellationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CancellationType[] | Prisma.ListEnumCancellationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCancellationTypeFilter<$PrismaModel> | $Enums.CancellationType;
};
export type EnumCancellationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CancellationType | Prisma.EnumCancellationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CancellationType[] | Prisma.ListEnumCancellationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CancellationType[] | Prisma.ListEnumCancellationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCancellationTypeWithAggregatesFilter<$PrismaModel> | $Enums.CancellationType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCancellationTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCancellationTypeFilter<$PrismaModel>;
};
export type EnumDisputeStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeStatus | Prisma.EnumDisputeStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.DisputeStatus[] | Prisma.ListEnumDisputeStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DisputeStatus[] | Prisma.ListEnumDisputeStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDisputeStatusFilter<$PrismaModel> | $Enums.DisputeStatus;
};
export type EnumDisputeResolutionNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeResolution | Prisma.EnumDisputeResolutionFieldRefInput<$PrismaModel> | null;
    in?: $Enums.DisputeResolution[] | Prisma.ListEnumDisputeResolutionFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.DisputeResolution[] | Prisma.ListEnumDisputeResolutionFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumDisputeResolutionNullableFilter<$PrismaModel> | $Enums.DisputeResolution | null;
};
export type EnumDisputeStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeStatus | Prisma.EnumDisputeStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.DisputeStatus[] | Prisma.ListEnumDisputeStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DisputeStatus[] | Prisma.ListEnumDisputeStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDisputeStatusWithAggregatesFilter<$PrismaModel> | $Enums.DisputeStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDisputeStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDisputeStatusFilter<$PrismaModel>;
};
export type EnumDisputeResolutionNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeResolution | Prisma.EnumDisputeResolutionFieldRefInput<$PrismaModel> | null;
    in?: $Enums.DisputeResolution[] | Prisma.ListEnumDisputeResolutionFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.DisputeResolution[] | Prisma.ListEnumDisputeResolutionFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumDisputeResolutionNullableWithAggregatesFilter<$PrismaModel> | $Enums.DisputeResolution | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDisputeResolutionNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDisputeResolutionNullableFilter<$PrismaModel>;
};
export type EnumDisputeEvidenceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeEvidenceType | Prisma.EnumDisputeEvidenceTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.DisputeEvidenceType[] | Prisma.ListEnumDisputeEvidenceTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DisputeEvidenceType[] | Prisma.ListEnumDisputeEvidenceTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDisputeEvidenceTypeFilter<$PrismaModel> | $Enums.DisputeEvidenceType;
};
export type EnumDisputeEvidenceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeEvidenceType | Prisma.EnumDisputeEvidenceTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.DisputeEvidenceType[] | Prisma.ListEnumDisputeEvidenceTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DisputeEvidenceType[] | Prisma.ListEnumDisputeEvidenceTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDisputeEvidenceTypeWithAggregatesFilter<$PrismaModel> | $Enums.DisputeEvidenceType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDisputeEvidenceTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDisputeEvidenceTypeFilter<$PrismaModel>;
};
export type EnumPenaltyTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PenaltyType | Prisma.EnumPenaltyTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.PenaltyType[] | Prisma.ListEnumPenaltyTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PenaltyType[] | Prisma.ListEnumPenaltyTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPenaltyTypeFilter<$PrismaModel> | $Enums.PenaltyType;
};
export type EnumPenaltyTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PenaltyType | Prisma.EnumPenaltyTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.PenaltyType[] | Prisma.ListEnumPenaltyTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PenaltyType[] | Prisma.ListEnumPenaltyTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPenaltyTypeWithAggregatesFilter<$PrismaModel> | $Enums.PenaltyType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPenaltyTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPenaltyTypeFilter<$PrismaModel>;
};
export type EnumAppealStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AppealStatus | Prisma.EnumAppealStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.AppealStatus[] | Prisma.ListEnumAppealStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AppealStatus[] | Prisma.ListEnumAppealStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAppealStatusFilter<$PrismaModel> | $Enums.AppealStatus;
};
export type EnumAppealStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppealStatus | Prisma.EnumAppealStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.AppealStatus[] | Prisma.ListEnumAppealStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AppealStatus[] | Prisma.ListEnumAppealStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAppealStatusWithAggregatesFilter<$PrismaModel> | $Enums.AppealStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAppealStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAppealStatusFilter<$PrismaModel>;
};
export type EnumReviewStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewStatus | Prisma.EnumReviewStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReviewStatus[] | Prisma.ListEnumReviewStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReviewStatus[] | Prisma.ListEnumReviewStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReviewStatusFilter<$PrismaModel> | $Enums.ReviewStatus;
};
export type EnumReviewStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewStatus | Prisma.EnumReviewStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReviewStatus[] | Prisma.ListEnumReviewStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReviewStatus[] | Prisma.ListEnumReviewStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReviewStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReviewStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReviewStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReviewStatusFilter<$PrismaModel>;
};
export type EnumRatingFlagStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RatingFlagStatus | Prisma.EnumRatingFlagStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.RatingFlagStatus[] | Prisma.ListEnumRatingFlagStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RatingFlagStatus[] | Prisma.ListEnumRatingFlagStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRatingFlagStatusFilter<$PrismaModel> | $Enums.RatingFlagStatus;
};
export type EnumRatingFlagStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RatingFlagStatus | Prisma.EnumRatingFlagStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.RatingFlagStatus[] | Prisma.ListEnumRatingFlagStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RatingFlagStatus[] | Prisma.ListEnumRatingFlagStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRatingFlagStatusWithAggregatesFilter<$PrismaModel> | $Enums.RatingFlagStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumRatingFlagStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumRatingFlagStatusFilter<$PrismaModel>;
};
export type EnumMessageTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageType | Prisma.EnumMessageTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.MessageType[] | Prisma.ListEnumMessageTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MessageType[] | Prisma.ListEnumMessageTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMessageTypeFilter<$PrismaModel> | $Enums.MessageType;
};
export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatNullableFilter<$PrismaModel> | number | null;
};
export type EnumMessageTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageType | Prisma.EnumMessageTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.MessageType[] | Prisma.ListEnumMessageTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MessageType[] | Prisma.ListEnumMessageTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMessageTypeWithAggregatesFilter<$PrismaModel> | $Enums.MessageType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumMessageTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumMessageTypeFilter<$PrismaModel>;
};
export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
};
export type EnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | Prisma.EnumNotificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType;
};
export type EnumNotificationCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationCategory | Prisma.EnumNotificationCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationCategory[] | Prisma.ListEnumNotificationCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationCategory[] | Prisma.ListEnumNotificationCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationCategoryFilter<$PrismaModel> | $Enums.NotificationCategory;
};
export type EnumNotificationDeliveryStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationDeliveryStatus | Prisma.EnumNotificationDeliveryStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationDeliveryStatus[] | Prisma.ListEnumNotificationDeliveryStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationDeliveryStatus[] | Prisma.ListEnumNotificationDeliveryStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationDeliveryStatusFilter<$PrismaModel> | $Enums.NotificationDeliveryStatus;
};
export type EnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | Prisma.EnumNotificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel>;
};
export type EnumNotificationCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationCategory | Prisma.EnumNotificationCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationCategory[] | Prisma.ListEnumNotificationCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationCategory[] | Prisma.ListEnumNotificationCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationCategoryWithAggregatesFilter<$PrismaModel> | $Enums.NotificationCategory;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationCategoryFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationCategoryFilter<$PrismaModel>;
};
export type EnumNotificationDeliveryStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationDeliveryStatus | Prisma.EnumNotificationDeliveryStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationDeliveryStatus[] | Prisma.ListEnumNotificationDeliveryStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationDeliveryStatus[] | Prisma.ListEnumNotificationDeliveryStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationDeliveryStatusWithAggregatesFilter<$PrismaModel> | $Enums.NotificationDeliveryStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationDeliveryStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationDeliveryStatusFilter<$PrismaModel>;
};
export type EnumWalletTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletType | Prisma.EnumWalletTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.WalletType[] | Prisma.ListEnumWalletTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WalletType[] | Prisma.ListEnumWalletTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWalletTypeFilter<$PrismaModel> | $Enums.WalletType;
};
export type EnumWalletStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletStatus | Prisma.EnumWalletStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WalletStatus[] | Prisma.ListEnumWalletStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WalletStatus[] | Prisma.ListEnumWalletStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWalletStatusFilter<$PrismaModel> | $Enums.WalletStatus;
};
export type EnumWalletTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletType | Prisma.EnumWalletTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.WalletType[] | Prisma.ListEnumWalletTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WalletType[] | Prisma.ListEnumWalletTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWalletTypeWithAggregatesFilter<$PrismaModel> | $Enums.WalletType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWalletTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWalletTypeFilter<$PrismaModel>;
};
export type EnumWalletStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletStatus | Prisma.EnumWalletStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WalletStatus[] | Prisma.ListEnumWalletStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WalletStatus[] | Prisma.ListEnumWalletStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWalletStatusWithAggregatesFilter<$PrismaModel> | $Enums.WalletStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWalletStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWalletStatusFilter<$PrismaModel>;
};
export type EnumWalletTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletTransactionType | Prisma.EnumWalletTransactionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.WalletTransactionType[] | Prisma.ListEnumWalletTransactionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WalletTransactionType[] | Prisma.ListEnumWalletTransactionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWalletTransactionTypeFilter<$PrismaModel> | $Enums.WalletTransactionType;
};
export type EnumWalletTransactionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletTransactionStatus | Prisma.EnumWalletTransactionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WalletTransactionStatus[] | Prisma.ListEnumWalletTransactionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WalletTransactionStatus[] | Prisma.ListEnumWalletTransactionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWalletTransactionStatusFilter<$PrismaModel> | $Enums.WalletTransactionStatus;
};
export type EnumWalletTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletTransactionType | Prisma.EnumWalletTransactionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.WalletTransactionType[] | Prisma.ListEnumWalletTransactionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WalletTransactionType[] | Prisma.ListEnumWalletTransactionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWalletTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.WalletTransactionType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWalletTransactionTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWalletTransactionTypeFilter<$PrismaModel>;
};
export type EnumWalletTransactionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletTransactionStatus | Prisma.EnumWalletTransactionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WalletTransactionStatus[] | Prisma.ListEnumWalletTransactionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WalletTransactionStatus[] | Prisma.ListEnumWalletTransactionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWalletTransactionStatusWithAggregatesFilter<$PrismaModel> | $Enums.WalletTransactionStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWalletTransactionStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWalletTransactionStatusFilter<$PrismaModel>;
};
export type EnumPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | Prisma.EnumPaymentMethodFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentMethod[] | Prisma.ListEnumPaymentMethodFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentMethod[] | Prisma.ListEnumPaymentMethodFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPaymentMethodFilter<$PrismaModel> | $Enums.PaymentMethod;
};
export type EnumTopUpStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TopUpStatus | Prisma.EnumTopUpStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.TopUpStatus[] | Prisma.ListEnumTopUpStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TopUpStatus[] | Prisma.ListEnumTopUpStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTopUpStatusFilter<$PrismaModel> | $Enums.TopUpStatus;
};
export type EnumPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | Prisma.EnumPaymentMethodFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentMethod[] | Prisma.ListEnumPaymentMethodFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentMethod[] | Prisma.ListEnumPaymentMethodFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPaymentMethodFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPaymentMethodFilter<$PrismaModel>;
};
export type EnumTopUpStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TopUpStatus | Prisma.EnumTopUpStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.TopUpStatus[] | Prisma.ListEnumTopUpStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TopUpStatus[] | Prisma.ListEnumTopUpStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTopUpStatusWithAggregatesFilter<$PrismaModel> | $Enums.TopUpStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTopUpStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTopUpStatusFilter<$PrismaModel>;
};
export type EnumWithdrawalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WithdrawalStatus | Prisma.EnumWithdrawalStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WithdrawalStatus[] | Prisma.ListEnumWithdrawalStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WithdrawalStatus[] | Prisma.ListEnumWithdrawalStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWithdrawalStatusFilter<$PrismaModel> | $Enums.WithdrawalStatus;
};
export type EnumWithdrawalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WithdrawalStatus | Prisma.EnumWithdrawalStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WithdrawalStatus[] | Prisma.ListEnumWithdrawalStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WithdrawalStatus[] | Prisma.ListEnumWithdrawalStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWithdrawalStatusWithAggregatesFilter<$PrismaModel> | $Enums.WithdrawalStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWithdrawalStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWithdrawalStatusFilter<$PrismaModel>;
};
export type JsonNullableFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>, Required<JsonNullableFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>;
export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
};
export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>, Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>;
export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedJsonNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedJsonNullableFilter<$PrismaModel>;
};
export type EnumAdminRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.AdminRole | Prisma.EnumAdminRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.AdminRole[] | Prisma.ListEnumAdminRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AdminRole[] | Prisma.ListEnumAdminRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAdminRoleFilter<$PrismaModel> | $Enums.AdminRole;
};
export type EnumAdminRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AdminRole | Prisma.EnumAdminRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.AdminRole[] | Prisma.ListEnumAdminRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AdminRole[] | Prisma.ListEnumAdminRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAdminRoleWithAggregatesFilter<$PrismaModel> | $Enums.AdminRole;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAdminRoleFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAdminRoleFilter<$PrismaModel>;
};
export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | Prisma.EnumUserRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole;
};
export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null;
};
export type NestedEnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | Prisma.EnumUserStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus;
};
export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolFilter<$PrismaModel> | boolean;
};
export type NestedEnumVerificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | Prisma.EnumVerificationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.VerificationStatus[] | Prisma.ListEnumVerificationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.VerificationStatus[] | Prisma.ListEnumVerificationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumVerificationStatusFilter<$PrismaModel> | $Enums.VerificationStatus;
};
export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
};
export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | Prisma.EnumUserRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumUserRoleFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumUserRoleFilter<$PrismaModel>;
};
export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableFilter<$PrismaModel> | number | null;
};
export type NestedEnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | Prisma.EnumUserStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumUserStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumUserStatusFilter<$PrismaModel>;
};
export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedBoolFilter<$PrismaModel>;
    _max?: Prisma.NestedBoolFilter<$PrismaModel>;
};
export type NestedEnumVerificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | Prisma.EnumVerificationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.VerificationStatus[] | Prisma.ListEnumVerificationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.VerificationStatus[] | Prisma.ListEnumVerificationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumVerificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.VerificationStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumVerificationStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumVerificationStatusFilter<$PrismaModel>;
};
export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalWithAggregatesFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedDecimalFilter<$PrismaModel>;
    _sum?: Prisma.NestedDecimalFilter<$PrismaModel>;
    _min?: Prisma.NestedDecimalFilter<$PrismaModel>;
    _max?: Prisma.NestedDecimalFilter<$PrismaModel>;
};
export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
};
export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedIntFilter<$PrismaModel>;
    _max?: Prisma.NestedIntFilter<$PrismaModel>;
};
export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatFilter<$PrismaModel> | number;
};
export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel> | null;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalNullableFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel> | null;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
};
export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedIntNullableFilter<$PrismaModel>;
};
export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatNullableFilter<$PrismaModel> | number | null;
};
export type NestedEnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | Prisma.EnumBookingStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.BookingStatus[] | Prisma.ListEnumBookingStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BookingStatus[] | Prisma.ListEnumBookingStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus;
};
export type NestedEnumBookingTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingType | Prisma.EnumBookingTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.BookingType[] | Prisma.ListEnumBookingTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BookingType[] | Prisma.ListEnumBookingTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBookingTypeFilter<$PrismaModel> | $Enums.BookingType;
};
export type NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | Prisma.EnumBookingStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.BookingStatus[] | Prisma.ListEnumBookingStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BookingStatus[] | Prisma.ListEnumBookingStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumBookingStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumBookingStatusFilter<$PrismaModel>;
};
export type NestedEnumBookingTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingType | Prisma.EnumBookingTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.BookingType[] | Prisma.ListEnumBookingTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BookingType[] | Prisma.ListEnumBookingTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBookingTypeWithAggregatesFilter<$PrismaModel> | $Enums.BookingType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumBookingTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumBookingTypeFilter<$PrismaModel>;
};
export type NestedEnumJobStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | Prisma.EnumJobStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.JobStatus[] | Prisma.ListEnumJobStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.JobStatus[] | Prisma.ListEnumJobStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumJobStatusFilter<$PrismaModel> | $Enums.JobStatus;
};
export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedFloatFilter<$PrismaModel>;
    _min?: Prisma.NestedFloatFilter<$PrismaModel>;
    _max?: Prisma.NestedFloatFilter<$PrismaModel>;
};
export type NestedEnumJobStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | Prisma.EnumJobStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.JobStatus[] | Prisma.ListEnumJobStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.JobStatus[] | Prisma.ListEnumJobStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumJobStatusWithAggregatesFilter<$PrismaModel> | $Enums.JobStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumJobStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumJobStatusFilter<$PrismaModel>;
};
export type NestedEnumBidStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BidStatus | Prisma.EnumBidStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.BidStatus[] | Prisma.ListEnumBidStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BidStatus[] | Prisma.ListEnumBidStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBidStatusFilter<$PrismaModel> | $Enums.BidStatus;
};
export type NestedEnumBidStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BidStatus | Prisma.EnumBidStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.BidStatus[] | Prisma.ListEnumBidStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BidStatus[] | Prisma.ListEnumBidStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBidStatusWithAggregatesFilter<$PrismaModel> | $Enums.BidStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumBidStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumBidStatusFilter<$PrismaModel>;
};
export type NestedEnumCancellationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CancellationType | Prisma.EnumCancellationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CancellationType[] | Prisma.ListEnumCancellationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CancellationType[] | Prisma.ListEnumCancellationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCancellationTypeFilter<$PrismaModel> | $Enums.CancellationType;
};
export type NestedEnumCancellationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CancellationType | Prisma.EnumCancellationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CancellationType[] | Prisma.ListEnumCancellationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CancellationType[] | Prisma.ListEnumCancellationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCancellationTypeWithAggregatesFilter<$PrismaModel> | $Enums.CancellationType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCancellationTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCancellationTypeFilter<$PrismaModel>;
};
export type NestedEnumDisputeStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeStatus | Prisma.EnumDisputeStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.DisputeStatus[] | Prisma.ListEnumDisputeStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DisputeStatus[] | Prisma.ListEnumDisputeStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDisputeStatusFilter<$PrismaModel> | $Enums.DisputeStatus;
};
export type NestedEnumDisputeResolutionNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeResolution | Prisma.EnumDisputeResolutionFieldRefInput<$PrismaModel> | null;
    in?: $Enums.DisputeResolution[] | Prisma.ListEnumDisputeResolutionFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.DisputeResolution[] | Prisma.ListEnumDisputeResolutionFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumDisputeResolutionNullableFilter<$PrismaModel> | $Enums.DisputeResolution | null;
};
export type NestedEnumDisputeStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeStatus | Prisma.EnumDisputeStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.DisputeStatus[] | Prisma.ListEnumDisputeStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DisputeStatus[] | Prisma.ListEnumDisputeStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDisputeStatusWithAggregatesFilter<$PrismaModel> | $Enums.DisputeStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDisputeStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDisputeStatusFilter<$PrismaModel>;
};
export type NestedEnumDisputeResolutionNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeResolution | Prisma.EnumDisputeResolutionFieldRefInput<$PrismaModel> | null;
    in?: $Enums.DisputeResolution[] | Prisma.ListEnumDisputeResolutionFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.DisputeResolution[] | Prisma.ListEnumDisputeResolutionFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumDisputeResolutionNullableWithAggregatesFilter<$PrismaModel> | $Enums.DisputeResolution | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDisputeResolutionNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDisputeResolutionNullableFilter<$PrismaModel>;
};
export type NestedEnumDisputeEvidenceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeEvidenceType | Prisma.EnumDisputeEvidenceTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.DisputeEvidenceType[] | Prisma.ListEnumDisputeEvidenceTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DisputeEvidenceType[] | Prisma.ListEnumDisputeEvidenceTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDisputeEvidenceTypeFilter<$PrismaModel> | $Enums.DisputeEvidenceType;
};
export type NestedEnumDisputeEvidenceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeEvidenceType | Prisma.EnumDisputeEvidenceTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.DisputeEvidenceType[] | Prisma.ListEnumDisputeEvidenceTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DisputeEvidenceType[] | Prisma.ListEnumDisputeEvidenceTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDisputeEvidenceTypeWithAggregatesFilter<$PrismaModel> | $Enums.DisputeEvidenceType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDisputeEvidenceTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDisputeEvidenceTypeFilter<$PrismaModel>;
};
export type NestedEnumPenaltyTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PenaltyType | Prisma.EnumPenaltyTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.PenaltyType[] | Prisma.ListEnumPenaltyTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PenaltyType[] | Prisma.ListEnumPenaltyTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPenaltyTypeFilter<$PrismaModel> | $Enums.PenaltyType;
};
export type NestedEnumPenaltyTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PenaltyType | Prisma.EnumPenaltyTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.PenaltyType[] | Prisma.ListEnumPenaltyTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PenaltyType[] | Prisma.ListEnumPenaltyTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPenaltyTypeWithAggregatesFilter<$PrismaModel> | $Enums.PenaltyType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPenaltyTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPenaltyTypeFilter<$PrismaModel>;
};
export type NestedEnumAppealStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AppealStatus | Prisma.EnumAppealStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.AppealStatus[] | Prisma.ListEnumAppealStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AppealStatus[] | Prisma.ListEnumAppealStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAppealStatusFilter<$PrismaModel> | $Enums.AppealStatus;
};
export type NestedEnumAppealStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppealStatus | Prisma.EnumAppealStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.AppealStatus[] | Prisma.ListEnumAppealStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AppealStatus[] | Prisma.ListEnumAppealStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAppealStatusWithAggregatesFilter<$PrismaModel> | $Enums.AppealStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAppealStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAppealStatusFilter<$PrismaModel>;
};
export type NestedEnumReviewStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewStatus | Prisma.EnumReviewStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReviewStatus[] | Prisma.ListEnumReviewStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReviewStatus[] | Prisma.ListEnumReviewStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReviewStatusFilter<$PrismaModel> | $Enums.ReviewStatus;
};
export type NestedEnumReviewStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewStatus | Prisma.EnumReviewStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReviewStatus[] | Prisma.ListEnumReviewStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReviewStatus[] | Prisma.ListEnumReviewStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReviewStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReviewStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReviewStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReviewStatusFilter<$PrismaModel>;
};
export type NestedEnumRatingFlagStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RatingFlagStatus | Prisma.EnumRatingFlagStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.RatingFlagStatus[] | Prisma.ListEnumRatingFlagStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RatingFlagStatus[] | Prisma.ListEnumRatingFlagStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRatingFlagStatusFilter<$PrismaModel> | $Enums.RatingFlagStatus;
};
export type NestedEnumRatingFlagStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RatingFlagStatus | Prisma.EnumRatingFlagStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.RatingFlagStatus[] | Prisma.ListEnumRatingFlagStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RatingFlagStatus[] | Prisma.ListEnumRatingFlagStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRatingFlagStatusWithAggregatesFilter<$PrismaModel> | $Enums.RatingFlagStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumRatingFlagStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumRatingFlagStatusFilter<$PrismaModel>;
};
export type NestedEnumMessageTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageType | Prisma.EnumMessageTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.MessageType[] | Prisma.ListEnumMessageTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MessageType[] | Prisma.ListEnumMessageTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMessageTypeFilter<$PrismaModel> | $Enums.MessageType;
};
export type NestedEnumMessageTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageType | Prisma.EnumMessageTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.MessageType[] | Prisma.ListEnumMessageTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MessageType[] | Prisma.ListEnumMessageTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMessageTypeWithAggregatesFilter<$PrismaModel> | $Enums.MessageType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumMessageTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumMessageTypeFilter<$PrismaModel>;
};
export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
};
export type NestedEnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | Prisma.EnumNotificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType;
};
export type NestedEnumNotificationCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationCategory | Prisma.EnumNotificationCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationCategory[] | Prisma.ListEnumNotificationCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationCategory[] | Prisma.ListEnumNotificationCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationCategoryFilter<$PrismaModel> | $Enums.NotificationCategory;
};
export type NestedEnumNotificationDeliveryStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationDeliveryStatus | Prisma.EnumNotificationDeliveryStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationDeliveryStatus[] | Prisma.ListEnumNotificationDeliveryStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationDeliveryStatus[] | Prisma.ListEnumNotificationDeliveryStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationDeliveryStatusFilter<$PrismaModel> | $Enums.NotificationDeliveryStatus;
};
export type NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | Prisma.EnumNotificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel>;
};
export type NestedEnumNotificationCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationCategory | Prisma.EnumNotificationCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationCategory[] | Prisma.ListEnumNotificationCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationCategory[] | Prisma.ListEnumNotificationCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationCategoryWithAggregatesFilter<$PrismaModel> | $Enums.NotificationCategory;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationCategoryFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationCategoryFilter<$PrismaModel>;
};
export type NestedEnumNotificationDeliveryStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationDeliveryStatus | Prisma.EnumNotificationDeliveryStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationDeliveryStatus[] | Prisma.ListEnumNotificationDeliveryStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationDeliveryStatus[] | Prisma.ListEnumNotificationDeliveryStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationDeliveryStatusWithAggregatesFilter<$PrismaModel> | $Enums.NotificationDeliveryStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationDeliveryStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationDeliveryStatusFilter<$PrismaModel>;
};
export type NestedEnumWalletTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletType | Prisma.EnumWalletTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.WalletType[] | Prisma.ListEnumWalletTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WalletType[] | Prisma.ListEnumWalletTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWalletTypeFilter<$PrismaModel> | $Enums.WalletType;
};
export type NestedEnumWalletStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletStatus | Prisma.EnumWalletStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WalletStatus[] | Prisma.ListEnumWalletStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WalletStatus[] | Prisma.ListEnumWalletStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWalletStatusFilter<$PrismaModel> | $Enums.WalletStatus;
};
export type NestedEnumWalletTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletType | Prisma.EnumWalletTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.WalletType[] | Prisma.ListEnumWalletTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WalletType[] | Prisma.ListEnumWalletTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWalletTypeWithAggregatesFilter<$PrismaModel> | $Enums.WalletType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWalletTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWalletTypeFilter<$PrismaModel>;
};
export type NestedEnumWalletStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletStatus | Prisma.EnumWalletStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WalletStatus[] | Prisma.ListEnumWalletStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WalletStatus[] | Prisma.ListEnumWalletStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWalletStatusWithAggregatesFilter<$PrismaModel> | $Enums.WalletStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWalletStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWalletStatusFilter<$PrismaModel>;
};
export type NestedEnumWalletTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletTransactionType | Prisma.EnumWalletTransactionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.WalletTransactionType[] | Prisma.ListEnumWalletTransactionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WalletTransactionType[] | Prisma.ListEnumWalletTransactionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWalletTransactionTypeFilter<$PrismaModel> | $Enums.WalletTransactionType;
};
export type NestedEnumWalletTransactionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletTransactionStatus | Prisma.EnumWalletTransactionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WalletTransactionStatus[] | Prisma.ListEnumWalletTransactionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WalletTransactionStatus[] | Prisma.ListEnumWalletTransactionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWalletTransactionStatusFilter<$PrismaModel> | $Enums.WalletTransactionStatus;
};
export type NestedEnumWalletTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletTransactionType | Prisma.EnumWalletTransactionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.WalletTransactionType[] | Prisma.ListEnumWalletTransactionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WalletTransactionType[] | Prisma.ListEnumWalletTransactionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWalletTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.WalletTransactionType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWalletTransactionTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWalletTransactionTypeFilter<$PrismaModel>;
};
export type NestedEnumWalletTransactionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletTransactionStatus | Prisma.EnumWalletTransactionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WalletTransactionStatus[] | Prisma.ListEnumWalletTransactionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WalletTransactionStatus[] | Prisma.ListEnumWalletTransactionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWalletTransactionStatusWithAggregatesFilter<$PrismaModel> | $Enums.WalletTransactionStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWalletTransactionStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWalletTransactionStatusFilter<$PrismaModel>;
};
export type NestedEnumPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | Prisma.EnumPaymentMethodFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentMethod[] | Prisma.ListEnumPaymentMethodFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentMethod[] | Prisma.ListEnumPaymentMethodFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPaymentMethodFilter<$PrismaModel> | $Enums.PaymentMethod;
};
export type NestedEnumTopUpStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TopUpStatus | Prisma.EnumTopUpStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.TopUpStatus[] | Prisma.ListEnumTopUpStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TopUpStatus[] | Prisma.ListEnumTopUpStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTopUpStatusFilter<$PrismaModel> | $Enums.TopUpStatus;
};
export type NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | Prisma.EnumPaymentMethodFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentMethod[] | Prisma.ListEnumPaymentMethodFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentMethod[] | Prisma.ListEnumPaymentMethodFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPaymentMethodFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPaymentMethodFilter<$PrismaModel>;
};
export type NestedEnumTopUpStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TopUpStatus | Prisma.EnumTopUpStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.TopUpStatus[] | Prisma.ListEnumTopUpStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TopUpStatus[] | Prisma.ListEnumTopUpStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTopUpStatusWithAggregatesFilter<$PrismaModel> | $Enums.TopUpStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTopUpStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTopUpStatusFilter<$PrismaModel>;
};
export type NestedEnumWithdrawalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WithdrawalStatus | Prisma.EnumWithdrawalStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WithdrawalStatus[] | Prisma.ListEnumWithdrawalStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WithdrawalStatus[] | Prisma.ListEnumWithdrawalStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWithdrawalStatusFilter<$PrismaModel> | $Enums.WithdrawalStatus;
};
export type NestedEnumWithdrawalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WithdrawalStatus | Prisma.EnumWithdrawalStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WithdrawalStatus[] | Prisma.ListEnumWithdrawalStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WithdrawalStatus[] | Prisma.ListEnumWithdrawalStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWithdrawalStatusWithAggregatesFilter<$PrismaModel> | $Enums.WithdrawalStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWithdrawalStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWithdrawalStatusFilter<$PrismaModel>;
};
export type NestedJsonNullableFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>, Required<NestedJsonNullableFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>;
export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
};
export type NestedEnumAdminRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.AdminRole | Prisma.EnumAdminRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.AdminRole[] | Prisma.ListEnumAdminRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AdminRole[] | Prisma.ListEnumAdminRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAdminRoleFilter<$PrismaModel> | $Enums.AdminRole;
};
export type NestedEnumAdminRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AdminRole | Prisma.EnumAdminRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.AdminRole[] | Prisma.ListEnumAdminRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AdminRole[] | Prisma.ListEnumAdminRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAdminRoleWithAggregatesFilter<$PrismaModel> | $Enums.AdminRole;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAdminRoleFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAdminRoleFilter<$PrismaModel>;
};
