import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { TaskController } from './tasks.controller';
import { TaskService } from './tasks.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, PrismaService],
})
export class TaskModule {}
