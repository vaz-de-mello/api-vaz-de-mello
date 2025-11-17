/*
  Warnings:

  - You are about to drop the `Notificacao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Notificacao";

-- CreateTable
CREATE TABLE "notificacoes" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,

    CONSTRAINT "notificacoes_pkey" PRIMARY KEY ("id")
);
