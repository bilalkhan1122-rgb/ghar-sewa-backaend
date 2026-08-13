import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsPakistaniPhone } from "src/common/validators/phone.validator";

export class UpdateCustomerProfileDto {
  @ApiPropertyOptional({
    description: "Full name of the customer",
    example: "John Doe",
    minLength: 2,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  fullName?: string;

  @ApiPropertyOptional({
    description:
      "Phone number. Google sign-up accounts start without one, and this is " +
      "where they set it — the number is also a login identifier, so it must " +
      "be unique across accounts.",
    example: "+923001234567",
  })
  @IsOptional()
  @IsPakistaniPhone()
  phone?: string;

  @ApiPropertyOptional({
    description: "ID of the city",
    example: "city-lahore",
  })
  @IsOptional()
  @IsString()
  cityId?: string;

  @ApiPropertyOptional({
    description: "Street address",
    example: "123 Main Street, Lahore",
    minLength: 3,
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  address?: string;
}
