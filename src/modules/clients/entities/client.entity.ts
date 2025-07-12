import { Sexo } from "src/shared/enum";

export class ClientEntity {
    id: string;
    cpf: string;
    nome: string;
    data_nascimento: Date;
    sexo: Sexo;
    doença_grave: boolean;
    laudo_doenca: string;
    hipossuficiente: boolean;
    createdAt: Date;
    updatedAt: Date;
}
