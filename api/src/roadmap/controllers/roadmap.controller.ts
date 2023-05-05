import { Controller, Get, Query, Request } from '@nestjs/common';
import { RoadmapService } from '../roadmap.service';
import { Roles } from 'src/auth/rbac/roles.decorator';
import { Role } from 'src/auth/rbac/role.enum';
import { QueryPositionDto } from '../validation/QueryPositionDto';

@Controller('roadmap')
export class RoadmapController {
    constructor(private roadmapService: RoadmapService){}
    
    // @Roles(Role.Admin, Role.User)
    @Get()
    get(@Query() query: QueryPositionDto) {
        const { positionId } = query;
        console.log(positionId);
        
        return this.roadmapService.get();
    }
}
