import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { UpdatePomodoroDto } from './dto/update-pomodoro.dto';

@Injectable()
export class PomodoroService {
  constructor(private readonly prismaService: PrismaService) {}

  getTodaySession(userId: string) {
    const today = new Date().toISOString().split('T')[0];

    return this.prismaService.pomodoroSession.findFirst({
      where: {
        userId,
        createdAt: {
          gte: new Date(today),
        },
      },
      include: {
        pomodoroRounds: {
          orderBy: {
            updatedAt: 'desc',
          },
        },
      },
    });
  }

  async create(userId: string) {
    const todaySession = await this.getTodaySession(userId);

    if (todaySession) return todaySession;

    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        intervalCount: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prismaService.pomodoroSession.create({
      data: {
        pomodoroRounds: {
          createMany: {
            data: Array.from({ length: user.intervalCount ?? 0 }, () => ({
              totalSeconds: 0,
            })),
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        pomodoroRounds: true,
      },
    });
  }

  update(
    updatePomodoroDto: UpdatePomodoroDto,
    pomodoroId: string,
    userId: string,
  ) {
    return this.prismaService.pomodoroSession.update({
      where: {
        id: pomodoroId,
        userId,
      },
      data: updatePomodoroDto,
    });
  }

  updateRound(
    updatePomodoroRoundDto: UpdatePomodoroDto,
    pomodoroRoundId: string,
  ) {
    return this.prismaService.pomodoroRound.update({
      where: {
        id: pomodoroRoundId,
      },
      data: updatePomodoroRoundDto,
    });
  }

  delete(pomodoroId: string, userId: string) {
    return this.prismaService.pomodoroSession.delete({
      where: {
        id: pomodoroId,
        userId,
      },
    });
  }
}
