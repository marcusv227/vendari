import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CreateCartItemDto } from '../dtos/create-cart-item.dto';
import { UpdateCartItemDto } from '../dtos/update-cart-item.dto';

@Injectable()
export class CartItemService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdate(userId: number, dto: Omit<CreateCartItemDto, 'cartId'>) {
    const cart = await this.prisma.cart.findFirst({
      where: { userId },
    });
  
    if (!cart) {
      throw new Error('Carrinho não encontrado para o usuário');
    }
  
    const existing = await this.prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: dto.productId,
      },
    });
  
    if (existing) {
      return this.prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + dto.quantity },
      });
    }
  
    return this.prisma.cartItem.create({
      data: {
        productId: dto.productId,
        quantity: dto.quantity,
        cartId: cart.id,
      },
    });
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
}
