import { Controller, Get } from '@nestjs/common';
import { BootstrapService } from './bootstrap.service';
import { Public } from 'src/shared/decorators';
import { Ok } from 'src/shared/responses';

@Public()
@Controller('bootstrap')
export class BootstrapController {
    constructor(private readonly bootstrapService: BootstrapService) { }

    @Get()
    async bootstrap() {
        await this.bootstrapService.bootstrap();

        return new Ok({ message: 'Banco inicializado com sucesso.' })
    }
}
