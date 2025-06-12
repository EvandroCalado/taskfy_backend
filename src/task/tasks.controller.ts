import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './tasks.service';

@Auth()
@Controller('tasks')
export class TaskController {
  constructor(private readonly tasksService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @CurrentUser('id') id: string) {
    return this.tasksService.create(createTaskDto, id);
  }

  @Get()
  findAll(@CurrentUser('id') id: string) {
    return this.tasksService.findAll(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.tasksService.update(updateTaskDto, id, userId);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.remove(id);
  }
}
