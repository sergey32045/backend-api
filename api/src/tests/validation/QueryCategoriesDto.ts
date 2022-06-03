import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { toNumber } from '../../common/validation.helper';

export class QueryCategoriesDto {
  @Transform(({ value }) => toNumber(value, { default: 20, min: 1 }))
  @IsNumber()
  @IsOptional()
  limit: number = 20;

  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsNumber()
  @IsOptional()
  page: number = 1;
}
