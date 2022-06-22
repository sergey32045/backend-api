import { IsString, Length, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SOURCE_TYPES } from '../types';

export class LikeQueryDto {
  @ApiProperty({
    example: 'promo',
    description: 'a type of content what user likes',
  })
  @IsString()
  @Length(1, 10)
  @IsEnum(SOURCE_TYPES)
  source: string;
}
