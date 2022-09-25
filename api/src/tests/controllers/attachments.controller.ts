import { AttachmentsService } from '../attachments.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Roles } from '../../auth/rbac/roles.decorator';
import { Role } from '../../auth/rbac/role.enum';
import { CreateAttachmentDto } from '../validation/CreateAttachmentDto';
import { Attachment } from '../models/attachment.entity';

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
