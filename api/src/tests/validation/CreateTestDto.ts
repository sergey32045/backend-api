import {IsInt, IsNotEmpty, MaxLength} from 'class-validator';

export class CreateTestDto {
  @IsNotEmpty()
  @IsInt()
  test_category_id: number;

  @IsNotEmpty()
  @MaxLength(2000)
  description: string;

  @IsNotEmpty()
  @MaxLength(1000)
  title: string;
}
