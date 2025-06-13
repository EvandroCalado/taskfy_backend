import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { PomodoroController } from './pomodoro.controller';
import { PomodoroService } from './pomodoro.service';

@Module({
  controllers: [PomodoroController],
  providers: [PomodoroService, PrismaService],
})
export class PomodoroModule {}
