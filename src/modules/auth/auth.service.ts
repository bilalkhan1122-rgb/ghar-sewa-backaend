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
import { randomBytes, randomInt } from "crypto";
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
import { VerifyResetOtpDto } from "./dtos/verify-reset-otp.dto";
import { ResetPasswordDto } from "./dtos/reset-password.dto";
import { SetPasswordDto } from "./dtos/set-password.dto";
import { EmailService } from "../email/email.service";
import { NotificationsService } from "../notifications/notifications.service";
import { hasRole, SWITCHABLE_ROLES } from "src/common/roles";

/**
 * How long a six-digit reset code stays usable. Short on purpose — a code
 * that short is only safe while its window is.
 */
const PASSWORD_RESET_OTP_TTL_MINUTES = 10;

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
          roles: [UserRole.CUSTOMER],
          activeRole: UserRole.CUSTOMER,
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
          roles: [UserRole.PROVIDER],
          activeRole: UserRole.PROVIDER,
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

  // ─── Dual-role accounts ───────────────────────────────────────────────

  /**
   * Switch which side of the app this account is on.
   *
   * No data moves and nothing is created: both profiles already exist and keep
   * their own jobs, reviews and wallet. All this changes is `activeRole`, plus
   * a fresh pair of tokens so the app is not carrying a stale mode around in
   * its access token for the next quarter of an hour.
   */
  async switchRole(
    userId: string,
    role: UserRole,
    deviceInfo?: string,
    ipAddress?: string,
  ) {
    if (!SWITCHABLE_ROLES.includes(role)) {
      throw new BadRequestException("That role cannot be switched to.");
    }

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.isActive) {
      throw new NotFoundException("User not found");
    }
    if (!hasRole(user, role)) {
      throw new ForbiddenException(
        `This account is not a ${role.toLowerCase()} yet. Add the ${role.toLowerCase()} side first.`,
      );
    }

    const updated =
      user.activeRole === role
        ? user
        : await this.prisma.user.update({
            where: { id: userId },
            data: { activeRole: role },
          });

    const tokens = await this.issueSession(updated, deviceInfo, ipAddress);

    this.logger.log({
      message: "Role switched",
      userId,
      from: user.activeRole,
      to: role,
    });

    return { user: this.sanitizeUser(updated), ...tokens };
  }

  /**
   * Add the other role to an existing account.
   *
   * The person keeps one login. What the new role gets is its own profile and
   * its own wallet — a provider's earnings and a customer's spending never
   * share a balance — and, for a new provider, its own trip through
   * verification: an approved customer is not an approved tradesperson, so the
   * provider side starts unverified regardless of how long the account has
   * existed.
   *
   * Idempotent: asking for a role the account already holds just switches to
   * it, which is what a user double-tapping the button means anyway.
   */
  async enableRole(
    userId: string,
    role: UserRole,
    deviceInfo?: string,
    ipAddress?: string,
  ) {
    if (!SWITCHABLE_ROLES.includes(role)) {
      throw new BadRequestException("That role cannot be added to an account.");
    }

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.isActive) {
      throw new NotFoundException("User not found");
    }
    if (user.role === UserRole.ADMIN) {
      throw new ForbiddenException(
        "Admin accounts are managed from the web dashboard.",
      );
    }
    if (hasRole(user, role)) {
      return this.switchRole(userId, role, deviceInfo, ipAddress);
    }

    // A provider has to be reachable and locatable: customers phone them, and
    // the job feed is scoped by city. Google sign-ups have neither until they
    // complete their profile.
    if (role === UserRole.PROVIDER && (!user.phone || !user.cityId)) {
      throw new BadRequestException(
        "Add your phone number and city before offering services.",
      );
    }

    const updated = await this.prisma.$transaction(async (tx) => {
      await tx.wallet.upsert({
        where: {
          userId_type: {
            userId,
            type:
              role === UserRole.PROVIDER
                ? WalletType.PROVIDER
                : WalletType.CUSTOMER,
          },
        },
        create: {
          userId,
          type:
            role === UserRole.PROVIDER
              ? WalletType.PROVIDER
              : WalletType.CUSTOMER,
        },
        update: {},
      });

      if (role === UserRole.PROVIDER) {
        // The profile row is what every provider screen hangs off — gallery,
        // categories, CNIC, availability. Created empty; they fill it in.
        await tx.providerProfile.upsert({
          where: { userId },
          create: { userId },
          update: {},
        });
      }

      return tx.user.update({
        where: { id: userId },
        data: {
          roles: { push: role },
          activeRole: role,
          // Only the provider side is gated on verification, and only when the
          // account has not already been through it as a provider.
          ...(role === UserRole.PROVIDER && !hasRole(user, UserRole.PROVIDER)
            ? {
                verificationStatus: VerificationStatus.INCOMPLETE,
                profileCompleted: false,
              }
            : {}),
        },
      });
    });

    const tokens = await this.issueSession(updated, deviceInfo, ipAddress);

    void this.notifications.send({
      userId,
      type: NotificationType.WELCOME,
      title:
        role === UserRole.PROVIDER
          ? "You can now offer services 🛠️"
          : "You can now book services 🏠",
      message:
        role === UserRole.PROVIDER
          ? "Complete your profile and get verified to start receiving job leads."
          : "Post a job and find trusted service providers near you.",
      relatedEntityType: "USER",
      relatedEntityId: userId,
    });

    this.logger.log({ message: "Role added to account", userId, role });

    return { user: this.sanitizeUser(updated), ...tokens };
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
            roles: [role],
            activeRole: role,
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
   * Look up the account a reset was requested for. The app asks for "email or
   * phone number" in one box, so both are tried — phone first only when the
   * value has no `@`, which is the only thing that reliably separates them.
   */
  private findUserByIdentifier(identifier: string) {
    const value = identifier.trim();

    if (value.includes("@")) {
      return this.prisma.user.findFirst({
        where: { email: { equals: value, mode: "insensitive" } },
      });
    }

    // Stored numbers are E.164; a customer may well type the local form.
    const digits = value.replace(/[^0-9]/g, "");
    const variants = [value, digits, `+${digits}`];
    if (digits.startsWith("0")) variants.push(`+92${digits.slice(1)}`);
    if (digits.startsWith("92")) variants.push(`0${digits.slice(2)}`);

    return this.prisma.user.findFirst({
      where: { phone: { in: Array.from(new Set(variants)) } },
    });
  }

  /** `bilal@gmail.com` → `bi••••@gmail.com`. */
  private maskEmail(email: string): string {
    const [local, domain] = email.split("@");
    if (!domain) return "your email";
    const head = local.slice(0, 2);
    return `${head}${"•".repeat(Math.max(3, local.length - 2))}@${domain}`;
  }

  /**
   * Step one of the reset: email a six-digit code.
   *
   * Accepts an email address or a phone number, but the code always goes to
   * the email on the account — there is no SMS gateway wired up, and silently
   * sending nothing would leave the user waiting on a text that never comes.
   *
   * The response is deliberately the same shape whether or not the account
   * exists, so the endpoint cannot be used to discover who is registered. The
   * masked destination is only filled in for a real account; for an unknown
   * identifier it is null, which the app renders as generic copy.
   */
  async forgotPassword(dto: ForgotPasswordDto) {
    const generic = {
      message:
        "If an account matches that email or phone, a six-digit code is on its way.",
      sentTo: null as string | null,
      expiresInMinutes: PASSWORD_RESET_OTP_TTL_MINUTES,
    };

    const user = await this.findUserByIdentifier(dto.identifier);
    if (!user) return generic;

    if (!user.passwordHash) {
      await this.emails
        .sendPasswordNotSetEmail(user.email, user.fullName)
        .catch(() => undefined);
      return generic;
    }

    // Only the newest code may work: leaving older ones live means a code the
    // user already gave up on still opens the account.
    await this.prisma.emailToken.deleteMany({
      where: { userId: user.id, type: EmailTokenType.PASSWORD_RESET_OTP },
    });

    const otp = randomInt(0, 1_000_000).toString().padStart(6, "0");
    await this.prisma.emailToken.create({
      data: {
        userId: user.id,
        type: EmailTokenType.PASSWORD_RESET_OTP,
        tokenHash: await this.hashData(otp),
        expiresAt: new Date(
          Date.now() + PASSWORD_RESET_OTP_TTL_MINUTES * 60 * 1000,
        ),
      },
    });

    // Awaited, not fire-and-forget: on a serverless host the function is
    // frozen the moment the response is written, and a detached send dies
    // with it.
    await this.emails
      .sendPasswordResetOtpEmail(user.email, user.fullName, otp)
      .catch((error: unknown) => {
        this.logger.error(
          { userId: user.id, error },
          "Failed to send password reset code",
        );
      });

    return { ...generic, sentTo: this.maskEmail(user.email) };
  }

  /**
   * Step two: check the code and hand back the token step three consumes.
   *
   * The code is matched only against tokens belonging to the identified
   * account. Matching by code alone across every open request — which is what
   * the shared token lookup does — would let a six-digit guess reset whichever
   * stranger's account happened to hold that number.
   */
  async verifyResetOtp(dto: VerifyResetOtpDto) {
    const invalid = new BadRequestException(
      "That code is not right, or it has expired. Request a new one.",
    );

    const user = await this.findUserByIdentifier(dto.identifier);
    if (!user) throw invalid;

    const candidates = await this.prisma.emailToken.findMany({
      where: {
        userId: user.id,
        type: EmailTokenType.PASSWORD_RESET_OTP,
        consumedAt: null,
        expiresAt: { gt: new Date() },
      },
    });

    let matched: (typeof candidates)[number] | null = null;
    for (const candidate of candidates) {
      if (await bcrypt.compare(dto.otp, candidate.tokenHash)) {
        matched = candidate;
        break;
      }
    }
    if (!matched) throw invalid;

    // Atomic consume — a code is good for exactly one exchange.
    const consumed = await this.prisma.emailToken.updateMany({
      where: { id: matched.id, consumedAt: null },
      data: { consumedAt: new Date() },
    });
    if (consumed.count !== 1) throw invalid;

    // The short-lived ticket the new password is submitted with. Long and
    // random, so it is safe against the by-type lookup resetPassword uses.
    const resetToken = await this.createEmailToken(
      user.id,
      EmailTokenType.PASSWORD_RESET,
      1,
    );

    return { message: "Code verified", resetToken };
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
    // `roles` is what the guards read; `role` stays in the payload so tokens
    // minted here are still readable by anything not yet updated, and
    // `activeRole` tells the app which side it was last on.
    const payload = {
      sub: user.id,
      role: user.role,
      roles: user.roles,
      activeRole: user.activeRole,
      email: user.email,
    };
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
