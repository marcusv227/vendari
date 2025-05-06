import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './shared/database/prisma.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule],
})
export class AppModule {}
