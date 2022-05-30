import {IsArray, IsInt, IsNotEmpty, MaxLength} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateQuestionDto {

  @ApiProperty({ example: 'What is Javascript?', description: 'Text question' })
  @IsNotEmpty()
  @MaxLength(5000)
  question: string;

  @ApiProperty({ example: [1, 2, 3], description: 'Question labels' })
  @IsNotEmpty()
  @IsArray()
  labelIds: number[];

  @ApiProperty({ example: 1, description: 'Question level' })
  @IsNotEmpty()
  @IsInt()
  level: number;
}
