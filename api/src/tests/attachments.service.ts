import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Attachment } from './models';
import { CreateAttachmentDto } from './validation/CreateAttachmentDto';
import * as AWS from 'aws-sdk';
import { UpdateQuestionDto } from './validation';

@Injectable()
export class AttachmentsService {
  constructor(
    @InjectRepository(Attachment)
    private attachmentRepository: Repository<Attachment>,
  ) {}

  async create(data: CreateAttachmentDto) {
    return this.attachmentRepository.save(data);
  }

  async updateQuestionAttachments(
    oldAttachments: Attachment[],
    data: UpdateQuestionDto,
  ): Promise<void> {
    if (!data.files) {
      return;
    }
    const attachments = await this.attachmentRepository.find({
      where: { id: In(data.files) },
    });

    const removeAttachmentsFromS3 = oldAttachments.filter(
      ({ id: id1 }) => !attachments.some(({ id: id2 }) => id2 === id1),
    );

    if (removeAttachmentsFromS3.length > 0) {
      const objectsKeys = removeAttachmentsFromS3.map((attachment) => {
        return { Key: attachment.url.split('/').reverse()[0] };
      });

      const myBucket = new AWS.S3({
        region: 'eu-central-1',
      });
      await new Promise((res, rej) => {
        myBucket.deleteObjects(
          {
            Bucket: 'interviewboom-filestorage',
            Delete: {
              Objects: objectsKeys,
            },
          },
          (err, data) => {
            if (err) {
              return rej(err);
            }
            res(data);
          },
        );
      });
    }
  }
}
