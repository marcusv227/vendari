import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersService } from 'src/modules/users/users.service';
import { JwtStrategy } from './jwt.strategy';
import { PrismaModule } from 'src/shared/database/prisma.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'yourSecretKey',
      signOptions: { expiresIn: '60m' },
    }),
    PrismaModule
  ],
  providers: [AuthService, UsersService, JwtStrategy],
  controllers:[AuthController],
  exports: [AuthService],
})
export class AuthModule {}
