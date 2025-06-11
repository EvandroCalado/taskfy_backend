import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Priority } from 'generated/prisma';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;

  @IsEnum(Priority)
  @IsOptional()
  @Transform(({ value }) => value as Priority)
  priority?: Priority;
}
