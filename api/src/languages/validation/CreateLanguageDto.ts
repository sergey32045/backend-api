import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateLanguageDto {
  @ApiProperty({
    example: 'Ukrainian',
    description: 'Name of a language',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'uk',
    description: 'Code of a language',
  })
  @IsString()
  @Length(2)
  code: string;
}
