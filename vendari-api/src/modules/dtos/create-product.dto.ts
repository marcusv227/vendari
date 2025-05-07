import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty({ example: 'Nome do Produto', description: 'Nome do produto' })
    name: string;
    @ApiProperty({ example: 'Descrição do Produto', description: 'Descrição do produto' })
    description: string;
    @ApiProperty({ example: 100, description: 'Preço do produto' })
    price: number;
    @ApiProperty({ example: 'https://example.com/image.jpg', description: 'URL da imagem do produto' })
    imageUrl: string;
}
