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
exports.ProviderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const file_upload_service_1 = require("../../common/services/file-upload.service");
const client_1 = require("../../../generated/prisma/client");
const verification_service_1 = require("../verification/verification.service");
let ProviderService = class ProviderService {
    prisma;
    fileUpload;
    verification;
    constructor(prisma, fileUpload, verification) {
        this.prisma = prisma;
        this.fileUpload = fileUpload;
        this.verification = verification;
    }
    checkNotBanned(user) {
        if (user.verificationStatus === client_1.VerificationStatus.BANNED) {
            throw new common_1.ForbiddenException('Your account has been banned. You cannot access provider functionality.');
        }
    }
    async completeProfile(userId, dto) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user || user.role !== client_1.UserRole.PROVIDER) {
            throw new common_1.NotFoundException('Provider not found');
        }
        this.checkNotBanned(user);
        const existingCnic = await this.prisma.providerProfile.findUnique({
            where: { cnicNumber: dto.cnicNumber },
        });
        if (existingCnic && existingCnic.userId !== userId) {
            throw new common_1.ConflictException('CNIC number already in use');
        }
        const existingProfile = await this.prisma.providerProfile.findUnique({
            where: { userId },
        });
        if (existingProfile) {
            if (existingProfile.cnicNumber !== dto.cnicNumber &&
                user.verificationStatus === client_1.VerificationStatus.APPROVED) {
                await this.verification.onSensitiveInfoChanged(userId);
            }
            await this.prisma.providerProfile.update({
                where: { userId },
                data: {
                    bio: dto.bio,
                    hourlyRate: dto.hourlyRate,
                    serviceLocation: dto.serviceLocation,
                    serviceRadius: dto.serviceRadius,
                    cnicNumber: dto.cnicNumber,
                },
            });
            await this.prisma.providerServiceCategory.deleteMany({
                where: { providerId: userId },
            });
            if (dto.categoryIds.length > 0) {
                await this.prisma.providerServiceCategory.createMany({
                    data: dto.categoryIds.map((catId) => ({
                        providerId: userId,
                        categoryId: catId,
                    })),
                });
            }
            await this.updateCompletionAndVerification(userId);
            return this.getProviderProfile(userId);
        }
        await this.prisma.providerProfile.create({
            data: {
                userId,
                bio: dto.bio,
                hourlyRate: dto.hourlyRate,
                serviceLocation: dto.serviceLocation,
                serviceRadius: dto.serviceRadius,
                cnicNumber: dto.cnicNumber,
            },
        });
        if (dto.categoryIds.length > 0) {
            await this.prisma.providerServiceCategory.createMany({
                data: dto.categoryIds.map((catId) => ({
                    providerId: userId,
                    categoryId: catId,
                })),
            });
        }
        await this.updateCompletionAndVerification(userId);
        return this.getProviderProfile(userId);
    }
    async getProviderProfile(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                providerProfile: {
                    include: {
                        categories: {
                            include: {
                                category: true,
                            },
                        },
                        galleryImages: true,
                    },
                },
                city: true,
            },
        });
        if (!user || user.role !== client_1.UserRole.PROVIDER) {
            throw new common_1.NotFoundException('Provider not found');
        }
        this.checkNotBanned(user);
        const profile = user.providerProfile;
        const completion = this.calculateCompletion(profile);
        return {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            profilePhoto: user.profilePhoto,
            city: user.city,
            address: user.address,
            verificationStatus: user.verificationStatus,
            profileCompleted: user.profileCompleted,
            createdAt: user.createdAt,
            profile: profile
                ? {
                    bio: profile.bio,
                    hourlyRate: profile.hourlyRate,
                    serviceLocation: profile.serviceLocation,
                    serviceRadius: profile.serviceRadius,
                    facePhoto: profile.facePhoto,
                    cnicNumber: profile.cnicNumber,
                    cnicFrontImage: profile.cnicFrontImage,
                    cnicBackImage: profile.cnicBackImage,
                    categories: profile.categories.map((pc) => pc.category),
                    galleryImages: profile.galleryImages,
                    completionPercentage: completion.percentage,
                    completedFields: completion.completedFields,
                    missingFields: completion.missingFields,
                }
                : null,
        };
    }
    async updateProviderProfile(userId, dto) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { providerProfile: true },
        });
        if (!user || user.role !== client_1.UserRole.PROVIDER) {
            throw new common_1.NotFoundException('Provider not found');
        }
        this.checkNotBanned(user);
        if (!user.providerProfile) {
            throw new common_1.BadRequestException('Complete your profile first using the profile completion endpoint');
        }
        const updateData = {};
        if (dto.bio !== undefined)
            updateData.bio = dto.bio;
        if (dto.hourlyRate !== undefined)
            updateData.hourlyRate = dto.hourlyRate;
        if (dto.serviceLocation !== undefined)
            updateData.serviceLocation = dto.serviceLocation;
        if (dto.serviceRadius !== undefined)
            updateData.serviceRadius = dto.serviceRadius;
        if (Object.keys(updateData).length > 0) {
            await this.prisma.providerProfile.update({
                where: { userId },
                data: updateData,
            });
        }
        if (dto.categoryIds && dto.categoryIds.length > 0) {
            await this.prisma.providerServiceCategory.deleteMany({
                where: { providerId: userId },
            });
            await this.prisma.providerServiceCategory.createMany({
                data: dto.categoryIds.map((catId) => ({
                    providerId: userId,
                    categoryId: catId,
                })),
            });
        }
        await this.updateCompletionAndVerification(userId);
        return this.getProviderProfile(userId);
    }
    async getCompletionProgress(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { providerProfile: true },
        });
        if (!user || user.role !== client_1.UserRole.PROVIDER) {
            throw new common_1.NotFoundException('Provider not found');
        }
        this.checkNotBanned(user);
        const profile = user.providerProfile;
        const completion = this.calculateCompletion(profile);
        return {
            completionPercentage: completion.percentage,
            completedFields: completion.completedFields,
            missingFields: completion.missingFields,
            verificationStatus: user.verificationStatus,
        };
    }
    async uploadFacePhoto(userId, file) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { providerProfile: true },
        });
        if (!user || user.role !== client_1.UserRole.PROVIDER) {
            throw new common_1.NotFoundException('Provider not found');
        }
        this.checkNotBanned(user);
        let providerProfile = user.providerProfile;
        if (!providerProfile) {
            providerProfile = await this.prisma.providerProfile.create({
                data: { userId },
            });
        }
        const oldPhoto = providerProfile.facePhoto;
        const fileUrl = await this.fileUpload.replaceFile(oldPhoto, file, 'faces');
        await this.prisma.providerProfile.update({
            where: { userId },
            data: { facePhoto: fileUrl },
        });
        if (user.verificationStatus === client_1.VerificationStatus.APPROVED) {
            await this.verification.onSensitiveInfoChanged(userId);
        }
        await this.updateCompletionAndVerification(userId);
        return { facePhoto: fileUrl };
    }
    async uploadCnicFront(userId, file) {
        return this.uploadCnicImage(userId, file, 'cnicFrontImage');
    }
    async uploadCnicBack(userId, file) {
        return this.uploadCnicImage(userId, file, 'cnicBackImage');
    }
    async uploadCnicImage(userId, file, field) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { providerProfile: true },
        });
        if (!user || user.role !== client_1.UserRole.PROVIDER) {
            throw new common_1.NotFoundException('Provider not found');
        }
        this.checkNotBanned(user);
        let providerProfile = user.providerProfile;
        if (!providerProfile) {
            providerProfile = await this.prisma.providerProfile.create({
                data: { userId },
            });
        }
        const oldImage = providerProfile[field];
        const fileUrl = await this.fileUpload.replaceFile(oldImage, file, 'cnic');
        await this.prisma.providerProfile.update({
            where: { userId },
            data: { [field]: fileUrl },
        });
        if (user.verificationStatus === client_1.VerificationStatus.APPROVED) {
            await this.verification.onSensitiveInfoChanged(userId);
        }
        await this.updateCompletionAndVerification(userId);
        return { [field]: fileUrl };
    }
    async submitForVerification(userId) {
        return this.verification.submit(userId);
    }
    async addGalleryImage(userId, file) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { providerProfile: true },
        });
        if (!user || user.role !== client_1.UserRole.PROVIDER) {
            throw new common_1.NotFoundException('Provider not found');
        }
        this.checkNotBanned(user);
        let providerProfile = user.providerProfile;
        if (!providerProfile) {
            providerProfile = await this.prisma.providerProfile.create({
                data: { userId },
            });
        }
        const imageCount = await this.prisma.galleryImage.count({
            where: { providerId: userId },
        });
        const maxImages = 10;
        if (imageCount >= maxImages) {
            throw new common_1.BadRequestException(`Maximum ${maxImages} gallery images allowed`);
        }
        const imageUrl = await this.fileUpload.uploadGalleryImage(file);
        const image = await this.prisma.galleryImage.create({
            data: {
                providerId: userId,
                imageUrl,
            },
        });
        return image;
    }
    async removeGalleryImage(userId, imageId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user || user.role !== client_1.UserRole.PROVIDER) {
            throw new common_1.NotFoundException('Provider not found');
        }
        this.checkNotBanned(user);
        const image = await this.prisma.galleryImage.findUnique({
            where: { id: imageId },
        });
        if (!image) {
            throw new common_1.NotFoundException('Gallery image not found');
        }
        if (image.providerId !== userId) {
            throw new common_1.ForbiddenException('You can only remove your own gallery images');
        }
        await this.fileUpload.deleteFile(image.imageUrl);
        await this.prisma.galleryImage.delete({
            where: { id: imageId },
        });
        return { message: 'Gallery image removed successfully' };
    }
    async listGalleryImages(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user || user.role !== client_1.UserRole.PROVIDER) {
            throw new common_1.NotFoundException('Provider not found');
        }
        this.checkNotBanned(user);
        return this.prisma.galleryImage.findMany({
            where: { providerId: userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getPublicProfile(providerId) {
        const user = await this.prisma.user.findUnique({
            where: { id: providerId },
            include: {
                providerProfile: {
                    include: {
                        categories: {
                            include: {
                                category: true,
                            },
                        },
                        galleryImages: true,
                    },
                },
                city: true,
                ratingSummary: true,
            },
        });
        if (!user ||
            user.role !== client_1.UserRole.PROVIDER ||
            user.status !== client_1.UserStatus.ACTIVE ||
            user.verificationStatus !== client_1.VerificationStatus.APPROVED ||
            !user.isActive) {
            throw new common_1.NotFoundException('Provider not found');
        }
        const profile = user.providerProfile;
        if (!profile) {
            throw new common_1.NotFoundException('Provider profile not found');
        }
        const bookingStats = await this.getProviderBookingStats(providerId);
        return {
            id: user.id,
            fullName: user.fullName,
            profilePhoto: user.profilePhoto,
            bio: profile.bio,
            hourlyRate: profile.hourlyRate,
            serviceLocation: profile.serviceLocation,
            serviceRadius: profile.serviceRadius,
            categories: profile.categories.map((pc) => pc.category),
            galleryImages: profile.galleryImages,
            city: user.city,
            verificationStatus: user.verificationStatus,
            rating: user.ratingSummary?.averageRating ?? 0,
            totalReviews: user.ratingSummary?.totalReviews ?? 0,
            ratingDistribution: {
                fiveStar: user.ratingSummary?.fiveStarCount ?? 0,
                fourStar: user.ratingSummary?.fourStarCount ?? 0,
                threeStar: user.ratingSummary?.threeStarCount ?? 0,
                twoStar: user.ratingSummary?.twoStarCount ?? 0,
                oneStar: user.ratingSummary?.oneStarCount ?? 0,
            },
            totalCompletedJobs: bookingStats.completedJobs,
        };
    }
    async getDashboardSummary(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                providerProfile: {
                    include: {
                        categories: {
                            include: { category: true },
                        },
                    },
                },
                ratingSummary: true,
                wallet: {
                    select: {
                        balance: true,
                        heldBalance: true,
                        lifetimeCredits: true,
                    },
                },
            },
        });
        if (!user || user.role !== client_1.UserRole.PROVIDER) {
            throw new common_1.NotFoundException('Provider not found');
        }
        this.checkNotBanned(user);
        const profile = user.providerProfile;
        const completion = profile
            ? this.calculateCompletion(profile)
            : {
                percentage: 0,
                completedFields: [],
                missingFields: this.getAllRequiredFields(),
            };
        const bookingStats = await this.getProviderBookingStats(userId);
        return {
            profileCompletion: completion.percentage,
            verificationStatus: user.verificationStatus,
            totalJobs: bookingStats.totalJobs,
            activeJobs: bookingStats.activeJobs,
            completedJobs: bookingStats.completedJobs,
            rating: user.ratingSummary?.averageRating ?? 0,
            totalReviews: user.ratingSummary?.totalReviews ?? 0,
            ratingDistribution: {
                fiveStar: user.ratingSummary?.fiveStarCount ?? 0,
                fourStar: user.ratingSummary?.fourStarCount ?? 0,
                threeStar: user.ratingSummary?.threeStarCount ?? 0,
                twoStar: user.ratingSummary?.twoStarCount ?? 0,
                oneStar: user.ratingSummary?.oneStarCount ?? 0,
            },
            walletBalance: user.wallet?.balance ?? user.walletBalance,
            heldBalance: user.wallet?.heldBalance ?? new client_1.Prisma.Decimal(0),
            totalEarnings: user.wallet?.lifetimeCredits ?? user.totalSpent,
            categories: profile?.categories.map((pc) => pc.category) || [],
        };
    }
    async uploadProfilePhoto(userId, file) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user || user.role !== client_1.UserRole.PROVIDER) {
            throw new common_1.NotFoundException('Provider not found');
        }
        this.checkNotBanned(user);
        const fileUrl = await this.fileUpload.replaceFile(user.profilePhoto, file, 'profiles');
        await this.prisma.user.update({
            where: { id: userId },
            data: { profilePhoto: fileUrl },
        });
        return { profilePhoto: fileUrl };
    }
    calculateCompletion(profile) {
        const fields = [
            { name: 'facePhoto', completed: !!profile?.facePhoto },
            { name: 'cnicNumber', completed: !!profile?.cnicNumber },
            { name: 'cnicFrontImage', completed: !!profile?.cnicFrontImage },
            { name: 'cnicBackImage', completed: !!profile?.cnicBackImage },
            { name: 'bio', completed: !!profile?.bio },
            { name: 'hourlyRate', completed: profile?.hourlyRate != null },
            { name: 'serviceLocation', completed: !!profile?.serviceLocation },
            { name: 'categories', completed: (profile?.categories?.length ?? 0) > 0 },
        ];
        const completedFields = fields
            .filter((f) => f.completed)
            .map((f) => f.name);
        const missingFields = fields.filter((f) => !f.completed).map((f) => f.name);
        const completedCount = completedFields.length;
        const totalFields = fields.length;
        const percentage = Math.round((completedCount / totalFields) * 100);
        return {
            percentage,
            completedFields,
            missingFields,
        };
    }
    getAllRequiredFields() {
        return [
            'facePhoto',
            'cnicNumber',
            'cnicFrontImage',
            'cnicBackImage',
            'bio',
            'hourlyRate',
            'serviceLocation',
            'categories',
        ];
    }
    async updateCompletionAndVerification(userId) {
        const profile = await this.prisma.providerProfile.findUnique({
            where: { userId },
            include: {
                categories: true,
            },
        });
        if (!profile)
            return;
        const completion = this.calculateCompletion(profile);
        const isComplete = completion.percentage >= 100;
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                profileCompleted: isComplete,
            },
        });
        if (!isComplete) {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
            });
            if (user &&
                user.verificationStatus !== client_1.VerificationStatus.REJECTED &&
                user.verificationStatus !== client_1.VerificationStatus.BANNED) {
                if (!profile.cnicNumber || !profile.facePhoto) {
                    await this.prisma.user.update({
                        where: { id: userId },
                        data: { verificationStatus: client_1.VerificationStatus.INCOMPLETE },
                    });
                }
            }
        }
    }
    async getProviderBookingStats(providerId) {
        const [totalJobs, activeJobs, completedJobs, cancelledJobs, disputedJobs] = await Promise.all([
            this.prisma.booking.count({
                where: { providerId },
            }),
            this.prisma.booking.count({
                where: { providerId, status: client_1.BookingStatus.IN_PROGRESS },
            }),
            this.prisma.booking.count({
                where: { providerId, status: client_1.BookingStatus.COMPLETED },
            }),
            this.prisma.booking.count({
                where: { providerId, status: client_1.BookingStatus.CANCELLED },
            }),
            this.prisma.booking.count({
                where: { providerId, status: client_1.BookingStatus.DISPUTED },
            }),
        ]);
        return {
            totalJobs,
            activeJobs,
            completedJobs,
            cancelledJobs,
            disputedJobs,
        };
    }
};
exports.ProviderService = ProviderService;
exports.ProviderService = ProviderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        file_upload_service_1.FileUploadService,
        verification_service_1.VerificationService])
], ProviderService);
//# sourceMappingURL=provider.service.js.map