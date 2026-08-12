import { Body, Controller, ForbiddenException, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { RealtimeService } from "./realtime.service";
import { PusherAuthDto } from "./dtos/pusher-auth.dto";
import { isChannelAllowedForUser, RealtimeUser } from "./realtime-channels";

/**
 * Channel-auth endpoint for private Pusher channels. The global AuthGuard
 * (JWT cookie) runs first, so `socket_id` can only be signed for an
 * authenticated user. Ownership is checked against the JWT payload before
 * any auth token is produced — a user can never obtain a token for another
 * user's channel or the admin channel.
 */
@ApiTags("Realtime")
@Controller("realtime/pusher/auth")
export class RealtimeAuthController {
  constructor(private readonly realtime: RealtimeService) {}

  @Post("/")
  @ApiOperation({
    summary: "Authorize a private Pusher channel subscription (JWT required)",
  })
  authorize(@GetUser() user: RealtimeUser, @Body() dto: PusherAuthDto) {
    if (!isChannelAllowedForUser(user, dto.channel_name)) {
      throw new ForbiddenException(
        "You are not allowed to subscribe to this channel",
      );
    }
    return this.realtime.authorizeChannel(dto.socket_id, dto.channel_name);
  }
}
