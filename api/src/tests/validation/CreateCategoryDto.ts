import {IsInt, IsNotEmpty, IsOptional, MaxLength} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateCategoryDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'javascript', description: 'Category name' })
  name: string;

  @IsInt()
  @ApiProperty({ example: 1, description: 'Parent category ID' })
  @IsOptional()
  parent_id: number;

  @IsNotEmpty()
  @MaxLength(1000)
  @ApiProperty({ example: 'Javascript', description: 'Category title' })
  title: string;
}
