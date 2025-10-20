"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BootstrapService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const database_service_1 = require("../database/database.service");
const offices_service_1 = require("../offices/offices.service");
const users_service_1 = require("../users/users.service");
const enum_1 = require("../../shared/enum");
let BootstrapService = class BootstrapService {
    constructor(db, officesService, usersService) {
        this.db = db;
        this.officesService = officesService;
        this.usersService = usersService;
    }
    async createOffice() {
        return this.officesService.create({
            data: {
                "nome_fantasia": "OSMAR VAZ DE MELLO DA FONSECA NETO SOCIEDADE DE ADVOGADOS",
                "telefone": "(34) 3211-9178",
                "email": "contato@vazdemelloneto.com.br",
                "cnpj": "26011196000103",
                "api_key": "zxy987wvu654tsr321",
                "responsaveis_legais": "Osmar Vaz de Mello Neto, Tainah Vaz de Mello Neto",
                "dominio_white_label": "",
                "logo": ""
            }
        });
    }
    async createUserProfiles() {
        return this.db.perfil.createManyAndReturn({
            data: [
                {
                    id: enum_1.ProfileType.ADMIN,
                    descricao: 'ADMIN'
                },
                {
                    id: enum_1.ProfileType.ADVOGADO,
                    descricao: 'ADVOGADO'
                },
                {
                    id: enum_1.ProfileType.BROKER,
                    descricao: 'BROKER'
                },
                {
                    id: enum_1.ProfileType.CLIENTE_INDIVIDUAL,
                    descricao: 'CLIENTE_INDIVIDUAL'
                },
                {
                    id: enum_1.ProfileType.CONTABILIDADE,
                    descricao: 'CONTABILIDADE'
                },
            ]
        });
    }
    async createAdmin(officeId) {
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASS, 10);
        return this.usersService.create({
            data: {
                nome: "Admin",
                login: "admin",
                email: "contato@vazdemelloneto.com.br",
                cpf: "12345678910",
                data_nascimento: new Date().toISOString(),
                email_verificado: true,
                email_token: null,
                status: 1,
                senha: hashedPassword,
                escritorio: {
                    connect: { id: officeId }
                },
                tipo_perfil: {
                    connect: { id: enum_1.ProfileType.ADMIN },
                },
            }
        });
    }
    async bootstrap() {
        try {
            const [office,] = await Promise.all([
                this.createOffice(),
                this.createUserProfiles(),
            ]);
            await this.createAdmin(office.id);
            return true;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.string());
        }
    }
};
BootstrapService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        offices_service_1.OfficesService,
        users_service_1.UsersService])
], BootstrapService);
exports.BootstrapService = BootstrapService;
//# sourceMappingURL=bootstrap.service.js.map