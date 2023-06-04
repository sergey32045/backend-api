import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreateComplexityLevelDto {
  @ApiProperty({
    example: 'Senior Backend Developer',
    description: "Complexity level's name",
  })
  @MaxLength(100)
  title: string;
}
