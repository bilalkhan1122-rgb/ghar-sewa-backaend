import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateAppealDto {
  @IsUUID()
  @IsNotEmpty()
  penaltyId!: string;

  @IsString()
  @IsNotEmpty({ message: "Explanation is required" })
  @MinLength(10, { message: "Explanation must be at least 10 characters" })
  @MaxLength(2000)
  explanation!: string;
}
