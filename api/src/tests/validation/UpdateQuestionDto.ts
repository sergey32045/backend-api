import {IsArray, IsInt, IsNotEmpty, IsOptional, MaxLength} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class UpdateQuestionDto {

  @ApiProperty({ example: 'What is Javascript?', description: 'Text question' })
  @MaxLength(5000)
  @IsOptional()
  question: string;

  @ApiProperty({ example: [1, 2, 3], description: 'Question labels' })
  @IsArray()
  @IsOptional()
  labelIds: number[];

  @ApiProperty({ example: 1, description: 'Question level' })
  @IsInt()
  @IsOptional()
  level: number;
}
