import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StartSessionDto {
  @ApiProperty({ example: 1, description: 'Test ID' })
  @IsInt()
  testId: number;
}
