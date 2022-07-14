import { IsInt, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { toNumber } from '../../common/validation.helper';

export class CreateCategoryDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'javascript', description: 'Category name' })
  name: string;

  @ApiProperty({ example: 1, description: 'Parent category ID' })
  @Transform(({ value }) => +value)
  @IsOptional()
  @IsInt()
  parent_id: number;

  @IsNotEmpty()
  @MaxLength(1000)
  @ApiProperty({ example: 'Javascript', description: 'Category title' })
  title: string;

  @IsNotEmpty()
  @MaxLength(2000)
  @ApiProperty({
    example: 'Description category',
    description: 'Description category',
  })
  description: string;
}
