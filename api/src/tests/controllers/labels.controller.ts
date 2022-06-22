import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { TestService } from '../test.service';
import { Label } from '../models/label.entity';

@Controller('labels')
export class LabelsController {
  constructor(private testService: TestService) {}

  @ApiResponse({
    status: 201,
    description: 'The found record',
    type: Label,
  })
  @Post()
  async create(@Body() data: { title: string }) {
    return this.testService.createLabel(data);
  }
}
