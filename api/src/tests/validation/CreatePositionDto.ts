import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreatePositionDto {
  @ApiProperty({
    example: 'Senior Backend Developer',
    description: "Position's name",
  })
  @MaxLength(100)
  title: string;
}
