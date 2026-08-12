import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from "class-validator";

export class RaiseDisputeDto {
  @IsUUID()
  @IsNotEmpty()
  bookingId!: string;

  @IsString()
  @IsNotEmpty({ message: "Dispute reason is required" })
  @MaxLength(200)
  reason!: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;
}
