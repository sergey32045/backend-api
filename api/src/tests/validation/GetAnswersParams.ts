import { IsNumberString, IsOptional } from 'class-validator';

export class GetAnswersParams {
  @IsNumberString()
  testid: number;

  @IsNumberString()
  questionid: number;

  @IsOptional()
  @IsNumberString()
  id: number;
}
