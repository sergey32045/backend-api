import * as AWS from 'aws-sdk';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3FileService {
  constructor(private readonly configService: ConfigService) {}

  async generatePreSignedPutUrl(fileName, fileType) {
    AWS.config.update({
      accessKeyId: this.configService.get<string>('aws.accessKeyId'),
      secretAccessKey: this.configService.get<string>('aws.secretAccessKey'),
    });

    const S3_BUCKET = 'interviewboom-filestorage';
    const REGION = 'eu-central-1';
    const URL_EXPIRATION_TIME = 60; // in seconds

    const myBucket = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });
    return myBucket.getSignedUrl('putObject', {
      Key: fileName,
      ContentType: fileType,
      Expires: URL_EXPIRATION_TIME,
    });
  }
}
