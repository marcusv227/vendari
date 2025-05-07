import { ApiProperty } from "@nestjs/swagger";

export class UpdateCartItemDto {
    @ApiProperty({ example: 1 })
    quantity: number;
  }
  