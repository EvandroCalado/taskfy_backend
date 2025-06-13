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

import { UpdatePomodoroDto } from './dto/update-pomodoro.dto';
import { PomodoroService } from './pomodoro.service';

@Auth()
@Controller('pomodoro')
export class PomodoroController {
  constructor(private readonly pomodoroService: PomodoroService) {}

  @Get('today-session')
  getTodaySession(@CurrentUser('id') userId: string) {
    return this.pomodoroService.getTodaySession(userId);
  }

  @Post()
  create(@CurrentUser('id') userId: string) {
    return this.pomodoroService.create(userId);
  }

  @Patch()
  update(
    @Body() updatePomodoroDto: UpdatePomodoroDto,
    @Param('id', ParseUUIDPipe) pomodoroId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.pomodoroService.update(updatePomodoroDto, pomodoroId, userId);
  }

  @Patch('update-round/:id')
  updateRound(
    @Body() updatePomodoroRoundDto: UpdatePomodoroDto,
    @Param('id', ParseUUIDPipe) pomodoroRoundId: string,
  ) {
    return this.pomodoroService.updateRound(
      updatePomodoroRoundDto,
      pomodoroRoundId,
    );
  }

  @Delete(':id')
  delete(
    @Param('id', ParseUUIDPipe) pomodoroId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.pomodoroService.delete(pomodoroId, userId);
  }
}
