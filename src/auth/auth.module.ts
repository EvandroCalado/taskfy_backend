import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [CommonModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, PrismaService, JwtStrategy],
})
export class AuthModule {}
