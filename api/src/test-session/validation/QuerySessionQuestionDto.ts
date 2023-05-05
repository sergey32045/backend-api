import { IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QuerySessionQuestionDto {
  @ApiProperty({ example: [1, 2, 3], description: 'Question IDs' })
  @IsOptional()
  @IsArray()
  excludeQuestionIDs: string[];
}
