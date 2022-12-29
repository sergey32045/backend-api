import {
  ArrayNotEmpty,
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
  @MaxLength(20000)
  question: string;

  @ApiProperty({
    example: 'Title: What is Javascript?',
    description: 'Title question',
  })
  @IsNotEmpty()
  @MaxLength(1000)
  title: string;

  @ApiProperty({ example: [1, 2, 3], description: 'Question labels' })
  @IsOptional()
  @IsArray()
  labels: number[];

  @ApiProperty({ example: [1, 2, 3], description: 'Test IDs' })
  @ArrayNotEmpty()
  @IsArray()
  testIds: number[];

  @ApiProperty({ example: [1, 2, 3], description: 'Question positions' })
  @IsOptional()
  @IsArray()
  positions: number[];

  @ApiProperty({ example: true, description: 'is multiselect question or not' })
  @IsBoolean()
  is_multiselect: boolean;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'File IDs',
  })
  @IsOptional()
  @IsArray()
  files: number[];
}
