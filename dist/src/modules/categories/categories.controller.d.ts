import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { CategoryQueryDto } from './dtos/category-query.dto';
import { ReorderCategoriesDto } from './dtos/reorder-categories.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
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
    searchCategories(q: string): Promise<{
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
    getCategoryProviders(id: string, pagination: PaginationDto): Promise<{
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
}
export declare class ProviderCategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
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
    getMyCategories(userId: string): Promise<{
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
    selectCategories(userId: string, body: {
        categoryIds: string[];
    }): Promise<{
        message: string;
        categoryIds: string[];
    }>;
    updateCategories(userId: string, body: {
        categoryIds: string[];
    }): Promise<{
        message: string;
        categoryIds: string[];
    }>;
}
export declare class AdminCategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    listAllCategories(query: CategoryQueryDto): Promise<{
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
}
