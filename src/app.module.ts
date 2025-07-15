import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './modules/database/database.module';
import { OfficesModule } from './modules/offices/offices.module';

import { AuthGuard, RolesGuard } from './shared/guards';
import { CalculatorModule } from './modules/calculator/calculator.module';
import { PrecatoriesModule } from './modules/precatories/precatories.module';
import { ClientsModule } from './modules/clients/clients.module';
import { RestituitionModule } from './modules/restituition/restituition.module';
import { ProcessesModule } from './modules/processes/processes.module';
import { DocumentsModule } from './modules/documents/documents.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        UsersModule,
        DatabaseModule,
        OfficesModule,
        CalculatorModule,
        PrecatoriesModule,
        ClientsModule,
        RestituitionModule,
        ProcessesModule,
        DocumentsModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class AppModule { }
