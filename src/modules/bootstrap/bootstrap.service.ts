import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';
import { OfficesService } from '../offices/offices.service';
import { UsersService } from '../users/users.service';

import { ProfileType } from 'src/shared/enum';

@Injectable()
export class BootstrapService {
    constructor(
        private readonly db: DatabaseService,
        private readonly officesService: OfficesService,
        private readonly usersService: UsersService,
    ) { }

    private async createOffice() {
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
        })
    }

    private async createUserProfiles() {
        return this.db.perfil.createManyAndReturn({
            data: [
                {
                    id: ProfileType.ADMIN,
                    descricao: 'ADMIN'
                },
                {
                    id: ProfileType.ADVOGADO,
                    descricao: 'ADVOGADO'
                },
                {
                    id: ProfileType.BROKER,
                    descricao: 'BROKER'
                },
                {
                    id: ProfileType.CLIENTE_INDIVIDUAL,
                    descricao: 'CLIENTE_INDIVIDUAL'
                },
                {
                    id: ProfileType.CONTABILIDADE,
                    descricao: 'CONTABILIDADE'
                },
            ]
        })
    }

    private async createAdmin(officeId: string) {
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
                senha: process.env.ADMIN_PASS,
                escritorio: {
                    connect: { id: officeId }
                },
                tipo_perfil: {
                    connect: { id: ProfileType.ADMIN },
                },
            }
        })
    }

    async bootstrap() {
        try {
            const [
                office,
            ] = await Promise.all([
                this.createOffice(),
                this.createUserProfiles(),
            ]);

            await this.createAdmin(office.id);

            return true;
        } catch (error) {
            throw new InternalServerErrorException(error.string())
        }
    }
}
