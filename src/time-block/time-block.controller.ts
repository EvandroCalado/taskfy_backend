import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

import { CreateOrderDto } from './dto/create-order.dto';
import { CreateTimeBlockDto } from './dto/create-time-block.dto';
import { UpdateTimeBlockDto } from './dto/update-time-block.dto';
import { TimeBlockService } from './time-block.service';

@Auth()
@Controller('time-block')
export class TimeBlockController {
  constructor(private readonly timeBlocksService: TimeBlockService) {}

  @Post()
  create(
    @Body() createTimeBlockDto: CreateTimeBlockDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.timeBlocksService.create(createTimeBlockDto, userId);
  }

  @Get()
  findAll(@CurrentUser('id') userId: string) {
    return this.timeBlocksService.findAll(userId);
  }

  @Patch(':id')
  update(
    @Body() updateTimeBlockDto: UpdateTimeBlockDto,
    @Param('id', ParseUUIDPipe) timeBlockId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.timeBlocksService.update(
      updateTimeBlockDto,
      timeBlockId,
      userId,
    );
  }

  @Put('update-order')
  updateOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.timeBlocksService.updateOrder(createOrderDto.ids);
  }

  @Delete(':id')
  remove(@Param('id') timeBlockId: string, @CurrentUser('id') userId: string) {
    return this.timeBlocksService.remove(timeBlockId, userId);
  }
}
