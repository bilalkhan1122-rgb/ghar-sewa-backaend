import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { DisputeStatus } from "generated/prisma/client";

export class UpdateDisputeStatusDto {
  @IsEnum(DisputeStatus, { message: "Invalid dispute status" })
  @IsNotEmpty()
  status!: DisputeStatus;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}
