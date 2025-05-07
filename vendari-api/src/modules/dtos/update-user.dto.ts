import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'Nome do usuário' })
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'E-mail do usuário' })
  email: string;

  @ApiProperty({ example: '12345678', description:'Senha do usuário'})
  password: string;
}
