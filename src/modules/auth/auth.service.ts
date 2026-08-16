import {
  Injectable,
  ConflictException,
  ForbiddenException,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
  ServiceUnavailableException,
} from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { randomBytes } from "crypto";
import { OAuth2Client } from "google-auth-library";
import {
  AuthProvider,
  EmailTokenType,
  NotificationType,
  Prisma,
  User,
  UserRole,
  UserStatus,
  VerificationStatus,
  WalletType,
} from "generated/prisma/client";
import { Logger } from "nestjs-pino";
import { CustomerRegisterDto } from "./dtos/customer-register.dto";
import { ProviderRegisterDto } from "./dtos/provider-register.dto";
import { LoginDto } from "./dtos/login.dto";
import { GoogleAuthDto } from "./dtos/google-auth.dto";
import { VerifyEmailDto } from "./dtos/verify-email.dto";
import { ForgotPasswordDto } from "./dtos/forgot-password.dto";
import { ResetPasswordDto } from "./dtos/reset-password.dto";
import { SetPasswordDto } from "./dtos/set-password.dto";
import { EmailService } from "../email/email.service";
import { NotificationsService } from "../notifications/notifications.service";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
    private logger: Logger,
    private notifications: NotificationsService,
    private emails: EmailService,
  ) {}

  async registerCustomer(
    dto: CustomerRegisterDto,
    deviceInfo?: string,
    ipAddress?: string,
  ) {
    const { fullName, phone, email, password, cityId, address } = dto;

    await this.validateUniqueCredentials(email, phone);

    const hashedPassword = await this.hashData(password);

    // User + wallet are created atomically (Module 14): every registered
    // user automatically gets a wallet and the two can never diverge.
    const newUser = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          fullName,
          phone,
          email,
          passwordHash: hashedPassword,
          role: UserRole.CUSTOMER,
          cityId,
          address,
          status: UserStatus.ACTIVE,
          profileCompleted: true,
          verificationStatus: VerificationStatus.APPROVED,
        },
      });
      await tx.wallet.create({
        data: { userId: user.id, type: WalletType.CUSTOMER },
      });
      return user;
    });

    const tokens = await this.generateTokens(newUser);
    const hashedRt = await this.hashData(tokens.refreshToken);

    const refreshExpiry =
      this.config.get<string>("JWT_REFRESH_EXPIRY") || "30d";
    const expiryMs = this.parseExpiryToMilliseconds(refreshExpiry);
    const expiresAt = new Date(Date.now() + expiryMs);

    await this.prisma.refreshToken.create({
      data: {
        token: hashedRt,
        userId: newUser.id,
        deviceInfo: deviceInfo || "Unknown Device",
        ipAddress: ipAddress || "Unknown IP",
        expiresAt,
      },
    });

    this.logger.log({
      message: "Customer registered",
      userId: newUser.id,
      role: newUser.role,
    });

    // Welcome notification
    void this.notifications.send({
      userId: newUser.id,
      type: NotificationType.WELCOME,
      title: "Welcome to Ghar Sewa! 🎉",
      message: `Assalam-o-Alaikum ${fullName}! Your account is ready. Post a job and find trusted service providers near you.`,
      relatedEntityType: "USER",
      relatedEntityId: newUser.id,
    });

    // Welcome email (fire-and-forget)
    void this.emails.sendWelcomeEmail(newUser.email, newUser.fullName);

    return {
      user: this.sanitizeUser(newUser),
      ...tokens,
    };
  }

  async registerProvider(
    dto: ProviderRegisterDto,
    deviceInfo?: string,
    ipAddress?: string,
  ) {
    const { fullName, phone, email, password, cityId } = dto;

    await this.validateUniqueCredentials(email, phone);

    const hashedPassword = await this.hashData(password);

    // User + wallet are created atomically (Module 14): every registered
    // user automatically gets a wallet and the two can never diverge.
    const newUser = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          fullName,
          phone,
          email,
          passwordHash: hashedPassword,
          role: UserRole.PROVIDER,
          cityId,
          status: UserStatus.ACTIVE,
          profileCompleted: false,
          verificationStatus: VerificationStatus.INCOMPLETE,
        },
      });
      await tx.wallet.create({
        data: { userId: user.id, type: WalletType.PROVIDER },
      });
      return user;
    });

    const tokens = await this.generateTokens(newUser);
    const hashedRt = await this.hashData(tokens.refreshToken);

    const refreshExpiry =
      this.config.get<string>("JWT_REFRESH_EXPIRY") || "30d";
    const expiryMs = this.parseExpiryToMilliseconds(refreshExpiry);
    const expiresAt = new Date(Date.now() + expiryMs);

    await this.prisma.refreshToken.create({
      data: {
        token: hashedRt,
        userId: newUser.id,
        deviceInfo: deviceInfo || "Unknown Device",
        ipAddress: ipAddress || "Unknown IP",
        expiresAt,
      },
    });

    this.logger.log({
      message: "Provider registered",
      userId: newUser.id,
      role: newUser.role,
    });

    // Welcome notification
    void this.notifications.send({
      userId: newUser.id,
      type: NotificationType.WELCOME,
      title: "Welcome to Ghar Sewa! 🎉",
      message: `Assalam-o-Alaikum ${fullName}! Complete your profile and get verified to start receiving job leads.`,
      relatedEntityType: "USER",
      relatedEntityId: newUser.id,
    });

    // Welcome email (fire-and-forget)
    void this.emails.sendWelcomeEmail(newUser.email, newUser.fullName);

    return {
      user: this.sanitizeUser(newUser),
      ...tokens,
    };
  }

  async login(loginDto: LoginDto, deviceInfo?: string, ipAddress?: string) {
    const { email, phone, password } = loginDto;

    if (!email && !phone) {
      throw new BadRequestException("Email or phone is required");
    }

    let user: User | null = null;

    if (email) {
      user = await this.prisma.user.findUnique({
        where: { email },
      });
    } else if (phone) {
      user = await this.prisma.user.findUnique({
        where: { phone },
      });
    }

    // Prevent timing attacks by always hashing, even if user doesn't exist
    const passwordHash =
      user?.passwordHash ||
      (await this.hashData("dummy-password-to-prevent-timing-attack"));
    const passwordMatches = await bcrypt.compare(password, passwordHash);

    // Use consistent error message to prevent account enumeration
    if (!user || !user.isActive || !passwordMatches) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const tokens = await this.generateTokens(user);
    const hashedRt = await this.hashData(tokens.refreshToken);

    // Store refresh token with device info for multi-device support
    const refreshExpiry =
      this.config.get<string>("JWT_REFRESH_EXPIRY") || "30d";
    const expiryMs = this.parseExpiryToMilliseconds(refreshExpiry);
    const expiresAt = new Date(Date.now() + expiryMs);

    await this.prisma.refreshToken.create({
      data: {
        token: hashedRt,
        userId: user.id,
        deviceInfo: deviceInfo || "Unknown Device",
        ipAddress: ipAddress || "Unknown IP",
        expiresAt,
      },
    });

    // Clean up expired tokens for this user
    await this.cleanupExpiredTokens(user.id);

    this.logger.log({
      message: "User logged in",
      userId: user.id,
      role: user.role,
      timestamp: new Date().toISOString(),
    });

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  // ─── Google OAuth ─────────────────────────────────────────────────────

  /**
   * Sign up or log in with a Google ID token.
   *
   * The client obtains the token from the Google Sign-In SDK and sends it
   * here; we verify its signature, issuer, expiry and audience against the
   * configured Google OAuth client IDs. If the Google email already belongs
   * to an account we log that account in (linking the Google identity), and
   * otherwise create a new account that has no password, phone or city yet.
   */
  async googleAuth(
    dto: GoogleAuthDto,
    deviceInfo?: string,
    ipAddress?: string,
  ) {
    const payload = await this.verifyGoogleIdToken(dto.idToken);

    // Narrowed copy: TS can't narrow `payload.email` inside the transaction
    // callback below, and the DB requires a non-null string.
    const googleEmail = payload.email;
    if (!googleEmail) {
      throw new UnauthorizedException("Google account has no email address");
    }
    if (!payload.email_verified) {
      throw new UnauthorizedException("Google email is not verified");
    }

    let user = await this.prisma.user.findUnique({
      where: { email: googleEmail },
    });

    if (user) {
      // Existing account — link the Google identity if it isn't linked yet.
      if (!user.googleId) {
        user = await this.prisma.user.update({
          where: { id: user.id },
          data: {
            googleId: payload.sub,
            // Don't clobber an avatar the user already set themselves.
            ...(payload.picture && !user.avatarUrl
              ? { avatarUrl: payload.picture }
              : {}),
          },
        });
      }

      if (!user.isActive) {
        throw new ForbiddenException("Account is suspended");
      }

      this.logger.log({
        message: "User logged in with Google",
        userId: user.id,
        role: user.role,
      });
    } else {
      // New account. ADMIN can never be chosen via social sign-up.
      const role =
        dto.role === UserRole.PROVIDER ? UserRole.PROVIDER : UserRole.CUSTOMER;

      user = await this.prisma.$transaction(async (tx) => {
        const created = await tx.user.create({
          data: {
            fullName: payload.name || "Google User",
            email: googleEmail,
            phone: null,
            passwordHash: null,
            role,
            cityId: null,
            status: UserStatus.ACTIVE,
            profileCompleted: role === UserRole.CUSTOMER,
            verificationStatus:
              role === UserRole.CUSTOMER
                ? VerificationStatus.APPROVED
                : VerificationStatus.INCOMPLETE,
            authProvider: AuthProvider.GOOGLE,
            googleId: payload.sub,
            avatarUrl: payload.picture || null,
            emailVerified: false,
          },
        });
        await tx.wallet.create({
          data: {
            userId: created.id,
            type:
              role === UserRole.PROVIDER
                ? WalletType.PROVIDER
                : WalletType.CUSTOMER,
          },
        });
        return created;
      });

      // One-time email verification (24h) + welcome email, fire-and-forget.
      const verificationToken = await this.createEmailToken(
        user.id,
        EmailTokenType.EMAIL_VERIFICATION,
        24,
      );
      void this.emails.sendEmailVerificationEmail(
        user.email,
        user.fullName,
        verificationToken,
      );
      void this.emails.sendWelcomeEmail(user.email, user.fullName);

      // Welcome in-app notification
      void this.notifications.send({
        userId: user.id,
        type: NotificationType.WELCOME,
        title: "Welcome to Ghar Sewa! 🎉",
        message:
          role === UserRole.PROVIDER
            ? `Assalam-o-Alaikum ${user.fullName}! Complete your profile and get verified to start receiving job leads.`
            : `Assalam-o-Alaikum ${user.fullName}! Your account is ready. Post a job and find trusted service providers near you.`,
        relatedEntityType: "USER",
        relatedEntityId: user.id,
      });

      this.logger.log({
        message: "User signed up with Google",
        userId: user.id,
        role: user.role,
      });
    }

    const tokens = await this.issueSession(user, deviceInfo, ipAddress);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  // ─── Email verification & password reset ─────────────────────────────

  async verifyEmail(dto: VerifyEmailDto) {
    const token = await this.consumeEmailToken(
      dto.token,
      EmailTokenType.EMAIL_VERIFICATION,
    );

    await this.prisma.user.update({
      where: { id: token.userId },
      data: { emailVerified: true, emailVerifiedAt: new Date() },
    });

    return { message: "Email verified successfully" };
  }

  /**
   * Request a password reset link. Always returns the same response whether
   * or not the account exists, so the endpoint can't be used to enumerate
   * registered emails. Users who signed up with Google get a notice email
   * instead of a reset link (they have no password).
   */
  async forgotPassword(dto: ForgotPasswordDto) {
    let user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      // Fallback for accounts registered with a mixed-case email.
      user = await this.prisma.user.findFirst({
        where: { email: { equals: dto.email, mode: "insensitive" } },
      });
    }

    if (!user) {
      return {
        message:
          "If an account exists with this email, a password reset link has been sent.",
      };
    }

    if (!user.passwordHash) {
      void this.emails.sendPasswordNotSetEmail(user.email, user.fullName);
      return {
        message:
          "If an account exists with this email, a password reset link has been sent.",
      };
    }

    const token = await this.createEmailToken(
      user.id,
      EmailTokenType.PASSWORD_RESET,
      1,
    );
    void this.emails.sendPasswordResetEmail(user.email, user.fullName, token);

    return {
      message:
        "If an account exists with this email, a password reset link has been sent.",
    };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const hashedPassword = await this.hashData(dto.newPassword);

    // Token consumption + password update + session invalidation are one
    // transaction: a failure anywhere means the token stays valid so the
    // user can simply retry.
    await this.prisma.$transaction(async (tx) => {
      const token = await this.consumeEmailToken(
        dto.token,
        EmailTokenType.PASSWORD_RESET,
        tx,
      );

      await tx.user.update({
        where: { id: token.userId },
        data: {
          passwordHash: hashedPassword,
          emailVerified: true,
          emailVerifiedAt: new Date(),
        },
      });

      // Invalidate every session so stolen tokens can't survive a reset.
      await tx.refreshToken.deleteMany({
        where: { userId: token.userId },
      });
    });

    return {
      message: "Password reset successfully. Please log in again.",
    };
  }

  /**
   * Sets or changes the signed-in user's password.
   *
   * A Google account has no password, so it sets its first one without
   * proving an old one — the session is the proof, and there is nothing to
   * verify against. An account that already has a password must supply it,
   * so a borrowed unlocked phone cannot be used to lock the owner out.
   *
   * Existing sessions are deliberately left alone: unlike a reset (where the
   * account may be compromised), this is a deliberate act by someone already
   * signed in, and dropping their other devices would be surprising.
   */
  async setPassword(userId: string, dto: SetPasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (user.passwordHash) {
      if (!dto.currentPassword) {
        throw new BadRequestException(
          "Enter your current password to change it",
        );
      }
      const matches = await bcrypt.compare(
        dto.currentPassword,
        user.passwordHash,
      );
      if (!matches) {
        throw new UnauthorizedException("Current password is incorrect");
      }
    }

    const passwordHash = await this.hashData(dto.newPassword);
    await this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    });

    this.logger.log({
      message: user.passwordHash ? "Password changed" : "Password set",
      userId,
    });

    return {
      message: user.passwordHash
        ? "Password changed successfully"
        : "Password set. You can now sign in with your email and password as well as Google.",
    };
  }

  async refreshToken(
    userId: string,
    rt: string,
    deviceInfo?: string,
    ipAddress?: string,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.isActive) {
      throw new ForbiddenException("Invalid refresh token");
    }

    // Find matching refresh token in database
    const storedTokens = await this.prisma.refreshToken.findMany({
      where: {
        userId: user.id,
        expiresAt: { gte: new Date() },
      },
    });

    let isValidToken = false;
    let validTokenId: string | null = null;

    // Check if provided token matches any stored token
    for (const storedToken of storedTokens) {
      const matches = await bcrypt.compare(rt, storedToken.token);
      if (matches) {
        isValidToken = true;
        validTokenId = storedToken.id;
        break;
      }
    }

    if (!isValidToken || !validTokenId) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    // Generate new tokens
    const tokens = await this.generateTokens(user);
    const hashedRt = await this.hashData(tokens.refreshToken);

    // Update the refresh token (rotation)
    const refreshExpiry =
      this.config.get<string>("JWT_REFRESH_EXPIRY") || "30d";
    const expiryMs = this.parseExpiryToMilliseconds(refreshExpiry);
    const expiresAt = new Date(Date.now() + expiryMs);

    await this.prisma.refreshToken.update({
      where: { id: validTokenId },
      data: {
        token: hashedRt,
        deviceInfo: deviceInfo || "Unknown Device",
        ipAddress: ipAddress || "Unknown IP",
        expiresAt,
        updatedAt: new Date(),
      },
    });

    return tokens;
  }

  async logout(userId: string, rt?: string) {
    if (rt) {
      // Find and delete the specific refresh token
      const storedTokens = await this.prisma.refreshToken.findMany({
        where: { userId },
      });

      for (const storedToken of storedTokens) {
        const matches = await bcrypt.compare(rt, storedToken.token);
        if (matches) {
          await this.prisma.refreshToken.delete({
            where: { id: storedToken.id },
          });
          break;
        }
      }
    } else {
      // Logout from all devices
      await this.prisma.refreshToken.deleteMany({
        where: { userId },
      });
    }

    return {
      message: "Logged out successfully",
    };
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return this.sanitizeUser(user);
  }

  // Private Helpers

  /**
   * Verify a Google ID token: signature, issuer, expiry and audience.
   * Rejects anything Google itself doesn't accept.
   */
  private async verifyGoogleIdToken(idToken: string) {
    const clientId = this.config.get<string>("GOOGLE_CLIENT_ID") || "";
    const extraIds = (this.config.get<string>("GOOGLE_CLIENT_IDS") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const audiences = [clientId, ...extraIds].filter(Boolean);

    if (audiences.length === 0) {
      throw new ServiceUnavailableException(
        "Google sign-in is not configured (GOOGLE_CLIENT_ID missing)",
      );
    }

    try {
      const client = new OAuth2Client(audiences[0]);
      const ticket = await client.verifyIdToken({
        idToken,
        audience: audiences,
      });
      const payload = ticket.getPayload();
      if (!payload) {
        throw new UnauthorizedException("Invalid Google token");
      }
      return payload;
    } catch {
      throw new UnauthorizedException("Invalid Google token");
    }
  }

  /** Issue access + refresh tokens and persist the (hashed) refresh token. */
  private async issueSession(
    user: User,
    deviceInfo?: string,
    ipAddress?: string,
  ) {
    const tokens = await this.generateTokens(user);
    const hashedRt = await this.hashData(tokens.refreshToken);

    const refreshExpiry =
      this.config.get<string>("JWT_REFRESH_EXPIRY") || "30d";
    const expiryMs = this.parseExpiryToMilliseconds(refreshExpiry);
    const expiresAt = new Date(Date.now() + expiryMs);

    await this.prisma.refreshToken.create({
      data: {
        token: hashedRt,
        userId: user.id,
        deviceInfo: deviceInfo || "Unknown Device",
        ipAddress: ipAddress || "Unknown IP",
        expiresAt,
      },
    });

    await this.cleanupExpiredTokens(user.id);

    return tokens;
  }

  /**
   * Create a one-time email token (bcrypt-hashed at rest) and return the raw
   * value to embed in the email link.
   */
  private async createEmailToken(
    userId: string,
    type: EmailTokenType,
    ttlHours: number,
  ): Promise<string> {
    const rawToken = randomBytes(32).toString("hex");
    await this.prisma.emailToken.create({
      data: {
        userId,
        type,
        tokenHash: await this.hashData(rawToken),
        expiresAt: new Date(Date.now() + ttlHours * 60 * 60 * 1000),
      },
    });
    return rawToken;
  }

  /**
   * Find an unconsumed, unexpired token by its raw value and consume it
   * atomically. Throws 400 for unknown, expired or already-used tokens.
   * `client` defaults to the main PrismaService but can be a transaction
   * client so the consume can join a larger atomic operation.
   */
  private async consumeEmailToken(
    rawToken: string,
    type: EmailTokenType,
    client: Prisma.TransactionClient | PrismaService = this.prisma,
  ) {
    // Prune expired tokens opportunistically.
    await client.emailToken.deleteMany({
      where: { type, expiresAt: { lt: new Date() } },
    });

    // Bound the scan to tokens created within the max TTL window (24h) so a
    // growing token table can't turn each request into a full bcrypt sweep.
    const candidates = await client.emailToken.findMany({
      where: {
        type,
        consumedAt: null,
        createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      },
    });

    for (const candidate of candidates) {
      const matches = await bcrypt.compare(rawToken, candidate.tokenHash);
      if (!matches) continue;

      // Atomic consume — only one concurrent request can win.
      const updated = await client.emailToken.updateMany({
        where: { id: candidate.id, consumedAt: null },
        data: { consumedAt: new Date() },
      });
      if (updated.count === 1) {
        return candidate;
      }
      break;
    }

    throw new BadRequestException("Invalid or expired token");
  }

  private async validateUniqueCredentials(email: string, phone: string) {
    const existingEmail = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      throw new ConflictException("Email already exists");
    }

    const existingPhone = await this.prisma.user.findUnique({
      where: { phone },
    });

    if (existingPhone) {
      throw new ConflictException("Phone already exists");
    }
  }

  private sanitizeUser(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, refreshToken, ...safeUser } = user;
    // Whether a password exists, never the hash itself. Google accounts start
    // without one, and the app needs to know so it can offer "create a
    // password" instead of asking for a current one that does not exist.
    return { ...safeUser, hasPassword: Boolean(passwordHash) };
  }

  async hashData(data: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(data, salt);
  }

  async generateTokens(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { sub: user.id, role: user.role, email: user.email };
    const accessExpiry = this.config.get<string>("JWT_ACCESS_EXPIRY") || "15m";
    const refreshExpiry = this.config.get<string>("JWT_REFRESH_EXPIRY") || "7d";

    const [accessToken, refreshToken] = await Promise.all([
      // @ts-expect-error - JWT library type definition issue with expiresIn accepting string
      this.jwtService.signAsync(payload, {
        secret: this.config.get<string>("JWT_ACCESS_SECRET"),
        expiresIn: accessExpiry,
      }),
      // @ts-expect-error - JWT library type definition issue with expiresIn accepting string
      this.jwtService.signAsync(payload, {
        secret: this.config.get<string>("JWT_REFRESH_SECRET"),
        expiresIn: refreshExpiry,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  private async cleanupExpiredTokens(userId: string) {
    // Remove expired refresh tokens for this user
    await this.prisma.refreshToken.deleteMany({
      where: {
        userId,
        expiresAt: { lt: new Date() },
      },
    });

    // Optional: Limit to 5 most recent tokens per user
    const tokens = await this.prisma.refreshToken.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      skip: 5,
    });

    if (tokens.length > 0) {
      await this.prisma.refreshToken.deleteMany({
        where: {
          id: { in: tokens.map((t) => t.id) },
        },
      });
    }
  }

  private parseExpiryToMilliseconds(expiry: string): number {
    const match = expiry.match(/^(\d+)([smhd])$/);
    if (!match) return 30 * 24 * 60 * 60 * 1000; // default 30 days

    const value = parseInt(match[1], 10);
    const unit = match[2];

    const units: { [key: string]: number } = {
      s: 1000,
      m: 60 * 1000,
      h: 60 * 60 * 1000,
      d: 24 * 60 * 60 * 1000,
    };

    return value * units[unit];
  }
}
