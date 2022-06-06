import { IsBoolean, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAnswerDto {
  @ApiProperty({
    example: 'Javascript is programming language',
    description: 'Text answer',
  })
  @IsNotEmpty()
  @MaxLength(5000)
  answer: string;

  @ApiProperty({ example: true, description: 'is correct answer or not' })
  @IsBoolean()
  isCorrect: boolean;
}
