import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

import { PomodoroSettingsDto } from './pomodoro-settings.dto';

export class CreateUserDto extends PomodoroSettingsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
