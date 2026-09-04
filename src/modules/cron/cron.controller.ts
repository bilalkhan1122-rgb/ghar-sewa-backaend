import {
  Controller,
  Headers,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CronService } from "./cron.service";
import { Public } from "src/common/decorators/public.decorator";

/**
 * Scheduled work, triggered over HTTP by Vercel Cron.
 *
 * It cannot be a `@nestjs/schedule` job: a serverless function only exists
 * while it is serving a request, so an in-process timer fires at best
 * erratically on whichever lambda happens to be warm, and usually never.
 * Vercel calls these endpoints on the schedule in `vercel.json` instead.
 *
 * `@Public` bypasses the JWT guard — there is no user here — so the shared
 * secret is the only thing standing in front of it.
 */
@ApiTags("Cron")
@Controller("cron")
export class CronController {
  constructor(
    private readonly cron: CronService,
    private readonly config: ConfigService,
  ) {}

  @Public()
  @Post("/payment-reminders")
  @ApiOperation({ summary: "Chase and settle outstanding job payments" })
  async paymentReminders(@Headers("authorization") authorization?: string) {
    this.assertCronCaller(authorization);
    return this.cron.sendPaymentReminders();
  }

  @Public()
  @Post("/expire-jobs")
  @ApiOperation({
    summary: "Retire jobs nobody answered before their deadline",
  })
  async expireJobs(@Headers("authorization") authorization?: string) {
    this.assertCronCaller(authorization);
    return this.cron.expireJobs();
  }

  /**
   * Vercel sends `Authorization: Bearer <CRON_SECRET>`. With no secret
   * configured the endpoint stays shut rather than falling open — an
   * unauthenticated endpoint that fires notifications at customers is not
   * something to leave running by accident.
   */
  private assertCronCaller(authorization?: string) {
    const secret = this.config.get<string>("CRON_SECRET");
    if (!secret) {
      throw new UnauthorizedException("Cron is not configured");
    }
    if (authorization !== `Bearer ${secret}`) {
      throw new UnauthorizedException("Invalid cron credentials");
    }
  }
}
