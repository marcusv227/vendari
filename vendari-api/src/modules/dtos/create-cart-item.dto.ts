import { ApiProperty } from "@nestjs/swagger";

export class CreateCartItemDto {
    @ApiProperty({ example: 1 })
    cartId: number;
    @ApiProperty({ example: 1 })
    productId: number;
    @ApiProperty({ example: 2 })
    quantity: number;
  }
  