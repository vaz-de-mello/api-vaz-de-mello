-- CreateTable
CREATE TABLE "pendencias" (
    "id" TEXT NOT NULL,
    "precatorio_id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "responsaveis" TEXT NOT NULL,
    "data_final" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pendencias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversas" (
    "id" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "usuario_nome" TEXT NOT NULL,
    "precatorio_id" TEXT NOT NULL,

    CONSTRAINT "conversas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pendencias" ADD CONSTRAINT "pendencias_precatorio_id_fkey" FOREIGN KEY ("precatorio_id") REFERENCES "precatorios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversas" ADD CONSTRAINT "conversas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversas" ADD CONSTRAINT "conversas_precatorio_id_fkey" FOREIGN KEY ("precatorio_id") REFERENCES "precatorios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
