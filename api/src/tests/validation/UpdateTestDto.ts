import { IsBoolean, IsInt, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTestDto {
  @ApiProperty({ example: 1, description: 'Test category' })
  @IsInt()
  test_category_id: number;

  @ApiProperty({
    example: 'Javascript test description',
    description: 'Test description',
  })
  @MaxLength(2000)
  description: string;

  @ApiProperty({ example: 'Javascript test title', description: 'Test title' })
  @MaxLength(1000)
  title: string;
}
