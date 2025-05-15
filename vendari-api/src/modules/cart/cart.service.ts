import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  findByUser(userId: number) {
    return this.prisma.cart.findFirst({
      where: { userId },
      include: { items: { include: { product: true } } },
    });
  }

  async getOrCreateCart(userId: number) {
    let cart = await this.prisma.cart.findFirst({
      where: { userId },
      include: { items: { include: { product: true } } },
    });
  
    if (!cart) {
      await this.prisma.cart.create({
        data: { userId },
      });
  
      cart = await this.prisma.cart.findFirst({
        where: { userId },
        include: { items: { include: { product: true } } },
      });
    }
  
    return cart;
  }

  async clearCart(userId: number) {
    const cart = await this.prisma.cart.findFirst({
      where: { userId },
    });

    if (!cart) {
      throw new Error('Carrinho não encontrado para o usuário');
    }

    await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return cart;
  }
}
