import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTimeBlockDto {
  @IsString()
  name: string;

  @IsNumber()
  duration: number;

  @IsString()
  @IsOptional()
  color?: string;

  @IsNumber()
  @IsOptional()
  order?: number;
}
