"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt = __importStar(require("bcryptjs"));
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const client_1 = require("../../../generated/prisma/client");
const nestjs_pino_1 = require("nestjs-pino");
const notifications_service_1 = require("../notifications/notifications.service");
const client_2 = require("../../../generated/prisma/client");
let AuthService = class AuthService {
    prisma;
    jwtService;
    config;
    logger;
    notifications;
    constructor(prisma, jwtService, config, logger, notifications) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.config = config;
        this.logger = logger;
        this.notifications = notifications;
    }
    async registerCustomer(dto, deviceInfo, ipAddress) {
        const { fullName, phone, email, password, cityId, address } = dto;
        await this.validateUniqueCredentials(email, phone);
        const hashedPassword = await this.hashData(password);
        const newUser = await this.prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    fullName,
                    phone,
                    email,
                    passwordHash: hashedPassword,
                    role: client_1.UserRole.CUSTOMER,
                    cityId,
                    address,
                    status: client_1.UserStatus.ACTIVE,
                    profileCompleted: true,
                    verificationStatus: client_1.VerificationStatus.APPROVED,
                },
            });
            await tx.wallet.create({
                data: { userId: user.id, type: client_1.WalletType.CUSTOMER },
            });
            return user;
        });
        const tokens = await this.generateTokens(newUser);
        const hashedRt = await this.hashData(tokens.refreshToken);
        const refreshExpiry = this.config.get('JWT_REFRESH_EXPIRY') || '30d';
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
        void this.notifications.send({
            userId: newUser.id,
            type: client_2.NotificationType.WELCOME,
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
    async registerProvider(dto, deviceInfo, ipAddress) {
        const { fullName, phone, email, password, cityId } = dto;
        await this.validateUniqueCredentials(email, phone);
        const hashedPassword = await this.hashData(password);
        const newUser = await this.prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    fullName,
                    phone,
                    email,
                    passwordHash: hashedPassword,
                    role: client_1.UserRole.PROVIDER,
                    cityId,
                    status: client_1.UserStatus.ACTIVE,
                    profileCompleted: false,
                    verificationStatus: client_1.VerificationStatus.INCOMPLETE,
                },
            });
            await tx.wallet.create({
                data: { userId: user.id, type: client_1.WalletType.PROVIDER },
            });
            return user;
        });
        const tokens = await this.generateTokens(newUser);
        const hashedRt = await this.hashData(tokens.refreshToken);
        const refreshExpiry = this.config.get('JWT_REFRESH_EXPIRY') || '30d';
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
        void this.notifications.send({
            userId: newUser.id,
            type: client_2.NotificationType.WELCOME,
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
    async login(loginDto, deviceInfo, ipAddress) {
        const { email, phone, password } = loginDto;
        if (!email && !phone) {
            throw new common_1.BadRequestException('Email or phone is required');
        }
        let user = null;
        if (email) {
            user = await this.prisma.user.findUnique({
                where: { email },
            });
        }
        else if (phone) {
            user = await this.prisma.user.findUnique({
                where: { phone },
            });
        }
        const passwordHash = user?.passwordHash ||
            (await this.hashData('dummy-password-to-prevent-timing-attack'));
        const passwordMatches = await bcrypt.compare(password, passwordHash);
        if (!user || !user.isActive || !passwordMatches) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const tokens = await this.generateTokens(user);
        const hashedRt = await this.hashData(tokens.refreshToken);
        const refreshExpiry = this.config.get('JWT_REFRESH_EXPIRY') || '30d';
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
    async refreshToken(userId, rt, deviceInfo, ipAddress) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user || !user.isActive) {
            throw new common_1.ForbiddenException('Invalid refresh token');
        }
        const storedTokens = await this.prisma.refreshToken.findMany({
            where: {
                userId: user.id,
                expiresAt: { gte: new Date() },
            },
        });
        let isValidToken = false;
        let validTokenId = null;
        for (const storedToken of storedTokens) {
            const matches = await bcrypt.compare(rt, storedToken.token);
            if (matches) {
                isValidToken = true;
                validTokenId = storedToken.id;
                break;
            }
        }
        if (!isValidToken || !validTokenId) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        const tokens = await this.generateTokens(user);
        const hashedRt = await this.hashData(tokens.refreshToken);
        const refreshExpiry = this.config.get('JWT_REFRESH_EXPIRY') || '30d';
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
    async logout(userId, rt) {
        if (rt) {
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
        }
        else {
            await this.prisma.refreshToken.deleteMany({
                where: { userId },
            });
        }
        return {
            message: 'Logged out successfully',
        };
    }
    async getMe(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.sanitizeUser(user);
    }
    async validateUniqueCredentials(email, phone) {
        const existingEmail = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingEmail) {
            throw new common_1.ConflictException('Email already exists');
        }
        const existingPhone = await this.prisma.user.findUnique({
            where: { phone },
        });
        if (existingPhone) {
            throw new common_1.ConflictException('Phone already exists');
        }
    }
    sanitizeUser(user) {
        const { passwordHash, refreshToken, ...safeUser } = user;
        return safeUser;
    }
    async hashData(data) {
        const salt = await bcrypt.genSalt(12);
        return bcrypt.hash(data, salt);
    }
    async generateTokens(user) {
        const payload = { sub: user.id, role: user.role, email: user.email };
        const accessExpiry = this.config.get('JWT_ACCESS_EXPIRY') || '15m';
        const refreshExpiry = this.config.get('JWT_REFRESH_EXPIRY') || '7d';
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.config.get('JWT_ACCESS_SECRET'),
                expiresIn: accessExpiry,
            }),
            this.jwtService.signAsync(payload, {
                secret: this.config.get('JWT_REFRESH_SECRET'),
                expiresIn: refreshExpiry,
            }),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }
    async cleanupExpiredTokens(userId) {
        await this.prisma.refreshToken.deleteMany({
            where: {
                userId,
                expiresAt: { lt: new Date() },
            },
        });
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
    parseExpiryToMilliseconds(expiry) {
        const match = expiry.match(/^(\d+)([smhd])$/);
        if (!match)
            return 30 * 24 * 60 * 60 * 1000;
        const value = parseInt(match[1], 10);
        const unit = match[2];
        const units = {
            s: 1000,
            m: 60 * 1000,
            h: 60 * 60 * 1000,
            d: 24 * 60 * 60 * 1000,
        };
        return value * units[unit];
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService,
        nestjs_pino_1.Logger,
        notifications_service_1.NotificationsService])
], AuthService);
//# sourceMappingURL=auth.service.js.map