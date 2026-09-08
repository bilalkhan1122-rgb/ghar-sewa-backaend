import { Controller, Get, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "generated/prisma/client";
import { NearbyProvidersService } from "./nearby-providers.service";
import { NearbyProvidersQueryDto } from "./dtos/nearby-providers-query.dto";

/**
 * Nearby Online Providers — the customer's "who is near me and free" screen.
 *
 * Deliberately separate from the public browse controllers: this endpoint
 * needs a logged-in customer (it is the location-selection service flow) and
 * it returns distance + approximate location, which public listings do not.
 * Pure PROVIDER accounts are rejected by the CUSTOMER role requirement.
 */
@ApiTags("Provider (Nearby)")
@Roles(UserRole.CUSTOMER)
@Controller("providers")
export class NearbyProvidersController {
  constructor(private readonly nearby: NearbyProvidersService) {}

  @Get("/nearby")
  @ApiOperation({
    summary:
      "Online, available, verified providers offering a service, sorted by distance",
  })
  async findNearby(@Query() query: NearbyProvidersQueryDto) {
    return this.nearby.findNearbyProviders(query);
  }
}
