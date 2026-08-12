import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.city.findMany({
      orderBy: { name: "asc" },
    });
  }

  async getById(id: string) {
    const city = await this.prisma.city.findUnique({
      where: { id },
    });

    if (!city) {
      throw new NotFoundException("City not found");
    }

    return city;
  }
}
