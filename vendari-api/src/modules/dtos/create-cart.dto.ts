import { ApiProperty } from "@nestjs/swagger";

export class CreateCartDto {
    @ApiProperty({ example: 1 })
    userId: number;
  }
  