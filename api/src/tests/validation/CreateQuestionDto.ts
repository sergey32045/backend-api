import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty({ example: 'What is Javascript?', description: 'Text question' })
  @IsNotEmpty()
  @MaxLength(5000)
  question: string;

  @ApiProperty({ example: [1, 2, 3], description: 'Question labels' })
  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  labelIds: number[];

  @ApiProperty({ example: 1, description: 'Question level' })
  @IsNotEmpty()
  @IsInt()
  level: number;

  @ApiProperty({ example: true, description: 'is multiselect question or not' })
  @IsBoolean()
  is_multiselect: boolean;
}
