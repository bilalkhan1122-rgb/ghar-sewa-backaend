import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { FileUploadService } from "src/common/services/file-upload.service";
import { UpdateCustomerProfileDto } from "./dtos/update-customer-profile.dto";
import { User } from "generated/prisma/client";
import { UpdateUserDto } from "./dtos/update-user.dto";

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileUpload: FileUploadService,
  ) {}

  // ─── Profile Management ──────────────────────────────────────────────

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        city: true,
      },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return this.sanitizeUser(user);
  }

  async updateProfile(
    userId: string,
    updateProfileDto: UpdateCustomerProfileDto,
  ) {
    // Validate city if provided
    if (updateProfileDto.cityId) {
      const city = await this.prisma.city.findUnique({
        where: { id: updateProfileDto.cityId },
      });
      if (!city) {
        throw new BadRequestException("City not found");
      }
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...(updateProfileDto.fullName !== undefined && {
          fullName: updateProfileDto.fullName,
        }),
        ...(updateProfileDto.cityId !== undefined && {
          cityId: updateProfileDto.cityId,
        }),
        ...(updateProfileDto.address !== undefined && {
          address: updateProfileDto.address,
        }),
      },
      include: { city: true },
    });

    return this.sanitizeUser(updatedUser);
  }

  // ─── Upload Profile Photo ────────────────────────────────────────────

  async uploadProfilePhoto(userId: string, file: Express.Multer.File) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const fileUrl = await this.fileUpload.replaceFile(
      user.profilePhoto,
      file,
      "profiles",
    );

    await this.prisma.user.update({
      where: { id: userId },
      data: { profilePhoto: fileUrl },
    });

    return { profilePhoto: fileUrl };
  }

  // ─── Wallet Summary ──────────────────────────────────────────────────

  async getWalletSummary(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        walletBalance: true,
        totalSpent: true,
        totalTopups: true,
      },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    // Pending transactions (from bookings with ACTIVE or PENDING status)
    const pendingBookings = await this.prisma.booking.findMany({
      where: {
        customerId: userId,
        status: { in: ["ACCEPTED", "IN_PROGRESS"] },
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

  // ─── Booking Summary ─────────────────────────────────────────────────

  async getBookingSummary(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const [
      totalBookings,
      pendingBookings,
      activeBookings,
      completedBookings,
      cancelledBookings,
      disputedBookings,
    ] = await Promise.all([
      this.prisma.booking.count({ where: { customerId: userId } }),
      this.prisma.booking.count({
        where: { customerId: userId, status: "ACCEPTED" },
      }),
      this.prisma.booking.count({
        where: { customerId: userId, status: "IN_PROGRESS" },
      }),
      this.prisma.booking.count({
        where: { customerId: userId, status: "COMPLETED" },
      }),
      this.prisma.booking.count({
        where: { customerId: userId, status: "CANCELLED" },
      }),
      this.prisma.booking.count({
        where: { customerId: userId, status: "DISPUTED" },
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

  // ─── Soft Delete Account ─────────────────────────────────────────────

  async deleteAccount(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    // Mark account as deleted
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        isActive: false,
        deletedAt: new Date(),
      },
    });

    // Invalidate all refresh tokens
    await this.prisma.refreshToken.deleteMany({
      where: { userId },
    });

    return {
      message: "Account deleted successfully. Your data has been preserved.",
    };
  }

  // ─── Admin Methods ───────────────────────────────────────────────────

  async getAllUsers(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where: { isActive: true },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
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

  async getUserById(userId: string) {
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

  async updateUserById(userId: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { ...updateUserDto },
      include: { city: true },
    });

    return this.sanitizeUser(updatedUser);
  }

  async deleteUserById(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { isActive: false, deletedAt: new Date() },
    });

    await this.prisma.refreshToken.deleteMany({
      where: { userId },
    });

    return { message: "User deleted successfully" };
  }

  // ─── Utils ───────────────────────────────────────────────────────────

  sanitizeUser(user: User | null) {
    if (!user) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { refreshToken, passwordHash, ...safeUser } = user;
    return safeUser;
  }
}
