import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreateAttachmentDto {
  @ApiProperty({
    example: 'https://d1a7u89ovqchsz.cloudfront.net/1663013641094.png',
    description: 'url of a file',
  })
  @MaxLength(2000)
  url: string;
}
