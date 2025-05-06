import { ApiProperty } from '@nestjs/swagger';

export class loginDto {

  @ApiProperty({ example: 'john@example.com', description: 'E-mail do usuário' })
  email: string;

  @ApiProperty({ example: '12345678', description:'Senha do usuário'})
  password: string;
}
