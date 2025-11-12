/*
  Warnings:

  - You are about to drop the column `cliente_id` on the `documentos` table. All the data in the column will be lost.
  - Added the required column `precatorio_id` to the `documentos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "documentos" DROP CONSTRAINT "documentos_cliente_id_fkey";

-- AlterTable
ALTER TABLE "documentos" DROP COLUMN "cliente_id",
ADD COLUMN     "precatorio_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "documentos" ADD CONSTRAINT "documentos_precatorio_id_fkey" FOREIGN KEY ("precatorio_id") REFERENCES "precatorios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
