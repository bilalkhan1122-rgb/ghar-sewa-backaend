import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { CategoryQueryDto } from './dtos/category-query.dto';
import { ReorderCategoriesDto } from './dtos/reorder-categories.dto';
import { Logger } from 'nestjs-pino';
export declare class CategoriesService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService, logger: Logger);
    private generateSlug;
    private ensureUniqueSlug;
    listActiveCategories(query: CategoryQueryDto): Promise<{
        data: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            slug: string;
            description: string | null;
            icon: string | null;
            displayOrder: number;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNext: boolean;
            hasPrevious: boolean;
        };
    }>;
    getCategoryBySlug(slug: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        slug: string;
        description: string | null;
        icon: string | null;
        displayOrder: number;
    }>;
    getCategoryById(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        slug: string;
        description: string | null;
        icon: string | null;
        displayOrder: number;
    }>;
    searchCategories(query: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        slug: string;
        description: string | null;
        icon: string | null;
        displayOrder: number;
    }[]>;
    getCategoryProviders(categoryId: string, page?: number, limit?: number): Promise<{
        data: {
            id: string;
            fullName: string;
            profilePhoto: string | null;
            bio: string | null;
            hourlyRate: import("@prisma/client/runtime/library").Decimal | null;
            serviceLocation: string | null;
            serviceRadius: number | null;
            city: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
            };
            rating: number | import("@prisma/client/runtime/library").Decimal;
            totalReviews: number;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNext: boolean;
            hasPrevious: boolean;
        };
    }>;
    getAvailableCategories(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        slug: string;
        description: string | null;
        icon: string | null;
        displayOrder: number;
    }[]>;
    selectProviderCategories(userId: string, categoryIds: string[]): Promise<{
        message: string;
        categoryIds: string[];
    }>;
    getProviderSelectedCategories(userId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        slug: string;
        description: string | null;
        icon: string | null;
        displayOrder: number;
    }[]>;
    createCategory(dto: CreateCategoryDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        slug: string;
        description: string | null;
        icon: string | null;
        displayOrder: number;
    }>;
    updateCategory(id: string, dto: UpdateCategoryDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        slug: string;
        description: string | null;
        icon: string | null;
        displayOrder: number;
    }>;
    deleteCategory(id: string): Promise<{
        message: string;
    }>;
    toggleCategoryStatus(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        slug: string;
        description: string | null;
        icon: string | null;
        displayOrder: number;
    }>;
    reorderCategories(dto: ReorderCategoriesDto): Promise<{
        message: string;
    }>;
    getCategoryStats(id: string): Promise<{
        categoryId: string;
        categoryName: string;
        totalProviders: number;
        activeProviders: number;
        totalJobs: number;
        completedJobs: number;
    }>;
    adminListCategories(query: CategoryQueryDto): Promise<{
        data: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            slug: string;
            description: string | null;
            icon: string | null;
            displayOrder: number;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNext: boolean;
            hasPrevious: boolean;
        };
    }>;
}
