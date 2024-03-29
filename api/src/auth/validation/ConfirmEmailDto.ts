import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmEmailDto {
  @ApiProperty({ example: 'token string' })
  @IsString()
  @IsNotEmpty()
  token: string;
}
