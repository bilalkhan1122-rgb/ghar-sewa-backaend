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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const category_query_dto_1 = require("./dtos/category-query.dto");
const nestjs_pino_1 = require("nestjs-pino");
let CategoriesService = class CategoriesService {
    prisma;
    logger;
    constructor(prisma, logger) {
        this.prisma = prisma;
        this.logger = logger;
    }
    generateSlug(name) {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
            .replace(/-+/g, '-');
    }
    async ensureUniqueSlug(slug, excludeId) {
        let finalSlug = slug;
        let counter = 1;
        while (true) {
            const existing = await this.prisma.serviceCategory.findUnique({
                where: { slug: finalSlug },
            });
            if (!existing || (excludeId && existing.id === excludeId)) {
                return finalSlug;
            }
            finalSlug = `${slug}-${counter}`;
            counter++;
        }
    }
    async listActiveCategories(query) {
        const { page = 1, limit = 10, search, sortBy = category_query_dto_1.CategorySortField.DISPLAY_ORDER, sortOrder = 'asc', } = query;
        const skip = (page - 1) * limit;
        const where = {
            isActive: true,
            ...(search && {
                name: { contains: search, mode: 'insensitive' },
            }),
        };
        const orderByField = sortBy === category_query_dto_1.CategorySortField.NAME
            ? 'name'
            : sortBy === category_query_dto_1.CategorySortField.CREATED_AT
                ? 'createdAt'
                : 'displayOrder';
        const [categories, total] = await Promise.all([
            this.prisma.serviceCategory.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [orderByField]: sortOrder },
            }),
            this.prisma.serviceCategory.count({ where }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            data: categories,
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
    async getCategoryBySlug(slug) {
        const category = await this.prisma.serviceCategory.findFirst({
            where: { slug, isActive: true },
        });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        return category;
    }
    async getCategoryById(id) {
        const category = await this.prisma.serviceCategory.findUnique({
            where: { id },
        });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        return category;
    }
    async searchCategories(query) {
        if (!query || query.length < 2) {
            throw new common_1.BadRequestException('Search query must be at least 2 characters');
        }
        return this.prisma.serviceCategory.findMany({
            where: {
                isActive: true,
                name: { contains: query, mode: 'insensitive' },
            },
            orderBy: { displayOrder: 'asc' },
            take: 20,
        });
    }
    async getCategoryProviders(categoryId, page = 1, limit = 10) {
        const category = await this.prisma.serviceCategory.findUnique({
            where: { id: categoryId },
        });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        const skip = (page - 1) * limit;
        const where = {
            categoryId,
            provider: {
                user: {
                    role: 'PROVIDER',
                    isActive: true,
                    status: 'ACTIVE',
                    verificationStatus: 'APPROVED',
                },
            },
        };
        const [relations, total] = await Promise.all([
            this.prisma.providerServiceCategory.findMany({
                where,
                skip,
                take: limit,
                include: {
                    provider: {
                        include: {
                            user: {
                                include: { city: true, ratingSummary: true },
                            },
                        },
                    },
                },
                orderBy: { provider: { user: { fullName: 'asc' } } },
            }),
            this.prisma.providerServiceCategory.count({ where }),
        ]);
        const providers = relations.map((r) => ({
            id: r.provider.user.id,
            fullName: r.provider.user.fullName,
            profilePhoto: r.provider.user.profilePhoto,
            bio: r.provider.bio,
            hourlyRate: r.provider.hourlyRate,
            serviceLocation: r.provider.serviceLocation,
            serviceRadius: r.provider.serviceRadius,
            city: r.provider.user.city,
            rating: r.provider.user.ratingSummary?.averageRating ?? 0,
            totalReviews: r.provider.user.ratingSummary?.totalReviews ?? 0,
        }));
        const totalPages = Math.ceil(total / limit);
        return {
            data: providers,
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
    async getAvailableCategories() {
        return this.prisma.serviceCategory.findMany({
            where: { isActive: true },
            orderBy: { displayOrder: 'asc' },
        });
    }
    async selectProviderCategories(userId, categoryIds) {
        const categories = await this.prisma.serviceCategory.findMany({
            where: {
                id: { in: categoryIds },
                isActive: true,
            },
        });
        if (categories.length !== categoryIds.length) {
            throw new common_1.BadRequestException('One or more categories are invalid or inactive');
        }
        const uniqueIds = new Set(categoryIds);
        if (uniqueIds.size !== categoryIds.length) {
            throw new common_1.BadRequestException('Duplicate category IDs are not allowed');
        }
        await this.prisma.providerServiceCategory.deleteMany({
            where: { providerId: userId },
        });
        if (categoryIds.length > 0) {
            await this.prisma.providerServiceCategory.createMany({
                data: categoryIds.map((catId) => ({
                    providerId: userId,
                    categoryId: catId,
                })),
            });
        }
        this.logger.log({
            message: 'Provider categories updated',
            userId,
            categoryCount: categoryIds.length,
        });
        return { message: 'Categories updated successfully', categoryIds };
    }
    async getProviderSelectedCategories(userId) {
        const relations = await this.prisma.providerServiceCategory.findMany({
            where: { providerId: userId },
            include: { category: true },
        });
        return relations.map((r) => r.category);
    }
    async createCategory(dto) {
        const slug = this.generateSlug(dto.name);
        const uniqueSlug = await this.ensureUniqueSlug(slug);
        const existingName = await this.prisma.serviceCategory.findFirst({
            where: { name: { equals: dto.name, mode: 'insensitive' } },
        });
        if (existingName) {
            throw new common_1.ConflictException('A category with this name already exists');
        }
        const category = await this.prisma.serviceCategory.create({
            data: {
                name: dto.name,
                slug: uniqueSlug,
                description: dto.description,
                icon: dto.icon,
                displayOrder: dto.displayOrder ?? 0,
                isActive: dto.isActive ?? true,
            },
        });
        this.logger.log({
            message: 'Category created',
            categoryId: category.id,
            name: category.name,
        });
        return category;
    }
    async updateCategory(id, dto) {
        const existing = await this.prisma.serviceCategory.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Category not found');
        }
        if (dto.name) {
            const duplicateName = await this.prisma.serviceCategory.findFirst({
                where: {
                    name: { equals: dto.name, mode: 'insensitive' },
                    id: { not: id },
                },
            });
            if (duplicateName) {
                throw new common_1.ConflictException('A category with this name already exists');
            }
        }
        let slug = dto.slug;
        if (dto.name && !dto.slug) {
            slug = this.generateSlug(dto.name);
        }
        if (slug) {
            const uniqueSlug = await this.ensureUniqueSlug(slug, id);
            slug = uniqueSlug;
            const duplicateSlug = await this.prisma.serviceCategory.findFirst({
                where: { slug, id: { not: id } },
            });
            if (duplicateSlug) {
                throw new common_1.ConflictException('A category with this slug already exists');
            }
        }
        const updated = await this.prisma.serviceCategory.update({
            where: { id },
            data: {
                ...(dto.name !== undefined && { name: dto.name }),
                ...(slug !== undefined && { slug }),
                ...(dto.description !== undefined && { description: dto.description }),
                ...(dto.icon !== undefined && { icon: dto.icon }),
                ...(dto.isActive !== undefined && { isActive: dto.isActive }),
                ...(dto.displayOrder !== undefined && {
                    displayOrder: dto.displayOrder,
                }),
            },
        });
        this.logger.log({
            message: 'Category updated',
            categoryId: id,
        });
        return updated;
    }
    async deleteCategory(id) {
        const existing = await this.prisma.serviceCategory.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Category not found');
        }
        await this.prisma.serviceCategory.update({
            where: { id },
            data: { isActive: false },
        });
        this.logger.log({
            message: 'Category soft-deleted',
            categoryId: id,
            name: existing.name,
        });
        return { message: 'Category deleted successfully' };
    }
    async toggleCategoryStatus(id) {
        const existing = await this.prisma.serviceCategory.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Category not found');
        }
        const updated = await this.prisma.serviceCategory.update({
            where: { id },
            data: { isActive: !existing.isActive },
        });
        return updated;
    }
    async reorderCategories(dto) {
        const categories = await this.prisma.serviceCategory.findMany({
            where: { id: { in: dto.categoryIds } },
            select: { id: true },
        });
        if (categories.length !== dto.categoryIds.length) {
            throw new common_1.BadRequestException('One or more category IDs are invalid');
        }
        await this.prisma.$transaction(dto.categoryIds.map((id, index) => this.prisma.serviceCategory.update({
            where: { id },
            data: { displayOrder: index + 1 },
        })));
        return { message: 'Categories reordered successfully' };
    }
    async getCategoryStats(id) {
        const existing = await this.prisma.serviceCategory.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Category not found');
        }
        const [totalProviders, activeProviders, totalJobs, completedJobs] = await Promise.all([
            this.prisma.providerServiceCategory.count({
                where: { categoryId: id },
            }),
            this.prisma.providerServiceCategory.count({
                where: {
                    categoryId: id,
                    provider: {
                        user: {
                            isActive: true,
                            verificationStatus: 'APPROVED',
                        },
                    },
                },
            }),
            this.prisma.job.count({
                where: { categoryId: id },
            }),
            this.prisma.job.count({
                where: { categoryId: id, status: 'COMPLETED' },
            }),
        ]);
        return {
            categoryId: id,
            categoryName: existing.name,
            totalProviders,
            activeProviders,
            totalJobs,
            completedJobs,
        };
    }
    async adminListCategories(query) {
        const { page = 1, limit = 10, search, sortBy = category_query_dto_1.CategorySortField.DISPLAY_ORDER, sortOrder = 'asc', isActive, } = query;
        const skip = (page - 1) * limit;
        const where = {
            ...(search && {
                name: { contains: search, mode: 'insensitive' },
            }),
            ...(isActive !== undefined && {
                isActive: isActive === 'true',
            }),
        };
        const orderByField = sortBy === category_query_dto_1.CategorySortField.NAME
            ? 'name'
            : sortBy === category_query_dto_1.CategorySortField.CREATED_AT
                ? 'createdAt'
                : 'displayOrder';
        const [categories, total] = await Promise.all([
            this.prisma.serviceCategory.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [orderByField]: sortOrder },
            }),
            this.prisma.serviceCategory.count({ where }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            data: categories,
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
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        nestjs_pino_1.Logger])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map