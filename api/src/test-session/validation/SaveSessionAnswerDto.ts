import { IsArray, IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaveSessionAnswerDto {
  @ApiProperty({
    example: [1, 2, 3],
    description: 'Answer IDs',
  })
  @IsArray()
  @IsOptional()
  answerIds: number[];

  @ApiProperty({ example: 1, description: 'Question ID' })
  @IsInt()
  questionId: number;
}
