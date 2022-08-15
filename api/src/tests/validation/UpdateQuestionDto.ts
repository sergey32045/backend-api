import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateQuestionDto {
  @ApiProperty({ example: 'What is Javascript?', description: 'Text question' })
  @MaxLength(10000)
  @IsOptional()
  question: string;

  @ApiProperty({
    example: 'Title: What is Javascript?',
    description: 'Title question',
  })
  @IsOptional()
  @MaxLength(1000)
  title: string;

  @ApiProperty({ example: [1, 2, 3], description: 'Question labels' })
  @IsArray()
  @IsOptional()
  labelIds: number[];

  @ApiProperty({ example: [1, 2, 3], description: 'Test IDs' })
  @IsOptional()
  @IsArray()
  testIds: number[];

  @ApiProperty({ example: 1, description: 'Question level' })
  @IsInt()
  @IsOptional()
  level: number;

  @ApiProperty({ example: true, description: 'is multiselect question or not' })
  @IsBoolean()
  is_multiselect: boolean;
}
