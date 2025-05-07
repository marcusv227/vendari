import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService
  ) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const userData = { ...data, password: hashedPassword}

    return this.prisma.user.create({ data: userData });
  }

  async delete(id: number): Promise<User>{
    return this.prisma.user.delete({ where: { id } })
  }

  async edit(id: number, editUser: UpdateUserDto): Promise<User>{
    const user = await this.prisma.user.findUnique({where: {id}})

    if (!user) {
      throw new NotFoundException("Usuário não encontrado.")
    }
    if(editUser.password) {
      const salt = await bcrypt.genSalt(10)
      editUser.password = await bcrypt.hash(editUser.password, salt)
    }

    Object.assign(user, editUser);
    return this.prisma.user.update({where: {id}, data: editUser})
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
