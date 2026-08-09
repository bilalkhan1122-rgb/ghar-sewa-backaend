import {
  Injectable,
  ConflictException,
  ForbiddenException,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  User,
  UserRole,
  UserStatus,
  VerificationStatus,
  WalletType,
} from 'generated/prisma/client';
import { Logger } from 'nestjs-pino';
import { CustomerRegisterDto } from './dtos/customer-register.dto';
import { ProviderRegisterDto } from './dtos/provider-register.dto';
import { LoginDto } from './dtos/login.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationType } from 'generated/prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
    private logger: Logger,
    private notifications: NotificationsService,
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
      this.config.get<string>('JWT_REFRESH_EXPIRY') || '30d';
    const expiryMs = this.parseExpiryToMilliseconds(refreshExpiry);
    const expiresAt = new Date(Date.now() + expiryMs);

    await this.prisma.refreshToken.create({
      data: {
        token: hashedRt,
        userId: newUser.id,
        deviceInfo: deviceInfo || 'Unknown Device',
        ipAddress: ipAddress || 'Unknown IP',
        expiresAt,
      },
    });

    this.logger.log({
      message: 'Customer registered',
      userId: newUser.id,
      role: newUser.role,
    });

    // Welcome notification
    void this.notifications.send({
      userId: newUser.id,
      type: NotificationType.WELCOME,
      title: 'Welcome to Ghar Sewa! 🎉',
      message: `Assalam-o-Alaikum ${fullName}! Your account is ready. Post a job and find trusted service providers near you.`,
      relatedEntityType: 'USER',
      relatedEntityId: newUser.id,
    });

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
      this.config.get<string>('JWT_REFRESH_EXPIRY') || '30d';
    const expiryMs = this.parseExpiryToMilliseconds(refreshExpiry);
    const expiresAt = new Date(Date.now() + expiryMs);

    await this.prisma.refreshToken.create({
      data: {
        token: hashedRt,
        userId: newUser.id,
        deviceInfo: deviceInfo || 'Unknown Device',
        ipAddress: ipAddress || 'Unknown IP',
        expiresAt,
      },
    });

    this.logger.log({
      message: 'Provider registered',
      userId: newUser.id,
      role: newUser.role,
    });

    // Welcome notification
    void this.notifications.send({
      userId: newUser.id,
      type: NotificationType.WELCOME,
      title: 'Welcome to Ghar Sewa! 🎉',
      message: `Assalam-o-Alaikum ${fullName}! Complete your profile and get verified to start receiving job leads.`,
      relatedEntityType: 'USER',
      relatedEntityId: newUser.id,
    });

    return {
      user: this.sanitizeUser(newUser),
      ...tokens,
    };
  }

  async login(loginDto: LoginDto, deviceInfo?: string, ipAddress?: string) {
    const { email, phone, password } = loginDto;

    if (!email && !phone) {
      throw new BadRequestException('Email or phone is required');
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
      (await this.hashData('dummy-password-to-prevent-timing-attack'));
    const passwordMatches = await bcrypt.compare(password, passwordHash);

    // Use consistent error message to prevent account enumeration
    if (!user || !user.isActive || !passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(user);
    const hashedRt = await this.hashData(tokens.refreshToken);

    // Store refresh token with device info for multi-device support
    const refreshExpiry =
      this.config.get<string>('JWT_REFRESH_EXPIRY') || '30d';
    const expiryMs = this.parseExpiryToMilliseconds(refreshExpiry);
    const expiresAt = new Date(Date.now() + expiryMs);

    await this.prisma.refreshToken.create({
      data: {
        token: hashedRt,
        userId: user.id,
        deviceInfo: deviceInfo || 'Unknown Device',
        ipAddress: ipAddress || 'Unknown IP',
        expiresAt,
      },
    });

    // Clean up expired tokens for this user
    await this.cleanupExpiredTokens(user.id);

    this.logger.log({
      message: 'User logged in',
      userId: user.id,
      role: user.role,
      timestamp: new Date().toISOString(),
    });

    return {
      user: this.sanitizeUser(user),
      ...tokens,
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
      throw new ForbiddenException('Invalid refresh token');
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
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Generate new tokens
    const tokens = await this.generateTokens(user);
    const hashedRt = await this.hashData(tokens.refreshToken);

    // Update the refresh token (rotation)
    const refreshExpiry =
      this.config.get<string>('JWT_REFRESH_EXPIRY') || '30d';
    const expiryMs = this.parseExpiryToMilliseconds(refreshExpiry);
    const expiresAt = new Date(Date.now() + expiryMs);

    await this.prisma.refreshToken.update({
      where: { id: validTokenId },
      data: {
        token: hashedRt,
        deviceInfo: deviceInfo || 'Unknown Device',
        ipAddress: ipAddress || 'Unknown IP',
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
      message: 'Logged out successfully',
    };
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.sanitizeUser(user);
  }

  // Private Helpers

  private async validateUniqueCredentials(email: string, phone: string) {
    const existingEmail = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }

    const existingPhone = await this.prisma.user.findUnique({
      where: { phone },
    });

    if (existingPhone) {
      throw new ConflictException('Phone already exists');
    }
  }

  private sanitizeUser(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, refreshToken, ...safeUser } = user;
    return safeUser;
  }

  async hashData(data: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(data, salt);
  }

  async generateTokens(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { sub: user.id, role: user.role, email: user.email };
    const accessExpiry = this.config.get<string>('JWT_ACCESS_EXPIRY') || '15m';
    const refreshExpiry = this.config.get<string>('JWT_REFRESH_EXPIRY') || '7d';

    const [accessToken, refreshToken] = await Promise.all([
      // @ts-expect-error - JWT library type definition issue with expiresIn accepting string
      this.jwtService.signAsync(payload, {
        secret: this.config.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: accessExpiry,
      }),
      // @ts-expect-error - JWT library type definition issue with expiresIn accepting string
      this.jwtService.signAsync(payload, {
        secret: this.config.get<string>('JWT_REFRESH_SECRET'),
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
      orderBy: { createdAt: 'desc' },
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
