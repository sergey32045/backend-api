import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryLabelsDto {
  @ApiProperty({ example: 1, description: 'Test category ID' })
  @IsOptional()
  categoryId: number;
}
