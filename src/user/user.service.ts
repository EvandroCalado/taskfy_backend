import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { startOfDay, subDays } from 'date-fns';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';
import { HashingService } from 'src/common/hashing/hashing.service';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashingService: HashingService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await this.hashingService.hash(
        createUserDto.password,
      );

      const user = await this.prismaService.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
        omit: {
          password: true,
        },
      });

      return user;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('User already exists');
      }

      throw new InternalServerErrorException('Failed to create user');
    }
  }

  findById(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
      include: { tasks: true },
    });
  }

  findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async profile(id: string) {
    const profile = await this.findById(id);

    if (!profile) {
      throw new NotFoundException('User not found');
    }

    const totalTasks = profile.tasks.length;
    const completedTask = await this.prismaService.task.count({
      where: { userId: id, isCompleted: true },
    });

    const todayStart = startOfDay(new Date());
    const weekStart = startOfDay(subDays(new Date(), 7));

    const todayTasks = await this.prismaService.task.count({
      where: {
        userId: id,
        createdAt: {
          gte: todayStart.toISOString(),
        },
      },
    });

    const weekTasks = await this.prismaService.task.count({
      where: {
        userId: id,
        createdAt: {
          gte: weekStart.toISOString(),
        },
      },
    });

    return {
      user: {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        workInterval: profile.workInterval,
        breakInterval: profile.breakInterval,
        intervalCount: profile.intervalCount,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
      },
      statistics: [
        { label: 'Total tasks', value: totalTasks },
        { label: 'Completed tasks', value: completedTask },
        { label: 'Today tasks', value: todayTasks },
        { label: 'Week tasks', value: weekTasks },
      ],
    };
  }

  updateProfile(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
      select: {
        name: true,
        email: true,
      },
    });
  }
}
