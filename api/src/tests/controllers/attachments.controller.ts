import { AttachmentsService } from '../attachments.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Roles, Role } from '../../auth/rbac';
import { CreateAttachmentDto } from '../validation/CreateAttachmentDto';
import { Attachment } from '../models';

@Controller('attachments')
export class AttachmentsController {
  constructor(private attachmentsService: AttachmentsService) {}

  @ApiResponse({
    status: 201,
    description: 'The found record',
    type: Attachment,
  })
  @Roles(Role.Admin)
  @Post()
  async create(@Body() data: CreateAttachmentDto) {
    return this.attachmentsService.create(data);
  }
}
