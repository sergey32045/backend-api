import { IsNumberString, IsOptional } from 'class-validator';

export class GetQuestionsParams {
  @IsNumberString()
  testid: number;

  @IsOptional()
  @IsNumberString()
  id: number;
}
