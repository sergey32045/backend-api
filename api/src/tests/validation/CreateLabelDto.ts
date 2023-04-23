import { ApiProperty } from '@nestjs/swagger';
import { IsInt, MaxLength } from 'class-validator';

export class CreateLabelDto {
  @ApiProperty({
    example: 'JS prototypes',
    description: 'Touched topics',
  })
  @MaxLength(100)
  title: string;

  @ApiProperty({ example: 1, description: 'Test category' })
  @IsInt()
  category_id: number;
}
