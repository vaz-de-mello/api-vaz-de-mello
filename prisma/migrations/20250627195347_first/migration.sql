-- CreateEnum
CREATE TYPE "TipoVerba" AS ENUM ('alimentar', 'indenizatória', 'auxílio_acidente', 'outros');

-- CreateEnum
CREATE TYPE "HonorariosDestacados" AS ENUM ('Sim', 'Não');

-- CreateEnum
CREATE TYPE "TeseAplicada" AS ENUM ('juros_de_mora', 'idoso', 'doenca_grave', 'hipossuficiencia', 'outros');

-- CreateEnum
CREATE TYPE "NecessitaCalculoJudicial" AS ENUM ('Sim', 'Não');

-- CreateEnum
CREATE TYPE "StatusRestituicao" AS ENUM ('em_analise', 'elegivel', 'protocolado', 'indeferido', 'pago');

-- CreateEnum
CREATE TYPE "TipoDocumento" AS ENUM ('RG', 'contrato', 'outros');

-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('Masculino', 'Feminino', 'Outro');

-- CreateEnum
CREATE TYPE "PlataformaDistribuicao" AS ENUM ('Legal_One', 'Projudi', 'PJe', 'Outro');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "escritorio_id" TEXT NOT NULL,
    "tipo_perfil_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "escritorios" (
    "id" TEXT NOT NULL,
    "nome_fantasia" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "api_key" TEXT NOT NULL,
    "responsaveis_legais" TEXT NOT NULL,
    "dominio_white_labe" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "escritorios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clientes" (
    "id" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "sexo" "Sexo" NOT NULL,
    "doença_grave" BOOLEAN NOT NULL,
    "laudo_doenca" TEXT NOT NULL,
    "hipossuficiente" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "precatorios" (
    "id" TEXT NOT NULL,
    "cliente_id" TEXT NOT NULL,
    "data_levantamento" TIMESTAMP(3) NOT NULL,
    "valor_bruto" DECIMAL(65,30) NOT NULL,
    "valor_irrf_retido" DECIMAL(65,30) NOT NULL,
    "rra_meses" INTEGER NOT NULL,
    "tribunal_pagador" TEXT NOT NULL,
    "tipo_verba" "TipoVerba" NOT NULL,
    "honorarios_destacados" "HonorariosDestacados" NOT NULL,
    "percentual_honorario" DECIMAL(65,30) NOT NULL,
    "valor_honorario" DECIMAL(65,30) NOT NULL,
    "processo_origem" TEXT NOT NULL,
    "oficio_pdf" TEXT NOT NULL,
    "comprovante_pdf" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "precatorios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restituicoes" (
    "id" TEXT NOT NULL,
    "precatorio_id" TEXT NOT NULL,
    "tese_aplicada" "TeseAplicada" NOT NULL,
    "valor_simulador_RRA" DECIMAL(65,30) NOT NULL,
    "valor_ir_devido" DECIMAL(65,30) NOT NULL,
    "diferença_IR" DECIMAL(65,30) NOT NULL,
    "valor_corrigido_SELIC" DECIMAL(65,30) NOT NULL,
    "necessita_cálculo_judicial" "NecessitaCalculoJudicial" NOT NULL,
    "data_cálculo" TIMESTAMP(3) NOT NULL,
    "status" "StatusRestituicao" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "restituicoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentos" (
    "id" TEXT NOT NULL,
    "cliente_id" TEXT NOT NULL,
    "tipo_documento" "TipoDocumento" NOT NULL,
    "arquivo" TEXT NOT NULL,
    "assinatura_validada" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "documentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "processos" (
    "id" TEXT NOT NULL,
    "cliente_id" TEXT NOT NULL,
    "escritorio_id" TEXT NOT NULL,
    "numero_processo" TEXT NOT NULL,
    "vara_juizo" TEXT NOT NULL,
    "data_protocolo" TIMESTAMP(3) NOT NULL,
    "documentos_juntados" TEXT NOT NULL,
    "plataforma_distribuicao" "PlataformaDistribuicao" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "processos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perfis" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "perfis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_login_key" ON "usuarios"("login");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_cpf_key" ON "usuarios"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_cpf_key" ON "clientes"("cpf");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_escritorio_id_fkey" FOREIGN KEY ("escritorio_id") REFERENCES "escritorios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_tipo_perfil_id_fkey" FOREIGN KEY ("tipo_perfil_id") REFERENCES "perfis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "precatorios" ADD CONSTRAINT "precatorios_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restituicoes" ADD CONSTRAINT "restituicoes_precatorio_id_fkey" FOREIGN KEY ("precatorio_id") REFERENCES "precatorios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos" ADD CONSTRAINT "documentos_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processos" ADD CONSTRAINT "processos_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processos" ADD CONSTRAINT "processos_escritorio_id_fkey" FOREIGN KEY ("escritorio_id") REFERENCES "escritorios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
