import { Module } from '@nestjs/common';
import { CartItemController } from './cart-item.controller';
import { CartItemService } from './cart-item.service';
import { PrismaModule } from 'src/shared/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CartItemController],
  providers: [CartItemService],
})
export class CartItemModule {}
