"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const database_module_1 = require("./modules/database/database.module");
const offices_module_1 = require("./modules/offices/offices.module");
const guards_1 = require("./shared/guards");
const calculator_module_1 = require("./modules/calculator/calculator.module");
const precatories_module_1 = require("./modules/precatories/precatories.module");
const clients_module_1 = require("./modules/clients/clients.module");
const documents_module_1 = require("./modules/documents/documents.module");
const bootstrap_module_1 = require("./modules/bootstrap/bootstrap.module");
const health_module_1 = require("./modules/health/health.module");
const conversations_module_1 = require("./modules/conversations/conversations.module");
const pendings_module_1 = require("./modules/pendings/pendings.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            database_module_1.DatabaseModule,
            offices_module_1.OfficesModule,
            calculator_module_1.CalculatorModule,
            precatories_module_1.PrecatoriesModule,
            clients_module_1.ClientsModule,
            documents_module_1.DocumentsModule,
            bootstrap_module_1.BootstrapModule,
            health_module_1.HealthModule,
            conversations_module_1.ConversationsModule,
            pendings_module_1.PendingsModule,
        ],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: guards_1.AuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: guards_1.RolesGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map