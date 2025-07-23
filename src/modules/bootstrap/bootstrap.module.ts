import { Module } from '@nestjs/common';

import { BootstrapService } from './bootstrap.service';
import { BootstrapController } from './bootstrap.controller';
import { OfficesModule } from '../offices/offices.module';
import { UsersModule } from '../users/users.module';

@Module({
    controllers: [BootstrapController],
    providers: [BootstrapService],
    imports: [
        OfficesModule,
        UsersModule,
    ]
})
export class BootstrapModule { }
