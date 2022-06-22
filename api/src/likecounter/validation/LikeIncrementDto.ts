import { IsOptional, IsString, Length, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SOURCE_TYPES } from '../types';

export class LikeIncrementDto {
  @ApiProperty({
    example: 'John',
    description: 'Name of a user',
  })
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty({
    example: 'promo',
    description: 'a type of content what user likes',
  })
  @IsString()
  @Length(1, 10)
  @IsEnum(SOURCE_TYPES)
  source: string;
}
