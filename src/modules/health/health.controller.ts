import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { Public } from 'src/shared/decorators';

@Public()
@Controller('health')
export class HealthController {
    constructor(private readonly healthService: HealthService) { }

    @Get()
    health() {
        return this.healthService.health();
    }
}
