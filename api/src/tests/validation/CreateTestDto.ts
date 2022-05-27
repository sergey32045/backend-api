import {IsInt, IsNotEmpty, MaxLength} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateTestDto {
  @ApiProperty({ example: 1, description: 'Test category' })
  @IsNotEmpty()
  @IsInt()
  test_category_id: number;

  @ApiProperty({ example: 'Javascript test description', description: 'Test description' })
  @IsNotEmpty()
  @MaxLength(2000)
  description: string;

  @ApiProperty({ example: 'Javascript test title', description: 'Test title' })
  @IsNotEmpty()
  @MaxLength(1000)
  title: string;
}
