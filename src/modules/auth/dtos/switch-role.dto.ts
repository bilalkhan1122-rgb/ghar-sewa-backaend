import { ApiProperty } from "@nestjs/swagger";
import { IsIn } from "class-validator";
import { UserRole } from "generated/prisma/enums";

/**
 * Which side of the app to move to. ADMIN is deliberately not accepted: admin
 * lives in the web dashboard and is not a mode the app can switch into.
 */
export class SwitchRoleDto {
  @ApiProperty({ enum: [UserRole.CUSTOMER, UserRole.PROVIDER] })
  @IsIn([UserRole.CUSTOMER, UserRole.PROVIDER], {
    message: "role must be CUSTOMER or PROVIDER",
  })
  role!: typeof UserRole.CUSTOMER | typeof UserRole.PROVIDER;
}
