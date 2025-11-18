import { CreatePrecatoryDto } from './create-precatory.dto';
import { PlataformaDistribuicao } from '@prisma/client';
declare const UpdatePrecatoryDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreatePrecatoryDto>>;
export declare class UpdatePrecatoryDto extends UpdatePrecatoryDto_base {
    status?: number;
    laudo_doenca?: string;
    numero_processo?: string;
    vara_juizo?: string;
    data_protocolo?: string;
    plataforma_distribuicao?: PlataformaDistribuicao;
    valor_simulador_RRA?: number;
    valor_ir_devido?: number;
    diferenca_IR?: number;
    valor_corrigido_SELIC?: number;
    necessita_calculo_judicial?: boolean;
    data_calculo?: string;
}
export declare class UpdatePrecatoryClientDto {
    nome: string;
    cpf: string;
    data_nascimento: string;
}
export {};
