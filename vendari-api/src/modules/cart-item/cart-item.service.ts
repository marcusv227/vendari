import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CreateCartItemDto } from '../dtos/create-cart-item.dto';
import { UpdateCartItemDto } from '../dtos/update-cart-item.dto';

@Injectable()
export class CartItemService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateCartItemDto) {
    return this.prisma.cartItem.create({ data: dto });
  }

  update(id: number, dto: UpdateCartItemDto) {
    return this.prisma.cartItem.update({
      where: { id },
      data: { quantity: dto.quantity },
    });
  }

  remove(id: number) {
    return this.prisma.cartItem.delete({ where: { id } });
  }

  findAll() {
    return this.prisma.cartItem.findMany();
  }
}
