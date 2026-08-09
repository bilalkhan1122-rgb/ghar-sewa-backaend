"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const file_upload_service_1 = require("../../common/services/file-upload.service");
let UsersService = class UsersService {
    prisma;
    fileUpload;
    constructor(prisma, fileUpload) {
        this.prisma = prisma;
        this.fileUpload = fileUpload;
    }
    async getProfile(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                city: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.sanitizeUser(user);
    }
    async updateProfile(userId, updateProfileDto) {
        if (updateProfileDto.cityId) {
            const city = await this.prisma.city.findUnique({
                where: { id: updateProfileDto.cityId },
            });
            if (!city) {
                throw new common_1.BadRequestException('City not found');
            }
        }
        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: {
                ...(updateProfileDto.fullName !== undefined && { fullName: updateProfileDto.fullName }),
                ...(updateProfileDto.cityId !== undefined && { cityId: updateProfileDto.cityId }),
                ...(updateProfileDto.address !== undefined && { address: updateProfileDto.address }),
            },
            include: { city: true },
        });
        return this.sanitizeUser(updatedUser);
    }
    async uploadProfilePhoto(userId, file) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const fileUrl = await this.fileUpload.replaceFile(user.profilePhoto, file, 'profiles');
        await this.prisma.user.update({
            where: { id: userId },
            data: { profilePhoto: fileUrl },
        });
        return { profilePhoto: fileUrl };
    }
    async getWalletSummary(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                walletBalance: true,
                totalSpent: true,
                totalTopups: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const pendingBookings = await this.prisma.booking.findMany({
            where: {
                customerId: userId,
                status: { in: ['ACCEPTED', 'IN_PROGRESS'] },
            },
            select: {
                id: true,
                totalAmount: true,
                status: true,
                createdAt: true,
            },
        });
        return {
            currentBalance: user.walletBalance,
            totalSpent: user.totalSpent,
            totalTopups: user.totalTopups,
            pendingTransactions: pendingBookings,
        };
    }
    async getBookingSummary(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const [totalBookings, pendingBookings, activeBookings, completedBookings, cancelledBookings, disputedBookings,] = await Promise.all([
            this.prisma.booking.count({ where: { customerId: userId } }),
            this.prisma.booking.count({
                where: { customerId: userId, status: 'ACCEPTED' },
            }),
            this.prisma.booking.count({
                where: { customerId: userId, status: 'IN_PROGRESS' },
            }),
            this.prisma.booking.count({
                where: { customerId: userId, status: 'COMPLETED' },
            }),
            this.prisma.booking.count({
                where: { customerId: userId, status: 'CANCELLED' },
            }),
            this.prisma.booking.count({
                where: { customerId: userId, status: 'DISPUTED' },
            }),
        ]);
        return {
            totalBookings,
            pendingBookings,
            activeBookings,
            completedBookings,
            cancelledBookings,
            disputedBookings,
        };
    }
    async deleteAccount(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                isActive: false,
                deletedAt: new Date(),
            },
        });
        await this.prisma.refreshToken.deleteMany({
            where: { userId },
        });
        return { message: 'Account deleted successfully. Your data has been preserved.' };
    }
    async getAllUsers(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [users, total] = await Promise.all([
            this.prisma.user.findMany({
                where: { isActive: true },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: { city: true },
            }),
            this.prisma.user.count({ where: { isActive: true } }),
        ]);
        const sanitizedUsers = users.map((user) => this.sanitizeUser(user));
        const totalPages = Math.ceil(total / limit);
        return {
            data: sanitizedUsers,
            meta: {
                total,
                page,
                limit,
                totalPages,
                hasNext: page < totalPages,
                hasPrevious: page > 1,
            },
        };
    }
    async getUserById(userId) {
        if (!userId) {
            return null;
        }
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { city: true },
        });
        if (!user) {
            return null;
        }
        return this.sanitizeUser(user);
    }
    async updateUserById(userId, updateUserDto) {
        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: { ...updateUserDto },
            include: { city: true },
        });
        return this.sanitizeUser(updatedUser);
    }
    async deleteUserById(userId) {
        await this.prisma.user.update({
            where: { id: userId },
            data: { isActive: false, deletedAt: new Date() },
        });
        await this.prisma.refreshToken.deleteMany({
            where: { userId },
        });
        return { message: 'User deleted successfully' };
    }
    sanitizeUser(user) {
        if (!user) {
            return null;
        }
        const { refreshToken, passwordHash, ...safeUser } = user;
        return safeUser;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        file_upload_service_1.FileUploadService])
], UsersService);
//# sourceMappingURL=users.service.js.map