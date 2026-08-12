import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class RejectDisputeDto {
  @IsString()
  @IsNotEmpty({ message: "Rejection reason is required" })
  @MaxLength(500)
  reason!: string;
}
