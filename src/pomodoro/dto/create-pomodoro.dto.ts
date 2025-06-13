import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreatePomodoroDto {
  @IsNumber()
  totalSeconds: number;

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}
