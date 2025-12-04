import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './modules/database/database.module';
import { OfficesModule } from './modules/offices/offices.module';
import { CalculatorModule } from './modules/calculator/calculator.module';
import { PrecatoriesModule } from './modules/precatories/precatories.module';
import { ClientsModule } from './modules/clients/clients.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { BootstrapModule } from './modules/bootstrap/bootstrap.module';
import { HealthModule } from './modules/health/health.module';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { PendingsModule } from './modules/pendings/pendings.module';
import { S3Module } from './modules/s3/s3.module';

import { AuthGuard, RolesGuard } from './shared/guards';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { ChartsModule } from './modules/charts/charts.module';

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
        DocumentsModule,
        BootstrapModule,
        HealthModule,
        ConversationsModule,
        PendingsModule,
        S3Module,
        NotificationsModule,
        ChartsModule,
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
