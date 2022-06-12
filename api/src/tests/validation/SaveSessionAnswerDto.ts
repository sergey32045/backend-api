import { IsBoolean, IsInt, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class AnswerListDto {
  @IsBoolean()
  is_correct: boolean;

  @IsInt()
  id: number;
}

export class SaveSessionAnswerDto {
  @ApiProperty({
    example: [{ id: 3, is_correct: true }],
    description: 'Answers',
  })
  @ValidateNested({ each: true })
  @Type(() => AnswerListDto)
  answers: AnswerListDto[];

  @ApiProperty({ example: 1, description: 'Question ID' })
  @IsInt()
  questionId: number;
}
