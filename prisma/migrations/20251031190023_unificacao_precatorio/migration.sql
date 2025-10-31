/*
  Warnings:

  - You are about to drop the column `assinatura_validada` on the `documentos` table. All the data in the column will be lost.
  - You are about to drop the column `tipo_documento` on the `documentos` table. All the data in the column will be lost.
  - You are about to drop the `processos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `restituicoes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tipo` to the `documentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_calculo` to the `precatorios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_protocolo` to the `precatorios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diferenca_IR` to the `precatorios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `necessita_calculo_judicial` to the `precatorios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero_processo` to the `precatorios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plataforma_distribuicao` to the `precatorios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tese_aplicada` to the `precatorios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_corrigido_SELIC` to the `precatorios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_ir_devido` to the `precatorios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_simulador_RRA` to the `precatorios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vara_juizo` to the `precatorios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "processos" DROP CONSTRAINT "processos_cliente_id_fkey";

-- DropForeignKey
ALTER TABLE "processos" DROP CONSTRAINT "processos_escritorio_id_fkey";

-- DropForeignKey
ALTER TABLE "restituicoes" DROP CONSTRAINT "restituicoes_precatorio_id_fkey";

-- AlterTable
ALTER TABLE "conversas" ADD COLUMN     "precatorioaId" TEXT;

-- AlterTable
ALTER TABLE "documentos" DROP COLUMN "assinatura_validada",
DROP COLUMN "tipo_documento",
ADD COLUMN     "tipo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pendencias" ADD COLUMN     "precatorioaId" TEXT;

-- AlterTable
ALTER TABLE "precatorios" ADD COLUMN     "data_calculo" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "data_protocolo" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "diferenca_IR" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "necessita_calculo_judicial" BOOLEAN NOT NULL,
ADD COLUMN     "numero_processo" TEXT NOT NULL,
ADD COLUMN     "plataforma_distribuicao" "PlataformaDistribuicao" NOT NULL,
ADD COLUMN     "tese_aplicada" "TeseAplicada" NOT NULL,
ADD COLUMN     "valor_corrigido_SELIC" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "valor_ir_devido" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "valor_simulador_RRA" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "vara_juizo" TEXT NOT NULL;

-- DropTable
DROP TABLE "processos";

-- DropTable
DROP TABLE "restituicoes";

-- DropEnum
DROP TYPE "TipoDocumento";

-- CreateTable
CREATE TABLE "Notificacao" (
    "id" TEXT NOT NULL,
    "precatorio_id" TEXT NOT NULL,
    "card_id" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,

    CONSTRAINT "Notificacao_pkey" PRIMARY KEY ("id")
);
