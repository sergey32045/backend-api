import { Injectable } from '@nestjs/common';

@Injectable()
export class RoadmapService {
  get(): string {
    console.log('here');
    
    return 'hi';
  }
}
