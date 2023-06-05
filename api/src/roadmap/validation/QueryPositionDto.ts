import { ApiProperty } from '@nestjs/swagger';

export class QueryPositionDto {
  @ApiProperty({
    example: 1,
    description: 'Position ID',
  })
  complexityLevelId: number;
}
