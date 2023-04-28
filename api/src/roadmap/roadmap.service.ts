import { Injectable } from '@nestjs/common';

@Injectable()
export class RoadmapService {
  get(): string {
    return 'hi';
  }
}
