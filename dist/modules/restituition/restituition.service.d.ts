import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { PageDto } from 'src/shared/@types';
import { RestituitionEntity } from './entities';
export declare class RestitutionService {
    private readonly db;
    constructor(db: DatabaseService);
    create(createArgs: Prisma.RestituicaoCreateArgs): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.StatusRestituicao;
        precatorio_id: string;
        tese_aplicada: import(".prisma/client").$Enums.TeseAplicada;
        valor_simulador_RRA: Prisma.Decimal;
        valor_ir_devido: Prisma.Decimal;
        diferenca_IR: Prisma.Decimal;
        valor_corrigido_SELIC: Prisma.Decimal;
        necessita_calculo_judicial: boolean;
        data_calculo: Date;
    }>;
    findAll(query: Partial<RestituitionEntity>, page: PageDto): Promise<[number, {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.StatusRestituicao;
        precatorio_id: string;
        tese_aplicada: import(".prisma/client").$Enums.TeseAplicada;
        valor_simulador_RRA: Prisma.Decimal;
        valor_ir_devido: Prisma.Decimal;
        diferenca_IR: Prisma.Decimal;
        valor_corrigido_SELIC: Prisma.Decimal;
        necessita_calculo_judicial: boolean;
        data_calculo: Date;
    }[]]>;
    findFirst(args: Prisma.RestituicaoFindFirstArgs): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.StatusRestituicao;
        precatorio_id: string;
        tese_aplicada: import(".prisma/client").$Enums.TeseAplicada;
        valor_simulador_RRA: Prisma.Decimal;
        valor_ir_devido: Prisma.Decimal;
        diferenca_IR: Prisma.Decimal;
        valor_corrigido_SELIC: Prisma.Decimal;
        necessita_calculo_judicial: boolean;
        data_calculo: Date;
    }>;
    findUnique(args: Prisma.RestituicaoFindUniqueArgs): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.StatusRestituicao;
        precatorio_id: string;
        tese_aplicada: import(".prisma/client").$Enums.TeseAplicada;
        valor_simulador_RRA: Prisma.Decimal;
        valor_ir_devido: Prisma.Decimal;
        diferenca_IR: Prisma.Decimal;
        valor_corrigido_SELIC: Prisma.Decimal;
        necessita_calculo_judicial: boolean;
        data_calculo: Date;
    }>;
    update(updateArgs: Prisma.RestituicaoUpdateArgs): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.StatusRestituicao;
        precatorio_id: string;
        tese_aplicada: import(".prisma/client").$Enums.TeseAplicada;
        valor_simulador_RRA: Prisma.Decimal;
        valor_ir_devido: Prisma.Decimal;
        diferenca_IR: Prisma.Decimal;
        valor_corrigido_SELIC: Prisma.Decimal;
        necessita_calculo_judicial: boolean;
        data_calculo: Date;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
