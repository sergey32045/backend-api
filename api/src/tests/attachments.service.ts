import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Attachment } from './models/attachment.entity';
import { CreateAttachmentDto } from './validation/CreateAttachmentDto';

@Injectable()
export class AttachmentsService {
  constructor(
    @InjectRepository(Attachment)
    private attachmentRepository: Repository<Attachment>,
  ) {}

  async create(data: CreateAttachmentDto) {
    return this.attachmentRepository.save(data);
  }
}
