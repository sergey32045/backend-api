import { IsBoolean, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAnswerDto {
  @ApiProperty({
    example: 'Javascript is programming language',
    description: 'Text answer',
  })
  @IsOptional()
  @MaxLength(5000)
  answer: string;

  @ApiProperty({ example: true, description: 'is correct answer or not' })
  @IsBoolean()
  isCorrect: boolean;
}
