import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { RefreshTokenGuard } from "src/common/guards/refresh-token.guard";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { Public } from "src/common/decorators/public.decorator";
import { CustomerRegisterDto } from "./dtos/customer-register.dto";
import { ProviderRegisterDto } from "./dtos/provider-register.dto";
import { LoginDto } from "./dtos/login.dto";
import { GoogleAuthDto } from "./dtos/google-auth.dto";
import { VerifyEmailDto } from "./dtos/verify-email.dto";
import { ForgotPasswordDto } from "./dtos/forgot-password.dto";
import { ResetPasswordDto } from "./dtos/reset-password.dto";
import { SetPasswordDto } from "./dtos/set-password.dto";
import { Throttle, SkipThrottle } from "@nestjs/throttler";
import { COOKIE_CONFIG } from "src/common/constants/cookie.config";
import { CookieOptions } from "express";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Throttle({ strict: { ttl: 60000, limit: 3 } })
  @Public()
  @Post("/customer/register")
  async registerCustomer(
    @Body() dto: CustomerRegisterDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const deviceInfo = req.headers["user-agent"] || "Unknown Device";
    const ipAddress =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
      req.ip ||
      "Unknown IP";

    const data = await this.authService.registerCustomer(
      dto,
      deviceInfo,
      ipAddress,
    );

    res.cookie(
      COOKIE_CONFIG.ACCESS_TOKEN.name,
      data.accessToken,
      COOKIE_CONFIG.ACCESS_TOKEN.options as CookieOptions,
    );
    res.cookie(
      COOKIE_CONFIG.REFRESH_TOKEN.name,
      data.refreshToken,
      COOKIE_CONFIG.REFRESH_TOKEN.options as CookieOptions,
    );

    return {
      user: data.user,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  }

  @Throttle({ strict: { ttl: 60000, limit: 3 } })
  @Public()
  @Post("/provider/register")
  async registerProvider(
    @Body() dto: ProviderRegisterDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const deviceInfo = req.headers["user-agent"] || "Unknown Device";
    const ipAddress =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
      req.ip ||
      "Unknown IP";

    const data = await this.authService.registerProvider(
      dto,
      deviceInfo,
      ipAddress,
    );

    res.cookie(
      COOKIE_CONFIG.ACCESS_TOKEN.name,
      data.accessToken,
      COOKIE_CONFIG.ACCESS_TOKEN.options as CookieOptions,
    );
    res.cookie(
      COOKIE_CONFIG.REFRESH_TOKEN.name,
      data.refreshToken,
      COOKIE_CONFIG.REFRESH_TOKEN.options as CookieOptions,
    );

    return {
      user: data.user,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  }

  @Throttle({ strict: { ttl: 60000, limit: 5 } })
  @Public()
  @Post("/login")
  async login(
    @Body() loginDto: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const deviceInfo = req.headers["user-agent"] || "Unknown Device";
    const ipAddress =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
      req.ip ||
      "Unknown IP";

    const data = await this.authService.login(loginDto, deviceInfo, ipAddress);

    res.cookie(
      COOKIE_CONFIG.ACCESS_TOKEN.name,
      data.accessToken,
      COOKIE_CONFIG.ACCESS_TOKEN.options as CookieOptions,
    );
    res.cookie(
      COOKIE_CONFIG.REFRESH_TOKEN.name,
      data.refreshToken,
      COOKIE_CONFIG.REFRESH_TOKEN.options as CookieOptions,
    );

    return {
      user: data.user,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  }

  @Throttle({ strict: { ttl: 60000, limit: 5 } })
  @Public()
  @Post("/google")
  async googleAuth(
    @Body() dto: GoogleAuthDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const deviceInfo = req.headers["user-agent"] || "Unknown Device";
    const ipAddress =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
      req.ip ||
      "Unknown IP";

    const data = await this.authService.googleAuth(dto, deviceInfo, ipAddress);

    res.cookie(
      COOKIE_CONFIG.ACCESS_TOKEN.name,
      data.accessToken,
      COOKIE_CONFIG.ACCESS_TOKEN.options as CookieOptions,
    );
    res.cookie(
      COOKIE_CONFIG.REFRESH_TOKEN.name,
      data.refreshToken,
      COOKIE_CONFIG.REFRESH_TOKEN.options as CookieOptions,
    );

    return {
      user: data.user,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  }

  @Throttle({ strict: { ttl: 60000, limit: 5 } })
  @Public()
  @Post("/verify-email")
  verifyEmail(@Body() dto: VerifyEmailDto) {
    return this.authService.verifyEmail(dto);
  }

  @Throttle({ strict: { ttl: 60000, limit: 3 } })
  @Public()
  @Post("/forgot-password")
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Throttle({ strict: { ttl: 60000, limit: 5 } })
  @Public()
  @Post("/reset-password")
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @Throttle({ default: { ttl: 60000, limit: 10 } })
  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post("/refresh")
  async refreshToken(
    @GetUser("sub") userId: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const rt = req.cookies["refreshToken"] as string;
    const deviceInfo = req.headers["user-agent"] || "Unknown Device";
    const ipAddress =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
      req.ip ||
      "Unknown IP";

    const { accessToken, refreshToken } = await this.authService.refreshToken(
      userId,
      rt,
      deviceInfo,
      ipAddress,
    );

    res.cookie(
      COOKIE_CONFIG.ACCESS_TOKEN.name,
      accessToken,
      COOKIE_CONFIG.ACCESS_TOKEN.options as CookieOptions,
    );
    res.cookie(
      COOKIE_CONFIG.REFRESH_TOKEN.name,
      refreshToken,
      COOKIE_CONFIG.REFRESH_TOKEN.options as CookieOptions,
    );

    // The access token is returned in the body as well as the cookie: the
    // mobile app needs it in hand to authenticate its chat WebSocket, which
    // does not carry cookies from the native fetch jar.
    return {
      message: "Tokens refreshed successfully",
      accessToken,
      refreshToken,
    };
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post("/logout")
  async logout(
    @GetUser("sub") userId: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const rt = req.cookies["refreshToken"] as string | undefined;
    await this.authService.logout(userId, rt);

    res.clearCookie(
      COOKIE_CONFIG.ACCESS_TOKEN.name,
      COOKIE_CONFIG.ACCESS_TOKEN.options,
    );
    res.clearCookie(
      COOKIE_CONFIG.REFRESH_TOKEN.name,
      COOKIE_CONFIG.REFRESH_TOKEN.options,
    );

    return {
      message: "Logged out successfully",
    };
  }

  @Throttle({ strict: { ttl: 60000, limit: 5 } })
  @Post("/set-password")
  setPassword(@GetUser("sub") userId: string, @Body() dto: SetPasswordDto) {
    return this.authService.setPassword(userId, dto);
  }

  @SkipThrottle()
  @Get("/me")
  async getMe(@GetUser("sub") userId: string) {
    return this.authService.getMe(userId);
  }
}
