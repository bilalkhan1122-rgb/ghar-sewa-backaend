import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class RespondDisputeDto {
  @IsString()
  @IsNotEmpty({ message: "Response is required" })
  @MaxLength(2000)
  response!: string;
}
