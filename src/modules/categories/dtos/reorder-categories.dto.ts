import { IsArray, IsUUID, ArrayMinSize, ArrayMaxSize } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ReorderCategoriesDto {
  @ApiProperty({
    description: "Array of category IDs in the desired display order",
    example: ["uuid-1", "uuid-2", "uuid-3"],
    type: [String],
  })
  @IsArray()
  @IsUUID("4", { each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  categoryIds: string[];
}
