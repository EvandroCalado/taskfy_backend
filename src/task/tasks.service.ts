import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from 'generated/prisma/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createTaskDto: CreateTaskDto, userId: string) {
    return this.prismaService.task.create({
      data: {
        ...createTaskDto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  findAll(userId: string) {
    return this.prismaService.task.findMany({
      where: {
        userId,
      },
    });
  }

  async update(updateTaskDto: UpdateTaskDto, taskId: string, userId: string) {
    try {
      const task = await this.prismaService.task.update({
        where: {
          id: taskId,
          userId,
        },
        data: updateTaskDto,
      });

      return task;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Task not found');
      }

      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException('Invalid task data');
      }

      throw new InternalServerErrorException('Failed to update task');
    }
  }

  remove(taskId: string) {
    return this.prismaService.task.delete({
      where: {
        id: taskId,
      },
    });
  }
}
