import { IsArray, IsUUID, ArrayMinSize, ArrayMaxSize } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ReorderSubcategoriesDto {
  @ApiProperty({
    description:
      "Subcategory IDs in the desired display order. Must be every " +
      "subcategory of the parent category, so a stale client cannot drop one " +
      "out of the ordering.",
    example: ["uuid-1", "uuid-2", "uuid-3"],
    type: [String],
  })
  @IsArray()
  @IsUUID("4", { each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  subcategoryIds: string[];
}
