import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthModule } from './auth/auth.module';
import { jwtConfig } from './auth/config/jwt.config';
import { PrismaModule } from './prisma/prisma.module';
import { TaskModule } from './task/tasks.module';
import { TimeBlockModule } from './time-block/time-block.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: jwtConfig,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    TaskModule,
    TimeBlockModule,
  ],
})
export class AppModule {}
