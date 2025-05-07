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

  create(userId: number) {
    return this.prisma.cart.create({ data: { userId } });
  }
}
