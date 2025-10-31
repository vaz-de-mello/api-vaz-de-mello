-- AlterTable
ALTER TABLE "precatorios" ALTER COLUMN "data_calculo" DROP NOT NULL,
ALTER COLUMN "data_protocolo" DROP NOT NULL,
ALTER COLUMN "diferenca_IR" DROP NOT NULL,
ALTER COLUMN "necessita_calculo_judicial" DROP NOT NULL,
ALTER COLUMN "numero_processo" DROP NOT NULL,
ALTER COLUMN "plataforma_distribuicao" DROP NOT NULL,
ALTER COLUMN "valor_corrigido_SELIC" DROP NOT NULL,
ALTER COLUMN "valor_ir_devido" DROP NOT NULL,
ALTER COLUMN "valor_simulador_RRA" DROP NOT NULL,
ALTER COLUMN "vara_juizo" DROP NOT NULL;
