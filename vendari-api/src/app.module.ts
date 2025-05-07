import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './shared/database/prisma.module';
import { ProductsModule } from './modules/products/products.module';
import { CartModule } from './modules/cart/cart.module';
import { CartItemModule } from './modules/cart-item/cart-item.module';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    CartModule,
    CartItemModule, 
    PrismaModule, 
    AuthModule],
})
export class AppModule {}
