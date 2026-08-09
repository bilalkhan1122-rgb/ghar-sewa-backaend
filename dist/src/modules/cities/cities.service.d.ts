import { PrismaService } from 'src/prisma/prisma.service';
export declare class CitiesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getById(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
