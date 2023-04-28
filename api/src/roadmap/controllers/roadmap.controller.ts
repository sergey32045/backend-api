import { Controller, Get, Request } from '@nestjs/common';
import { RoadmapService } from '../roadmap.service';

@Controller()
export class RoadmapController {
    constructor(private roadmapService: RoadmapService){}
    
    @Get('roadmap')
    get(@Request() req) {
        this.roadmapService.get();
    }
}
