import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

/** Body for POST /realtime/pusher/auth (Pusher client auth request). */
export class PusherAuthDto {
  @ApiProperty({ description: "Socket id assigned by Pusher to the client" })
  @IsString()
  @IsNotEmpty()
  socket_id!: string;

  @ApiProperty({ description: "Private channel name the client wants to join" })
  @IsString()
  @IsNotEmpty()
  channel_name!: string;
}
