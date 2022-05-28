import {IsInt, IsNumber, IsOptional} from "class-validator";
import {Transform} from "class-transformer";
import {toNumber} from "../../common/validation.helper";
import {ApiProperty} from "@nestjs/swagger";

export class QueryTestsDto {

    @ApiProperty({ example: 20 })
    @Transform(({ value }) => toNumber(value, { default: 20, min: 1 }))
    @IsNumber()
    @IsOptional()
    limit: number = 20

    @ApiProperty({ example: 1 })
    @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
    @IsNumber()
    @IsOptional()
    page: number = 1

    @ApiProperty({ example: 1, description: 'Test category ID' })
    @IsOptional()
    categoryId: number
}