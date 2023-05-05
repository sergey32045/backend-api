import { Injectable } from '@nestjs/common';

@Injectable()
export class RoadmapService {
  get(): object {
    
    return {
      'd': 'hi'
    };
  }
}
