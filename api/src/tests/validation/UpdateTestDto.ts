import { IsInt, MaxLength } from 'class-validator';

export class UpdateTestDto {
  @IsInt()
  test_category_id: number;

  @MaxLength(2000)
  description: string;

  @MaxLength(1000)
  title: string;
}
