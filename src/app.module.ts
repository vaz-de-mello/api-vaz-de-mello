import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './modules/database/database.module';
import { OfficesModule } from './modules/offices/offices.module';

import { AuthGuard, RolesGuard } from './shared/guards';
import { CalculatorModule } from './modules/calculator/calculator.module';
import { PrecatoriosModule } from './modules/precatorios/precatorios.module';
import { ClientsModule } from './modules/clients/clients.module';
import { RestituicaoModule } from './modules/restituicao/restituicao.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        UsersModule,
        DatabaseModule,
        OfficesModule,
        CalculatorModule,
        PrecatoriosModule,
        ClientsModule,
        RestituicaoModule,
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
