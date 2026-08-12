import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CitiesService } from "./cities.service";
import { Public } from "src/common/decorators/public.decorator";

@ApiTags("Cities")
@Controller("cities")
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Public()
  @Get()
  async getAll() {
    return this.citiesService.getAll();
  }

  @Public()
  @Get(":id")
  async getById(@Param("id") id: string) {
    return this.citiesService.getById(id);
  }
}
