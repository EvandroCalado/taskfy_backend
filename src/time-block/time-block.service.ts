import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateTimeBlockDto } from './dto/create-time-block.dto';
import { UpdateTimeBlockDto } from './dto/update-time-block.dto';

@Injectable()
export class TimeBlockService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createTimeBlockDto: CreateTimeBlockDto, userId: string) {
    return this.prismaService.timeBlock.create({
      data: {
        ...createTimeBlockDto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  findAll(userId: string) {
    return this.prismaService.timeBlock.findMany({
      where: { userId },
      orderBy: { order: 'asc' },
    });
  }

  update(
    updateTimeBlockDto: UpdateTimeBlockDto,
    timeBlockId: string,
    userId: string,
  ) {
    return this.prismaService.timeBlock.update({
      where: { id: timeBlockId, userId },
      data: updateTimeBlockDto,
    });
  }

  updateOrder(ids: string[]) {
    return this.prismaService.$transaction(
      ids.map((id, order) =>
        this.prismaService.timeBlock.update({
          where: { id },
          data: { order },
        }),
      ),
    );
  }

  remove(timeBlockId: string, userId: string) {
    return this.prismaService.timeBlock.delete({
      where: { id: timeBlockId, userId },
    });
  }
}
